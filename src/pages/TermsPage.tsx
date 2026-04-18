import PublicLayout from '@/components/layout/PublicLayout'

export default function TermsPage() {
  return (
    <PublicLayout>
      <section style={{ paddingTop: 120, paddingBottom: 80 }} className="section-pad-lg">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: 'DM Sans, sans-serif' }}>Legal</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 300, lineHeight: 1.2, marginBottom: 32 }}>
            Terms of <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Service</span>
          </h1>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 2, display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p>Last updated: March 25, 2026</p>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>1. Services</h2>
              <p>Instant Student Solution (Pvt) Ltd. provides visa consultancy, student admission guidance, work permit assistance, PR application support, and interview preparation services. Our role is advisory — final visa and admission decisions are made by the respective authorities.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>2. No Guarantee</h2>
              <p>While we strive for the highest success rates, we do not guarantee visa approval, university admission, or any specific outcome. Results depend on individual circumstances and the decisions of embassies, universities, and immigration authorities.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>3. Client Responsibilities</h2>
              <p>Clients must provide accurate and truthful information. Any misrepresentation or fraud may result in application rejection and termination of our services without refund. Clients are responsible for meeting all deadlines communicated by our team.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>4. Fees & Payment</h2>
              <p>Service fees are communicated upfront before engagement. Fees cover consultancy services only and do not include embassy fees, university application fees, or other third-party charges. Payment terms will be outlined in your service agreement.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>5. Refund Policy</h2>
              <p>Refunds are subject to the terms outlined in your individual service agreement. Generally, consultancy fees for work already performed are non-refundable. Embassy and university fees are non-refundable as per their respective policies.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>6. Limitation of Liability</h2>
              <p>ISS Consultants shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the fees paid for the specific service in question.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>7. Governing Law</h2>
              <p>These terms are governed by the laws of Pakistan. Any disputes shall be resolved through arbitration in accordance with Pakistani law.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, color: 'var(--cream)', fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>8. Contact</h2>
              <p>Instant Student Solution (Pvt) Ltd.<br />SECP Registered | CUIN: 0330889<br />Email: info@issconsultants.pk<br />Phone: +92 335 2397730</p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
