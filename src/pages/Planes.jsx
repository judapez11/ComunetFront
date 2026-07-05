import { useState, useEffect } from 'react'
import { getMunicipios, getPlanesByMunicipio } from '../api'

export default function Planes() {
  const [municipios, setMunicipios] = useState([])
  const [municipioId, setMunicipioId] = useState('')
  const [loadingMun, setLoadingMun] = useState(true)
  const [planes, setPlanes] = useState(null)
  const [loadingPlanes, setLoadingPlanes] = useState(false)

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .catch(() => {})
      .finally(() => setLoadingMun(false))
  }, [])

  const handleSearch = async () => {
    if (!municipioId) return
    setLoadingPlanes(true)
    setPlanes(null)
    setError(null)
    try {
      const data = await getPlanesByMunicipio(municipioId)
      setPlanes(data)
    } catch {
      setPlanes([])
    } finally {
      setLoadingPlanes(false)
    }
  }

  const formatPrice = (price) =>
    '$' + Math.round(price).toLocaleString('es-CO')

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Nuestros Planes</h1>
          <p>Selecciona tu municipio para ver los planes disponibles</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={styles.selector}>
            <h2 style={styles.selectorTitle}>¿Dónde vives?</h2>
            <p style={styles.selectorDesc}>
              Elige tu municipio para consultar los planes de internet disponibles en tu zona.
            </p>
            <div style={styles.searchBox}>
              <select
                value={municipioId}
                onChange={(e) => setMunicipioId(e.target.value)}
                style={styles.select}
                disabled={loadingMun}
              >
                <option value="">
                  {loadingMun ? 'Cargando...' : 'Selecciona un municipio'}
                </option>
                {municipios.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre} - {m.departamento}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                onClick={handleSearch}
                disabled={!municipioId || loadingPlanes}
              >
                {loadingPlanes ? 'Buscando...' : 'Consultar'}
              </button>
            </div>
          </div>

          {loadingPlanes && <div className="spinner" />}

          {planes !== null && !loadingPlanes && (
            <>
              {planes.length === 0 ? (
                <div style={styles.emptyState}>
                  <span style={styles.emptyIcon}>📡</span>
                  <h3 style={styles.emptyTitle}>No hay cobertura disponible aún</h3>
                  <p style={styles.emptyDesc}>
                    Actualmente no tenemos planes disponibles en este municipio.
                    Estamos trabajando para expandir nuestra red. Déjanos tus datos en{' '}
                    <a href="/contacto">Contacto</a> y te avisaremos cuando lleguemos.
                  </p>
                </div>
              ) : (
                <>
                  <div style={styles.resultInfo}>
                    {planes.length} plan{planes.length !== 1 ? 'es' : ''} disponible
                    {planes.length !== 1 ? 's' : ''} en{' '}
                    <strong>{municipios.find((m) => m.id === Number(municipioId))?.nombre}</strong>
                  </div>
                  <div style={styles.grid}>
                    {planes.map((plan) => (
                      <div key={plan.id} className="card" style={styles.card}>
                        <div style={styles.cardBadge}>{plan.tipo || 'HOGAR'}</div>
                        <h3 style={styles.cardTitle}>{plan.nombre}</h3>
                        <div style={styles.cardSpeed}>
                          <span style={styles.speedValue}>{plan.velocidadMb}</span>
                          <span style={styles.speedUnit}>MB</span>
                        </div>
                        <p style={styles.cardTech}>{plan.tecnologia?.replace('_', ' ')}</p>
                        <p style={styles.cardDesc}>{plan.descripcion}</p>
                        <div style={styles.cardPrice}>
                          <span style={styles.priceValue}>{formatPrice(plan.precio)}</span>
                          <span style={styles.priceUnit}>/mes</span>
                        </div>
                        <a href="/contacto" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                          Lo quiero
                        </a>
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
  selector: {
    maxWidth: 560,
    margin: '0 auto',
    textAlign: 'center',
    marginBottom: 48,
  },
  selectorTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--secondary)',
    marginBottom: 8,
  },
  selectorDesc: {
    color: 'var(--text-light)',
    fontSize: 15,
    marginBottom: 24,
  },
  searchBox: {
    display: 'flex',
    gap: 12,
  },
  select: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: 8,
    border: '2px solid var(--border)',
    fontSize: 15,
    fontFamily: 'inherit',
    background: '#fff',
  },
  resultInfo: {
    textAlign: 'center',
    fontSize: 15,
    color: 'var(--text-light)',
    marginBottom: 32,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 28,
  },
  card: {
    textAlign: 'center',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  cardBadge: {
    display: 'inline-block',
    background: 'var(--primary-light)',
    color: 'var(--primary)',
    padding: '4px 14px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: 'var(--secondary)',
  },
  cardSpeed: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 4,
    margin: '12px 0',
  },
  speedValue: {
    fontSize: 48,
    fontWeight: 800,
    color: 'var(--primary)',
    lineHeight: 1,
  },
  speedUnit: {
    fontSize: 20,
    fontWeight: 600,
    color: 'var(--text-light)',
  },
  cardTech: {
    fontSize: 13,
    color: 'var(--text-light)',
    fontWeight: 500,
  },
  cardDesc: {
    fontSize: 14,
    color: 'var(--text-light)',
    lineHeight: 1.5,
    margin: '4px 0 12px',
  },
  cardPrice: {
    margin: '8px 0 16px',
  },
  priceValue: {
    fontSize: 32,
    fontWeight: 800,
    color: 'var(--accent)',
  },
  priceUnit: {
    fontSize: 14,
    color: 'var(--text-light)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    maxWidth: 480,
    margin: '0 auto',
  },
  emptyIcon: {
    fontSize: 56,
    display: 'block',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: 'var(--secondary)',
    marginBottom: 12,
  },
  emptyDesc: {
    fontSize: 15,
    color: 'var(--text-light)',
    lineHeight: 1.7,
  },
}
