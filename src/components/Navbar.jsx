import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../auth'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isAuth = auth.isAuthenticated()
  const user = auth.getUser()

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/planes', label: 'Planes' },
    { to: '/cobertura', label: 'Cobertura' },
    { to: '/contacto', label: 'Contacto' },
  ]

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          Comunet<span style={styles.logoAccent}>Max</span>
        </Link>

        <button style={styles.hamburger} onClick={() => setOpen(!open)}>
          <span style={{ ...styles.hamburgerLine, transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ ...styles.hamburgerLine, opacity: open ? 0 : 1 }} />
          <span style={{ ...styles.hamburgerLine, transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>

        <div style={{ ...styles.menu, display: open ? 'flex' : 'none' }}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                ...styles.link,
                color: location.pathname === l.to ? 'var(--primary)' : '#fff',
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {isAuth && (
            <Link
              to="/admin"
              style={{
                ...styles.link,
                ...styles.adminLink,
                color: location.pathname.startsWith('/admin') ? 'var(--accent)' : '#fff',
              }}
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          )}
        </div>

        <div style={styles.right}>
          {isAuth ? (
            <span style={styles.userBadge}>
              {user?.nombre}
              <button onClick={() => { auth.logout(); window.location.href = '/' }} style={styles.logoutBtn}>
                Salir
              </button>
            </span>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: 'var(--secondary)',
    padding: '0 20px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
  },
  logo: {
    fontSize: 24,
    fontWeight: 800,
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  logoIcon: { fontSize: 22 },
  logoAccent: { color: 'var(--accent)' },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: 5,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
  },
  hamburgerLine: {
    width: 24,
    height: 2,
    background: '#fff',
    borderRadius: 2,
    transition: 'all 0.3s',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  link: {
    padding: '8px 16px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  adminLink: {
    background: 'rgba(0,212,170,0.12)',
    border: '1px solid rgba(0,212,170,0.2)',
  },
  right: { display: 'flex', alignItems: 'center', gap: 12 },
  userBadge: {
    color: '#94a3b8',
    fontSize: 13,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#94a3b8',
    padding: '4px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 12,
    fontFamily: 'inherit',
  },
}

const mq = `
@media (max-width: 768px) {
  .navbar-hamburger { display: flex !important; }
  .navbar-menu { display: none !important; }
}
`
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @media (max-width: 768px) {
      button[style*="hamburger"] { display: flex !important; }
      div[style*="menu"] {
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        background: var(--secondary);
        flex-direction: column;
        padding: 16px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }
    }
    @media (min-width: 769px) {
      button[style*="hamburger"] { display: none !important; }
    }
  `
  document.head.appendChild(style)
}
