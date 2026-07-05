import { Link } from 'react-router-dom'

const features = [
  { icon: '🚀', title: 'Alta Velocidad', desc: 'Hasta 900 MB de descarga real para que navegues sin límites.' },
  { icon: '🔒', title: 'Conexión Estable', desc: 'Fibra óptica directa a tu hogar con la máxima estabilidad.' },
  { icon: '📡', title: 'Cobertura Amplia', desc: 'Llegamos a más municipios de Colombia con nuestra red.' },
  { icon: '💻', title: 'Soporte Técnico', desc: 'Atención personalizada 24/7 para resolver cualquier inconveniente.' },
]

export default function Home() {
  return (
    <>
      <section style={styles.hero}>
        <div className="container" style={styles.heroInner}>
          <div style={styles.heroContent}>
            <span style={styles.badge}>Fibra Óptica</span>
            <h1 style={styles.heroTitle}>
              La mejor conexión para tu hogar y empresa
            </h1>
            <p style={styles.heroDesc}>
              Disfruta de internet de alta velocidad con fibra óptica. Planes desde
              <strong style={{ color: '#fff' }}> 300 MB</strong> hasta
              <strong style={{ color: '#fff' }}> 900 MB</strong> con la mejor estabilidad.
            </p>
            <div style={styles.heroCta}>
              <Link to="/planes" className="btn btn-accent">
                Ver Planes
              </Link>
              <Link to="/contacto" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                Contáctanos
              </Link>
            </div>
          </div>
          <div style={styles.heroVisual}>
            <div style={styles.heroGraphic}>
              <span style={{ fontSize: 120 }}>🌐</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">¿Por qué elegirnos?</h2>
          <p className="section-subtitle">
            Somos tu mejor opción en conectividad con tecnología de punta y atención de calidad.
          </p>
          <div style={styles.features}>
            {features.map((f) => (
              <div key={f.title} className="card" style={styles.featureCard}>
                <span style={styles.featureIcon}>{f.icon}</span>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">¿Listo para navegar sin límites?</h2>
          <p className="section-subtitle">
            Elige el plan que mejor se adapte a ti y únete a la red de fibra óptica más confiable.
          </p>
          <Link to="/planes" className="btn btn-primary" style={{ fontSize: 18, padding: '16px 40px' }}>
            Ver Planes Disponibles
          </Link>
        </div>
      </section>
    </>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
    padding: '100px 0 80px',
    overflow: 'hidden',
  },
  heroInner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 60,
    alignItems: 'center',
  },
  heroContent: {},
  badge: {
    display: 'inline-block',
    background: 'rgba(0,212,170,0.15)',
    color: 'var(--accent)',
    padding: '6px 16px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.15,
    marginBottom: 20,
  },
  heroDesc: {
    fontSize: 18,
    color: '#94a3b8',
    lineHeight: 1.7,
    marginBottom: 32,
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
    width: 280,
    height: 280,
    borderRadius: '50%',
    background: 'rgba(0,212,170,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(0,212,170,0.15)',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 24,
  },
  featureCard: {
    textAlign: 'center',
    padding: '36px 24px',
  },
  featureIcon: {
    fontSize: 40,
    display: 'block',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 8,
    color: 'var(--secondary)',
  },
  featureDesc: {
    fontSize: 14,
    color: 'var(--text-light)',
    lineHeight: 1.6,
  },
}
