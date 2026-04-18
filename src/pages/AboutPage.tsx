import PublicLayout from '@/components/layout/PublicLayout'
import { Link } from 'react-router-dom'
import { useReveal } from '@/hooks/useReveal'

const team = [
  { name:'Farzan Ahmed', role:'Founder & Director', exp:'Visionary leader with strong visa and business strategy experience', initial:'F' },
  { name:'Usama Alam', role:'Founder & Director', exp:'Specialist in Ireland and Australia visa pathways', initial:'U' },
  { name:'Muhammad Kamran', role:'Lead Consultant & Student Advisor', exp:'Lead consultant for student visa strategy', initial:'M' },
  { name:'Nida Rehman', role:'Documentation Head', exp:'Zero rejection record', initial:'N' },
]

const milestones = [
  { year:'2020', event:'Instant Student Solution founded with a vision to make quality international education accessible.' },
  { year:'2021', event:'Placed first 50 students abroad across UK, Ireland, and Australia.' },
  { year:'2022', event:'Expanded to include PR applications and work permits. 100+ visa approvals.' },
  { year:'2023', event:'Opened office in Karachi. 50+ university partners. 95%+ success rate.' },
  { year:'2024', event:'Crossed 500+ successful placements, with growing specialization in Ireland and Australia.' },
  { year:'2026', event:'Officially incorporated under Companies Act 2017. CUIN: 0330889.' },
]

export default function AboutPage() {
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal()
  return (
    <PublicLayout>
      <section style={{ padding:'140px 24px 80px', background:'var(--dark)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 60% at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <div style={{ maxWidth:800, position:'relative', zIndex:1 }}>
          <div className="section-tag">About ISS</div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,6vw,76px)', fontWeight:300, lineHeight:1.05, marginBottom:24 }}>
            Connecting Pakistan<br />to the <em style={{ fontStyle:'italic', color:'var(--gold)' }}>World</em>
          </h1>
          <p style={{ fontSize:'clamp(14px,2vw,16px)', color:'var(--text-light)', lineHeight:1.9, maxWidth:600 }}>
            Instant Student Solution (Pvt) Ltd is a SECP-registered visa and student consultancy firm. CUIN: 0330889.
          </p>
          <div style={{ marginTop:28, display:'inline-flex', alignItems:'center', gap:10, background:'rgba(201,168,76,0.08)', border:'1px solid rgba(201,168,76,0.2)', padding:'12px 20px', flexWrap:'wrap' }}>
            <span style={{ fontSize:20 }}>🏛️</span>
            <div>
              <div style={{ fontSize:11, letterSpacing:2, color:'var(--gold)', textTransform:'uppercase' }}>SECP Verified Company</div>
              <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>CUIN: 0330889 · Companies Act, 2017</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission - NO inline gridTemplateColumns */}
      <section style={{ padding:'80px 24px', background:'var(--dark2)' }}>
        <div ref={r1} className="reveal mission-grid">
          <div>
            <div className="section-tag">Our Mission</div>
            <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(24px,4vw,48px)', fontWeight:300, marginBottom:20 }}>
              Making Global <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Opportunities</em> Accessible
            </h2>
            <p style={{ fontSize:14, color:'var(--text-muted)', lineHeight:1.9, marginBottom:16 }}>
              We believe every talented Pakistani student deserves a fair chance at an international education.
            </p>
            <p style={{ fontSize:14, color:'var(--text-muted)', lineHeight:1.9, marginBottom:36 }}>
              We operate with complete transparency and hold SECP registration as a mark of our commitment.
            </p>
            <Link to="/contact" className="btn-primary">Work With Us</Link>
          </div>
          {/* NO inline gridTemplateColumns */}
          <div className="stats-2x2">
            {[
              { num:'98%', label:'Success Rate' },
              { num:'500+', label:'Students Placed' },
              { num:'5+', label:'Years Experience' },
              { num:'20+', label:'Countries' },
            ].map((s,i) => (
              <div key={i} style={{ background:'var(--dark3)', padding:'clamp(20px,3vw,28px) clamp(16px,2vw,22px)', borderLeft:'2px solid var(--gold)' }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,5vw,40px)', fontWeight:300, color:'var(--gold)', lineHeight:1, marginBottom:6 }}>{s.num}</div>
                <div style={{ fontSize:10, letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - NO inline gridTemplateColumns */}
      <section style={{ padding:'80px 24px', background:'var(--dark)' }}>
        <div ref={r2} className="reveal">
          <div className="section-tag">Our Team</div>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(24px,4vw,48px)', fontWeight:300, marginBottom:12 }}>
            The Experts Behind <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Your Success</em>
          </h2>
          <p style={{ fontSize:14, color:'var(--text-muted)', marginBottom:48, maxWidth:440 }}>
            Our certified consultants bring years of combined experience.
          </p>
          <div className="team-grid">
            {team.map((m,i) => (
              <div key={i} style={{ background:'var(--dark3)', padding:'clamp(24px,4vw,36px) clamp(20px,3vw,28px)', textAlign:'center' }}>
                <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg, var(--gold) 0%, var(--dark4) 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Cormorant Garamond, serif', fontSize:28, color:'var(--dark)', margin:'0 auto 20px' }}>{m.initial}</div>
                <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(16px,2vw,20px)', marginBottom:4 }}>{m.name}</h3>
                <p style={{ fontSize:11, color:'var(--gold)', letterSpacing:1, textTransform:'uppercase', marginBottom:8 }}>{m.role}</p>
                <p style={{ fontSize:12, color:'var(--text-muted)' }}>{m.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding:'80px 24px', background:'var(--dark2)' }}>
        <div ref={r3} className="reveal">
          <div className="section-tag">Our Journey</div>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(24px,4vw,48px)', fontWeight:300, marginBottom:52 }}>
            Growing with <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Every Student</em>
          </h2>
          <div style={{ position:'relative', paddingLeft:32 }}>
            <div style={{ position:'absolute', left:0, top:0, bottom:0, width:1, background:'linear-gradient(180deg, var(--gold), transparent)' }} />
            {milestones.map((m,i) => (
              <div key={i} style={{ marginBottom:40, position:'relative' }}>
                <div style={{ position:'absolute', left:-36, top:4, width:10, height:10, borderRadius:'50%', background:'var(--gold)', border:'2px solid var(--dark2)' }} />
                <div style={{ fontSize:11, letterSpacing:2, color:'var(--gold)', textTransform:'uppercase', marginBottom:6 }}>{m.year}</div>
                <p style={{ fontSize:13, color:'var(--text-light)', lineHeight:1.7, maxWidth:520 }}>{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'80px 24px', background:'var(--dark)', textAlign:'center' }}>
        <div ref={r4} className="reveal">
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,5vw,60px)', fontWeight:300, marginBottom:16 }}>
            Ready to Begin Your <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Journey?</em>
          </h2>
          <p style={{ fontSize:14, color:'var(--text-muted)', marginBottom:40, maxWidth:440, margin:'0 auto 40px' }}>
            Schedule a consultation today.
          </p>
          <Link to="/contact" className="btn-primary">Get Consultation</Link>
        </div>
      </section>
    </PublicLayout>
  )
}
