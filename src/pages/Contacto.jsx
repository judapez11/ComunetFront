import { useState } from 'react'
import { enviarContacto } from '../api'
import { Icon } from '../components/Icon'

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
          <p>Estamos aqui para ayudarte</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contacto-grid">
            <div>
              <h2 style={styles.title}>Escribenos</h2>
              <p style={styles.desc}>
                Tienes alguna pregunta o quieres contratar nuestros servicios? Dejamos tus datos
                y te contactaremos a la brevedad.
              </p>

              {status && (
                <div className={`alert alert-${status.type}`}>
                  {status.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre *</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre" />
                  </div>
                  <div className="form-group">
                    <label>Apellidos</label>
                    <input name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Tus apellidos" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Telefono</label>
                    <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="300 123 4567" />
                  </div>
                  <div className="form-group">
                    <label>Correo electronico *</label>
                    <input name="correoElectronico" type="email" value={form.correoElectronico} onChange={handleChange} required placeholder="correo@ejemplo.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Mensaje *</label>
                  <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required placeholder="Escribe tu mensaje aqui..." />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>

            <div style={styles.info}>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Informacion de contacto</h3>
              <div style={styles.infoItem}>
                <div style={styles.infoIconWrap}><Icon name="pin" size={22} color="var(--primary)" /></div>
                <div>
                  <strong>Direccion</strong>
                  <p style={styles.infoText}>Calle 5 #3-40, Centro San Pedro, Valle del Cauca</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoIconWrap}><Icon name="phone" size={22} color="var(--primary)" /></div>
                <div>
                  <strong>WhatsApp</strong>
                  <p style={styles.infoText}>+57 315 239 6188</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoIconWrap}><Icon name="mail" size={22} color="var(--primary)" /></div>
                <div>
                  <strong>Email</strong>
                  <p style={styles.infoText}>info@comunetmax.com</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoIconWrap}><Icon name="clock" size={22} color="var(--primary)" /></div>
                <div>
                  <strong>Horario</strong>
                  <p style={styles.infoText}>Lun - Vie: 8:00 AM - 6:00 PM<br/>Sab: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.mapSection}>
            <h3 style={styles.mapTitle}>Nuestra Ubicacion</h3>
            <p style={styles.mapDesc}>Visitanos en nuestro punto de atencion en San Pedro, Valle del Cauca</p>
            <div style={styles.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.5!2d-76.25!3d4.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTUnMDAuMCJOIDc2wrAxNScwMC4wIlc!5e0!3m2!1ses!2sco!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: 16 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicacion ComunetMax"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: 'var(--secondary)',
    marginBottom: 16,
  },
  desc: {
    color: 'var(--text-light)',
    fontSize: 17,
    marginBottom: 32,
    lineHeight: 1.7,
  },
  info: {
    background: 'var(--gradient-card)',
    padding: 36,
    borderRadius: 20,
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)',
  },
  infoItem: {
    display: 'flex',
    gap: 16,
    marginBottom: 28,
    alignItems: 'flex-start',
  },
  infoIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: 'var(--primary-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoText: {
    color: 'var(--text-light)',
    fontSize: 15,
    marginTop: 4,
    lineHeight: 1.5,
  },
  mapSection: {
    marginTop: 80,
    textAlign: 'center',
  },
  mapTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: 'var(--secondary)',
    marginBottom: 12,
  },
  mapDesc: {
    color: 'var(--text-light)',
    fontSize: 17,
    marginBottom: 40,
  },
  mapWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border)',
  },
}
