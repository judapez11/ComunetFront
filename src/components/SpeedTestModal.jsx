import { useState } from 'react'
import { Icon } from '../components/Icon'

export default function SpeedTestModal({ isOpen, onClose }) {
  const [started, setStarted] = useState(false)

  if (!isOpen) return null

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.titleWrap}>
            <div style={styles.iconCircle}>
              <Icon name="gauge" size={24} color="var(--primary)" />
            </div>
            <div>
              <h2 style={styles.title}>Test de Velocidad</h2>
              <p style={styles.subtitle}>Medidor en tiempo real potenciado por Fast.com (Netflix)</p>
            </div>
          </div>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <div style={styles.body}>
          {!started ? (
            <div style={styles.startState}>
              <p style={styles.desc}>
                Comprueba la velocidad real de descarga, subida y latencia de tu conexion de fibra optica.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setStarted(true)}
                style={{ padding: '14px 32px' }}
              >
                <Icon name="gauge" size={20} color="var(--primary-dark)" />
                Iniciar Medicion
              </button>
            </div>
          ) : (
            <div style={styles.frameWrapper}>
              <iframe
                src="https://fast.com"
                title="Speed Test Fast.com"
                style={styles.iframe}
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div style={styles.footer}>
          <span style={styles.tipText}>
            Consejo: Para una medicion optima, realiza el test conectado por cable o cerca de tu router Wi-Fi.
          </span>
          {started && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setStarted(false)}
              style={{ color: 'var(--text)', borderColor: 'var(--border)' }}
            >
              Reiniciar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(10, 25, 41, 0.6)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: 20,
  },
  modal: {
    background: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 680,
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
    animation: 'fadeInUp 0.3s ease-out',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-alt)',
  },
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)',
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--text)',
    margin: 0,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 13,
    color: 'var(--text-light)',
    margin: '2px 0 0',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: 22,
    color: 'var(--text-light)',
    cursor: 'pointer',
    padding: 8,
    borderRadius: 8,
    lineHeight: 1,
  },
  body: {
    padding: 20,
    minHeight: 380,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
  },
  startState: {
    textAlign: 'center',
    maxWidth: 420,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    padding: '40px 20px',
  },
  desc: {
    fontSize: 16,
    color: 'var(--text-light)',
    lineHeight: 1.6,
  },
  frameWrapper: {
    width: '100%',
    height: 420,
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid var(--border)',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  footer: {
    padding: '14px 24px',
    borderTop: '1px solid var(--border)',
    background: 'var(--bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    flexWrap: 'wrap',
  },
  tipText: {
    fontSize: 12,
    color: 'var(--text-light)',
    flex: 1,
  },
}
