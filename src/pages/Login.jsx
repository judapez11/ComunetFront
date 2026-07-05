import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'
import { auth } from '../auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (auth.isAuthenticated()) {
    navigate('/admin', { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await login(email, password)
      auth.login(data.token, data.nombre)
      navigate('/admin', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.mensaje || 'Credenciales incorrectas'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin</h1>
          <p style={styles.subtitle}>Inicia sesión para gestionar los planes</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@comunet.com"
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-alt)',
    padding: 20,
  },
  form: {
    background: '#fff',
    padding: '40px',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-lg)',
    width: '100%',
    maxWidth: 400,
    border: '1px solid var(--border)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: 'var(--secondary)',
  },
  subtitle: {
    fontSize: 14,
    color: 'var(--text-light)',
    marginTop: 4,
  },
}
