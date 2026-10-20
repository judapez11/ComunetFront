# Comunet Frontend — React + Vite

App informativa para Comunet (ISP). Login oculto en `/login`, panel admin para gestionar cobertura y planes.

## Stack
- React 18 + Vite
- React Router v6
- Axios (proxy a gateway Spring Boot)
- Backend gateway: `http://localhost:8080`
- Frontend dev: `http://localhost:5173`

## Skills y Reglas Personalizadas (Agente)
El proyecto cuenta con reglas/skills en `.antigravity/rules/` y `~/.antigravity/skills/` que pueden invocarse en el chat usando `@rules` o tag directo:
- **Caveman (`@caveman.md` / `caveman-*.md`)**: Regla de respuesta ultra concisa, directa y sin relleno (modo ahorro de contexto). Utilizar para explicaciones rápidas, revisiones de código breves o generación de commits concisos.
- **Ponytail (`@ponytail.md`)**: Regla de refactorización y arquitectura limpia. Enfocada en mantener el código modular, mantenible y alineado con las mejores prácticas del stack (React + Spring Boot).

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
- Imagen placeholder: `public/media/municipio-placeholder.svg`.
- Si el municipio tiene imagen subida, se carga desde `localStorage` (`mun_img_{id}`).

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

## Diseño (Google Stitch - Tema Claro Vibrante)
- **Paleta de colores** (azules vivos y vibrantes):
  - Primary: `#5BA8F7` (azul vibrante)
  - Secondary: `#003D82` (azul oscuro intenso)
  - Accent: `#00BFFF` (azul eléctrico)
  - Background: `#F0F8FF` (azul muy claro)
  - Surface: `#FFFFFF` (blanco para cards)
  - Nav BG: `rgba(255, 255, 255, 0.95)` con blur
  - Footer BG: Gradiente `#003D82` a `#001F4D`
  - Hero gradient: `#5BA8F7` a `#003D82`
- **Tipografía**: Inter (Google Fonts) - 400, 600, 700, 800, 900
- **Botones**: `border-radius: 9999px` (pill shape), hover scale(1.05)
- **Cards**: `border-radius: 24px`, fondo blanco, border sutil
- **Iconos**: SVG inline (sin emojis)
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
- Al añadir cobertura se puede subir una foto del municipio. La imagen se guarda en `localStorage` como `mun_img_{id}`. Si no se sube foto, se usa `public/media/municipio-placeholder.svg`.
- Multimedia: imágenes de municipios van en `public/media/`.
