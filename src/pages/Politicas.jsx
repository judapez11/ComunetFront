import { Icon } from '../components/Icon'

export default function Politicas() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Politicas de Uso</h1>
          <p>Condiciones y politicas del servicio ComunetMax</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={styles.content}>
            <div className="card" style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIconWrap}>
                  <Icon name="doc" size={24} color="var(--primary)" />
                </div>
                <h2 style={styles.sectionTitle}>Terminos y Condiciones</h2>
              </div>
              <p style={styles.sectionText}>
                Al contratar nuestros servicios de internet por fibra optica, el usuario acepta los
                terminos y condiciones establecidos por ComunetMax. El servicio se presta bajo las
                modalidades de plan mensual con renovacion automatica. La instalacion del servicio
                corre por cuenta de ComunetMax en las zonas de cobertura activa.
              </p>
            </div>

            <div className="card" style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIconWrap}>
                  <Icon name="shield" size={24} color="var(--primary)" />
                </div>
                <h2 style={styles.sectionTitle}>Politica de Privacidad</h2>
              </div>
              <p style={styles.sectionText}>
                ComunetMax se compromete a proteger la informacion personal de sus usuarios. Los datos
                recopilados son utilizados exclusivamente para la prestacion del servicio, facturacion
                y comunicacion. No compartimos informacion personal con terceros sin consentimiento
                expreso del usuario, salvo requerimiento legal.
              </p>
            </div>

            <div className="card" style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIconWrap}>
                  <Icon name="speed" size={24} color="var(--primary)" />
                </div>
                <h2 style={styles.sectionTitle}>Uso Aceptable de la Red</h2>
              </div>
              <p style={styles.sectionText}>
                El usuario se compromete a hacer un uso responsable de la red. Queda prohibido el uso
                del servicio para actividades ilegales, envio de spam, distribucion de malware o
                cualquier actividad que afecte la calidad del servicio para otros usuarios. ComunetMax
                se reserva el derecho de suspender el servicio en caso de incumplimiento.
              </p>
            </div>

            <div className="card" style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIconWrap}>
                  <Icon name="headset" size={24} color="var(--primary)" />
                </div>
                <h2 style={styles.sectionTitle}>Soporte y Garantia</h2>
              </div>
              <p style={styles.sectionText}>
                ComunetMax ofrece soporte tecnico 24/7 a traves de nuestros canales de atencion.
                El equipo de instalacion (modem/router) permanece en comodato durante la vigencia
                del contrato. Las fallas tecnicas seran atendidas en un plazo maximo de 24 horas
                habiles. El usuario puede solicitar la cancelacion del servicio con 30 dias de
                anticipacion.
              </p>
            </div>

            <div className="card" style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIconWrap}>
                  <Icon name="network" size={24} color="var(--primary)" />
                </div>
                <h2 style={styles.sectionTitle}>Cobertura y Velocidad</h2>
              </div>
              <p style={styles.sectionText}>
                Las velocidades publicadas corresponden a la capacidad maxima de enlace. La velocidad
                real puede variar segun factores como la congestion de la red, el equipo del usuario,
                y las condiciones de la infraestructura interna. ComunetMax garantiza un minimo del
                80% de la velocidad contratada en condiciones normales de operacion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  content: {
    maxWidth: 840,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
  },
  section: {
    padding: '36px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  sectionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: 'var(--primary-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: 'var(--secondary)',
  },
  sectionText: {
    fontSize: 16,
    color: 'var(--text-light)',
    lineHeight: 1.8,
  },
}
