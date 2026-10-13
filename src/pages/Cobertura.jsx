import { useState, useEffect, useRef } from 'react'
import { getMunicipios, getCoberturaByMunicipio } from '../api'
import { Icon } from '../components/Icon'

export default function Cobertura() {
  const [municipios, setMunicipios] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState('')
  const [cobertura, setCobertura] = useState(null)
  const [checking, setChecking] = useState(false)
  const [search, setSearch] = useState('')
  const [showList, setShowList] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!selected) {
      setCobertura(null)
      return
    }
    setChecking(true)
    setCobertura(null)
    getCoberturaByMunicipio(selected)
      .then(setCobertura)
      .catch(() => setCobertura(null))
      .finally(() => setChecking(false))
  }, [selected])

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowList(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtrados = municipios.filter((m) =>
    `${m.nombre} ${m.departamento}`.toLowerCase().includes(search.toLowerCase())
  )

  const seleccionar = (m) => {
    setSelected(String(m.id))
    setSearch(`${m.nombre} - ${m.departamento}`)
    setShowList(false)
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Cobertura</h1>
          <p>Verifica si tenemos cobertura en tu municipio</p>
        </div>
      </div>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={styles.checker}>
            <h2 style={styles.checkerTitle}>Donde llegamos?</h2>
            <p style={styles.checkerDesc}>
              Selecciona tu municipio para verificar la disponibilidad de nuestro servicio de fibra optica.
            </p>

            <div style={styles.form} ref={searchRef}>
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setSelected('') }}
                onFocus={() => setShowList(true)}
                placeholder={loading ? 'Cargando municipios...' : 'Busca tu municipio...'}
                style={styles.input}
              />
              {showList && (
                <div style={dropdownList}>
                  {filtrados.length === 0 ? (
                    <div style={{ padding: 12, color: 'var(--text-light)', fontSize: 14, textAlign: 'center' }}>No se encontraron municipios</div>
                  ) : (
                    filtrados.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => seleccionar(m)}
                        style={dropdownItem}
                        onMouseEnter={(e) => e.target.style.background = 'var(--bg-alt)'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >{m.nombre} - {m.departamento}</div>
                    ))
                  )}
                </div>
              )}
            </div>

            {checking && <div className="spinner" />}

            {!checking && cobertura && (
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

            {!checking && cobertura === null && selected && (
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
    fontSize: 42,
    fontWeight: 800,
    color: 'var(--text)',
    marginBottom: 12,
    letterSpacing: '-0.01em',
  },
  checkerDesc: {
    color: 'var(--text-light)',
    fontSize: 19,
    marginBottom: 40,
  },
  form: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    minWidth: 300,
    padding: '14px 20px',
    borderRadius: 12,
    border: '1px solid var(--border)',
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
    borderRadius: 12,
    textAlign: 'center',
  },
}

const dropdownList = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  maxHeight: 200,
  overflowY: 'auto',
  border: '1px solid var(--border)',
  borderRadius: 8,
  marginTop: 4,
  background: '#fff',
  boxShadow: 'var(--shadow)',
  zIndex: 300,
}

const dropdownItem = {
  padding: '10px 16px',
  cursor: 'pointer',
  fontSize: 14,
  color: 'var(--text)',
  transition: 'background 0.1s',
}
