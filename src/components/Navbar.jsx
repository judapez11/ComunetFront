import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../auth'

const IMG_VERSION = Date.now()

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [nosotrosOpen, setNosotrosOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const navRef = useRef(null)
  const nosotrosRef = useRef(null)
  const adminRef = useRef(null)
  const location = useLocation()
  const isAuth = auth.isAuthenticated()

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/planes', label: 'Planes' },
    { to: '/cobertura', label: 'Cobertura' },
    { to: '/contacto', label: 'Contacto' },
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (nosotrosRef.current && !nosotrosRef.current.contains(e.target)) setNosotrosOpen(false)
      if (adminRef.current && !adminRef.current.contains(e.target)) setAdminOpen(false)
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    auth.logout()
    window.location.href = '/'
  }

  const isActive = (p) => location.pathname === p
  const isNosotrosActive = location.pathname === '/nosotros' || location.pathname === '/politicas'

  return (
    <nav ref={navRef} className="navbar-nav" style={styles.nav}>
      <div className="container" style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <img src={`/pnglogo.png?v=${IMG_VERSION}`} alt="ComunetMax" style={styles.logoImg} />
        </Link>

        <button className="navbar-hamburger" style={styles.hamburger} onClick={() => setOpen(!open)} aria-label="Menu">
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
                color: isActive(l.to) ? 'var(--primary-dark)' : 'var(--text)',
                fontWeight: isActive(l.to) ? 700 : 500,
                borderBottom: isActive(l.to) ? '2px solid var(--primary)' : '2px solid transparent',
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <div ref={nosotrosRef} style={styles.dropdownWrap}>
            <button
              style={{
                ...styles.link,
                color: isNosotrosActive ? 'var(--primary-dark)' : 'var(--text)',
                fontWeight: isNosotrosActive ? 700 : 500,
                borderBottom: isNosotrosActive ? '2px solid var(--primary)' : '2px solid transparent',
              }}
              onClick={() => setNosotrosOpen(!nosotrosOpen)}
            >
              Nosotros {nosotrosOpen ? '▴' : '▾'}
            </button>
            {nosotrosOpen && (
              <div style={styles.dropdown}>
                <Link to="/nosotros" className="dropdown-item" style={styles.dropItem} onClick={() => { setNosotrosOpen(false); setOpen(false) }}>Mision y Vision</Link>
                <Link to="/politicas" className="dropdown-item" style={styles.dropItem} onClick={() => { setNosotrosOpen(false); setOpen(false) }}>Politicas de uso</Link>
              </div>
            )}
          </div>
        </div>

        <div style={styles.right}>
          {isAuth && (
            <div ref={adminRef} style={styles.dropdownWrap}>
              <button style={styles.adminBtn} onClick={() => setAdminOpen(!adminOpen)}>
                Admin {adminOpen ? '▴' : '▾'}
              </button>
              {adminOpen && (
                <div style={styles.dropdown}>
                  <Link to="/admin" className="dropdown-item" style={styles.dropItem} onClick={() => { setAdminOpen(false); setOpen(false) }}>Panel</Link>
                  <button className="logout-item" style={styles.logoutItem} onClick={() => { setAdminOpen(false); setOpen(false); handleLogout() }}>Cerrar sesion</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {open && (
        <div style={styles.mobilePanel}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={{ ...styles.mobileLink, fontWeight: isActive(l.to) ? 700 : 500 }} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/nosotros" style={styles.mobileLink} onClick={() => setOpen(false)}>Mision y Vision</Link>
          <Link to="/politicas" style={styles.mobileLink} onClick={() => setOpen(false)}>Politicas de uso</Link>
          {isAuth && <Link to="/admin" style={styles.mobileLink} onClick={() => setOpen(false)}>Admin - Panel</Link>}
          {isAuth && <button style={{ ...styles.mobileLink, ...styles.mobileLogout }} onClick={() => { setOpen(false); handleLogout() }}>Cerrar sesion</button>}
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: {
    background: '#ffffff',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid var(--border)',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    maxWidth: 1280,
    margin: '0 auto',
  },
  logo: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    height: 80,
  },
  logoImg: {
    height: 70,
    width: 'auto',
    objectFit: 'contain',
    display: 'block',
    padding: 0,
    margin: 0,
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: 5,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
    marginRight: -4,
  },
  hamburgerLine: {
    width: 26,
    height: 3,
    background: 'var(--secondary)',
    borderRadius: 3,
    transition: 'all 0.3s',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
    marginRight: 8,
  },
  link: {
    padding: '10px 16px',
    borderRadius: 8,
    fontSize: 15,
    textDecoration: 'none',
    transition: 'all 0.2s',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    color: 'var(--text)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  adminBtn: {
    background: 'var(--secondary)',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  },
  dropdownWrap: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 8,
    boxShadow: 'var(--shadow-lg)',
    minWidth: 190,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 200,
    padding: '6px',
  },
  dropItem: {
    padding: '10px 16px',
    fontSize: 14,
    textDecoration: 'none',
    color: 'var(--text)',
    borderRadius: 6,
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 500,
  },
  logoutItem: {
    padding: '10px 16px',
    fontSize: 14,
    textDecoration: 'none',
    color: '#DC2626',
    fontWeight: 600,
    borderRadius: 6,
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  mobilePanel: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    background: '#ffffff',
    borderBottom: '1px solid var(--border)',
    boxShadow: 'var(--shadow-lg)',
    padding: '12px 16px 20px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 200,
  },
  mobileLink: {
    padding: '14px 8px',
    fontSize: 16,
    textDecoration: 'none',
    color: 'var(--text)',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  mobileLogout: {
    color: '#DC2626',
    fontWeight: 600,
    borderBottom: 'none',
  },
}

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    .dropdown-item:hover, .logout-item:hover { background: rgba(91,168,247,0.15); }
    .navbar-menu { display: flex !important; }
    .navbar-hamburger { display: none; }
    @media (max-width: 768px) {
      .navbar-nav { padding: 0 16px !important; }
      .navbar-hamburger { display: flex !important; }
      .navbar-menu { display: none !important; }
    }
    @media (min-width: 769px) {
      .navbar-hamburger { display: none !important; }
    }
  `
  document.head.appendChild(style)
}
