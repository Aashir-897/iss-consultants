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
  PORT,
} = process.env

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !ADMIN_EMAIL) {
  console.error('Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and ADMIN_EMAIL in .env')
  process.exit(1)
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false, // Use TLS
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
})

const app = express()
app.use(express.json())
app.use(cors())

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, visa_type, destination, message } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email and phone are required.' })
  }

  const from = EMAIL_FROM || SMTP_USER
  const adminHtml = `
    <h2>New Consultation Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Visa Type:</strong> ${visa_type || 'Not specified'}</p>
    <p><strong>Destination:</strong> ${destination || 'Not specified'}</p>
    <p><strong>Message:</strong><br>${message ? message.replace(/\n/g, '<br>') : 'No message provided'}</p>
  `

  const userHtml = `
    <h2>Thank you for contacting Instant Student Solution</h2>
    <p>Hi ${name},</p>
    <p>We received your consultation request and will contact you soon.</p>
    <p><strong>Your submitted details:</strong></p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Visa Type:</strong> ${visa_type || 'Not specified'}</p>
    <p><strong>Destination:</strong> ${destination || 'Not specified'}</p>
    <p><strong>Message:</strong><br>${message ? message.replace(/\n/g, '<br>') : 'No message provided'}</p>
    <p>If you need any updates, reply to this email or contact us at ${ADMIN_EMAIL}.</p>
  `

  try {
    await transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      subject: `New consultation request from ${name}`,
      html: adminHtml,
      replyTo: email,
    })

    await transporter.sendMail({
      from,
      to: email,
      subject: 'Thank you for your consultation request',
      html: userHtml,
    })

    return res.status(201).json({ message: 'Contact request received and emails sent.' })
  } catch (error) {
    console.error('Failed to send contact emails', error)
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' })
  }
})

// Mock data endpoints for frontend
app.get('/api/destinations', (req, res) => {
  res.json([
    { id: 1, name: 'Ireland', slug: 'ireland', flag: '🇮🇪', visa_types: ['Student Visa', 'Work Visa'], description: 'Leading destination for international students with world-class universities.', is_active: true },
    { id: 2, name: 'Australia', slug: 'australia', flag: '🇦🇺', visa_types: ['Student Visa', 'Work Visa', 'PR'], description: 'Diverse opportunities in education and career development.', is_active: true },
    { id: 3, name: 'United Kingdom', slug: 'united-kingdom', flag: '🇬🇧', visa_types: ['Student Visa', 'Work Visa'], description: 'Historic universities and vibrant student life.', is_active: true },
  ])
})

app.get('/api/destinations/:slug', (req, res) => {
  const { slug } = req.params
  const destinations = {
    ireland: { id: 1, name: 'Ireland', slug: 'ireland', flag: '🇮🇪', visa_types: ['Student Visa', 'Work Visa'], description: 'Leading destination for international students with world-class universities.', is_active: true },
    australia: { id: 2, name: 'Australia', slug: 'australia', flag: '🇦🇺', visa_types: ['Student Visa', 'Work Visa', 'PR'], description: 'Diverse opportunities in education and career development.', is_active: true },
    'united-kingdom': { id: 3, name: 'United Kingdom', slug: 'united-kingdom', flag: '🇬🇧', visa_types: ['Student Visa', 'Work Visa'], description: 'Historic universities and vibrant student life.', is_active: true },
  }
  const destination = destinations[slug]
  if (destination) {
    res.json(destination)
  } else {
    res.status(404).json({ error: 'Destination not found' })
  }
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

app.get('/api/stats', (req, res) => {
  res.json({ students: 500, success_rate: 98, countries: 15 })
})

// app.get('/api/blog-posts', (req, res) => {
//   res.json([
//     { id: 1, title: 'Study in Ireland', slug: 'study-ireland', excerpt: 'Guide to studying in Ireland', content: 'Full content here', author: 'Team', published_at: '2024-01-01', is_published: true },
//   ])
// })

// app.get('/api/blog-posts/:slug', (req, res) => {
//   res.json({ id: 1, title: 'Study in Ireland', slug: 'study-ireland', excerpt: 'Guide to studying in Ireland', content: 'Full content here', author: 'Team', published_at: '2024-01-01', is_published: true })
// })

app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email required' })

  const from = EMAIL_FROM || SMTP_USER

  try {
    await transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      subject: `New Newsletter Subscriber: ${email}`,
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
    })

    await transporter.sendMail({
      from,
      to: email,
      subject: 'Welcome to Instant Student Solution Newsletter',
      html: `
        <h2>You're subscribed!</h2>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You'll receive the latest Ireland, Australia, and UK visa updates directly in your inbox.</p>
        <p>— Instant Student Solution Team</p>
      `,
    })

    res.json({ message: 'Subscribed successfully' })
  } catch (error) {
    console.error('Newsletter email failed', error)
    res.status(500).json({ error: 'Failed to send confirmation email.' })
  }
})

// const port = Number(PORT || 3000)
// app.listen(port, () => {
//   console.log(`Contact server running on http://localhost:${port}`)
// })
export default app