import { useState, useEffect } from 'react'
import { getMunicipios, getCoberturaByMunicipio } from '../api'

export default function Cobertura() {
  const [municipios, setMunicipios] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState('')
  const [cobertura, setCobertura] = useState(null)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleCheck = async () => {
    if (!selected) return
    setChecking(true)
    setCobertura(null)
    try {
      const data = await getCoberturaByMunicipio(selected)
      setCobertura(data)
    } catch {
      setCobertura(null)
    } finally {
      setChecking(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Cobertura</h1>
          <p>Verifica si tenemos cobertura en tu municipio</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={styles.checker}>
            <h2 style={styles.checkerTitle}>¿Dónde llegamos?</h2>
            <p style={styles.checkerDesc}>
              Selecciona tu municipio para verificar la disponibilidad de nuestro servicio de fibra óptica.
            </p>

            <div style={styles.form}>
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                style={styles.select}
                disabled={loading}
              >
                <option value="">
                  {loading ? 'Cargando municipios...' : 'Selecciona un municipio'}
                </option>
                {municipios.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre} - {m.departamento}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                onClick={handleCheck}
                disabled={!selected || checking}
              >
                {checking ? 'Verificando...' : 'Verificar'}
              </button>
            </div>

            {cobertura && (
              <div style={styles.result}>
                <span style={styles.resultIcon}>✅</span>
                <div>
                  <h3 style={styles.resultTitle}>¡Tenemos cobertura!</h3>
                  <p style={styles.resultText}>
                    {cobertura.nombreMunicipio}, {cobertura.departamentoMunicipio} cuenta con
                    tecnología <strong>{cobertura.tecnologia?.replace('_', ' ')}</strong>.
                  </p>
                </div>
              </div>
            )}

            {cobertura === null && selected && !checking && (
              <div style={{ ...styles.result, borderColor: '#fecaca', background: '#fef2f2' }}>
                <span style={styles.resultIcon}>❌</span>
                <div>
                  <h3 style={{ ...styles.resultTitle, color: 'var(--danger)' }}>Sin cobertura aún</h3>
                  <p style={styles.resultText}>
                    Pronto estaremos llevando nuestro servicio a este municipio.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div style={styles.info}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Expansión de red</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>
              Estamos trabajando constantemente para expandir nuestra red de fibra óptica a más
              municipios de Colombia. Si no encuentras tu municipio en la lista, no te preocupes —
              déjanos tus datos en la sección de <a href="/contacto">Contacto</a> y te avisaremos
              cuando tengamos cobertura en tu zona.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  checker: {
    maxWidth: 600,
    margin: '0 auto',
    textAlign: 'center',
  },
  checkerTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--secondary)',
    marginBottom: 8,
  },
  checkerDesc: {
    color: 'var(--text-light)',
    fontSize: 16,
    marginBottom: 32,
  },
  form: {
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
  result: {
    display: 'flex',
    gap: 16,
    alignItems: 'flex-start',
    marginTop: 28,
    padding: '20px 24px',
    borderRadius: 'var(--radius)',
    border: '1px solid #bbf7d0',
    background: '#f0fdf4',
    textAlign: 'left',
  },
  resultIcon: { fontSize: 28, lineHeight: 1 },
  resultTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--success)',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 14,
    color: 'var(--text-light)',
    lineHeight: 1.5,
  },
  info: {
    marginTop: 64,
    padding: '32px',
    background: 'var(--bg-alt)',
    borderRadius: 'var(--radius)',
    textAlign: 'center',
  },
}
