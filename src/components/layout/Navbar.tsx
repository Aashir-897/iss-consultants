import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location])
  useEffect(() => { document.body.classList.toggle('mobile-menu-open', open) }, [open])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '12px 16px' : '20px 16px',
        background: scrolled ? 'rgba(13,13,13,0.98)' : 'linear-gradient(180deg,rgba(13,13,13,0.95) 0%,transparent 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : '1px solid transparent',
        transition: 'all 0.4s',
      }}>
        <Link to="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 600, letterSpacing: 2, color: 'var(--gold)', textDecoration: 'none', flexShrink: 0 }}>
          ISS<span style={{ color: 'var(--cream)', fontSize: 12, letterSpacing: 1, fontWeight: 300, marginLeft: 4 }}>Consultants</span>
        </Link>

        <ul style={{ display: 'none', gap: 32, listStyle: 'none', margin: 0 }} className="hidden md:!flex">
          {navLinks.map(l => (
            <li key={l.to}>
              <Link to={l.to} style={{
                color: location.pathname === l.to ? 'var(--gold)' : 'var(--text-light)',
                textDecoration: 'none', fontSize: 12, letterSpacing: '1.5px',
                textTransform: 'uppercase', transition: 'color 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => { if (location.pathname !== l.to) e.currentTarget.style.color = 'var(--text-light)' }}
              >{l.label}</Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/contact" className="btn-outline hidden md:inline-block" style={{ padding: '9px 20px', fontSize: 11 }}>
            Book Consultation
          </Link>
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', color: 'var(--cream)', cursor: 'pointer', display: 'flex', padding: 4 }}
            className="md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile full screen menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(13,13,13,0.99)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s ease',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', gap: 36, paddingTop: 80,
      }}>
        {navLinks.map(l => (
          <Link key={l.to} to={l.to} style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 300,
            color: location.pathname === l.to ? 'var(--gold)' : 'var(--cream)',
            textDecoration: 'none',
          }}>
            {l.label}
          </Link>
        ))}
        <Link to="/contact" className="btn-primary" style={{ marginTop: 16 }}>
          Book Consultation
        </Link>
        <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-muted)' }}>+92 331 5690099</div>
      </div>
    </>
  )
}
