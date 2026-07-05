import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCoberturaByMunicipio, getPlanesByMunicipio } from '../api'
import { Icon } from '../components/Icon'

export default function PlanesMunicipio() {
  const { municipioId } = useParams()
  const navigate = useNavigate()
  const [cobertura, setCobertura] = useState(null)
  const [planes, setPlanes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargar = async () => {
      setLoading(true)
      setError(null)
      try {
        const cov = await getCoberturaByMunicipio(municipioId)
        setCobertura(cov)
        const p = await getPlanesByMunicipio(municipioId)
        setPlanes(p)
      } catch {
        setError('No pudimos cargar la informacion de este municipio.')
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [municipioId])

  const formatPrice = (price) =>
    '$' + Math.round(price).toLocaleString('es-CO')

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Planes Disponibles</h1>
          <p>
            {cobertura
              ? `Internet ${cobertura.tecnologia?.replace('_', ' ')} en ${cobertura.nombreMunicipio}, ${cobertura.departamentoMunicipio}`
              : 'Consulta los planes de internet en tu zona'}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <button
            className="btn btn-outline"
            onClick={() => navigate('/planes')}
            style={{ marginBottom: 40 }}
          >
            <Icon name="arrowLeft" size={16} color="var(--primary)" />
            Volver a municipios
          </button>

          {loading && <div className="spinner" />}

          {error && !loading && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIconWrap}><Icon name="signal" size={48} color="var(--text-light)" /></div>
              <h3 style={styles.emptyTitle}>No hay cobertura disponible</h3>
              <p style={styles.emptyDesc}>
                Este municipio aun no tiene cobertura de Comunet.{' '}
                <Link to="/contacto">Contactanos</Link> para mas informacion.
              </p>
            </div>
          )}

          {!loading && !error && planes && (
            <>
              {planes.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIconWrap}><Icon name="signal" size={48} color="var(--text-light)" /></div>
                  <h3 style={styles.emptyTitle}>No hay planes activos</h3>
                  <p style={styles.emptyDesc}>
                    Actualmente no tenemos planes activos en este municipio.
                    Estamos trabajando para ofrecerte mas opciones.
                  </p>
                </div>
              ) : (
                <>
                  <div style={styles.resultInfo}>
                    {planes.length} plan{planes.length !== 1 ? 'es' : ''} disponible
                    {planes.length !== 1 ? 's' : ''} en{' '}
                    <strong>{cobertura?.nombreMunicipio}</strong>
                  </div>
                  <div style={styles.grid}>
                    {planes.map((plan) => (
                      <div key={plan.id} className="card" style={styles.planCard}>
                        <div style={styles.planBadge}>{plan.tipo || 'HOGAR'}</div>
                        <h3 style={styles.planTitle}>{plan.nombre}</h3>
                        <div style={styles.planSpeed}>
                          <span style={styles.speedValue}>{plan.velocidadMb}</span>
                          <span style={styles.speedUnit}>MB</span>
                        </div>
                        <p style={styles.planTech}>{plan.tecnologia?.replace('_', ' ')}</p>
                        <p style={styles.planDesc}>{plan.descripcion}</p>
                        <div style={styles.planPrice}>
                          <span style={styles.priceValue}>{formatPrice(plan.precio)}</span>
                          <span style={styles.priceUnit}>/mes</span>
                        </div>
                        <Link
                          to="/contacto"
                          className="btn btn-primary"
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          Lo quiero
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

const styles = {
  resultInfo: {
    textAlign: 'center',
    fontSize: 16,
    color: 'var(--text-light)',
    marginBottom: 40,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 32,
  },
  planCard: {
    textAlign: 'center',
    padding: '40px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  planBadge: {
    display: 'inline-block',
    background: 'var(--primary-light)',
    color: 'var(--primary)',
    padding: '6px 16px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--secondary)',
  },
  planSpeed: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 4,
    margin: '16px 0',
  },
  speedValue: {
    fontSize: 56,
    fontWeight: 800,
    background: 'var(--gradient-primary)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1,
  },
  speedUnit: {
    fontSize: 22,
    fontWeight: 600,
    color: 'var(--text-light)',
  },
  planTech: {
    fontSize: 13,
    color: 'var(--text-light)',
    fontWeight: 500,
  },
  planDesc: {
    fontSize: 14,
    color: 'var(--text-light)',
    lineHeight: 1.6,
    margin: '4px 0 16px',
  },
  planPrice: {
    margin: '12px 0 20px',
  },
  priceValue: {
    fontSize: 36,
    fontWeight: 800,
    color: 'var(--accent)',
  },
  priceUnit: {
    fontSize: 15,
    color: 'var(--text-light)',
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
    borderRadius: 22,
    background: 'var(--bg-alt)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--secondary)',
    marginBottom: 12,
  },
  emptyDesc: {
    fontSize: 16,
    color: 'var(--text-light)',
    lineHeight: 1.7,
  },
}
