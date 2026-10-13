import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCoberturaByMunicipio, getPlanesByMunicipio, enviarContactoPlanes } from '../api'
import { Icon } from '../components/Icon'

export default function PlanesMunicipio() {
  const { municipioId } = useParams()
  const navigate = useNavigate()
  const [cobertura, setCobertura] = useState(null)
  const [planes, setPlanes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [planSeleccionado, setPlanSeleccionado] = useState(null)
  const [form, setForm] = useState({ nombre: '', correoElectronico: '', telefono: '', mensaje: '' })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)

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

  const abrirForm = (plan) => {
    setPlanSeleccionado(plan)
    setStatus(null)
    setForm({ nombre: '', correoElectronico: '', telefono: '', mensaje: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus(null)
    try {
      const msg = await enviarContactoPlanes({
        ...form,
        plan: planSeleccionado?.nombre,
        municipio: cobertura?.nombreMunicipio,
      })
      setStatus({ type: 'success', text: msg })
      setForm({ nombre: '', correoElectronico: '', telefono: '', mensaje: '' })
      setTimeout(() => { setPlanSeleccionado(null); setStatus(null) }, 2500)
    } catch (err) {
      const data = err.response?.data
      const text = typeof data === 'string' ? data : data?.mensaje || 'Error al enviar la solicitud'
      setStatus({ type: 'error', text })
    } finally {
      setSending(false)
    }
  }

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

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <button
            className="btn btn-outline"
            onClick={() => navigate('/planes')}
            style={{ marginBottom: 40, borderColor: 'var(--primary)', color: 'var(--primary-dark)' }}
          >
            <Icon name="arrowLeft" size={16} color="var(--primary-dark)" />
            Volver a municipios
          </button>

          {loading && <div className="spinner" />}

          {error && !loading && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIconWrap}><Icon name="network" size={48} color="var(--text-light)" /></div>
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
                  <div style={styles.emptyIconWrap}><Icon name="network" size={48} color="var(--text-light)" /></div>
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
                        <button
                          className="btn btn-primary"
                          style={{ width: '100%', justifyContent: 'center' }}
                          onClick={() => abrirForm(plan)}
                        >
                          Lo quiero
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {planSeleccionado && (
        <div style={overlay} onClick={() => setPlanSeleccionado(null)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} style={{ padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--secondary)' }}>Quiero este plan</h2>
                <button type="button" onClick={() => setPlanSeleccionado(null)} style={closeBtn}>✕</button>
              </div>

              <div style={{ ...formInfo }}>
                <span style={formInfoBadge}>{planSeleccionado.tipo || 'HOGAR'}</span>
                <div>
                  <strong style={{ fontSize: 18, color: 'var(--text)' }}>{planSeleccionado.nombre}</strong>
                  <div style={{ fontSize: 14, color: 'var(--text-light)' }}>
                    {planSeleccionado.velocidadMb} MB · {formatPrice(planSeleccionado.precio)}/mes · {cobertura?.nombreMunicipio || 'Tu municipio'}
                  </div>
                </div>
              </div>

              {status && <div className={`alert alert-${status.type}`}>{status.text}</div>}

              <div className="form-group">
                <label>Nombre *</label>
                <input name="nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required placeholder="Tu nombre" />
              </div>
              <div className="form-group">
                <label>Correo electronico *</label>
                <input name="correoElectronico" type="email" value={form.correoElectronico} onChange={(e) => setForm({ ...form, correoElectronico: e.target.value })} required placeholder="correo@ejemplo.com" />
              </div>
              <div className="form-group">
                <label>Telefono</label>
                <input name="telefono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="300 123 4567" />
              </div>
              <div className="form-group">
                <label>Mensaje (opcional)</label>
                <textarea name="mensaje" value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} placeholder="Cuentanos algo mas..." />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? 'Enviando...' : 'Enviar solicitud'}
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setPlanSeleccionado(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    gap: 24,
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
    background: 'rgba(121, 192, 250, 0.2)',
    color: 'var(--primary-dark)',
    padding: '6px 16px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--text)',
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

const overlay = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 200,
  padding: 20,
}

const modal = {
  background: '#fff',
  borderRadius: 12,
  width: '100%',
  maxWidth: 480,
  maxHeight: '90vh',
  overflow: 'auto',
  boxShadow: 'var(--shadow-lg)',
}

const closeBtn = {
  background: 'none',
  border: 'none',
  fontSize: 20,
  cursor: 'pointer',
  color: 'var(--text-light)',
  padding: 4,
}

const formInfo = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  padding: 16,
  background: 'var(--bg-alt)',
  borderRadius: 12,
  border: '1px solid var(--border)',
  marginBottom: 20,
}

const formInfoBadge = {
  display: 'inline-block',
  background: 'rgba(121, 192, 250, 0.2)',
  color: 'var(--primary-dark)',
  padding: '4px 12px',
  borderRadius: 12,
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  flexShrink: 0,
}
