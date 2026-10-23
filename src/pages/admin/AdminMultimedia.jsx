import { useState, useEffect } from 'react'
import {
  getBannerConfig,
  saveBannerConfig,
  getCarouselImages,
  addCarouselImage,
  removeCarouselImage,
} from '../../mediaService'
import { Icon } from '../../components/Icon'

export default function AdminMultimedia() {
  // Estado del Mini Banner Promocional
  const [banner, setBanner] = useState(getBannerConfig())
  const [bannerPreview, setBannerPreview] = useState(banner.imagen)
  const [bannerGuardado, setBannerGuardado] = useState(false)

  // Estado del Carrusel de imágenes
  const [carousel, setCarousel] = useState(getCarouselImages())
  const [carouselPreview, setCarouselPreview] = useState(null)
  const [carouselTitle, setCarouselTitle] = useState('')
  const [carouselDesc, setCarouselDesc] = useState('')
  const [cargandoImagen, setCargandoImagen] = useState(false)

  useEffect(() => {
    setBanner(getBannerConfig())
    setCarousel(getCarouselImages())
  }, [])

  // Comprimir imagen a base64 ligero antes de guardar
  const procesarArchivoImagen = (file, maxWidth, maxHeight, quality, callback) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height)
          height = maxHeight
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        const base64 = canvas.toDataURL('image/webp', quality)
        callback(base64)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  // Manejo de archivo para Banner
  const handleBannerFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    procesarArchivoImagen(file, 1920, 300, 0.85, (base64) => {
      setBannerPreview(base64)
      setBanner((prev) => ({ ...prev, imagen: base64 }))
      setBannerGuardado(false)
    })
  }

  const handleGuardarBanner = (e) => {
    e.preventDefault()
    saveBannerConfig(banner)
    setBannerGuardado(true)
    setTimeout(() => setBannerGuardado(false), 3000)
  }

  const handleEliminarBannerImg = () => {
    setBannerPreview(null)
    const updated = { ...banner, imagen: null, activo: false }
    setBanner(updated)
    saveBannerConfig(updated)
  }

  // Manejo de archivo para Carrusel (máx 6 con rotación FIFO)
  const handleCarouselFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    procesarArchivoImagen(file, 1400, 700, 0.85, (base64) => {
      setCarouselPreview(base64)
    })
  }

  const handleAgregarCarousel = (e) => {
    e.preventDefault()
    if (!carouselPreview) {
      alert('Por favor selecciona una imagen para el carrusel.')
      return
    }

    setCargandoImagen(true)
    try {
      const updated = addCarouselImage({
        src: carouselPreview,
        title: carouselTitle || 'Fibra Óptica ComunetMax',
        desc: carouselDesc || 'Conexión de máxima velocidad',
      })
      setCarousel(updated)
      setCarouselPreview(null)
      setCarouselTitle('')
      setCarouselDesc('')
    } finally {
      setCargandoImagen(false)
    }
  }

  const handleEliminarCarouselItem = (id) => {
    if (!window.confirm('¿Eliminar esta imagen del carrusel?')) return
    const updated = removeCarouselImage(id)
    setCarousel(updated)
  }

  return (
    <div style={styles.container}>
      {/* SECCIÓN 1: MINI BANNER PROMOCIONAL */}
      <div className="card" style={styles.cardSection}>
        <div style={styles.sectionHeader}>
          <div>
            <h3 style={styles.sectionTitle}>Mini Banner Promocional Superior</h3>
            <p style={styles.sectionDesc}>
              Aparece en todo el ancho de la pantalla justo arriba de la barra de navegación para anunciar promociones especiales.
            </p>
          </div>
        </div>

        <form onSubmit={handleGuardarBanner} style={{ marginTop: 20 }}>
          {/* Switch Activar / Desactivar */}
          <div style={styles.toggleRow}>
            <div>
              <strong>Estado del Mini Banner:</strong>
              <div style={{ fontSize: 13, color: 'var(--text-light)' }}>
                {banner.activo ? 'El banner está VISIBLE en la web' : 'El banner está OCULTO'}
              </div>
            </div>
            <label style={styles.switch}>
              <input
                type="checkbox"
                checked={banner.activo}
                onChange={(e) => {
                  setBanner((prev) => ({ ...prev, activo: e.target.checked }))
                  setBannerGuardado(false)
                }}
                disabled={!banner.imagen}
              />
              <span style={styles.slider} />
            </label>
          </div>

          {!banner.imagen && (
            <div className="alert alert-error" style={{ margin: '12px 0 20px', padding: 12 }}>
              Sube una imagen promocional para poder activar el banner.
            </div>
          )}

          {/* Subir Imagen del Banner */}
          <div style={{ marginTop: 16 }}>
            <label style={styles.label}>Imagen del Banner (Recomendado: panorámica 1920x80px o similar):</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerFile}
              style={{ display: 'block', margin: '8px 0 16px' }}
            />

            {bannerPreview && (
              <div style={styles.previewBox}>
                <img src={bannerPreview} alt="Preview Banner" style={styles.previewImg} />
                <button
                  type="button"
                  onClick={handleEliminarBannerImg}
                  style={{ ...styles.deleteBadgeBtn, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  title="Quitar imagen"
                >
                  <Icon name="x" size={14} color="#fff" /> Quitar imagen
                </button>
              </div>
            )}
          </div>

          {/* Enlace de redirección opcional */}
          <div style={{ marginTop: 16 }}>
            <label style={styles.label}>Enlace al hacer clic (opcional):</label>
            <input
              type="text"
              placeholder="Ej: /planes o https://wa.me/573152396188"
              value={banner.enlace || ''}
              onChange={(e) => {
                setBanner((prev) => ({ ...prev, enlace: e.target.value }))
                setBannerGuardado(false)
              }}
              style={styles.input}
            />
          </div>

          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Guardar Configuración del Banner
            </button>
            {bannerGuardado && (
              <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Icon name="check" size={16} color="var(--success)" /> Guardado correctamente
              </span>
            )}
          </div>
        </form>
      </div>

      {/* SECCIÓN 2: CARRUSEL DE IMÁGENES (HOME) */}
      <div className="card" style={{ ...styles.cardSection, marginTop: 32 }}>
        <div style={styles.sectionHeader}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h3 style={styles.sectionTitle}>Carrusel Multimedia del Home</h3>
              <span style={styles.counterBadge}>
                {carousel.length} / 6 fotos
              </span>
            </div>
            <p style={styles.sectionDesc}>
              Personaliza las diapositivas de la página principal. Soporta un <strong>máximo de 6 imágenes</strong>; al agregar una nueva, se reemplaza automáticamente la más antigua (rotación FIFO).
            </p>
          </div>
        </div>

        {/* Formulario para agregar nueva foto */}
        <form onSubmit={handleAgregarCarousel} style={styles.carouselForm}>
          <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--secondary)' }}>
            + Añadir Foto al Carrusel
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={styles.label}>Título (opcional):</label>
              <input
                type="text"
                placeholder="Ej: Instalación de Fibra Óptica"
                value={carouselTitle}
                onChange={(e) => setCarouselTitle(e.target.value)}
                style={styles.input}
              />
            </div>
            <div>
              <label style={styles.label}>Descripción corta (opcional):</label>
              <input
                type="text"
                placeholder="Ej: Navegación simétrica sin cortes"
                value={carouselDesc}
                onChange={(e) => setCarouselDesc(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <label style={styles.label}>Selecciona imagen (Resolución sugerida: 1200x500px):</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCarouselFile}
              style={{ display: 'block', margin: '8px 0 12px' }}
            />
          </div>

          {carouselPreview && (
            <div style={{ ...styles.previewBox, height: 180, marginBottom: 16 }}>
              <img src={carouselPreview} alt="Preview Carrusel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!carouselPreview || cargandoImagen}
            style={{ padding: '12px 28px' }}
          >
            {cargandoImagen ? 'Procesando...' : carousel.length >= 6 ? 'Añadir foto (Reemplazará la más antigua)' : 'Añadir foto al Carrusel'}
          </button>
        </form>

        {/* Grilla con imágenes activas */}
        <div style={{ marginTop: 32 }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text)' }}>
            Fotos Activas en el Carrusel ({carousel.length}):
          </h4>

          {carousel.length === 0 ? (
            <div style={styles.emptyBox}>
              <p style={{ margin: 0, color: 'var(--text-light)', fontSize: 14 }}>
                No has subido fotos personalizadas. Actualmente la web muestra los slides predeterminados.
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
              {carousel.map((item, idx) => (
                <div key={item.id} style={styles.gridItem}>
                  <div style={styles.itemHeader}>
                    <span style={styles.itemOrderBadge}>#{idx + 1}</span>
                    {idx === 0 && <span style={styles.oldestBadge}>Más antigua</span>}
                    <button
                      type="button"
                      onClick={() => handleEliminarCarouselItem(item.id)}
                      style={{ ...styles.itemDeleteBtn, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Eliminar esta foto"
                    >
                      <Icon name="x" size={14} color="#dc2626" />
                    </button>
                  </div>
                  <img src={item.src} alt={item.title} style={styles.gridImg} />
                  <div style={styles.itemInfo}>
                    <strong>{item.title}</strong>
                    <p style={{ fontSize: 13, color: 'var(--text-light)', margin: '4px 0 0' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    paddingTop: 20,
  },
  cardSection: {
    padding: 32,
    background: '#ffffff',
    borderRadius: 16,
    border: '1px solid var(--border)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    borderBottom: '1px solid var(--border)',
    paddingBottom: 20,
  },
  sectionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: 'rgba(91, 168, 247, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--secondary)',
    margin: 0,
  },
  sectionDesc: {
    fontSize: 14,
    color: 'var(--text-light)',
    margin: '6px 0 0',
    lineHeight: 1.5,
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    background: 'var(--bg-alt)',
    borderRadius: 12,
    border: '1px solid var(--border)',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: 50,
    height: 26,
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    inset: 0,
    backgroundColor: '#cbd5e1',
    transition: '0.3s',
    borderRadius: 34,
  },
  label: {
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text)',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid var(--border)',
    fontSize: 14,
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  previewBox: {
    position: 'relative',
    width: '100%',
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    border: '1px solid var(--border)',
    background: '#f8fafc',
  },
  previewImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  deleteBadgeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    background: 'rgba(220, 38, 38, 0.85)',
    color: '#fff',
    border: 'none',
    padding: '4px 10px',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
  },
  counterBadge: {
    background: 'var(--primary)',
    color: 'var(--secondary)',
    padding: '4px 10px',
    borderRadius: 9999,
    fontSize: 12,
    fontWeight: 700,
  },
  carouselForm: {
    marginTop: 24,
    padding: 20,
    background: 'var(--bg)',
    borderRadius: 12,
    border: '1px solid var(--border)',
  },
  emptyBox: {
    padding: '36px 20px',
    textAlign: 'center',
    background: 'var(--bg-alt)',
    borderRadius: 12,
    border: '1px dashed var(--border)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 20,
  },
  gridItem: {
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid var(--border)',
    background: '#fff',
    position: 'relative',
    boxShadow: 'var(--shadow-sm)',
  },
  itemHeader: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  itemOrderBadge: {
    background: 'rgba(0, 0, 0, 0.65)',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 700,
  },
  oldestBadge: {
    background: 'rgba(239, 68, 68, 0.9)',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 700,
  },
  itemDeleteBtn: {
    background: 'rgba(220, 38, 38, 0.9)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: 26,
    height: 26,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridImg: {
    width: '100%',
    height: 160,
    objectFit: 'cover',
    display: 'block',
  },
  itemInfo: {
    padding: '12px 16px',
  },
}
