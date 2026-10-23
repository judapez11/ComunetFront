// Gestión de Multimedia y Promociones
// Se maneja con sincronización local y soporte para API remota

const STORAGE_KEY_BANNER = 'comunet_media_banner'
const STORAGE_KEY_CAROUSEL = 'comunet_media_carousel'

// Evento custom para que las vistas (Home, Navbar, etc.) se actualicen en tiempo real al guardar en Admin
const MEDIA_CHANGE_EVENT = 'comunet_media_updated'

export const getBannerConfig = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BANNER)
    if (!raw) return { activo: false, imagen: null, enlace: '', textoAlt: 'Promoción ComunetMax' }
    return JSON.parse(raw)
  } catch {
    return { activo: false, imagen: null, enlace: '', textoAlt: 'Promoción ComunetMax' }
  }
}

export const saveBannerConfig = (config) => {
  localStorage.setItem(STORAGE_KEY_BANNER, JSON.stringify(config))
  window.dispatchEvent(new Event(MEDIA_CHANGE_EVENT))
  return config
}

export const getCarouselImages = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CAROUSEL)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Añade una imagen al carrusel aplicando la regla FIFO:
 * Máximo 6 imágenes. Si ya hay 6, elimina la más antigua (primera) y añade la nueva al final.
 */
export const addCarouselImage = (imageItem) => {
  const current = getCarouselImages()
  let updated = [...current]

  // Si ya tiene 6 o más, removemos la más antigua (índice 0)
  if (updated.length >= 6) {
    updated = updated.slice(updated.length - 5) // mantiene las últimas 5 para que con la nueva sumen 6
  }

  const newItem = {
    id: Date.now() + Math.random().toString(36).substring(2, 7),
    src: typeof imageItem === 'string' ? imageItem : imageItem.src,
    title: imageItem.title || 'Fibra Óptica ComunetMax',
    desc: imageItem.desc || 'Conectividad de alta velocidad',
    fecha: new Date().toISOString(),
  }

  updated.push(newItem)
  localStorage.setItem(STORAGE_KEY_CAROUSEL, JSON.stringify(updated))
  window.dispatchEvent(new Event(MEDIA_CHANGE_EVENT))
  return updated
}

export const removeCarouselImage = (id) => {
  const current = getCarouselImages()
  const updated = current.filter((img) => img.id !== id)
  localStorage.setItem(STORAGE_KEY_CAROUSEL, JSON.stringify(updated))
  window.dispatchEvent(new Event(MEDIA_CHANGE_EVENT))
  return updated
}

export const subscribeToMediaChanges = (callback) => {
  const listener = () => callback()
  window.addEventListener(MEDIA_CHANGE_EVENT, listener)
  window.addEventListener('storage', listener)
  return () => {
    window.removeEventListener(MEDIA_CHANGE_EVENT, listener)
    window.removeEventListener('storage', listener)
  }
}
