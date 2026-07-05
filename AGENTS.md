# Comunet Frontend — React + Vite

App informativa para Comunet (ISP). Login oculto en `/login`, panel admin para gestionar cobertura y planes.

## Stack
- React 18 + Vite
- React Router v6
- Axios (proxy a gateway Spring Boot)
- Backend gateway: `http://localhost:8080`
- Frontend dev: `http://localhost:5173`

## Rutas
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Landing page |
| `/planes` | Planes | Público: grid de tarjetas con municipios que tienen cobertura |
| `/planes/:municipioId` | PlanesMunicipio | Público: planes disponibles en el municipio seleccionado |
| `/cobertura` | Cobertura | Público: info de cobertura |
| `/contacto` | Contacto | Público |
| `/nosotros` | Nosotros | Público: Misión, Visión y valores |
| `/politicas` | Politicas | Público: Políticas de uso del servicio |
| `/login` | Login | Solo accesible escribiendo la URL directa. Sin enlaces desde ninguna parte. |
| `/admin` | Dashboard | Admin protegido: lista municipios con cobertura y CRUD de planes |

## Admin Dashboard (`src/pages/admin/Dashboard.jsx`)

### Vista 1: Lista de municipios con cobertura
- Carga `getCoberturas()` que trae solo municipios con cobertura asignada.
- Botón `+ Añadir Cobertura` → popup con:
  - Dropdown de departamento (de los municipios existentes en BD)
  - Dropdown de municipio filtrado por departamento
  - Asigna cobertura Fibra Óptica al municipio seleccionado
- Clic en "Gestionar Planes" → carga vista detalle.

### Vista 2: Gestión de Planes
- Muestra cobertura (tipo, fecha) del municipio seleccionado.
- Botones: Desconectar cobertura, + Nuevo Plan.
- Tabla de planes con editar/eliminar.
- Formulario inline para crear/editar plan (nombre, precio, velocidad, descripción).

## Login (`src/pages/Login.jsx`)
- POST a `http://localhost:8080/api/auth/login`
- Guarda token en sessionStorage via `auth.js`
- Redirige a `/admin`

## Pública: Planes (`src/pages/Planes.jsx`)
- Carga `getCoberturas()` y muestra tarjetas con imagen genérica + nombre del municipio.
- Al hacer clic en una tarjeta navega a `/planes/:municipioId`.
- Imagen placeholder: `public/municipio-placeholder.svg`.

## Pública: Planes por Municipio (`src/pages/PlanesMunicipio.jsx`)
- Lee `municipioId` de la URL.
- Carga cobertura y planes del municipio.
- Muestra planes en tarjetas con "Lo quiero" → `/contacto`.

## Navbar (`src/components/Navbar.jsx`)
- Enlaces públicos: Inicio, Planes, Cobertura, Contacto.
- Dropdown "Nosotros" con:
  - **Misión y Visión** → `/nosotros`
  - **Políticas de uso** → `/politicas`
- Si está autenticado, muestra "Admin ▾" con menú desplegable:
  - **Panel** → `/admin`
  - **Cerrar sesión** → limpia `sessionStorage` y redirige a `/`

## Iconos (`src/components/Icon.jsx`)
- Componente `Icon` con SVGs inline. No usar emojis en ningún componente.
- Iconos disponibles: bolt, speed, shield, signal, headset, network, check, x, pin, phone, mail, clock, antenna, target, eye, doc, chevronDown, arrowLeft, fiber.

## Diseño
- **Paleta de colores** (inspirada en Bitwan):
  - Primary: `#019DF4` (azul vibrante)
  - Secondary: `#0B2739` (azul oscuro)
  - Primary Dark: `#0077CC` (azul oscuro)
  - Gradientes: `var(--gradient-primary)`, `var(--gradient-hero)`, `var(--gradient-card)`
- **Tipografía**: Inter (Google Fonts)
- **Animaciones**: fadeInUp en cards, pulse en hero, hover effects con cubic-bezier
- **Responsive**: Mobile-first con breakpoints en 1024px, 768px, 480px

## Contacto (`src/pages/Contacto.jsx`)
- Incluye mapa de Google Maps embebido con ubicación: Calle 5 #3-40, Centro San Pedro, Valle del Cauca
- WhatsApp: +57 315 239 6188

## API (`src/api.js`)
- Axios instance con `baseURL: http://localhost:8080`
- Interceptor agrega `Authorization: Bearer <token>` desde sessionStorage.
- Sin interceptor global de 401 (los componentes lo manejan localmente).

## Auth (`src/auth.js`)
- Usa `sessionStorage` (no `localStorage`) para que la sesión no persista al cerrar el navegador.
- `getToken()`, `getUser()`, `login()`, `logout()`, `isAuthenticated()`

## Backend
- Microservicio `ms-cobertura` en `/home/peres/Documentos/comunet/Microservicios/ms-cobertura/`.
- Controladores: `CoberturaController`, `MunicipioController`.
- **No usar `@CrossOrigin`** en los controladores — el gateway maneja CORS.
- `POST /api/municipios` agregado para crear municipios.
- `MunicipioService.crear(nombre, departamento)` crea municipio.
- DB `municipios_colombia` — vacía hasta que se creen municipios desde admin.

## Comandos
```bash
# Frontend
cd /home/peres/Documentos/ComunetFront
source ~/.nvm/nvm.sh && npm run dev

# Backend (reconstruir después de cambios en ms-cobertura)
cd /home/peres/Documentos/comunet
docker compose build ms-cobertura && docker compose up -d
```

## Notas
- Los departamentos disponibles se derivan de `municipios.map(m => m.departamento)`. Si no hay municipios, no hay departamentos en dropdown.
- Crear un municipio desde admin asigna auto Fibra Óptica.
- Admin valida token al montar; si 401 redirige a `/login`.
