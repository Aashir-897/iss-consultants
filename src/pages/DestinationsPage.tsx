import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '@/components/layout/PublicLayout'
import { getDestinations, Destination } from '@/lib/api'
import { useReveal } from '@/hooks/useReveal'

const DEFAULT: Destination[] = [
  { id:1, name:'United Kingdom', slug:'united-kingdom', flag:'🇬🇧', visa_types:['Student','Work','Settlement','Visit'], description:'The UK remains one of the top destinations for Pakistani nationals. World-class universities and career opportunities.', is_active:true },
  { id:2, name:'Canada', slug:'canada', flag:'🇨🇦', visa_types:['PR','Express Entry','Student','Work'], description:'Canada\'s points-based immigration system is among the most accessible in the world.', is_active:true },
  { id:3, name:'Australia', slug:'australia', flag:'🇦🇺', visa_types:['Student','Skilled Migration','Work','Visit'], description:'Australia\'s skilled migration program actively seeks talented professionals.', is_active:true },
  { id:4, name:'United States', slug:'united-states', flag:'🇺🇸', visa_types:['Student','B1/B2','Work','H1B'], description:'The USA remains a dream destination. From Ivy League to Silicon Valley careers.', is_active:true },
  { id:5, name:'Schengen Europe', slug:'schengen', flag:'🇪🇺', visa_types:['Tourist','Student','Work'], description:'Access to 26 European countries with a single visa.', is_active:true },
  { id:6, name:'Ireland', slug:'ireland', flag:'🇮🇪', visa_types:['Student','Work','Critical Skills'], description:'Ireland\'s booming tech sector and English-speaking environment.', is_active:true },
  { id:7, name:'New Zealand', slug:'new-zealand', flag:'🇳🇿', visa_types:['Skilled Migrant','Student','Work'], description:'New Zealand offers a skilled migrant pathway and high quality of life.', is_active:true },
  { id:8, name:'Malaysia', slug:'malaysia', flag:'🇲🇾', visa_types:['Student','Work','MM2H'], description:'A budget-friendly option with excellent universities.', is_active:true },
]

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>(DEFAULT)
  const r1 = useReveal()

  useEffect(() => {
    getDestinations().then(r => { if (r.data?.length) setDestinations(r.data) }).catch(() => {})
  }, [])

  return (
    <PublicLayout>
      <section style={{ padding:'140px 24px 60px', background:'var(--dark)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 60% at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <div style={{ maxWidth:700, position:'relative', zIndex:1 }}>
          <div className="section-tag">Destinations</div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,6vw,80px)', fontWeight:300, lineHeight:1.05, marginBottom:24 }}>
            Your <em style={{ fontStyle:'italic', color:'var(--gold)' }}>World</em> Awaits
          </h1>
          <p style={{ fontSize:'clamp(14px,2vw,17px)', color:'var(--text-light)', lineHeight:1.9, maxWidth:560 }}>
            Expert visa consultancy for Pakistan's most sought-after international destinations.
          </p>
        </div>
      </section>

      <section style={{ padding:'40px 24px 80px', background:'var(--dark)' }}>
        <div ref={r1} className="reveal">
          {/* NO inline gridTemplateColumns */}
          <div className="destinations-page-grid">
            {destinations.filter(d => d.is_active).map(d => (
              <Link key={d.id} to={`/destinations/${d.slug}`} style={{ background:'var(--dark3)', padding:'clamp(28px,4vw,44px) clamp(24px,3vw,40px)', textDecoration:'none', display:'block', border:'1px solid rgba(255,255,255,0.03)', transition:'all 0.3s', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:24, right:24, color:'var(--gold)', fontSize:18, opacity:0.4 }}>↗</div>
                <div style={{ fontSize:48, marginBottom:20 }}>{d.flag}</div>
                <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(22px,3vw,28px)', fontWeight:300, color:'var(--cream)', marginBottom:12 }}>{d.name}</h2>
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.8, marginBottom:24 }}>{d.description.substring(0,120)}...</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {d.visa_types.map(v => (
                    <span key={v} style={{ fontSize:10, padding:'4px 10px', border:'1px solid rgba(201,168,76,0.2)', color:'var(--gold)', letterSpacing:1, textTransform:'uppercase' }}>{v}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
