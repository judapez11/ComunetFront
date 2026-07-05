import { useState, useEffect } from 'react'
import { getMunicipios, getCoberturaByMunicipio } from '../api'
import { Icon } from '../components/Icon'

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
            <h2 style={styles.checkerTitle}>Donde llegamos?</h2>
            <p style={styles.checkerDesc}>
              Selecciona tu municipio para verificar la disponibilidad de nuestro servicio de fibra optica.
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
                <div style={styles.resultIconWrap}>
                  <Icon name="check" size={28} color="var(--success)" />
                </div>
                <div>
                  <h3 style={styles.resultTitle}>Tenemos cobertura!</h3>
                  <p style={styles.resultText}>
                    {cobertura.nombreMunicipio}, {cobertura.departamentoMunicipio} cuenta con
                    tecnologia <strong>{cobertura.tecnologia?.replace('_', ' ')}</strong>.
                  </p>
                </div>
              </div>
            )}

            {cobertura === null && selected && !checking && (
              <div style={{ ...styles.result, borderColor: '#FECACA', background: '#FEF2F2' }}>
                <div style={{ ...styles.resultIconWrap, background: '#FEE2E2' }}>
                  <Icon name="x" size={28} color="var(--danger)" />
                </div>
                <div>
                  <h3 style={{ ...styles.resultTitle, color: 'var(--danger)' }}>Sin cobertura aun</h3>
                  <p style={styles.resultText}>
                    Pronto estaremos llevando nuestro servicio a este municipio.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div style={styles.info}>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Expansion de red</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>
              Estamos trabajando constantemente para expandir nuestra red de fibra optica a mas
              municipios de Colombia. Si no encuentras tu municipio en la lista, no te preocupes -
              dejanos tus datos en la seccion de <a href="/contacto">Contacto</a> y te avisaremos
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
    maxWidth: 640,
    margin: '0 auto',
    textAlign: 'center',
  },
  checkerTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: 'var(--secondary)',
    marginBottom: 12,
  },
  checkerDesc: {
    color: 'var(--text-light)',
    fontSize: 17,
    marginBottom: 40,
  },
  form: {
    display: 'flex',
    gap: 16,
  },
  select: {
    flex: 1,
    padding: '14px 20px',
    borderRadius: 12,
    border: '2px solid var(--border)',
    fontSize: 15,
    fontFamily: 'inherit',
    background: '#fff',
    transition: 'all 0.3s ease',
  },
  result: {
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
    marginTop: 32,
    padding: '24px 28px',
    borderRadius: 16,
    border: '1px solid #A7F3D0',
    background: 'var(--accent-light)',
    textAlign: 'left',
  },
  resultIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: '#D1FAE5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--success)',
    marginBottom: 6,
  },
  resultText: {
    fontSize: 15,
    color: 'var(--text-light)',
    lineHeight: 1.6,
  },
  info: {
    marginTop: 72,
    padding: '40px',
    background: 'var(--bg-alt)',
    borderRadius: 20,
    textAlign: 'center',
  },
}
