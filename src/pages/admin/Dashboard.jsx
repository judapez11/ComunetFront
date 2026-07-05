import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../auth'
import { getMunicipios, getCoberturas, getCoberturaByMunicipio, asignarCobertura, deleteCobertura, getPlanesByMunicipio, createPlan, updatePlan, deletePlan } from '../../api'

export default function Dashboard() {
  const navigate = useNavigate()
  const [coberturas, setCoberturas] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMun, setSelectedMun] = useState(null)
  const [cobertura, setCobertura] = useState(null)
  const [planes, setPlanes] = useState([])
  const [loadingPlanes, setLoadingPlanes] = useState(false)
  const [showMunForm, setShowMunForm] = useState(false)
  const [showPlanForm, setShowPlanForm] = useState(false)
  const [editandoPlan, setEditandoPlan] = useState(null)
  const [asignando, setAsignando] = useState(false)
  const [munId, setMunId] = useState('')
  const [munDepto, setMunDepto] = useState('')
  const [creandoMun, setCreandoMun] = useState(false)
  const [error, setError] = useState('')

  const departamentos = [...new Set(municipios.map((m) => m.departamento))].sort()

  const handleAuthErr = (e) => {
    if (e.response?.status === 401) {
      auth.logout()
      navigate('/login', { replace: true })
      return true
    }
    return false
  }

  useEffect(() => {
    setError('')
    getMunicipios()
      .then(setMunicipios)
      .catch(() => {})
    getCoberturas()
      .then(setCoberturas)
      .catch((e) => {
        if (e.response?.status === 401) {
          auth.logout()
          navigate('/login', { replace: true })
        } else {
          setError('Error al cargar: verifica que el backend esté corriendo')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleAgregarCobertura = async (e) => {
    e.preventDefault()
    if (!munId || !munDepto) return
    setCreandoMun(true)
    try {
      await asignarCobertura(Number(munId), 'FIBRA_OPTICA')
      const nuevasCoberturas = await getCoberturas()
      setCoberturas(nuevasCoberturas)
      setShowMunForm(false)
      setMunId('')
      setMunDepto('')
    } catch (err) {
      if (!handleAuthErr(err)) alert('Error al asignar cobertura')
    } finally {
      setCreandoMun(false)
    }
  }

  const selectMunicipio = async (m) => {
    setSelectedMun(m)
    setCobertura(null)
    setPlanes([])
    try {
      const cov = await getCoberturaByMunicipio(m.id)
      setCobertura(cov)
      if (cov) {
        const p = await getPlanesByMunicipio(m.id)
        setPlanes(p)
      }
    } catch (e) {
      if (!handleAuthErr(e)) setCobertura(null)
    }
  }

  const handleAsignar = async () => {
    if (!selectedMun) return
    setAsignando(true)
    try {
      const cov = await asignarCobertura(selectedMun.id, 'FIBRA_OPTICA')
      setCobertura(cov)
      const p = await getPlanesByMunicipio(selectedMun.id)
      setPlanes(p)
    } catch (e) {
      if (!handleAuthErr(e)) alert('Error al asignar cobertura')
    } finally {
      setAsignando(false)
    }
  }

  const handleDesconectar = async () => {
    if (!cobertura || !window.confirm('¿Desconectar cobertura de este municipio?')) return
    try {
      await deleteCobertura(cobertura.id)
      setCobertura(null)
      setPlanes([])
      setCoberturas(coberturas.filter((c) => c.id !== cobertura.id))
    } catch (e) {
      if (!handleAuthErr(e)) alert('Error al desconectar')
    }
  }

  const cargarPlanes = async () => {
    if (!selectedMun) return
    setLoadingPlanes(true)
    try {
      const p = cobertura ? await getPlanesByMunicipio(selectedMun.id) : []
      setPlanes(p)
    } catch (e) {
      handleAuthErr(e)
      setPlanes([])
    } finally {
      setLoadingPlanes(false)
    }
  }

  const handleDeletePlan = async (id) => {
    if (!window.confirm('¿Eliminar este plan?')) return
    try {
      await deletePlan(id)
      cargarPlanes()
    } catch (e) {
      if (!handleAuthErr(e)) alert('Error al eliminar')
    }
  }

  const formatPrice = (p) => '$' + Math.round(p).toLocaleString('es-CO')

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--secondary)' }}>Panel de Administración</h1>

      {error && <div className="alert alert-error" style={{ marginTop: 16 }}>{error}</div>}

      {!selectedMun ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0 16px' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Municipios con cobertura</h2>
            <button className="btn btn-primary btn-sm" onClick={() => { setMunId(''); setMunDepto(''); setShowMunForm(true) }}>
              + Añadir Cobertura
            </button>
          </div>

          {loading && <div className="spinner" />}

          {!loading && (
            <div style={tableWrap}>
              {coberturas.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-light)' }}>
                  <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>📡</span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--secondary)', marginBottom: 8 }}>No hay municipios con cobertura</h3>
                  <p style={{ marginBottom: 24 }}>Aún no has añadido ningún municipio. Crea el primero.</p>
                  <button className="btn btn-primary" onClick={() => { setMunId(''); setMunDepto(''); setShowMunForm(true) }}>
                    + Añadir Cobertura
                  </button>
                </div>
              ) : (
                <table style={table}>
                  <thead>
                    <tr>
                      <th style={th}>Municipio</th>
                      <th style={th}>Departamento</th>
                      <th style={th}>Tecnología</th>
                      <th style={th}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coberturas.map((c) => (
                      <tr key={c.id} style={tr}>
                        <td style={{ ...td, fontWeight: 600 }}>{c.nombreMunicipio}</td>
                        <td style={td}>{c.departamentoMunicipio}</td>
                        <td style={td}>
                          <span style={{ ...badge, background: '#dcfce7', color: '#166534' }}>
                            {c.tecnologia?.replace('_', ' ')}
                          </span>
                        </td>
                        <td style={td}>
                          <button className="btn btn-sm btn-primary" onClick={() => {
                            const mun = municipios.find((m) => m.nombre === c.nombreMunicipio && m.departamento === c.departamentoMunicipio)
                            if (mun) selectMunicipio(mun)
                          }}>
                            Gestionar Planes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '24px 0 20px', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <button className="btn btn-sm btn-outline" onClick={() => setSelectedMun(null)} style={{ marginBottom: 8 }}>
                ← Volver
              </button>
              <h2 style={{ fontSize: 24, fontWeight: 700 }}>{selectedMun.nombre}</h2>
              <p style={{ color: 'var(--text-light)' }}>{selectedMun.departamento}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ ...badge, background: '#dcfce7', color: '#166534' }}>Fibra Óptica ✓</span>
              <button className="btn btn-sm btn-danger" onClick={handleDesconectar}>Desconectar</button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Planes</h3>
            <button className="btn btn-sm btn-primary" onClick={() => { setEditandoPlan(null); setShowPlanForm(true) }}>
              + Nuevo Plan
            </button>
          </div>

          {loadingPlanes && <div className="spinner" />}

          {!loadingPlanes && (
            <div style={tableWrap}>
              <table style={table}>
                <thead>
                  <tr>
                    <th style={th}>Nombre</th>
                    <th style={th}>Velocidad</th>
                    <th style={th}>Precio</th>
                    <th style={th}>Tipo</th>
                    <th style={th}>Activo</th>
                    <th style={th}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {planes.map((p) => (
                    <tr key={p.id} style={tr}>
                      <td style={{ ...td, fontWeight: 600 }}>{p.nombre}</td>
                      <td style={td}>{p.velocidadMb} MB</td>
                      <td style={td}>{formatPrice(p.precio)}</td>
                      <td style={td}>{p.tipo || '—'}</td>
                      <td style={td}>
                        <span style={{ ...badgeSm, background: p.activo ? '#dcfce7' : '#fee2e2', color: p.activo ? '#166534' : '#991b1b' }}>
                          {p.activo ? 'Sí' : 'No'}
                        </span>
                      </td>
                      <td style={td}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-sm btn-outline" onClick={() => { setEditandoPlan(p); setShowPlanForm(true) }}>Editar</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeletePlan(p.id)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {planes.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ ...td, textAlign: 'center', color: 'var(--text-light)', padding: 40 }}>
                        No hay planes para este municipio. Crea el primero.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {showMunForm && (
        <div style={overlay} onClick={() => setShowMunForm(false)}>
          <div style={{ ...modal, maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleAgregarCobertura} style={{ padding: 28 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: 'var(--secondary)' }}>Añadir Cobertura</h2>

              <div className="form-group">
                <label>Departamento</label>
                {departamentos.length > 0 ? (
                  <select value={munDepto} onChange={(e) => { setMunDepto(e.target.value); setMunId('') }} required style={selectStyle}>
                    <option value="">Selecciona un departamento</option>
                    {departamentos.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                ) : (
                  <p style={{ color: 'var(--text-light)', fontSize: 14 }}>No hay departamentos disponibles. Debes agregar municipios primero desde la base de datos.</p>
                )}
              </div>

              {munDepto && (
                <div className="form-group">
                  <label>Municipio</label>
                  <select value={munId} onChange={(e) => setMunId(e.target.value)} required style={selectStyle}>
                    <option value="">Selecciona un municipio</option>
                    {municipios.filter((m) => m.departamento === munDepto).map((m) => (
                      <option key={m.id} value={m.id}>{m.nombre}</option>
                    ))}
                  </select>
                  {municipios.filter((m) => m.departamento === munDepto).length === 0 && (
                    <p style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 4 }}>No hay municipios registrados en este departamento.</p>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="submit" className="btn btn-primary" disabled={creandoMun || !munId}>
                  {creandoMun ? 'Asignando...' : 'Asignar Cobertura'}
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setShowMunForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPlanForm && (
        <div style={overlay} onClick={() => { setShowPlanForm(false); setEditandoPlan(null) }}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <PlanForm
              plan={editandoPlan}
              onClose={() => { setShowPlanForm(false); setEditandoPlan(null) }}
              onSaved={() => { setShowPlanForm(false); setEditandoPlan(null); cargarPlanes() }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function PlanForm({ plan, onClose, onSaved }) {
  const [form, setForm] = useState({
    nombre: plan?.nombre || '',
    velocidadMb: plan?.velocidadMb || 300,
    precio: plan?.precio || '',
    descripcion: plan?.descripcion || '',
    tipo: plan?.tipo || 'HOGAR',
    tecnologia: 'FIBRA_OPTICA',
    activo: plan?.activo ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (plan) {
        await updatePlan(plan.id, { ...form, precio: Number(form.precio) })
      } else {
        await createPlan({ ...form, precio: Number(form.precio) })
      }
      onSaved()
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al guardar el plan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 32 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: 'var(--secondary)' }}>{plan ? 'Editar Plan' : 'Nuevo Plan'}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-group">
        <label>Nombre del plan</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Ej: Fibra 300MB" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="form-group">
          <label>Velocidad (MB)</label>
          <input name="velocidadMb" type="number" value={form.velocidadMb} onChange={handleChange} required min={1} />
        </div>
        <div className="form-group">
          <label>Precio ($)</label>
          <input name="precio" type="number" value={form.precio} onChange={handleChange} required min={1} placeholder="89900" />
        </div>
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Describe el plan..." />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="form-group">
          <label>Tipo</label>
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="HOGAR">Hogar</option>
            <option value="EMPRESA">Empresa</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tecnología</label>
          <select name="tecnologia" value={form.tecnologia} onChange={handleChange}>
            <option value="FIBRA_OPTICA">Fibra Óptica</option>
          </select>
        </div>
      </div>
      <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} style={{ width: 18, height: 18 }} />
        <label style={{ margin: 0 }}>Plan activo</label>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Guardando...' : plan ? 'Actualizar' : 'Crear Plan'}
        </button>
        <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  )
}

const tableWrap = {
  overflowX: 'auto',
  background: '#fff',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border)',
}
const table = { width: '100%', borderCollapse: 'collapse', fontSize: 14 }
const th = {
  textAlign: 'left',
  padding: '12px 16px',
  fontWeight: 600,
  color: 'var(--text-light)',
  borderBottom: '2px solid var(--border)',
  fontSize: 13,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
}
const tr = { borderBottom: '1px solid var(--border)' }
const td = { padding: '12px 16px', color: 'var(--text)' }
const badge = {
  display: 'inline-block',
  padding: '4px 14px',
  borderRadius: 16,
  fontSize: 13,
  fontWeight: 600,
}
const badgeSm = {
  display: 'inline-block',
  padding: '2px 10px',
  borderRadius: 12,
  fontSize: 12,
  fontWeight: 600,
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
  borderRadius: 'var(--radius)',
  width: '100%',
  maxWidth: 560,
  maxHeight: '90vh',
  overflow: 'auto',
}
const selectStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  border: '2px solid var(--border)',
  fontSize: 15,
  fontFamily: 'inherit',
  background: '#fff',
}
const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  border: '2px solid var(--border)',
  fontSize: 15,
  fontFamily: 'inherit',
}
