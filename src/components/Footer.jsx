import { Link } from 'react-router-dom'

const IMG_VERSION = Date.now()

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.inner}>
        <div className="footer-grid">
          <div style={styles.brandCol}>
            <Link to="/" style={styles.brandLink}>
              <img src={`/whitelogo.png?v=${IMG_VERSION}`} alt="ComunetMax" style={styles.brandLogo} />
            </Link>
            <div style={styles.socialLinks}>
              <a href="https://www.facebook.com/comunet.max.9" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/comunet.max/" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 style={styles.heading}>Servicios</h4>
            <ul style={styles.list}>
              <li><a href="/planes" style={styles.link}>Planes de Fibra</a></li>
              <li><a href="/cobertura" style={styles.link}>Cobertura</a></li>
              <li><a href="/contacto" style={styles.link}>Soporte</a></li>
            </ul>
          </div>
          <div>
            <h4 style={styles.heading}>Empresa</h4>
            <ul style={styles.list}>
              <li><a href="/nosotros" style={styles.link}>Sobre Nosotros</a></li>
              <li><a href="/contacto" style={styles.link}>Contacto</a></li>
              <li><a href="/politicas" style={styles.link}>Politicas</a></li>
            </ul>
          </div>
          <div>
            <h4 style={styles.heading}>Legal</h4>
            <ul style={styles.list}>
              <li><a href="/politicas" style={styles.link}>Privacidad</a></li>
              <li><a href="/pqr" style={styles.link}>PQR - Quejas y Reclamos</a></li>
              <li><a href="/politicas" style={styles.link}>Terminos</a></li>
            </ul>
          </div>
        </div>
        <div style={styles.bottom}>
          <p style={styles.copyright}>&copy; {new Date().getFullYear()} ComunetMax. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #003D82 0%, #001F4D 100%)',
    color: '#fff',
    padding: '80px 0 40px',
    marginTop: 'auto',
  },
  inner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 64px',
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  brandLink: {
    display: 'inline-block',
    alignSelf: 'flex-start',
    lineHeight: 0,
  },
  brandLogo: {
    height: 90,
    width: 'auto',
    maxWidth: '100%',
    objectFit: 'contain',
    display: 'block',
  },
  text: {
    fontSize: 15,
    lineHeight: 1.6,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  socialLinks: {
    display: 'flex',
    gap: 16,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  heading: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 24,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--primary)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  link: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  bottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '32px 0',
    marginTop: 80,
    textAlign: 'center',
  },
  copyright: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.4)',
  },
}
