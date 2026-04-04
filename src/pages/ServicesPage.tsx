import { Link } from 'react-router-dom'
import PublicLayout from '@/components/layout/PublicLayout'
import { useReveal } from '@/hooks/useReveal'

const services = [
  { icon:'🎯', slug:'visa-counselling', title:'Visa Assessment & Counselling', desc:'A thorough evaluation of your profile to determine the most suitable visa category.', features:['Free initial consultation','Eligibility assessment','Alternative pathways','Realistic timeline estimation','Written summary report'] },
  { icon:'📁', slug:'document-preparation', title:'Document Preparation', desc:'We create a detailed, personalized checklist and guide you through every required document.', features:['Personalized document checklist','Notarization guidance','Translation services','Document gap analysis','Pre-submission review'] },
  { icon:'✍️', slug:'application-processing', title:'Application Processing', desc:'Our experts handle the complete application process from forms to appointments.', features:['Full form completion','Online portal management','Biometric booking','Courier management','Real-time updates'] },
  { icon:'🎤', slug:'interview-prep', title:'Interview Preparation', desc:'Structured coaching sessions to build confidence for embassy interviews.', features:['Mock interview sessions','Common Q&A guide','Body language coaching','Dress code guidance','Industry-specific prep'] },
  { icon:'🎓', slug:'student-admissions', title:'Student Admissions', desc:'We partner with 200+ universities to match students with the right programs.', features:['University shortlisting','SOP writing','Application follow-up','Scholarship assistance','Enrollment support'] },
  { icon:'🏠', slug:'accommodation', title:'Accommodation Guidance', desc:'We connect students with trusted accommodation providers.', features:['University residences','Private accommodation','Area safety analysis','Shared housing coordination','Arrival support'] },
  { icon:'💼', slug:'work-permits', title:'Work Permit Services', desc:'Comprehensive support through every step of the work permit application.', features:['Employer sponsorship','LMIA assistance','Skills assessment','Points optimization','Post-arrival support'] },
  { icon:'🌍', slug:'pr-applications', title:'Permanent Residency', desc:'Expert guidance through complex PR pathways including Express Entry.', features:['PR eligibility assessment','Express Entry optimization','Points maximization','PNP guidance','Citizenship planning'] },
  { icon:'✈️', slug:'pre-departure', title:'Pre-Departure Briefing', desc:'Comprehensive briefing to ensure you are fully prepared for life abroad.', features:['Arrival procedures','Banking setup','Cultural briefing','Healthcare registration','Emergency contacts'] },
]

export default function ServicesPage() {
  const r1 = useReveal(), r2 = useReveal()
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="section-pad-lg" style={{ paddingTop:140, paddingBottom:80, background:'var(--dark)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <div style={{ maxWidth:700, position:'relative', zIndex:1 }}>
          <div className="section-tag">Our Services</div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,6vw,80px)', fontWeight:300, lineHeight:1.05, marginBottom:28 }}>
            Complete <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Visa</em><br />Solutions
          </h1>
          <p style={{ fontSize:'clamp(14px,2vw,17px)', color:'var(--text-light)', lineHeight:1.9, maxWidth:560 }}>
            From first assessment to your flight — every service you need for a successful international journey.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ padding:'60px 24px 80px', background:'var(--dark)' }}>
        <div ref={r1} className="reveal">
          <div className="services-page-grid">
            {services.map((s, i) => (
              <Link key={i} to={`/services/${s.slug}`} style={{ background:'var(--dark3)', padding:'clamp(28px,4vw,44px) clamp(24px,3vw,40px)', position:'relative', overflow:'hidden', border:'1px solid rgba(255,255,255,0.03)', transition:'border-color 0.3s', textDecoration:'none', display:'block' }}>
                <div style={{ position:'absolute', top:24, right:24, color:'var(--gold)', fontSize:18, opacity:0.4 }}>↗</div>
                <div style={{ fontSize:40, marginBottom:20 }}>{s.icon}</div>
                <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(20px,3vw,26px)', fontWeight:300, marginBottom:14, color:'var(--cream)' }}>{s.title}</h3>
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.8, marginBottom:24 }}>{s.desc}</p>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                  {s.features.map((f, j) => (
                    <li key={j} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'var(--text-light)' }}>
                      <div style={{ width:14, height:1, background:'var(--gold)', flexShrink:0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad-lg" style={{ paddingTop:80, paddingBottom:80, background:'var(--dark2)', textAlign:'center' }}>
        <div ref={r2} className="reveal">
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,4vw,52px)', fontWeight:300, marginBottom:16 }}>
            Not Sure Which Service <em style={{ fontStyle:'italic', color:'var(--gold)' }}>You Need?</em>
          </h2>
          <p style={{ fontSize:15, color:'var(--text-muted)', marginBottom:40, maxWidth:480, margin:'0 auto 40px' }}>
            Book a consultation and our advisors will guide you.
          </p>
          <Link to="/contact" className="btn-primary">Book Consultation</Link>
        </div>
      </section>
    </PublicLayout>
  )
}
