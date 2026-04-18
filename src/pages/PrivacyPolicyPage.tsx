import PublicLayout from '@/components/layout/PublicLayout'

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <section style={{ paddingTop: 120, paddingBottom: 80 }} className="section-pad-lg">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: 'DM Sans, sans-serif' }}>Legal</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 300, lineHeight: 1.2, marginBottom: 32 }}>
            Privacy <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Policy</span>
          </h1>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 2, display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p>Last updated: March 25, 2026</p>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>1. Information We Collect</h2>
              <p>We collect personal information you voluntarily provide when you use our services, including your name, email address, phone number, passport details, academic records, and any other information necessary for visa and student consultancy services.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>2. How We Use Your Information</h2>
              <p>Your information is used to: process visa and admission applications, communicate with you regarding your case, provide consultancy services, comply with legal obligations, and improve our services. We do not sell your personal data to third parties.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>3. Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal information. All sensitive documents are stored securely and access is limited to authorized personnel only.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>4. Third-Party Sharing</h2>
              <p>We may share your information with embassies, universities, immigration authorities, and other relevant institutions solely for the purpose of processing your applications. We ensure all third parties maintain appropriate data protection standards.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>5. Cookies</h2>
              <p>Our website uses cookies to enhance your browsing experience. You can disable cookies through your browser settings, though this may affect website functionality.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at info@issconsultants.pk or call +92 335 2397730.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>7. Contact Us</h2>
              <p>Instant Student Solution (Pvt) Ltd.<br />SECP Registered | CUIN: 0330889<br />Email: info@issconsultants.pk<br />Phone: +92 335 2397730</p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
