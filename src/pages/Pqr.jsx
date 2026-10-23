import { useState } from 'react'
import { enviarContactoPqr } from '../api'
import { Icon } from '../components/Icon'

export default function Pqr() {
  const [form, setForm] = useState({
    nombre: '',
    correoElectronico: '',
    telefono: '',
    tipo: 'QUEJA',
    asunto: '',
    mensaje: '',
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const msg = await enviarContactoPqr(form)
      setStatus({ type: 'success', text: msg })
      setForm({ nombre: '', correoElectronico: '', telefono: '', tipo: 'QUEJA', asunto: '', mensaje: '' })
    } catch (err) {
      const data = err.response?.data
      const text = typeof data === 'string' ? data : data?.mensaje || 'Error al enviar el mensaje'
      setStatus({ type: 'error', text })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>PQR</h1>
          <p>Quejas, sugerencias y reclamos</p>
        </div>
      </div>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={styles.wrap}>
            <h2 style={styles.title}>Cuentanos tu caso</h2>
            <p style={styles.desc}>
              Responderemos tu peticion a la brevedad. Todos los campos marcados con * son obligatorios.
            </p>

            {status && (
              <div className={`alert alert-${status.type}`}>{status.text}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo *</label>
                  <select name="tipo" value={form.tipo} onChange={handleChange} required>
                    <option value="QUEJA">Queja</option>
                    <option value="SUGERENCIA">Sugerencia</option>
                    <option value="RECLAMO">Reclamo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Asunto *</label>
                  <input name="asunto" value={form.asunto} onChange={handleChange} required placeholder="Ej: Problemas con mi conexion" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre" />
                </div>
                <div className="form-group">
                  <label>Correo electronico *</label>
                  <input name="correoElectronico" type="email" value={form.correoElectronico} onChange={handleChange} required placeholder="correo@ejemplo.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Telefono</label>
                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="300 123 4567" />
              </div>
              <div className="form-group">
                <label>Detalle *</label>
                <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required placeholder="Describe tu queja, sugerencia o reclamo..." />
              </div>
              <div style={{ marginBottom: 24, fontSize: 13, color: 'var(--text-light)' }}>
                <span>Tus datos estan protegidos segun nuestra politica de privacidad.</span>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar PQR'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  wrap: {
    maxWidth: 720,
    margin: '0 auto',
  },
  title: {
    fontSize: 42,
    fontWeight: 800,
    color: 'var(--text)',
    marginBottom: 12,
    letterSpacing: '-0.01em',
  },
  desc: {
    color: 'var(--text-light)',
    fontSize: 17,
    marginBottom: 32,
    lineHeight: 1.7,
  },
}
