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
    description: 'The UK remains one of the top destinations for Pakistani nationals seeking world-class education and career opportunities.',
    overview: 'The United Kingdom offers exceptional educational institutions, a thriving job market, and a multicultural society. With universities like Oxford, Cambridge, and Imperial College, the UK attracts thousands of Pakistani students every year. Post-study work visas allow graduates to stay and build careers.',
    whyChoose: ['World-renowned universities ranked globally', 'Post-study work visa (Graduate Route) for 2-3 years', 'Multicultural society with large Pakistani diaspora', 'Strong healthcare system (NHS)', 'Pathway to settlement after 5 years'],
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
  'canada': {
    name: 'Canada', flag: '🇨🇦',
    description: 'Canada\'s points-based immigration system is among the most accessible and welcoming in the world.',
    overview: 'Canada consistently ranks as one of the best countries for immigrants. With programs like Express Entry and Provincial Nominee Programs, Canada offers clear pathways to permanent residency. The country boasts excellent universities, a strong economy, and a high quality of life.',
    whyChoose: ['Express Entry system for fast PR processing', 'Post-Graduation Work Permit (PGWP) up to 3 years', 'Pathway to Canadian citizenship', 'Free healthcare system', 'Safe and welcoming multicultural society'],
    stats: [
      { label: 'Pakistani Students/Year', value: '20,000+' },
      { label: 'Partner Institutions', value: '80+' },
      { label: 'Visa Success Rate', value: '91%' },
      { label: 'Avg Processing Time', value: '4-8 Weeks' },
    ],
    visa_types: [
      { name: 'Study Permit', desc: 'For international students at DLIs.', requirements: ['Letter of Acceptance from DLI', 'Proof of funds (CAD 20,635/year)', 'Language proficiency', 'Medical exam', 'Police clearance'], processing: '4-8 weeks' },
      { name: 'Express Entry (PR)', desc: 'Points-based PR for skilled workers.', requirements: ['CRS score calculation', 'Language test (IELTS/CELPIP)', 'Educational Credential Assessment', 'Work experience proof', 'Police clearance'], processing: '6-8 months' },
      { name: 'Work Permit', desc: 'For workers with Canadian job offers.', requirements: ['Valid job offer', 'LMIA (if required)', 'Qualifications proof', 'Language proficiency', 'Medical exam'], processing: '4-12 weeks' },
      { name: 'Provincial Nominee (PNP)', desc: 'Province-specific immigration programs.', requirements: ['Provincial nomination', 'Meet program criteria', 'Settlement funds', 'Language proficiency', 'Education credentials'], processing: '6-18 months' },
    ],
  },
  'australia': {
    name: 'Australia', flag: '🇦🇺',
    description: 'Australia\'s skilled migration program actively seeks talented professionals and international students.',
    overview: 'Australia combines world-class education with a relaxed lifestyle and strong economy. The country\'s skilled migration program is designed to attract global talent, and its universities consistently rank among the world\'s best. Post-study work rights make it an attractive destination for Pakistani students.',
    whyChoose: ['Top universities (Group of Eight)', 'Post-study work visa up to 4 years', 'High minimum wage and quality of life', 'Points-based skilled migration', 'Beautiful climate and lifestyle'],
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
  'united-states': {
    name: 'United States', flag: '🇺🇸',
    description: 'The USA remains a dream destination with Ivy League universities and Silicon Valley career opportunities.',
    overview: 'The United States is home to the world\'s most prestigious universities and a dynamic job market. From Ivy League schools to tech hubs like Silicon Valley, the US offers unparalleled opportunities. OPT and H-1B pathways allow international students to build careers after graduation.',
    whyChoose: ['World\'s top-ranked universities', 'OPT work authorization (1-3 years)', 'H-1B visa pathway for professionals', 'Diverse culture and experiences', 'Strong alumni networks globally'],
    stats: [
      { label: 'Pakistani Students/Year', value: '10,000+' },
      { label: 'Partner Universities', value: '60+' },
      { label: 'Visa Success Rate', value: '85%' },
      { label: 'Avg Processing Time', value: '2-4 Weeks' },
    ],
    visa_types: [
      { name: 'F-1 Student Visa', desc: 'For academic studies at US institutions.', requirements: ['I-20 from SEVP school', 'SEVIS fee payment', 'Financial evidence', 'English proficiency (TOEFL/IELTS)', 'Embassy interview'], processing: '2-4 weeks' },
      { name: 'B1/B2 Visitor Visa', desc: 'For business or tourism visits.', requirements: ['DS-160 form', 'Embassy interview', 'Financial proof', 'Travel itinerary', 'Ties to home country'], processing: '2-4 weeks' },
      { name: 'H-1B Work Visa', desc: 'For specialty occupation workers.', requirements: ['US employer sponsorship', 'Bachelor\'s degree minimum', 'Specialty occupation proof', 'LCA approval', 'Lottery selection'], processing: '3-6 months' },
      { name: 'J-1 Exchange Visa', desc: 'For exchange visitor programs.', requirements: ['DS-2019 form', 'Program sponsor', 'English proficiency', 'Financial support', 'Home residency requirement'], processing: '2-4 weeks' },
    ],
  },
  'schengen': {
    name: 'Schengen Europe', flag: '🇪🇺',
    description: 'Access to 26 European countries with a single Schengen visa for tourism, study, or business.',
    overview: 'The Schengen Area comprises 26 European countries that allow free movement with a single visa. From the Eiffel Tower in Paris to the canals of Amsterdam, a Schengen visa opens doors to incredible travel, study, and business opportunities across Europe.',
    whyChoose: ['Access to 26 countries with one visa', 'World-class European universities', 'Rich cultural experiences', 'Strong healthcare systems', 'Diverse career opportunities'],
    stats: [
      { label: 'Countries Covered', value: '26' },
      { label: 'Pakistani Travelers/Year', value: '25,000+' },
      { label: 'Visa Success Rate', value: '88%' },
      { label: 'Avg Processing Time', value: '2-3 Weeks' },
    ],
    visa_types: [
      { name: 'Tourist Visa (Type C)', desc: 'Short-stay visa for tourism up to 90 days.', requirements: ['Travel itinerary', 'Hotel bookings', 'Travel insurance (€30,000)', 'Financial proof', 'Return flight booking'], processing: '2-3 weeks' },
      { name: 'Student Visa (Type D)', desc: 'Long-stay visa for studies in Europe.', requirements: ['University admission letter', 'Proof of funds', 'Health insurance', 'Accommodation proof', 'Language proficiency'], processing: '4-8 weeks' },
      { name: 'Business Visa', desc: 'For business meetings and conferences.', requirements: ['Invitation letter from EU company', 'Business registration', 'Financial proof', 'Travel insurance', 'Return flight'], processing: '2-3 weeks' },
      { name: 'Work Visa', desc: 'For employment in Schengen countries.', requirements: ['Job contract from EU employer', 'Work permit approval', 'Qualifications proof', 'Health insurance', 'Accommodation proof'], processing: '4-12 weeks' },
    ],
  },
  'ireland': {
    name: 'Ireland', flag: '🇮🇪',
    description: 'Ireland\'s booming tech sector and English-speaking environment make it ideal for students and professionals.',
    overview: 'Ireland has emerged as Europe\'s tech hub, hosting headquarters of Google, Facebook, Apple, and many more. Its English-speaking environment, welcoming culture, and strong economy make it an increasingly popular destination for Pakistani students and professionals.',
    whyChoose: ['Europe\'s Silicon Valley (tech giants HQ)', 'English-speaking country', 'Stay Back visa (1-2 years post-study)', 'Gateway to EU job market', 'Friendly and safe society'],
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
  'new-zealand': {
    name: 'New Zealand', flag: '🇳🇿',
    description: 'New Zealand offers a skilled migrant pathway, world-class education, and the highest quality of life.',
    overview: 'New Zealand is known for its stunning landscapes, excellent education system, and welcoming immigration policies. The country actively seeks skilled migrants and international students, offering clear pathways to residency and citizenship.',
    whyChoose: ['Skilled Migrant Category for PR', 'Post-study work visa (1-3 years)', 'Safe and peaceful society', 'World-class quality of life', 'Beautiful natural environment'],
    stats: [
      { label: 'Pakistani Students/Year', value: '2,500+' },
      { label: 'Partner Institutions', value: '15+' },
      { label: 'Visa Success Rate', value: '92%' },
      { label: 'Avg Processing Time', value: '4-6 Weeks' },
    ],
    visa_types: [
      { name: 'Student Visa', desc: 'For studying at NZ institutions.', requirements: ['Offer of place', 'Proof of funds (NZ$20,000/year)', 'English proficiency', 'Health insurance', 'Police clearance'], processing: '4-6 weeks' },
      { name: 'Skilled Migrant (SMC)', desc: 'Points-based resident visa.', requirements: ['Points assessment (160+)', 'Job offer or skilled employment', 'Qualifications assessment', 'English proficiency', 'Health & character'], processing: '6-12 months' },
      { name: 'Essential Skills Work Visa', desc: 'For workers with NZ job offers.', requirements: ['Job offer from NZ employer', 'Skills match', 'Labour market test', 'Health insurance', 'Police clearance'], processing: '4-8 weeks' },
    ],
  },
  'malaysia': {
    name: 'Malaysia', flag: '🇲🇾',
    description: 'A budget-friendly option with excellent universities and a vibrant multicultural society.',
    overview: 'Malaysia offers quality education at affordable costs, making it an increasingly popular destination for Pakistani students. The country\'s multicultural society, halal food availability, and Muslim-friendly environment make it a comfortable choice. Several Malaysian universities rank among Asia\'s best.',
    whyChoose: ['Affordable tuition and living costs', 'Muslim-friendly environment', 'Halal food widely available', 'Internationally recognized degrees', 'Strategic location in Southeast Asia'],
    stats: [
      { label: 'Pakistani Students/Year', value: '5,000+' },
      { label: 'Partner Universities', value: '25+' },
      { label: 'Visa Success Rate', value: '95%' },
      { label: 'Avg Processing Time', value: '2-4 Weeks' },
    ],
    visa_types: [
      { name: 'Student Pass', desc: 'For full-time students at Malaysian institutions.', requirements: ['University acceptance letter', 'Financial proof', 'Medical examination', 'Passport validity (18+ months)', 'Academic transcripts'], processing: '2-4 weeks' },
      { name: 'Employment Pass', desc: 'For professionals with Malaysian job offers.', requirements: ['Job offer letter', 'Minimum salary (RM5,000+)', 'Qualifications proof', 'Company sponsorship', 'Medical examination'], processing: '4-8 weeks' },
      { name: 'MM2H Visa', desc: 'Malaysia My Second Home long-term visa.', requirements: ['Financial proof (RM500,000+)', 'Monthly income (RM40,000+)', 'Medical report', 'Police clearance', 'Health insurance'], processing: '3-6 months' },
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
          Book a free consultation with our {dest.name} visa specialists today.
        </p>
        <Link to="/contact" className="btn-primary">Book Free Consultation</Link>
      </section>
    </PublicLayout>
  )
}
