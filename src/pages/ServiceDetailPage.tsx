import { useParams, Link } from 'react-router-dom'
import PublicLayout from '@/components/layout/PublicLayout'
import { useReveal } from '@/hooks/useReveal'

const servicesData: Record<string, {
  title: string; icon: string; tagline: string; description: string;
  features: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}> = {
  'visa-counselling': {
    title: 'Visa Assessment & Counselling', icon: '🎯',
    tagline: 'Expert guidance to find your best visa pathway',
    description: 'Our comprehensive visa assessment service evaluates your profile, qualifications, and goals to determine the most suitable visa category. We analyze your eligibility across multiple countries and provide a clear, actionable roadmap for your immigration journey.',
    features: [
      { title: 'Profile Evaluation', desc: 'Thorough analysis of your academic background, work experience, and personal circumstances to identify the best visa options.' },
      { title: 'Eligibility Assessment', desc: 'Detailed scoring against various visa category requirements across multiple destination countries.' },
      { title: 'Alternative Pathways', desc: 'If your first choice isn\'t feasible, we identify alternative routes that can achieve your goals.' },
      { title: 'Timeline Planning', desc: 'Realistic timeline estimation for your visa process, including preparation, application, and processing.' },
      { title: 'Written Report', desc: 'You receive a comprehensive written summary of our findings and recommendations.' },
    ],
    process: [
      { step: '01', title: 'Initial Consultation', desc: 'Free 30-minute session to understand your goals and aspirations.' },
      { step: '02', title: 'Profile Analysis', desc: 'Our experts evaluate your documents, qualifications, and experience.' },
      { step: '03', title: 'Options Mapping', desc: 'We map out all viable visa pathways across destinations.' },
      { step: '04', title: 'Strategy Presentation', desc: 'Detailed strategy meeting with actionable recommendations.' },
    ],
    faqs: [
      { q: 'Is the initial consultation really free?', a: 'Yes, your first 30-minute consultation is completely free with no obligations.' },
      { q: 'How long does the full assessment take?', a: 'A comprehensive assessment typically takes 3-5 business days after document submission.' },
      { q: 'Can you assess for multiple countries?', a: 'Absolutely. We evaluate your eligibility across all our destination countries simultaneously.' },
    ],
  },
  'student-admissions': {
    title: 'Student Admissions', icon: '🎓',
    tagline: 'Your gateway to world-class education abroad',
    description: 'We partner with 200+ universities globally to match Pakistani students with the right programs. From university selection to enrollment, our admissions team handles every step, ensuring you get accepted into programs that align with your career goals and budget.',
    features: [
      { title: 'University Shortlisting', desc: 'Data-driven selection of universities that match your profile, budget, and career aspirations.' },
      { title: 'SOP & Essay Writing', desc: 'Professional Statement of Purpose and admission essay writing that highlights your strengths.' },
      { title: 'Application Management', desc: 'We manage your applications across multiple universities simultaneously.' },
      { title: 'Scholarship Assistance', desc: 'We identify and apply for scholarships and financial aid opportunities on your behalf.' },
      { title: 'Enrollment Support', desc: 'Post-acceptance support including enrollment confirmation, fee payment, and pre-departure guidance.' },
    ],
    process: [
      { step: '01', title: 'Career Goal Discussion', desc: 'Understanding your academic background and career aspirations.' },
      { step: '02', title: 'University Matching', desc: 'Shortlisting universities based on ranking, fees, location, and your profile.' },
      { step: '03', title: 'Application Preparation', desc: 'Preparing all documents, SOPs, and submitting applications.' },
      { step: '04', title: 'Offer & Enrollment', desc: 'Reviewing offers, accepting the best one, and completing enrollment.' },
    ],
    faqs: [
      { q: 'How many universities can you apply to?', a: 'We typically recommend applying to 5-8 universities across safety, match, and reach categories.' },
      { q: 'Do you guarantee admission?', a: 'While we can\'t guarantee admission, our success rate is over 90% for properly qualified candidates.' },
      { q: 'Can you help with scholarships?', a: 'Yes, we actively identify and assist with scholarship applications for eligible students.' },
    ],
  },
  'work-permits': {
    title: 'Work Permit Services', icon: '💼',
    tagline: 'Build your international career with confidence',
    description: 'Whether you\'re seeking employer-sponsored work permits, skills assessments, or critical skills permits, our team provides expert support for Ireland, Australia, and UK work visa applications.',
    features: [
      { title: 'Employer Sponsorship', desc: 'Guidance on securing employer sponsorship and understanding sponsor requirements.' },
      { title: 'Employer Sponsorship Support', desc: 'Assistance with employer nomination and permit requirements for target work visas.' },
      { title: 'Skills Assessment', desc: 'Professional skills assessment preparation for Australian work visas and EU professional recognition support.' },
      { title: 'Points Optimization', desc: 'Maximizing your points score for Australia and Ireland skilled migration streams.' },
      { title: 'Post-Arrival Support', desc: 'Settlement guidance after arrival including accommodation and banking setup.' },
    ],
    process: [
      { step: '01', title: 'Eligibility Check', desc: 'Assessing your qualifications and experience against work permit requirements.' },
      { step: '02', title: 'Documentation', desc: 'Preparing all required documents including skills assessments and references.' },
      { step: '03', title: 'Application Filing', desc: 'Submitting your work permit application with supporting evidence.' },
      { step: '04', title: 'Follow-up & Arrival', desc: 'Tracking application status and preparing for your move.' },
    ],
    faqs: [
      { q: 'Do I need a job offer first?', a: 'For most employer-sponsored work permits, yes. Some skilled migration streams may allow applications without a job offer.' },
      { q: 'Can you find me a job abroad?', a: 'We don\'t provide recruitment services, but we can guide you on job search strategies and platforms.' },
      { q: 'What if my work permit is refused?', a: 'We analyze the refusal reasons and advise on reapplication or alternative pathways.' },
    ],
  },
  'pr-applications': {
    title: 'Permanent Residency', icon: '🌍',
    tagline: 'Your pathway to a permanent new home',
    description: 'Expert guidance through permanent residency pathways for Ireland, Australia, and the UK, including skilled migration and family sponsorship options.',
    features: [
      { title: 'PR Eligibility Assessment', desc: 'Comprehensive evaluation of your eligibility for PR and long-term residence routes.' },
      { title: 'Points Optimization', desc: 'Strategic planning to improve your score for Australian and Irish skilled migration streams.' },
      { title: 'UK & Ireland PR Strategy', desc: 'Guidance on long-term residence options, work pathways, and family sponsorship in the UK and Ireland.' },
      { title: 'Citizenship Planning', desc: 'Long-term planning from PR to eventual citizenship.' },
    ],
    process: [
      { step: '01', title: 'PR Assessment', desc: 'Evaluating your profile against PR requirements of target countries.' },
      { step: '02', title: 'Score Optimization', desc: 'Identifying ways to improve your points/CRS score.' },
      { step: '03', title: 'Application Preparation', desc: 'Gathering documents and preparing the complete PR application.' },
      { step: '04', title: 'Submission & Tracking', desc: 'Filing the application and monitoring its progress.' },
    ],
    faqs: [
      { q: 'How long does PR processing take?', a: 'It varies by pathway: Australian skilled migration can take 6-12 months, while Irish work and critical skills routes typically take 4-8 months.' },
      { q: 'Can my family be included?', a: 'Yes, most PR and long-term residence applications allow you to include your spouse and dependent children.' },
      { q: 'What points score do I need for skilled migration?', a: 'Australia and Ireland use points or qualification-based assessments; our team evaluates your profile to target the exact score for your chosen route.' },
    ],
  },
  'interview-prep': {
    title: 'Interview Preparation', icon: '🎤',
    tagline: 'Walk into your embassy interview with confidence',
    description: 'Our structured coaching sessions prepare you for embassy and consulate interviews. We conduct mock interviews, provide common question guides, and coach you on body language and presentation to maximize your chances of visa approval.',
    features: [
      { title: 'Mock Interview Sessions', desc: 'Realistic practice interviews simulating actual embassy conditions and questions.' },
      { title: 'Q&A Guide', desc: 'Comprehensive guide covering the most common embassy interview questions and ideal responses.' },
      { title: 'Body Language Coaching', desc: 'Training on confident posture, eye contact, and professional demeanor.' },
      { title: 'Dress Code Guidance', desc: 'Advice on appropriate attire for different embassy and consulate interviews.' },
      { title: 'Industry-Specific Prep', desc: 'Tailored preparation for specific visa categories and industries.' },
    ],
    process: [
      { step: '01', title: 'Case Review', desc: 'Understanding your visa type, background, and potential interview questions.' },
      { step: '02', title: 'Coaching Session', desc: 'Intensive coaching on answers, body language, and presentation.' },
      { step: '03', title: 'Mock Interview', desc: 'Full simulation of the interview experience with feedback.' },
      { step: '04', title: 'Final Briefing', desc: 'Day-before briefing with last-minute tips and confidence building.' },
    ],
    faqs: [
      { q: 'How many mock sessions are included?', a: 'Our standard package includes 2 mock sessions, with additional sessions available.' },
      { q: 'Is interview prep included in visa services?', a: 'Basic interview tips are included. Comprehensive prep is an add-on service.' },
      { q: 'Can prep be done online?', a: 'Yes, we offer both in-person and online interview preparation sessions.' },
    ],
  },
  'document-preparation': {
    title: 'Document Preparation', icon: '📁',
    tagline: 'Every document perfectly prepared and organized',
    description: 'We create a detailed, personalized checklist and guide you through every required document. From notarization to translation, our document preparation service ensures your application package is complete, accurate, and presented professionally.',
    features: [
      { title: 'Personalized Checklist', desc: 'Custom document checklist based on your specific visa type and circumstances.' },
      { title: 'Notarization Guidance', desc: 'We guide you on which documents need notarization and connect you with certified notaries.' },
      { title: 'Translation Services', desc: 'Professional translation of documents into the required language.' },
      { title: 'Document Gap Analysis', desc: 'Identifying missing or weak documents and advising on alternatives.' },
      { title: 'Pre-Submission Review', desc: 'Final quality check of your complete document package before submission.' },
    ],
    process: [
      { step: '01', title: 'Requirements Analysis', desc: 'Identifying all required documents for your specific visa application.' },
      { step: '02', title: 'Collection & Review', desc: 'Collecting your documents and reviewing each for compliance.' },
      { step: '03', title: 'Processing', desc: 'Handling translations, notarizations, and formatting.' },
      { step: '04', title: 'Final Package', desc: 'Assembling and quality-checking the complete application package.' },
    ],
    faqs: [
      { q: 'What if I\'m missing a required document?', a: 'We advise on acceptable alternatives and help you obtain missing documents.' },
      { q: 'Do you handle document translations?', a: 'Yes, we provide certified translation services for all common languages.' },
      { q: 'How far in advance should I start?', a: 'We recommend starting document preparation at least 6-8 weeks before your intended application date.' },
    ],
  },
  'accommodation': {
    title: 'Accommodation Guidance', icon: '🏠',
    tagline: 'Find your perfect home away from home',
    description: 'We connect students and professionals with trusted accommodation providers in their destination countries. From university residences to private housing, we ensure you have a safe, comfortable place to live.',
    features: [
      { title: 'University Residences', desc: 'Help securing on-campus accommodation at your university.' },
      { title: 'Private Accommodation', desc: 'Connecting you with verified private housing options.' },
      { title: 'Area Safety Analysis', desc: 'Detailed safety information about different neighborhoods.' },
      { title: 'Shared Housing', desc: 'Coordination with other students for cost-effective shared living.' },
      { title: 'Arrival Support', desc: 'Airport pickup and accommodation check-in assistance.' },
    ],
    process: [
      { step: '01', title: 'Preference Assessment', desc: 'Understanding your budget, location preferences, and requirements.' },
      { step: '02', title: 'Options Research', desc: 'Shortlisting suitable accommodation options.' },
      { step: '03', title: 'Booking Assistance', desc: 'Helping with applications, deposits, and contracts.' },
      { step: '04', title: 'Move-In Support', desc: 'Arrival coordination and settling-in assistance.' },
    ],
    faqs: [
      { q: 'Do you charge for accommodation services?', a: 'Basic guidance is included. Premium placement assistance has a nominal fee.' },
      { q: 'Can you guarantee university housing?', a: 'We help with applications but cannot guarantee availability as it depends on the university.' },
      { q: 'How early should I book?', a: 'We recommend booking 2-3 months before your arrival date.' },
    ],
  },
  'pre-departure': {
    title: 'Pre-Departure Briefing', icon: '✈️',
    tagline: 'Be fully prepared for life abroad',
    description: 'Our comprehensive pre-departure briefing ensures you are fully prepared for life in your destination country. From airport procedures to banking setup, we cover everything you need to know for a smooth transition.',
    features: [
      { title: 'Arrival Procedures', desc: 'Step-by-step guide for immigration, customs, and airport navigation.' },
      { title: 'Banking Setup', desc: 'Guide to opening bank accounts and managing finances abroad.' },
      { title: 'Cultural Briefing', desc: 'Understanding local customs, etiquette, and social norms.' },
      { title: 'Healthcare Registration', desc: 'Help with health insurance and registering with local healthcare.' },
      { title: 'Emergency Contacts', desc: 'Comprehensive emergency contact list including embassy details.' },
    ],
    process: [
      { step: '01', title: 'Briefing Schedule', desc: 'Scheduling your pre-departure session 2-3 weeks before travel.' },
      { step: '02', title: 'Document Checklist', desc: 'Final check of all travel documents and essentials.' },
      { step: '03', title: 'Country Briefing', desc: 'Detailed session covering life in your destination country.' },
      { step: '04', title: 'Q&A Session', desc: 'Open session to address all your concerns and questions.' },
    ],
    faqs: [
      { q: 'When should I attend the briefing?', a: 'Ideally 2-3 weeks before your departure date.' },
      { q: 'Can my family attend?', a: 'Yes, we encourage family members to attend the briefing.' },
      { q: 'Is this included in the visa package?', a: 'Yes, pre-departure briefing is included with all our visa packages.' },
    ],
  },
  'application-processing': {
    title: 'Application Processing', icon: '✍️',
    tagline: 'Flawless applications, every time',
    description: 'Our experts handle the complete application process from filling forms to booking appointments. We ensure every detail is perfect, reducing the risk of delays or rejections due to errors.',
    features: [
      { title: 'Form Completion', desc: 'Accurate completion of all visa application forms.' },
      { title: 'Online Portal Management', desc: 'Managing your application through online immigration portals.' },
      { title: 'Biometric Booking', desc: 'Scheduling and preparing you for biometric appointments.' },
      { title: 'Courier Management', desc: 'Handling document courier to embassies and visa centers.' },
      { title: 'Real-Time Updates', desc: 'Keeping you informed about your application status at every stage.' },
    ],
    process: [
      { step: '01', title: 'Document Collection', desc: 'Gathering all required documents for your application.' },
      { step: '02', title: 'Form Filing', desc: 'Accurately completing and reviewing all application forms.' },
      { step: '03', title: 'Submission', desc: 'Submitting your application and booking appointments.' },
      { step: '04', title: 'Tracking', desc: 'Monitoring your application and updating you regularly.' },
    ],
    faqs: [
      { q: 'Do you fill the forms for me?', a: 'Yes, we complete all forms on your behalf and review them with you before submission.' },
      { q: 'What if additional documents are requested?', a: 'We handle all additional information requests promptly on your behalf.' },
      { q: 'Can I track my application?', a: 'Yes, we provide regular updates and you can reach us anytime for status checks.' },
    ],
  },
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? servicesData[slug] : null
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal()

  if (!service) {
    return (
      <PublicLayout>
        <section style={{ padding: '180px 24px 80px', background: 'var(--dark)', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 300, marginBottom: 20 }}>
            Service Not Found
          </h1>
          <Link to="/services" className="btn-primary">View All Services</Link>
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
          <Link to="/services" style={{ fontSize: 12, color: 'var(--gold)', textDecoration: 'none', letterSpacing: 1.5, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            ← All Services
          </Link>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{service.icon}</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px,5vw,64px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 16 }}>
            {service.title}
          </h1>
          <p style={{ fontSize: 'clamp(14px,2vw,18px)', color: 'var(--gold)', fontStyle: 'italic', marginBottom: 16 }}>
            {service.tagline}
          </p>
          <p style={{ fontSize: 'clamp(13px,1.8vw,16px)', color: 'var(--text-light)', lineHeight: 1.9, maxWidth: 600 }}>
            {service.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '60px 24px', background: 'var(--dark)' }}>
        <div ref={r1} className="reveal" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="section-tag">What's Included</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 300, marginBottom: 40 }}>
            Service <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Features</em>
          </h2>
          <div className="services-page-grid" style={{ gap: 20 }}>
            {service.features.map((f, i) => (
              <div key={i} style={{ background: 'var(--dark3)', padding: 'clamp(24px,3vw,36px)', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(18px,2.5vw,22px)', fontWeight: 300, color: 'var(--cream)', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '60px 24px 80px', background: 'var(--dark2)' }}>
        <div ref={r2} className="reveal" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="section-tag">How It Works</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 300, marginBottom: 40 }}>
            Our <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Process</em>
          </h2>
          <div className="process-grid">
            {service.process.map((p, i) => (
              <div key={i} style={{ position: 'relative', padding: '32px 24px', background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 300, color: 'var(--gold)', opacity: 0.3, position: 'absolute', top: 12, right: 16 }}>{p.step}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(18px,2.5vw,22px)', fontWeight: 300, color: 'var(--cream)', marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: '60px 24px 80px', background: 'var(--dark)' }}>
        <div ref={r3} className="reveal" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="section-tag">FAQs</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 300, marginBottom: 40 }}>
            Common <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Questions</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {service.faqs.map((f, i) => (
              <div key={i} style={{ background: 'var(--dark3)', padding: 'clamp(20px,3vw,32px)', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h3 style={{ fontSize: 15, color: 'var(--cream)', marginBottom: 8, fontWeight: 500 }}>{f.q}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'var(--dark2)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 300, marginBottom: 16 }}>
          Ready to <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Get Started</em>?
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
          Book a consultation to discuss {service.title.toLowerCase()}.
        </p>
        <Link to="/contact" className="btn-primary">Book Consultation</Link>
      </section>

    </PublicLayout>
  )
}
