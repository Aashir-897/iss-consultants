import { useParams, Link } from 'react-router-dom'
import PublicLayout from '@/components/layout/PublicLayout'
import { useReveal } from '@/hooks/useReveal'

const destinationsData: Record<string, {
  name: string; flag: string; description: string;
  visa_types: { name: string; desc: string; requirements: string[]; processing: string }[];
  overview: string; whyChoose: string[];
  stats: { label: string; value: string }[];
}> = {
  'united-kingdom': {
    name: 'United Kingdom', flag: '🇬🇧',
    description: 'The UK remains one of the strongest destinations for study and work visas from Pakistan.',
    overview: 'The United Kingdom offers top universities, strong post-study work options, and a well-established student support network. It remains a top choice for Pakistani students seeking quality education and career growth.',
    whyChoose: ['World-renowned universities ranked globally', 'Post-study work visa (Graduate Route) for 2-3 years', 'Multicultural society with large Pakistani diaspora', 'Strong healthcare system (NHS)', 'Clear pathways to work and settlement'],
    stats: [
      { label: 'Pakistani Students/Year', value: '15,000+' },
      { label: 'Partner Universities', value: '50+' },
      { label: 'Visa Success Rate', value: '94%' },
      { label: 'Avg Processing Time', value: '3-4 Weeks' },
    ],
    visa_types: [
      { name: 'Student Visa (Tier 4)', desc: 'For full-time courses at licensed institutions.', requirements: ['CAS from licensed sponsor', 'English proficiency (IELTS/PTE)', 'Financial evidence (£1,334/month London)', 'TB test certificate', 'Valid passport'], processing: '3-4 weeks' },
      { name: 'Skilled Worker Visa', desc: 'For professionals with a UK job offer.', requirements: ['Job offer from licensed sponsor', 'Certificate of Sponsorship', 'Minimum salary threshold', 'English proficiency', 'Maintenance funds'], processing: '3-8 weeks' },
      { name: 'Visit Visa', desc: 'For tourism, business visits, or family visits.', requirements: ['Travel itinerary', 'Proof of accommodation', 'Financial evidence', 'Employment letter', 'Bank statements (6 months)'], processing: '2-3 weeks' },
      { name: 'Settlement Visa', desc: 'For joining family members settled in the UK.', requirements: ['Sponsoring partner/family details', 'English language test (A1)', 'Financial requirement (£18,600+)', 'Accommodation proof', 'Relationship evidence'], processing: '8-12 weeks' },
    ],
  },
  'australia': {
    name: 'Australia', flag: '🇦🇺',
    description: 'Australia is a strong second focus with excellent student and skilled migration pathways.',
    overview: 'Australia combines world-class education with a relaxed lifestyle and strong demand for skilled workers. Its student and migration programs are ideal for Pakistani applicants who are seeking practical visa routes and quality living standards.',
    whyChoose: ['Top universities (Group of Eight)', 'Post-study work visa up to 4 years', 'Points-based skilled migration', 'High standard of living', 'Supportive visa application guidance'],
    stats: [
      { label: 'Pakistani Students/Year', value: '12,000+' },
      { label: 'Partner Universities', value: '40+' },
      { label: 'Visa Success Rate', value: '89%' },
      { label: 'Avg Processing Time', value: '4-6 Weeks' },
    ],
    visa_types: [
      { name: 'Student Visa (Subclass 500)', desc: 'For studying at Australian institutions.', requirements: ['CoE from institution', 'GTE statement', 'English proficiency (IELTS 6.0+)', 'Financial capacity', 'OSHC health insurance'], processing: '4-6 weeks' },
      { name: 'Skilled Independent (189)', desc: 'Points-based PR without sponsorship.', requirements: ['Skills assessment', 'Points test (65+)', 'English proficiency', 'Age under 45', 'Occupation on skilled list'], processing: '6-12 months' },
      { name: 'Employer Sponsored (482)', desc: 'Temporary skill shortage visa.', requirements: ['Employer nomination', 'Skills assessment', 'English proficiency', 'Work experience (2+ years)', 'Health & character checks'], processing: '1-4 months' },
      { name: 'Visitor Visa (600)', desc: 'For tourism or business visits.', requirements: ['Travel purpose proof', 'Financial capacity', 'Health insurance', 'Return ticket', 'Ties to home country'], processing: '2-4 weeks' },
    ],
  },
  'ireland': {
    name: 'Ireland', flag: '🇮🇪',
    description: 'Ireland is our core specialization, especially for student visas and critical skills work permits.',
    overview: 'Ireland is Europe\'s English-speaking tech hub, hosting the regional offices of many global giants. Our team specializes in Irish study visas, critical skills permits, and post-study work pathways, helping Pakistani clients secure fast and reliable approvals.',
    whyChoose: ['Specialized Ireland visa expertise', 'English-speaking country with strong tech growth', 'Stay Back visa (1-2 years post-study)', 'Gateway to EU employment opportunities', 'Fast, transparent guidance for Pakistani applicants'],
    stats: [
      { label: 'Pakistani Students/Year', value: '3,000+' },
      { label: 'Partner Universities', value: '20+' },
      { label: 'Visa Success Rate', value: '90%' },
      { label: 'Avg Processing Time', value: '4-8 Weeks' },
    ],
    visa_types: [
      { name: 'Study Visa', desc: 'For courses longer than 3 months.', requirements: ['Letter of acceptance', 'Proof of fees paid', 'Financial evidence (€10,000)', 'Health insurance', 'English proficiency'], processing: '4-8 weeks' },
      { name: 'Critical Skills Permit', desc: 'For highly skilled professionals.', requirements: ['Job offer (€64,000+ salary)', 'Relevant qualifications', 'Employer registration', 'Experience proof', 'Police clearance'], processing: '4-6 weeks' },
      { name: 'General Work Permit', desc: 'For workers in eligible occupations.', requirements: ['Job offer (€34,000+ salary)', 'Labour market test', 'Qualifications proof', 'Employer compliance', 'Health insurance'], processing: '4-8 weeks' },
    ],
  },
}

export default function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const dest = slug ? destinationsData[slug] : null
  const r1 = useReveal(), r2 = useReveal()

  if (!dest) {
    return (
      <PublicLayout>
        <section style={{ padding: '180px 24px 80px', background: 'var(--dark)', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 300, marginBottom: 20 }}>
            Destination Not Found
          </h1>
          <Link to="/destinations" className="btn-primary">View All Destinations</Link>
        </section>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ padding: '140px 24px 60px', background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: 800, position: 'relative', zIndex: 1 }}>
          <Link to="/destinations" style={{ fontSize: 12, color: 'var(--gold)', textDecoration: 'none', letterSpacing: 1.5, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            ← All Destinations
          </Link>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{dest.flag}</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,6vw,72px)', fontWeight: 300, lineHeight: 1.05, marginBottom: 20 }}>
            {dest.name}
          </h1>
          <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: 'var(--text-light)', lineHeight: 1.9, maxWidth: 600 }}>
            {dest.description}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--dark2)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="stats-detail-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          {dest.stats.map((s, i) => (
            <div key={i} style={{ padding: '32px 0', textAlign: 'center', borderRight: i < dest.stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 300, color: 'var(--gold)', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: '60px 24px', background: 'var(--dark)' }}>
        <div ref={r1} className="reveal" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="detail-two-col">
            <div>
              <div className="section-tag">Overview</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 300, marginBottom: 20 }}>
                Why Choose <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{dest.name}</em>?
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.9 }}>{dest.overview}</p>
            </div>
            <div>
              <h3 style={{ fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Key Benefits</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {dest.whyChoose.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>
                    <div style={{ width: 16, height: 1, background: 'var(--gold)', flexShrink: 0, marginTop: 10 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Types */}
      <section style={{ padding: '60px 24px 80px', background: 'var(--dark)' }}>
        <div ref={r2} className="reveal" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="section-tag">Visa Categories</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 300, marginBottom: 40 }}>
            Available <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Visa Types</em>
          </h2>
          <div className="visa-types-grid">
            {dest.visa_types.map((v, i) => (
              <div key={i} style={{ background: 'var(--dark3)', padding: 'clamp(24px,3vw,40px)', border: '1px solid rgba(255,255,255,0.03)', transition: 'border-color 0.3s' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 300, marginBottom: 8, color: 'var(--cream)' }}>{v.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>{v.desc}</p>
                <div style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
                  Processing: {v.processing}
                </div>
                <h4 style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>Requirements</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {v.requirements.map((r, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--text-light)' }}>
                      <div style={{ width: 12, height: 1, background: 'var(--gold)', flexShrink: 0 }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'var(--dark2)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 300, marginBottom: 16 }}>
          Ready for <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{dest.name}</em>?
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
          Book a consultation with our {dest.name} visa specialists today.
        </p>
        <Link to="/contact" className="btn-primary">Book Consultation</Link>
      </section>
    </PublicLayout>
  )
}
