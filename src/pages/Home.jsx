import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

const features = [
  { icon: 'speed', title: 'Alta Velocidad', desc: 'Hasta 900 MB de descarga real para que navegues sin limites.' },
  { icon: 'shield', title: 'Conexion Estable', desc: 'Fibra optica directa a tu hogar con la maxima estabilidad.' },
  { icon: 'signal', title: 'Cobertura Amplia', desc: 'Llegamos a mas municipios de Colombia con nuestra red.' },
  { icon: 'headset', title: 'Soporte Tecnico', desc: 'Atencion personalizada 24/7 para resolver cualquier inconveniente.' },
]

export default function Home() {
  return (
    <>
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div className="container" style={styles.heroInner}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              La mejor conexion para tu{' '}
              <span style={styles.heroHighlight}>hogar y empresa</span>
            </h1>
            <p style={styles.heroDesc}>
              Disfruta de internet de alta velocidad con fibra optica. Planes desde
              <strong style={{ color: '#fff' }}> 300 MB</strong> hasta
              <strong style={{ color: '#fff' }}> 900 MB</strong> con la mejor estabilidad.
            </p>
            <div style={styles.heroCta}>
              <Link to="/planes" className="btn btn-accent">
                Ver Planes
              </Link>
              <Link to="/contacto" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                Contactanos
              </Link>
            </div>
          </div>
          <div style={styles.heroVisual}>
            <div style={styles.heroGraphic}>
              <div style={styles.heroGraphicInner}>
                <Icon name="fiber" size={100} color="var(--accent)" />
              </div>
              <div style={styles.heroGraphicRing} />
              <div style={styles.heroGraphicRing2} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Por que elegirnos?</h2>
          <p className="section-subtitle">
            Somos tu mejor opcion en conectividad con tecnologia de punta y atencion de calidad.
          </p>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="card feature-card">
                <div style={styles.featureIconWrap}>
                  <Icon name={f.icon} size={32} color="var(--primary)" />
                </div>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Listo para navegar sin limites?</h2>
          <p className="section-subtitle">
            Elige el plan que mejor se adapte a ti y unete a la red de fibra optica mas confiable.
          </p>
          <Link to="/planes" className="btn btn-primary" style={{ fontSize: 18, padding: '18px 48px' }}>
            Ver Planes Disponibles
          </Link>
        </div>
      </section>
    </>
  )
}

const styles = {
  hero: {
    background: 'var(--gradient-hero)',
    padding: '120px 0 100px',
    overflow: 'hidden',
    position: 'relative',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 70% 50%, rgba(1, 157, 244, 0.15) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  heroInner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 80,
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  heroContent: {},
  heroTitle: {
    fontSize: 56,
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.1,
    marginBottom: 24,
    letterSpacing: '-0.02em',
  },
  heroHighlight: {
    background: 'var(--gradient-primary)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDesc: {
    fontSize: 19,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 1.7,
    marginBottom: 40,
  },
  heroCta: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
  },
  heroVisual: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroGraphic: {
    width: 360,
    height: 360,
    borderRadius: '50%',
    background: 'rgba(1, 157, 244, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(1, 157, 244, 0.15)',
    position: 'relative',
  },
  heroGraphicInner: {
    width: 240,
    height: 240,
    borderRadius: '50%',
    background: 'rgba(1, 157, 244, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(1, 157, 244, 0.2)',
  },
  heroGraphicRing: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: '50%',
    border: '1px solid rgba(1, 157, 244, 0.1)',
    animation: 'pulse 3s ease-in-out infinite',
  },
  heroGraphicRing2: {
    position: 'absolute',
    top: -40,
    left: -40,
    right: -40,
    bottom: -40,
    borderRadius: '50%',
    border: '1px solid rgba(1, 157, 244, 0.08)',
    animation: 'pulse 3s ease-in-out infinite 1s',
  },
  featureIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    background: 'var(--primary-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    transition: 'all 0.3s ease',
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
    color: 'var(--secondary)',
  },
  featureDesc: {
    fontSize: 15,
    color: 'var(--text-light)',
    lineHeight: 1.7,
  },
}

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.05); opacity: 1; }
    }
    @media (max-width: 768px) {
      .hero-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
      .hero-visual { display: none !important; }
    }
  `
  document.head.appendChild(style)
}
