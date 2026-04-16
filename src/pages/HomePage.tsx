import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '@/components/layout/PublicLayout'
import { getDestinations, getTestimonials, Destination, Testimonial } from '@/lib/api'

const DEFAULT_DESTINATIONS: Destination[] = [
  { id:1, name:'Ireland', slug:'ireland', flag:'🇮🇪', visa_types:['Student','Work','Critical Skills'], description:'', is_active:true },
  { id:2, name:'Australia', slug:'australia', flag:'🇦🇺', visa_types:['Student','Skilled Migration','Work'], description:'', is_active:true },
  { id:3, name:'United Kingdom', slug:'united-kingdom', flag:'🇬🇧', visa_types:['Student','Work','Settlement'], description:'', is_active:true },
]

const SERVICES_DATA = [
  { icon:'🎯', title:'Expert Visa Assessment', desc:'Our certified consultants provide personalized evaluation of your profile, eligibility, and goals.', features:['Comprehensive consultation','Eligibility assessment','Honest, transparent advice','Written summary of options'] },
  { icon:'📁', title:'Document Preparation', desc:'We create your personalized checklist and verify every document before submission.', features:['Personalized document checklist','Document review & verification','Translation assistance','Gap analysis'] },
  { icon:'✍️', title:'Application Processing', desc:'We handle the complete application from start to finish.', features:['Full application completion','Online portal management','Biometric booking','Real-time tracking'] },
  { icon:'🎤', title:'Interview Preparation', desc:'Mock interview sessions and expert coaching for embassy interviews.', features:['Mock interview sessions','Common Q&A guide','Presentation coaching','Embassy-specific tips'] },
  { icon:'🎓', title:'University Admissions', desc:'We partner with 100+ universities to help secure admission.', features:['University shortlisting','SOP & application writing','Scholarship guidance','Enrollment confirmation'] },
  { icon:'✈️', title:'Pre-Departure Support', desc:'We prepare you fully before you leave Pakistan.', features:['Arrival procedure walkthrough','Banking & SIM setup','Cultural orientation','Emergency contacts'] },
]

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id:1, name:'Zara Hussain', destination:'🇬🇧 UK Student Visa', text:'ISS made my UK student visa process completely stress-free. Their team guided me from university selection all the way to landing in London.', rating:5, is_active:true },
  { id:2, name:'Aisha Khan', destination:'🇮🇪 Ireland Student Visa', text:'ISS helped me secure my Irish study visa quickly and confidently. Their Ireland-focused team made the process easy and transparent.', rating:5, is_active:true },
  { id:3, name:'Fatima Akhtar', destination:'🇦🇺 Australia Student Visa', text:'The interview preparation sessions were incredible. I felt fully prepared and got my Australian visa approved. ISS team are true professionals.', rating:5, is_active:true },
]

function Counter({ end, suffix = '' }: { end: number | string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        if (typeof end !== 'number') { setCount(0); return }
        let current = 0
        const increment = end / 60
        const timer = setInterval(() => {
          current += increment
          if (current >= end) { setCount(end); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, 2000/60)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  return <div ref={ref}>{typeof end === 'string' ? end : count}{suffix}</div>
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function HomePage() {
  const [destinations, setDestinations] = useState<Destination[]>(DEFAULT_DESTINATIONS)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS)
  const [activeService, setActiveService] = useState(0)
  const [form, setForm] = useState({ name:'', email:'', phone:'', visa_type:'', destination:'', message:'' })
  const [submitting, setSubmitting] = useState(false)

  const whyRef = useReveal(); const destRef = useReveal()
  const svcRef = useReveal(); const procRef = useReveal()
  const testRef = useReveal(); const ctaRef = useReveal()

  useEffect(() => {
    getDestinations().then(r => setDestinations(r.data)).catch(() => {})
    getTestimonials().then(r => setTestimonials(r.data?.slice?.(0,3) || r.data)).catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setForm({ name:'', email:'', phone:'', visa_type:'', destination:'', message:'' }) }, 1000)
  }

  const S = SERVICES_DATA[activeService]

  return (
    <PublicLayout>
      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', padding:'0 24px' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', WebkitMaskImage:'radial-gradient(ellipse at center, black 20%, transparent 80%)' }} />

        <div style={{ maxWidth:700, position:'relative', zIndex:2, animation:'fadeUp 1s ease 0.2s both', paddingTop:100, width:'100%' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid rgba(201,168,76,0.3)', padding:'6px 14px', marginBottom:28, fontSize:11, letterSpacing:2, textTransform:'uppercase', color:'var(--gold)' }}>
            <span style={{ width:6, height:6, background:'var(--gold)', borderRadius:'50%', animation:'pulse-gold 2s infinite', display:'block', flexShrink:0 }} />
            SECP Registered · Pakistan
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,7vw,84px)', fontWeight:300, lineHeight:1.05, marginBottom:24, letterSpacing:-1 }}>
            Your Gateway<br />to a <em style={{ fontStyle:'italic', color:'var(--gold)' }}>World</em><br />of Possibilities
          </h1>
          <p style={{ fontSize:'clamp(14px,2vw,16px)', lineHeight:1.8, color:'var(--text-light)', maxWidth:500, marginBottom:40 }}>
            Instant Student Solution — Pakistan's trusted visa & student consultancy. SECP registered, expert-guided, and fully committed to your international success.
          </p>
          <div style={{ display:'flex', gap:14, alignItems:'center', flexWrap:'wrap' }}>
            <Link to="/contact" className="btn-primary">Begin Your Journey</Link>
            <Link to="/services" style={{ color:'var(--cream)', fontSize:12, letterSpacing:1, textTransform:'uppercase', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8 }}>
              Our Services →
            </Link>
          </div>

          {/* Mobile stats */}
          <div className="hero-stats-mobile lg:hidden">
            {[
              { num:98, suffix:'%', label:'Success Rate' },
              { num:500, suffix:'+', label:'Students Placed' },
              { num:5, suffix:'+', label:'Years Experience' },
              { num:20, suffix:'+', label:'Countries' },
            ].map((s,i) => (
              <div key={i} style={{ borderLeft:'2px solid var(--gold)', paddingLeft:16 }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,5vw,36px)', fontWeight:300, color:'var(--gold)', lineHeight:1 }}>
                  <Counter end={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize:10, letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop stats panel */}
        <div className="hidden lg:flex" style={{ position:'absolute', right:0, top:0, bottom:0, width:'38%', background:'linear-gradient(135deg, var(--dark3) 0%, var(--dark2) 100%)', clipPath:'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)', alignItems:'center' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:36, padding:'60px 60px 60px 80px' }}>
            {[
              { num:98, suffix:'%', label:'Visa Success Rate' },
              { num:500, suffix:'+', label:'Students Placed' },
              { num:5, suffix:'+', label:'Years Experience' },
              { num:20, suffix:'+', label:'Countries Covered' },
            ].map((s,i) => (
              <div key={i} style={{ borderLeft:'2px solid var(--gold)', paddingLeft:24 }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:48, fontWeight:300, color:'var(--gold)', lineHeight:1 }}>
                  <Counter end={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize:11, letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginTop:6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ISS ── */}
      <section style={{ padding:'80px 24px', background:'var(--dark)' }}>
        <div ref={whyRef} className="reveal">
          <div className="section-tag">Why Choose ISS</div>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,5vw,56px)', fontWeight:300, marginBottom:48 }}>
            Excellence in Every <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Application</em>
          </h2>
          {/* NO inline gridTemplateColumns - CSS class handles responsive */}
          <div className="why-grid-4">
            {[
              { icon:'🎯', title:'Expert Consultants', text:'SECP-registered firm with certified immigration specialists.' },
              { icon:'📋', title:'End-to-End Support', text:'From free assessment to visa approval and pre-departure briefing.' },
              { icon:'⚡', title:'Fast Processing', text:'Efficient document management to minimize delays.' },
              { icon:'🔒', title:'100% Transparent', text:'No hidden fees. Honest assessment and realistic timelines.' },
            ].map((c,i) => (
              <div key={i} style={{ background:'var(--dark3)', padding:'clamp(24px,4vw,40px) clamp(20px,3vw,28px)', position:'relative', overflow:'hidden', transition:'background 0.3s' }}>
                <div style={{ fontSize:32, marginBottom:20 }}>{c.icon}</div>
                <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(18px,2vw,20px)', marginBottom:10 }}>{c.title}</h3>
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.8 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section style={{ padding:'80px 24px', background:'var(--dark2)' }}>
        <div ref={destRef} className="reveal">
          <div className="section-tag">Popular Destinations</div>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,5vw,56px)', fontWeight:300, marginBottom:12 }}>
            Where Will Your <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Journey</em> Take You?
          </h2>
          <p style={{ fontSize:14, color:'var(--text-muted)', marginBottom:48, maxWidth:480 }}>
            ISS specialises in Ireland and Australia visa applications, with focused expertise for Pakistani students and professionals.
          </p>
          <div className="destinations-page-grid">
            {destinations.slice(0,5).map((d) => (
              <Link key={d.id} to={`/destinations/${d.slug}`} style={{
                position:'relative', background:'var(--dark3)',
                minHeight: 180,
                display:'flex', flexDirection:'column', justifyContent:'flex-end',
                padding:'clamp(16px,3vw,24px)', textDecoration:'none', overflow:'hidden', transition:'background 0.3s',
              }}>
                <div style={{ fontSize:28, marginBottom:6 }}>{d.flag}</div>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(18px,3vw,24px)', color:'var(--cream)', marginBottom:4 }}>{d.name}</div>
                <div style={{ fontSize:11, color:'var(--gold)', letterSpacing:1 }}>{d.visa_types.slice(0,3).join(' · ')}</div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:40 }}>
            <Link to="/destinations" className="btn-outline">View All Destinations</Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding:'80px 24px', background:'var(--dark)' }}>
        <div ref={svcRef} className="reveal">
          <div className="section-tag">Our Services</div>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,5vw,56px)', fontWeight:300, marginBottom:48 }}>
            Complete <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Visa</em> Solutions
          </h2>
          {/* NO inline gridTemplateColumns */}
          <div className="services-layout-grid" style={{ alignItems:'start' }}>
            <div>
              {SERVICES_DATA.map((s,i) => (
                <div key={i} onClick={() => setActiveService(i)} style={{ padding:'18px 0', borderBottom:'1px solid rgba(255,255,255,0.06)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, borderTop:i===0?'1px solid rgba(255,255,255,0.06)':'none' }}>
                  <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:12, color:activeService===i?'var(--gold)':'var(--text-muted)', minWidth:20 }}>{String(i+1).padStart(2,'0')}</span>
                  <span style={{ fontSize:13, color:activeService===i?'var(--cream)':'var(--text-light)', flex:1 }}>{s.title}</span>
                  <span style={{ color:'var(--gold)', opacity:activeService===i?1:0, transition:'opacity 0.3s' }}>→</span>
                </div>
              ))}
            </div>
            <div style={{ background:'var(--dark3)', padding:'clamp(24px,4vw,40px)', border:'1px solid rgba(201,168,76,0.08)', position:'relative', overflow:'hidden', minHeight:300 }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, var(--gold), transparent)' }} />
              <div key={activeService} style={{ animation:'fadeUp 0.4s ease' }}>
                <div style={{ fontSize:40, marginBottom:16 }}>{S.icon}</div>
                <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(20px,3vw,30px)', fontWeight:300, marginBottom:12 }}>{S.title}</h3>
                <p style={{ color:'var(--text-muted)', lineHeight:1.8, fontSize:13, marginBottom:20 }}>{S.desc}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {S.features.map((f,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'var(--text-light)' }}>
                      <div style={{ width:14, height:1, background:'var(--gold)', flexShrink:0 }} />{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding:'80px 24px', background:'var(--dark2)' }}>
        <div ref={procRef} className="reveal" style={{ textAlign:'center' }}>
          <div className="section-tag" style={{ justifyContent:'center' }}>How It Works</div>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,5vw,56px)', fontWeight:300, marginBottom:12 }}>
            Simple 5-Step <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Process</em>
          </h2>
          <p style={{ fontSize:14, color:'var(--text-muted)', maxWidth:440, margin:'0 auto 60px' }}>
            Our streamlined process ensures your application is handled with precision.
          </p>
          {/* NO inline gridTemplateColumns */}
          <div className="process-steps-grid">
            {[
              { icon:'📋', title:'Free Assessment', desc:'We evaluate your profile and goals.' },
              { icon:'📁', title:'Document Checklist', desc:'Personalized checklist and guidance.' },
              { icon:'✍️', title:'Application Filing', desc:'We prepare and submit your application.' },
              { icon:'🎤', title:'Interview Prep', desc:'Mock sessions for confidence.' },
              { icon:'✈️', title:'Visa & Departure', desc:'Visa approval + pre-departure briefing.' },
            ].map((s,i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'0 8px' }}>
                <div style={{ width:72, height:72, border:'1px solid rgba(201,168,76,0.3)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:20, background:'var(--dark2)', position:'relative', zIndex:1 }}>{s.icon}</div>
                <h4 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:16, marginBottom:8, color:'var(--cream)' }}>{s.title}</h4>
                <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:'80px 24px', background:'var(--dark)' }}>
        <div ref={testRef} className="reveal">
          <div className="section-tag">Success Stories</div>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,5vw,56px)', fontWeight:300, marginBottom:12 }}>
            Voices of Our <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Students</em>
          </h2>
          <p style={{ fontSize:14, color:'var(--text-muted)', marginBottom:48, maxWidth:440 }}>
            Hundreds of Pakistani students have achieved their international dreams through ISS.
          </p>
          {/* NO inline gridTemplateColumns */}
          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div key={t.id} style={{ background:'var(--dark3)', padding:'clamp(20px,4vw,32px)', border:'1px solid rgba(255,255,255,0.04)', position:'relative' }}>
                <div style={{ position:'absolute', top:20, right:24, fontFamily:'Cormorant Garamond, serif', fontSize:60, color:'rgba(201,168,76,0.1)', lineHeight:1 }}>"</div>
                <div style={{ display:'flex', gap:3, marginBottom:16 }}>
                  {'★★★★★'.split('').map((_,i) => <span key={i} style={{ color:'var(--gold)', fontSize:12 }}>★</span>)}
                </div>
                <p style={{ fontSize:13, color:'var(--text-light)', lineHeight:1.8, marginBottom:24, fontStyle:'italic' }}>{t.text}</p>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg, var(--gold) 0%, var(--dark4) 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Cormorant Garamond, serif', fontSize:16, color:'var(--dark)', flexShrink:0 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize:13, color:'var(--cream)', fontWeight:500 }}>{t.name}</div>
                    <div style={{ fontSize:11, color:'var(--gold)', letterSpacing:1, textTransform:'uppercase' }}>{t.destination}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section style={{ padding:'80px 24px', background:'var(--dark2)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        {/* NO inline gridTemplateColumns */}
        <div ref={ctaRef} className="reveal contact-layout-grid" style={{ position:'relative', zIndex:1 }}>
          <div>
            <div className="section-tag">Get In Touch</div>
            <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(24px,4vw,48px)', fontWeight:300, marginBottom:12 }}>
              Start Your <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Journey</em> Today
            </h2>
            <p style={{ fontSize:14, color:'var(--text-muted)', lineHeight:1.8, marginBottom:40 }}>
              Book a consultation with ISS and take the first step towards your international future.
            </p>
            {[
              { icon:'📍', label:'Office', value:'House No. 103, Block K, Sector 11½ Muhammadabad Feroz Shah Colony, Orangi Town, Karachi West, Sindh' },
              { icon:'📞', label:'Phone & WhatsApp', value:'+92 331 5690099' },
              { icon:'✉️', label:'Email', value:'info@instantstudentsolution.com' },
              { icon:'🕐', label:'Hours', value:'Mon – Sat, 10 AM – 6 PM' },
            ].map((c,i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:20 }}>
                <div style={{ width:40, height:40, border:'1px solid rgba(201,168,76,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', marginBottom:2 }}>{c.label}</div>
                  <div style={{ color:'var(--cream)', fontSize:13 }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* NO inline gridTemplateColumns */}
            <div className="form-row-2">
              <div>
                <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Full Name *</label>
                <input className="input-field" placeholder="Your name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Phone *</label>
                <input className="input-field" placeholder="+92 ___" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} required />
              </div>
            </div>
            <div>
              <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Email *</label>
              <input className="input-field" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required />
            </div>
            <div className="form-row-2">
              <div>
                <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Visa Type</label>
                <select className="input-field" value={form.visa_type} onChange={e => setForm({...form,visa_type:e.target.value})}>
                  <option value="">Select</option>
                  {['Student Visa','Work Visa','PR','Visit Visa','Business Visa'].map(v=><option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Destination</label>
                <select className="input-field" value={form.destination} onChange={e => setForm({...form,destination:e.target.value})}>
                  <option value="">Select</option>
                  {['Ireland','Australia','United Kingdom','Other'].map(v=><option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:6 }}>Message</label>
              <textarea className="input-field" rows={4} placeholder="Tell us about your situation..." value={form.message} onChange={e => setForm({...form,message:e.target.value})} />
            </div>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Request Consultation →'}
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  )
}
