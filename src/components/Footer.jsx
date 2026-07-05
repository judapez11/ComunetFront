export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.inner}>
        <div style={styles.grid}>
          <div>
            <h3 style={styles.brand}>ComunetMax</h3>
            <p style={styles.text}>
              Internet de fibra óptica con la mejor velocidad y estabilidad para tu hogar o empresa.
            </p>
          </div>
          <div>
            <h4 style={styles.heading}>Enlaces</h4>
            <a href="/" style={styles.link}>Inicio</a>
            <a href="/planes" style={styles.link}>Planes</a>
            <a href="/cobertura" style={styles.link}>Cobertura</a>
            <a href="/contacto" style={styles.link}>Contacto</a>
          </div>
          <div>
            <h4 style={styles.heading}>Contacto</h4>
            <p style={styles.text}>&#128222; +57 300 123 4567</p>
            <p style={styles.text}>&#9993; info@comunetmax.com</p>
            <p style={styles.text}>&#128205; Medellín, Colombia</p>
          </div>
        </div>
        <div style={styles.bottom}>
          <p style={styles.copyright}>&copy; {new Date().getFullYear()} ComunetMax. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'var(--secondary)',
    color: '#94a3b8',
    padding: '60px 0 0',
    marginTop: 80,
  },
  inner: {},
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: 40,
  },
  brand: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 1.8,
    marginBottom: 4,
  },
  heading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 16,
  },
  link: {
    display: 'block',
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 8,
    textDecoration: 'none',
  },
  bottom: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '24px 0',
    marginTop: 48,
    textAlign: 'center',
  },
  copyright: { fontSize: 13 },
}
