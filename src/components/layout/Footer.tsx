import { useState } from 'react'
import { Link } from 'react-router-dom'

const destinations = ['United Kingdom', 'Canada', 'Australia', 'United States', 'Schengen Europe']
const services = ['Visa Counselling', 'Student Admissions', 'Work Permits', 'PR Applications', 'Interview Prep']
const company = [
  { label: 'About Us', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setEmail('')
  }

  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Newsletter */}
      <div style={{ background: 'var(--dark3)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '36px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }} className="newsletter-flex">
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 300, marginBottom: 4 }}>
              Stay <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Informed</span>
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Latest visa news and updates for Pakistani students.</p>
          </div>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Your email address" className="input-field"
              style={{ flex: 1, minWidth: 0, borderRight: 'none' }} />
            <button type="submit" className="btn-primary" style={{ flexShrink: 0 }}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 28px' }}>
        <div className="footer-main-grid">
          {/* Brand */}
          <div>
            <Link to="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 600, letterSpacing: 2, color: 'var(--gold)', textDecoration: 'none', display: 'block', marginBottom: 12 }}>
              Instant Student Solution
            </Link>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 260, marginBottom: 8 }}>
              SECP Registered | CUIN: 0330889<br />
              Incorporated: 25th March 2026
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 260, marginBottom: 20 }}>
              Pakistan's trusted visa & student consultancy.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['f', 'in', '▶', '✕'].map((s, i) => (
                <a key={i} href="#" style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12, transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >{s}</a>
              ))}
            </div>
          </div>

          {['Destinations', 'Services', 'Company'].map((heading, hi) => (
            <div key={heading}>
              <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontFamily: 'DM Sans, sans-serif' }}>{heading}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(hi === 0 ? destinations : hi === 1 ? services : company.map(c => c.label)).map((item, i) => (
                  <li key={i}>
                    <Link to={hi === 2 ? company[i].to : hi === 0 ? '/destinations' : '/services'}
                      style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, transition: 'color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Instant Student Solution (Pvt) Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/privacy-policy" style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</Link>
            <Link to="/terms" style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
