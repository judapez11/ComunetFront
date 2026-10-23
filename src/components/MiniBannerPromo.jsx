import { useState, useEffect } from 'react'
import { getBannerConfig, subscribeToMediaChanges } from '../mediaService'
import { Icon } from './Icon'

export default function MiniBannerPromo() {
  const [banner, setBanner] = useState(getBannerConfig())
  const [cerrado, setCerrado] = useState(false)

  useEffect(() => {
    const unsub = subscribeToMediaChanges(() => {
      setBanner(getBannerConfig())
      setCerrado(false)
    })
    return unsub
  }, [])

  if (!banner.activo || !banner.imagen || cerrado) {
    return null
  }

  const content = (
    <div style={styles.bannerInner}>
      <img
        src={banner.imagen}
        alt={banner.textoAlt || 'Promoción ComunetMax'}
        style={styles.image}
      />
    </div>
  )

  return (
    <div style={styles.bannerWrapper}>
      {banner.enlace ? (
        <a
          href={banner.enlace}
          target={banner.enlace.startsWith('http') ? '_blank' : '_self'}
          rel="noopener noreferrer"
          style={styles.link}
        >
          {content}
        </a>
      ) : (
        content
      )}
      <button
        style={styles.closeBtn}
        onClick={() => setCerrado(true)}
        aria-label="Cerrar promoción"
        title="Ocultar banner"
      >
        <Icon name="x" size={14} color="#ffffff" />
      </button>
    </div>
  )
}

const styles = {
  bannerWrapper: {
    width: '100%',
    position: 'relative',
    background: 'var(--secondary)',
    overflow: 'hidden',
    zIndex: 110,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
    animation: 'fadeInUp 0.3s ease-out',
  },
  bannerInner: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 90,
  },
  image: {
    width: '100%',
    maxHeight: 90,
    objectFit: 'cover',
    display: 'block',
  },
  link: {
    display: 'block',
    width: '100%',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0, 0, 0, 0.45)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    width: 28,
    height: 28,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    transition: 'background 0.2s',
  },
}
