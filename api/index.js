import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  ADMIN_EMAIL,
  EMAIL_FROM,
} = process.env

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !ADMIN_EMAIL) {
  console.error('Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and ADMIN_EMAIL in .env')
  process.exit(1)
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: true,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
})

// ─── Email Base Template ───────────────────────────────────────────────────────
const LOGO_URL = 'https://www.instantstudentsolution.com/logo.png'
const SITE_URL = 'https://www.instantstudentsolution.com'

const emailBase = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Instant Student Solution</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0d0d0d;border:1px solid rgba(201,168,76,0.35);border-bottom:none;padding:36px 40px;text-align:center;">
              <img src="${LOGO_URL}" alt="ISS" width="72" height="72"
                style="border-radius:50%;display:block;margin:0 auto 16px;border:1px solid rgba(201,168,76,0.4);" />
              <div style="font-size:10px;letter-spacing:5px;text-transform:uppercase;color:#c9a84c;margin-bottom:3px;">
                Instant Student Solution
              </div>
              <div style="font-size:9px;letter-spacing:3px;color:#555;text-transform:uppercase;">
                Pvt. Ltd. — Est. 2026
              </div>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="height:1px;background:linear-gradient(90deg,transparent 0%,#c9a84c 50%,transparent 100%);
              border-left:1px solid rgba(201,168,76,0.35);border-right:1px solid rgba(201,168,76,0.35);">
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#111;border-left:1px solid rgba(201,168,76,0.35);
              border-right:1px solid rgba(201,168,76,0.35);padding:40px 40px 32px;">
              ${content}
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="height:1px;background:linear-gradient(90deg,transparent 0%,#c9a84c 50%,transparent 100%);
              border-left:1px solid rgba(201,168,76,0.35);border-right:1px solid rgba(201,168,76,0.35);">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d0d;border:1px solid rgba(201,168,76,0.35);border-top:none;
              padding:24px 40px;text-align:center;">
              <p style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;margin:0 0 10px;">
                SECP Registered &nbsp;|&nbsp; CUIN: 0330889
              </p>
              <p style="font-size:11px;color:#444;margin:0 0 4px;line-height:1.7;">
                House No. 103, Block K, Karachi West, Sindh, Pakistan
              </p>
              <p style="font-size:11px;color:#444;margin:0 0 14px;">
                +92 335 2397730 &nbsp;|&nbsp; info@instantstudentsolution.com
              </p>
              <a href="${SITE_URL}" style="font-size:9px;letter-spacing:2px;text-transform:uppercase;
                color:#c9a84c;text-decoration:none;">www.instantstudentsolution.com</a>
              <p style="font-size:10px;color:#2a2a2a;margin:14px 0 0;">
                © ${new Date().getFullYear()} Instant Student Solution (Pvt) Ltd. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

// ─── Admin Notification Template ──────────────────────────────────────────────
const adminContactHtml = ({ name, email, phone, visa_type, destination, message }) =>
  emailBase(`
    <h2 style="font-size:18px;font-weight:400;color:#c9a84c;letter-spacing:3px;
      text-transform:uppercase;margin:0 0 6px;">New Consultation Request</h2>
    <div style="width:36px;height:1px;background:#c9a84c;margin-bottom:28px;"></div>

    ${[
      ['Full Name',    name],
      ['Email',        email],
      ['Phone',        phone],
      ['Visa Type',    visa_type    || 'Not specified'],
      ['Destination',  destination  || 'Not specified'],
    ].map(([label, value]) => `
      <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <div style="font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#555;margin-bottom:5px;">${label}</div>
        <div style="font-size:13px;color:#e8dcc8;">${value}</div>
      </div>
    `).join('')}

    <div style="margin-top:20px;">
      <div style="font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#555;margin-bottom:10px;">Message</div>
      <div style="font-size:13px;color:#e8dcc8;line-height:1.8;
        background:#0a0a0a;padding:16px 18px;border-left:2px solid #c9a84c;">
        ${message ? message.replace(/\n/g, '<br>') : '<em style="color:#444;">No message provided</em>'}
      </div>
    </div>
  `)

// ─── User Confirmation Template ───────────────────────────────────────────────
const userContactHtml = ({ name, phone, visa_type, destination, message }) =>
  emailBase(`
    <h2 style="font-size:18px;font-weight:400;color:#c9a84c;letter-spacing:3px;
      text-transform:uppercase;margin:0 0 6px;">Request Received</h2>
    <div style="width:36px;height:1px;background:#c9a84c;margin-bottom:28px;"></div>

    <p style="font-size:15px;color:#e8dcc8;line-height:1.8;margin:0 0 16px;">
      Dear <strong style="color:#c9a84c;">${name}</strong>,
    </p>
    <p style="font-size:13px;color:#888;line-height:1.9;margin:0 0 28px;">
      Thank you for reaching out to Instant Student Solution. We have received your
      consultation request and one of our expert advisors will contact you within
      <strong style="color:#e8dcc8;">24 hours</strong>.
    </p>

    <!-- Summary box -->
    <div style="background:#0a0a0a;border:1px solid rgba(201,168,76,0.2);padding:24px;margin-bottom:28px;">
      <div style="font-size:8px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;margin-bottom:16px;">
        Your Submission Summary
      </div>
      ${[
        ['Phone',       phone],
        ['Visa Type',   visa_type   || 'Not specified'],
        ['Destination', destination || 'Not specified'],
      ].map(([label, value]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;
          padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <span style="font-size:10px;color:#555;text-transform:uppercase;letter-spacing:1px;">${label}</span>
          <span style="font-size:12px;color:#e8dcc8;">${value}</span>
        </div>
      `).join('')}
      ${message ? `
        <div style="margin-top:16px;">
          <div style="font-size:10px;color:#555;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Message</div>
          <div style="font-size:12px;color:#888;line-height:1.7;">${message.replace(/\n/g, '<br>')}</div>
        </div>
      ` : ''}
    </div>

    <p style="font-size:12px;color:#555;line-height:1.8;margin:0;">
      For urgent queries, contact us at
      <span style="color:#c9a84c;">+92 335 2397730</span> or simply reply to this email.
    </p>
  `)

// ─── Newsletter Template ───────────────────────────────────────────────────────
const newsletterConfirmHtml = (email) =>
  emailBase(`
    <h2 style="font-size:18px;font-weight:400;color:#c9a84c;letter-spacing:3px;
      text-transform:uppercase;margin:0 0 6px;">You're Subscribed</h2>
    <div style="width:36px;height:1px;background:#c9a84c;margin-bottom:28px;"></div>

    <p style="font-size:13px;color:#888;line-height:1.9;margin:0 0 24px;">
      Welcome to the <strong style="color:#e8dcc8;">Instant Student Solution</strong> newsletter.
      You'll receive the latest visa updates, news, and application tips for
      <strong style="color:#c9a84c;">Ireland, Australia, and the United Kingdom</strong>
      directly in your inbox.
    </p>

    <div style="border-left:2px solid #c9a84c;padding:14px 18px;margin-bottom:28px;background:#0a0a0a;">
      <p style="font-size:12px;color:#666;line-height:1.8;margin:0;font-style:italic;">
        "Helping Pakistani students and professionals achieve their international goals —
        one visa at a time."
      </p>
    </div>

    <!-- What to expect -->
    <div style="margin-bottom:24px;">
      <div style="font-size:8px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;margin-bottom:14px;">
        What to Expect
      </div>
      ${[
        ['🎓', 'Student visa guides for Ireland, Australia & UK'],
        ['📋', 'Application checklists and document tips'],
        ['📰', 'Latest immigration policy updates'],
        ['💼', 'Work permit and PR pathway insights'],
      ].map(([icon, text]) => `
        <div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0;
          border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="font-size:14px;">${icon}</span>
          <span style="font-size:12px;color:#888;line-height:1.6;">${text}</span>
        </div>
      `).join('')}
    </div>

    <p style="font-size:11px;color:#333;margin:0;line-height:1.7;">
      To unsubscribe at any time, reply to this email with <em>"Unsubscribe"</em> in the subject line.
    </p>
  `)

// ─── Express App ──────────────────────────────────────────────────────────────
const app = express()
app.use(express.json())
app.use(cors())

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, visa_type, destination, message } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email and phone are required.' })
  }

  const from = EMAIL_FROM || SMTP_USER

  try {
    await transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      subject: `New consultation request from ${name}`,
      html: adminContactHtml({ name, email, phone, visa_type, destination, message }),
      replyTo: email,
    })

    await transporter.sendMail({
      from,
      to: email,
      subject: 'We received your consultation request — Instant Student Solution',
      html: userContactHtml({ name, phone, visa_type, destination, message }),
    })

    return res.status(201).json({ message: 'Contact request received and emails sent.' })
  } catch (error) {
    console.error('Failed to send contact emails', error)
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' })
  }
})

// Newsletter
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email required' })

  const from = EMAIL_FROM || SMTP_USER

  try {
    await transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      subject: `New Newsletter Subscriber: ${email}`,
      html: emailBase(`
        <h2 style="font-size:16px;font-weight:400;color:#c9a84c;letter-spacing:3px;
          text-transform:uppercase;margin:0 0 6px;">New Subscriber</h2>
        <div style="width:36px;height:1px;background:#c9a84c;margin-bottom:24px;"></div>
        <p style="font-size:13px;color:#888;margin:0;">
          New newsletter subscriber: <strong style="color:#e8dcc8;">${email}</strong>
        </p>
      `),
    })

    await transporter.sendMail({
      from,
      to: email,
      subject: 'Welcome to the ISS Newsletter — Instant Student Solution',
      html: newsletterConfirmHtml(email),
    })

    res.json({ message: 'Subscribed successfully' })
  } catch (error) {
    console.error('Newsletter email failed', error)
    res.status(500).json({ error: 'Failed to send confirmation email.' })
  }
})

// Data endpoints
app.get('/api/destinations', (req, res) => {
  res.json([
    { id: 1, name: 'Ireland',        slug: 'ireland',        flag: '🇮🇪', visa_types: ['Student Visa', 'Work Visa'],        description: 'Leading destination for international students with world-class universities.', is_active: true },
    { id: 2, name: 'Australia',      slug: 'australia',      flag: '🇦🇺', visa_types: ['Student Visa', 'Work Visa', 'PR'],  description: 'Diverse opportunities in education and career development.',                  is_active: true },
    { id: 3, name: 'United Kingdom', slug: 'united-kingdom', flag: '🇬🇧', visa_types: ['Student Visa', 'Work Visa'],        description: 'Historic universities and vibrant student life.',                            is_active: true },
  ])
})

app.get('/api/destinations/:slug', (req, res) => {
  const map = {
    'ireland':        { id: 1, name: 'Ireland',        slug: 'ireland',        flag: '🇮🇪', visa_types: ['Student Visa', 'Work Visa'],        description: 'Leading destination for international students with world-class universities.', is_active: true },
    'australia':      { id: 2, name: 'Australia',      slug: 'australia',      flag: '🇦🇺', visa_types: ['Student Visa', 'Work Visa', 'PR'],  description: 'Diverse opportunities in education and career development.',                  is_active: true },
    'united-kingdom': { id: 3, name: 'United Kingdom', slug: 'united-kingdom', flag: '🇬🇧', visa_types: ['Student Visa', 'Work Visa'],        description: 'Historic universities and vibrant student life.',                            is_active: true },
  }
  const dest = map[req.params.slug]
  dest ? res.json(dest) : res.status(404).json({ error: 'Destination not found' })
})

app.get('/api/stats', (req, res) => {
  res.json({ students: 500, success_rate: 98, countries: 15 })
})


// app.get('/api/services', (req, res) => {
//   res.json([
//     { id: 1, name: 'Application Processing', description: 'Complete visa application handling' },
//     { id: 2, name: 'Pre-Departure Support', description: 'Preparation for your journey abroad' },
//   ])
// })

// app.get('/api/testimonials', (req, res) => {
//   res.json([
//     { id: 1, name: 'Ahmed Khan', destination: 'Ireland', text: 'Excellent service!', rating: 5, is_active: true },
//   ])
// })

// app.get('/api/blog-posts', (req, res) => {
//   res.json([
//     { id: 1, title: 'Study in Ireland', slug: 'study-ireland', excerpt: 'Guide to studying in Ireland', content: 'Full content here', author: 'Team', published_at: '2024-01-01', is_published: true },
//   ])
// })

// app.get('/api/blog-posts/:slug', (req, res) => {
//   res.json({ id: 1, title: 'Study in Ireland', slug: 'study-ireland', excerpt: 'Guide to studying in Ireland', content: 'Full content here', author: 'Team', published_at: '2024-01-01', is_published: true })
// })


export default app