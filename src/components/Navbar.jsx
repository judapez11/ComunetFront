import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../auth'
import { Icon } from './Icon'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [nosotrosOpen, setNosotrosOpen] = useState(false)
  const dropdownRef = useRef(null)
  const nosotrosRef = useRef(null)
  const location = useLocation()
  const isAuth = auth.isAuthenticated()

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/planes', label: 'Planes' },
    { to: '/cobertura', label: 'Cobertura' },
    { to: '/contacto', label: 'Contacto' },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (nosotrosRef.current && !nosotrosRef.current.contains(event.target)) {
        setNosotrosOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    auth.logout()
    window.location.href = '/'
  }

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIconWrap}>
            <Icon name="bolt" size={18} color="#fff" />
          </div>
          Comunet<span style={styles.logoAccent}>Max</span>
        </Link>

        <button style={styles.hamburger} onClick={() => setOpen(!open)}>
          <span style={{ ...styles.hamburgerLine, transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ ...styles.hamburgerLine, opacity: open ? 0 : 1 }} />
          <span style={{ ...styles.hamburgerLine, transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>

        <div className={`navbar-menu ${open ? 'navbar-menu-open' : ''}`} style={styles.menu}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                ...styles.link,
                color: location.pathname === l.to ? 'var(--primary)' : 'rgba(255,255,255,0.85)',
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <div ref={nosotrosRef} style={styles.dropdownContainer}>
            <button
              style={{
                ...styles.link,
                color: (location.pathname === '/nosotros' || location.pathname === '/politicas') ? 'var(--primary)' : 'rgba(255,255,255,0.85)',
              }}
              onClick={() => setNosotrosOpen(!nosotrosOpen)}
            >
              Nosotros <Icon name="chevronDown" size={14} color="rgba(255,255,255,0.7)" style={{ marginLeft: 4 }} />
            </button>
            {nosotrosOpen && (
              <div style={styles.dropdown}>
                <Link
                  to="/nosotros"
                  className="dropdown-item"
                  onClick={() => { setNosotrosOpen(false); setOpen(false) }}
                >
                  Mision y Vision
                </Link>
                <Link
                  to="/politicas"
                  className="dropdown-item"
                  onClick={() => { setNosotrosOpen(false); setOpen(false) }}
                >
                  Politicas de uso
                </Link>
              </div>
            )}
          </div>
        </div>

        <div style={styles.right}>
          {isAuth && (
            <div ref={dropdownRef} style={styles.dropdownContainer}>
              <button
                style={{
                  ...styles.link,
                  ...styles.adminLink,
                  color: location.pathname.startsWith('/admin') ? 'var(--accent)' : 'rgba(255,255,255,0.85)',
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Admin <Icon name="chevronDown" size={14} color="rgba(255,255,255,0.7)" style={{ marginLeft: 4 }} />
              </button>
              {dropdownOpen && (
                <div style={styles.dropdown}>
                  <Link
                    to="/admin"
                    className="dropdown-item"
                    style={{
                      color: location.pathname === '/admin' ? 'var(--primary)' : 'rgba(255,255,255,0.85)',
                    }}
                    onClick={() => { setDropdownOpen(false); setOpen(false) }}
                  >
                    Panel
                  </Link>
                  <button
                    className="dropdown-item"
                    style={styles.dropdownItem}
                    onClick={() => { setDropdownOpen(false); setOpen(false); handleLogout() }}
                  >
                    Cerrar sesion
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: 'rgba(11, 39, 57, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logoIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'var(--gradient-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    gap: 8,
  },
  link: {
    padding: '10px 18px',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
  },
  adminLink: {
    background: 'rgba(1, 157, 244, 0.12)',
    border: '1px solid rgba(1, 157, 244, 0.25)',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    left: 0,
    background: 'rgba(11, 39, 57, 0.98)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
    minWidth: 200,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 200,
    animation: 'fadeIn 0.2s ease',
  },
  dropdownItem: {
    padding: '14px 20px',
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
    color: 'rgba(255,255,255,0.85)',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  },
  right: { display: 'flex', alignItems: 'center', gap: 12 },
}

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .navbar-menu { display: flex !important; }
    @media (max-width: 768px) {
      button[style*="hamburger"] { display: flex !important; }
      .navbar-menu { display: none !important; }
      .navbar-menu-open {
        display: flex !important;
        position: absolute;
        top: 72px;
        left: 0;
        right: 0;
        background: rgba(11, 39, 57, 0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 20px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        z-index: 99;
      }
    }
    @media (min-width: 769px) {
      button[style*="hamburger"] { display: none !important; }
    }
  `
  document.head.appendChild(style)
}
