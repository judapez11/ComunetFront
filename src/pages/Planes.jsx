import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCoberturas } from '../api'
import { Icon } from '../components/Icon'

export default function Planes() {
  const navigate = useNavigate()
  const [coberturas, setCoberturas] = useState([])
  const [loading, setLoading] = useState(true)

  const getImage = (municipioId) => {
    try {
      return localStorage.getItem(`mun_img_${municipioId}`) || '/media/municipio-placeholder.svg'
    } catch {
      return '/media/municipio-placeholder.svg'
    }
  }

  useEffect(() => {
    getCoberturas()
      .then(setCoberturas)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Nuestros Planes</h1>
          <p>Selecciona tu municipio para ver los planes disponibles</p>
        </div>
      </div>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={styles.header}>
            {/*<h2 style={styles.title}>Municipios con cobertura</h2>*/}
            <div style={styles.underline} />
            <p style={styles.subtitle}>
              Haz clic en tu municipio para conocer los planes de internet que tenemos para ti.
            </p>
          </div>

          {loading && <div className="spinner" />}

          {!loading && coberturas.length === 0 && (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyTitle}>Aun no hay cobertura disponible</h3>
              <p style={styles.emptyDesc}>
                Estamos expandiendo nuestra red. Dejamos tus datos en{' '}
                <a href="/contacto">Contacto</a> y te avisaremos cuando lleguemos a tu zona.
              </p>
            </div>
          )}

          {!loading && coberturas.length > 0 && (
            <div style={styles.grid}>
              {coberturas.map((c) => (
                <button
                  key={c.id}
                  style={styles.card}
                  onClick={() => navigate(`/planes/${c.municipioId}`)}
                  className="card-hover"
                >
                  <div style={styles.imageWrapper}>
                    <img
                      src={getImage(c.municipioId)}
                      alt={c.nombreMunicipio}
                      style={styles.image}
                      onError={(e) => { e.target.src = '/media/municipio-placeholder.svg' }}
                    />
                    <div style={styles.techBadge}>
                      <Icon name="fiber" size={14} color="#fff" />
                      <span>{c.tecnologia?.replace('_', ' ')}</span>
                    </div>
                  </div>
                  <div style={styles.cardBody}>
                    <h3 style={styles.cardTitle}>{c.nombreMunicipio}</h3>
                    <p style={styles.cardDept}>{c.departamentoMunicipio}</p>
                    <div style={styles.cardAction}>
                      <span>Ver planes</span>
                      <Icon name="arrowLeft" size={16} color="var(--primary)" style={{ transform: 'rotate(180deg)' }} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

const styles = {
  header: {
    textAlign: 'center',
    marginBottom: 64,
  },
  title: {
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
    margin: '0 auto 24px',
    borderRadius: 4,
  },
  subtitle: {
    color: 'var(--text-light)',
    fontSize: 19,
    maxWidth: 560,
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 24,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    borderRadius: 12,
    border: '1px solid var(--border)',
    overflow: 'hidden',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'left',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: 'var(--shadow-sm)',
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    background: 'var(--primary-light)',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  techBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: 'var(--gradient-primary)',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    textTransform: 'uppercase',
  },
  cardBody: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: 'var(--text)',
    margin: 0,
  },
  cardDept: {
    fontSize: 15,
    color: 'var(--text-light)',
    margin: 0,
  },
  cardAction: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--primary-dark)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    maxWidth: 480,
    margin: '0 auto',
  },
  emptyIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 12,
    background: 'var(--bg-alt)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--text)',
    marginBottom: 12,
  },
  emptyDesc: {
    fontSize: 16,
    color: 'var(--text-light)',
    lineHeight: 1.7,
  },
}
