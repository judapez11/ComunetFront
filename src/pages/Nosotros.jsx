import { Icon } from '../components/Icon'

export default function Nosotros() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Mision y Vision</h1>
          <p>Conoce quienes somos y hacia donde vamos</p>
        </div>
      </div>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="mv-grid">
            <div className="card mv-card">
              <h2 style={styles.cardTitle}>Mision</h2>
              <p style={styles.cardText}>
                Brindar soluciones de conectividad de alta calidad mediante tecnologia de fibra optica,
                garantizando acceso a internet rapido, estable y confiable a hogares y empresas en
                Colombia. Nos comprometemos con la satisfaccion de nuestros clientes, la innovacion
                constante y un servicio tecnico excepcional.
              </p>
            </div>

            <div className="card mv-card">
              <h2 style={styles.cardTitle}>Vision</h2>
              <p style={styles.cardText}>
                Ser el proveedor de internet lider en Colombia, reconocido por la excelencia de nuestro
                servicio, la expansion continua de nuestra red y el impacto positivo en las comunidades
                que atendemos. Aspiramos a cerrar la brecha digital llevando conectividad de calidad
                a cada rincon del pais.
              </p>
            </div>
          </div>

          <div className="card" style={styles.valuesCard}>
            <h2 style={styles.valuesTitle}>Nuestros Valores</h2>
            <div style={styles.underline} />
            <div className="values-grid">
              {[
                { title: 'Compromiso', desc: 'Con la calidad del servicio y la satisfaccion de nuestros clientes.' },
                { title: 'Innovacion', desc: 'Buscamos constantemente mejorar nuestra tecnologia y procesos.' },
                { title: 'Servicio', desc: 'Atencion personalizada y cercana para cada usuario.' },
                { title: 'Conectividad', desc: 'Trabajamos para llevar internet de calidad a todos.' },
              ].map((v) => (
                <div key={v.title} style={styles.valueItem}>
                  <h3 style={styles.valueTitle}>{v.title}</h3>
                  <p style={styles.valueDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 12,
    background: 'rgba(121, 192, 250, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: 'var(--text)',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    color: 'var(--text-light)',
    lineHeight: 1.8,
    textAlign: 'center',
  },
  valuesCard: {
    marginTop: 48,
    padding: '48px 40px',
    textAlign: 'center',
  },
  valuesTitle: {
    fontSize: 42,
    fontWeight: 800,
    color: 'var(--text)',
    marginBottom: 16,
    letterSpacing: '-0.01em',
  },
  underline: {
    height: 4,
    width: 80,
    background: 'var(--primary)',
    margin: '0 auto 40px',
    borderRadius: 4,
  },
  valueItem: {
    textAlign: 'center',
    padding: '24px',
  },
  valueIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: 'rgba(121, 192, 250, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text)',
    marginBottom: 8,
  },
  valueDesc: {
    fontSize: 14,
    color: 'var(--text-light)',
    lineHeight: 1.7,
  },
}
