import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import Carousel from '../components/Carousel'

const features = [
  { title: 'Alta Velocidad', desc: 'Descargas y subidas ultra rapidas sin interrupciones con red de ultima generacion.' },
  { title: 'Conexion Estable', desc: 'Estabilidad garantizada 24/7 gracias a infraestructura de fibra redundante.' },
  { title: 'Cobertura Amplia', desc: 'Llegamos a donde otros no, expandiendo nuestra red para conectarte siempre.' },
  { title: 'Soporte Tecnico', desc: 'Atencion personalizada y rapida solucion con nuestro equipo experto disponible.' },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container" style={styles.heroInner}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Internet de Fibra Optica <br/>para tu <span style={styles.heroHighlight}>Hogar y Empresa</span>
            </h1>
            <div style={styles.heroCta}>
              <Link to="/planes" className="btn btn-accent">
                Ver Planes
              </Link>
              <Link to="/contacto" className="btn btn-outline">
                Contactanos
              </Link>
            </div>
          </div>
          <div style={styles.heroVisual}>
            <div style={styles.videoPlaceholder}>
              <div style={styles.videoOverlay} />
              <Icon name="fiber" size={56} color="#fff" style={{ marginBottom: 16 }} />
              <div style={styles.videoTitle}>Video de Fibra Optica</div>
              <p style={styles.videoDesc}>Navegacion de alta velocidad</p>
            </div>
          </div>
        </div>
        <div style={styles.heroDecorative} />
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: '#fff', paddingTop: 40, paddingBottom: 10 }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 className="section-title">Por que elegirnos?</h2>
            <div style={styles.underline} />
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="card feature-card">
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrusel multimedia */}
      <section className="section section-alt" style={{ background: '#fff', paddingBottom: 90 }}>
        <div className="container">

          <Carousel
            height={420}
            slides={[
              {
                src: '/media/municipio-placeholder.svg',
                title: 'Instalacion de Fibra Optica',
                desc: 'Tecnologia de ultima generacion en tu hogar',
              },
              {
                gradient: 'linear-gradient(135deg, #5BA8F7 0%, #003D82 100%)',
                title: 'Red en Expansion',
                desc: 'Llegamos a mas municipios de Colombia',
              },
              {
                gradient: 'linear-gradient(135deg, #003D82 0%, #001F4D 100%)',
                title: 'Soporte 24/7',
                desc: 'Estamos contigo cuando nos necesitas',
              },
              {
                src: '/media/municipio-placeholder.svg',
                title: 'Velocidad Simetrica',
                desc: 'Navegacion real de 300MB a 900MB',
              },
            ]}
          />
        </div>
      </section>

      {/* Estamos a tu servicio Section */}
      <section className="section section-alt" style={{ paddingTop: 40, paddingBottom: 70 }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 className="section-title">Estamos a tu servicio</h2>
            <p style={styles.serviceDesc}>Soluciones rapidas al alcance de un clic</p>
          </div>
          <div className="service-grid" style={styles.serviceGrid}>
            <div className="service-img" style={styles.serviceImageWrap}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvLHvCV_TM6tNANpekXESl-OUyBtPr0plfi7vkdlNPwRnS_3a1N7X2NRQRUXyP2T6mYzJvS-5sadrOwP0dAs9dPoMu__pP0ghYSyMzY4iNOOt63FB1AYROXEooC1zECnEFN5lP5RllgOqi_nTxaWk7F8mDbn-wXtbLld5Vj7JzaVry5Mric-NozfRY7ojVlAHOtXWxsJKSjos3TXxEfnr41xIbmkORhi_ORdCGrkM16qNzKkEv_eAZ"
                alt="Servicio al cliente"
                style={styles.serviceImage}
              />
            </div>
            <div style={styles.serviceContent}>
              <div style={styles.serviceRow}>
                <a href="https://wa.me/573152396188" target="_blank" rel="noopener noreferrer" style={styles.whatsappCard}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span style={styles.whatsappLabel}>WhatsApp</span>
                </a>
              </div>
              <div style={styles.phonesWrap}>
                <div style={styles.phoneItem}>
                  <span style={styles.phoneLabel}>Linea nacional</span>
                  <span style={styles.phoneValue}>01 8000 930 141</span>
                </div>
                <div style={styles.phoneItem}>
                  <span style={styles.phoneLabel}>Telefono</span>
                  <span style={styles.phoneValue}>+57 315 239 6188</span>
                </div>
              </div>
              <Link to="/contacto" style={styles.contactCard}>
                <Icon name="mail" size={32} color="var(--secondary)" />
                <h4 style={styles.contactTitle}>Escribenos - Formulario de Contacto</h4>
                <p style={styles.contactDesc}>Atencion personalizada inmediata</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section" style={{ background: '#fff', paddingTop: 40, paddingBottom: 80 }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 className="section-title">Encuentranos en nuestra sede</h2>
            <div style={styles.underline} />
          </div>
          <div style={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31854.44444444444!2d-76.2000000!3d4.0833333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e39063939393939%3A0x3939393939393939!2zVHVsdcOhLCBWYWxsZSBkZWwgQ2F1Y2EsIENvbG9tYmlh!5e0!3m2!1ses!2sco!4v1710000000000!5m2!1ses!2sco"
              width="100%"
              height="450"
                style={{ border: 0, borderRadius: 12 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicacion ComunetMax"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-alt">
        <div className="container">
          <div style={styles.ctaCard}>
            <h2 className="section-title">Listo para navegar sin limites?</h2>
            <p style={styles.ctaDesc}>
              Unete a la red mas estable. Sin letras pequeñas y con el mejor respaldo del mercado.
            </p>
            <Link to="/planes" className="btn btn-primary" style={{ fontSize: 18, padding: '20px 48px' }}>
              Ver Planes Disponibles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #5BA8F7 0%, #003D82 100%)',
    minHeight: 580,
    marginTop: -120,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    color: '#fff',
  },
  heroInner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    alignItems: 'center',
    padding: '170px 0 60px',
    position: 'relative',
    zIndex: 1,
  },
  heroContent: {},
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    padding: '6px 14px',
    borderRadius: 9999,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.04em',
    color: '#fff',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 56,
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.1,
    marginBottom: 24,
    letterSpacing: '-0.02em',
  },
  heroHighlight: {
    color: '#fff',
  },
  heroDesc: {
    fontSize: 19,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.7,
    marginBottom: 32,
    maxWidth: 500,
  },
  heroCta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
  },
  heroVisual: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  videoPlaceholder: {
    width: '100%',
    maxWidth: 400,
    aspectRatio: '16/9',
    borderRadius: 12,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
    visibility: 'hidden',
  },
  videoOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(255, 255, 255, 0.05)',
    opacity: 0,
    transition: 'opacity 0.5s',
  },
  videoTitle: {
    fontWeight: 700,
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  videoDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 8,
  },
  heroDecorative: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    transform: 'translate(50%, 50%)',
    pointerEvents: 'none',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: 64,
  },
  underline: {
    height: 4,
    width: 80,
    background: 'var(--primary)',
    margin: '16px auto 0',
    borderRadius: 4,
  },
  featureIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: 'rgba(121, 192, 250, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
    color: 'var(--text)',
  },
  featureDesc: {
    fontSize: 15,
    color: 'var(--text-light)',
    lineHeight: 1.6,
  },
  serviceGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    alignItems: 'center',
  },
  serviceImageWrap: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  serviceContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  serviceRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  whatsappCard: {
    background: '#25D366',
    padding: '16px 32px',
    borderRadius: 12,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    color: '#fff',
    fontWeight: 700,
    fontSize: 16,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
    minWidth: 250,
  },
  whatsappLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
  },
  phonesWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '16px 24px',
    background: '#fff',
    borderRadius: 12,
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border)',
  },
  phoneItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
  },
  phoneLabel: {
    fontSize: 14,
    color: 'var(--text-light)',
    fontWeight: 500,
  },
  phoneValue: {
    fontSize: 15,
    color: 'var(--text)',
    fontWeight: 600,
  },
  serviceDesc: {
    color: 'var(--text-light)',
    fontSize: 17,
    marginBottom: 0,
  },
  contactCard: {
    background: 'rgba(121, 192, 250, 0.1)',
    border: '1px solid rgba(121, 192, 250, 0.2)',
    padding: 32,
    borderRadius: 16,
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  contactTitle: {
    fontWeight: 700,
    fontSize: 18,
    color: 'var(--secondary)',
    textTransform: 'uppercase',
  },
  contactDesc: {
    fontSize: 14,
    color: 'var(--text-light)',
  },
  mapWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border)',
  },
  ctaCard: {
    background: 'var(--bg-alt)',
    borderRadius: 12,
    padding: '64px 48px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
  },
  ctaDesc: {
    fontSize: 19,
    color: 'var(--text-light)',
    maxWidth: 600,
    margin: '0 auto 40px',
    lineHeight: 1.7,
  },
}
