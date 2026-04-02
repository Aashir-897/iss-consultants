import { useState } from 'react'
import PublicLayout from '@/components/layout/PublicLayout'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', visa_type:'', destination:'', message:'' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setForm({ name:'', email:'', phone:'', visa_type:'', destination:'', message:'' }) }, 1000)
  }

  return (
    <PublicLayout>
      <section style={{ padding:'140px 24px 60px', background:'var(--dark)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        <div style={{ maxWidth:600, position:'relative', zIndex:1 }}>
          <div className="section-tag">Contact Us</div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,6vw,72px)', fontWeight:300, lineHeight:1.05, marginBottom:16 }}>
            Let's Talk About<br />Your <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Future</em>
          </h1>
          <p style={{ fontSize:'clamp(14px,2vw,16px)', color:'var(--text-light)', lineHeight:1.9 }}>
            Book a free consultation. Our expert advisors will guide you towards the right visa pathway.
          </p>
        </div>
      </section>

      <section style={{ padding:'40px 24px 80px', background:'var(--dark)' }}>
        {/* NO inline gridTemplateColumns */}
        <div className="contact-layout-grid">
          <div>
            <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(22px,3vw,26px)', fontWeight:300, marginBottom:36 }}>Get In Touch</h2>
            {[
              { icon:'📞', label:'Phone & WhatsApp', value:'+92 331 5690099' },
              { icon:'✉️', label:'Email', value:'info@instantstudentsolution.com' },
              { icon:'📍', label:'Office', value:'Lahore, Punjab, Pakistan' },
              { icon:'🕐', label:'Hours', value:'Mon – Sat\n10:00 AM – 6:00 PM' },
              { icon:'🏛️', label:'SECP Registration', value:'CUIN: 0330889\nCompanies Act, 2017' },
            ].map((c,i) => (
              <div key={i} style={{ display:'flex', gap:14, marginBottom:24 }}>
                <div style={{ width:42, height:42, border:'1px solid rgba(201,168,76,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', marginBottom:4 }}>{c.label}</div>
                  <div style={{ fontSize:13, color:'var(--cream)', lineHeight:1.6, whiteSpace:'pre-line' }}>{c.value}</div>
                </div>
              </div>
            ))}
            <div style={{ background:'var(--dark3)', padding:20, border:'1px solid rgba(201,168,76,0.1)', marginTop:24 }}>
              <div style={{ fontSize:11, letterSpacing:2, textTransform:'uppercase', color:'var(--gold)', marginBottom:10 }}>100% Free Consultation</div>
              <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.8 }}>
                Initial consultations are completely free with no obligation.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* NO inline gridTemplateColumns */}
            <div className="form-row-2">
              <div>
                <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Full Name *</label>
                <input className="input-field" placeholder="Your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Phone *</label>
                <input className="input-field" placeholder="+92 300 0000000" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required />
              </div>
            </div>
            <div>
              <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Email *</label>
              <input className="input-field" type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
            </div>
            <div className="form-row-2">
              <div>
                <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Visa Type</label>
                <select className="input-field" value={form.visa_type} onChange={e=>setForm({...form,visa_type:e.target.value})}>
                  <option value="">Select Type</option>
                  {['Student Visa','Work Visa','PR','Visit Visa','Business Visa','Family Reunion'].map(v=><option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Destination</label>
                <select className="input-field" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})}>
                  <option value="">Select Country</option>
                  {['UK','Canada','Australia','USA','Schengen','Ireland','New Zealand','Other'].map(v=><option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Your Message</label>
              <textarea className="input-field" rows={5} placeholder="Describe your situation..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
            </div>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Request Free Consultation →'}
            </button>
            <p style={{ fontSize:11, color:'var(--text-muted)', textAlign:'center' }}>We respond within 24 hours.</p>
          </form>
        </div>
      </section>
    </PublicLayout>
  )
}
