import { useState } from 'react'
import { enviarContacto } from '../api'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', apellidos: '', telefono: '', correoElectronico: '', mensaje: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const msg = await enviarContacto(form)
      setStatus({ type: 'success', text: msg })
      setForm({ nombre: '', apellidos: '', telefono: '', correoElectronico: '', mensaje: '' })
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
          <h1>Contacto</h1>
          <p>Estamos aquí para ayudarte</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={styles.grid}>
            <div>
              <h2 style={styles.title}>Escríbenos</h2>
              <p style={styles.desc}>
                ¿Tienes alguna pregunta o quieres contratar nuestros servicios? Déjanos tus datos
                y te contactaremos a la brevedad.
              </p>

              {status && (
                <div className={`alert alert-${status.type}`}>
                  {status.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Nombre *</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre" />
                  </div>
                  <div className="form-group">
                    <label>Apellidos</label>
                    <input name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Tus apellidos" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="300 123 4567" />
                  </div>
                  <div className="form-group">
                    <label>Correo electrónico *</label>
                    <input name="correoElectronico" type="email" value={form.correoElectronico} onChange={handleChange} required placeholder="correo@ejemplo.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Mensaje *</label>
                  <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required placeholder="Escribe tu mensaje aquí..." />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>

            <div style={styles.info}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Información de contacto</h3>
              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>📍</span>
                <div>
                  <strong>Dirección</strong>
                  <p style={styles.infoText}>Cra 42 # 10-25, Medellín, Colombia</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>📞</span>
                <div>
                  <strong>Teléfono</strong>
                  <p style={styles.infoText}>+57 300 123 4567</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>✉️</span>
                <div>
                  <strong>Email</strong>
                  <p style={styles.infoText}>info@comunetmax.com</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoIcon}>🕐</span>
                <div>
                  <strong>Horario</strong>
                  <p style={styles.infoText}>Lun - Vie: 8:00 AM - 6:00 PM<br/>Sáb: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: 60,
    alignItems: 'start',
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--secondary)',
    marginBottom: 12,
  },
  desc: {
    color: 'var(--text-light)',
    fontSize: 16,
    marginBottom: 28,
    lineHeight: 1.7,
  },
  info: {
    background: 'var(--bg-alt)',
    padding: 32,
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
  },
  infoItem: {
    display: 'flex',
    gap: 14,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 22,
    lineHeight: 1,
  },
  infoText: {
    color: 'var(--text-light)',
    fontSize: 14,
    marginTop: 2,
  },
}
