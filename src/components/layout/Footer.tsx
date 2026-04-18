import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { subscribeNewsletter } from '@/lib/email' 

const destinations = [
  { label: 'Ireland', to: '/destinations/ireland' },
  { label: 'Australia', to: '/destinations/australia' },
  { label: 'United Kingdom', to: '/destinations/united-kingdom' },
]
const services = [
  { label: 'Visa Counselling', to: '/services/visa-counselling' },
  { label: 'Student Admissions', to: '/services/student-admissions' },
  { label: 'Work Permits', to: '/services/work-permits' },
  { label: 'PR Applications', to: '/services/pr-applications' },
  { label: 'Interview Prep', to: '/services/interview-prep' },
]
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
    

    try {
    await subscribeNewsletter({email})
    toast({
      title: 'Subscribed!',
      description: 'Check your inbox for a confirmation email.',
    })
    setEmail('')
    } catch (error) {
      console.error('Newsletter subscribe failed', error)
      toast({
        title: 'Failed',
        description: 'Could not subscribe. Please try again.',
        variant: 'destructive',
      })
    }
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
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Get the latest Ireland, Australia and UK visa updates, news, and application tips for Pakistani students and professionals.</p>
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
              Pakistan's trusted visa & student consultancy for Ireland, Australia, and the United Kingdom.
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

          {[
            { heading: 'Destinations', items: destinations },
            { heading: 'Services', items: services },
            { heading: 'Company', items: company },
          ].map(({ heading, items }) => (
            <div key={heading}>
              <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontFamily: 'DM Sans, sans-serif' }}>{heading}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((item, i) => (
                  <li key={i}>
                    <Link to={item.to}
                      style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, transition: 'color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >{item.label}</Link>
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
