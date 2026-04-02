import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '@/components/layout/PublicLayout'
import { getBlogPosts, BlogPost } from '@/lib/api'

const DEFAULT_POSTS: BlogPost[] = [
  { id:1, title:'UK Student Visa 2025: Complete Guide for Pakistani Students', slug:'uk-student-visa-guide-2025', excerpt:'Everything Pakistani students need to know about applying for a UK Student Visa in 2025.', content:'', author:'Ahmad Raza', published_at:'2025-02-15', is_published:true },
  { id:2, title:'Canada Express Entry: How to Maximize Your CRS Score', slug:'canada-express-entry-crs-score', excerpt:'A step-by-step guide to maximizing your Comprehensive Ranking System score.', content:'', author:'Sana Khalid', published_at:'2025-01-28', is_published:true },
  { id:3, title:'Australia Skilled Migration: Occupations in Demand 2025', slug:'australia-skilled-migration-2025', excerpt:'The occupations with the highest demand in Australia\'s skilled migration program.', content:'', author:'Bilal Ahmed', published_at:'2025-01-10', is_published:true },
  { id:4, title:'Schengen Visa Application: Step by Step for Pakistanis', slug:'schengen-visa-guide', excerpt:'How to apply for a Schengen tourist visa from Pakistan — documents and common rejection reasons.', content:'', author:'Fatima Sheikh', published_at:'2024-12-20', is_published:true },
  { id:5, title:'IELTS vs PTE: Which English Test is Right for Your Visa?', slug:'ielts-vs-pte-comparison', excerpt:'A detailed comparison of IELTS and PTE Academic for visa applications.', content:'', author:'Ahmad Raza', published_at:'2024-12-05', is_published:true },
  { id:6, title:'Common Reasons Visa Applications Get Rejected', slug:'visa-rejection-reasons', excerpt:'Our consultants share the most common reasons visa applications fail.', content:'', author:'Sana Khalid', published_at:'2024-11-18', is_published:true },
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_POSTS)

  useEffect(() => {
    getBlogPosts().then(r => { if (r.data?.data?.length) setPosts(r.data.data) }).catch(() => {})
  }, [])

  return (
    <PublicLayout>
      <section style={{ padding:'140px 24px 60px', background:'var(--dark)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        <div style={{ maxWidth:600, position:'relative', zIndex:1 }}>
          <div className="section-tag">Blog & Insights</div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,6vw,76px)', fontWeight:300, lineHeight:1.05, marginBottom:20 }}>
            Visa <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Insights</em> &<br />Expert Advice
          </h1>
          <p style={{ fontSize:'clamp(14px,2vw,16px)', color:'var(--text-light)', lineHeight:1.9 }}>
            Stay informed with the latest guides and expert insights on immigration.
          </p>
        </div>
      </section>

      <section style={{ padding:'40px 24px 80px', background:'var(--dark)' }}>
        {/* NO inline gridTemplateColumns */}
        <div className="blog-grid">
          {posts.map(p => (
            <Link key={p.id} to={`/blog/${p.slug}`} style={{ background:'var(--dark3)', padding:'clamp(28px,4vw,40px) clamp(24px,3vw,36px)', textDecoration:'none', display:'block', border:'1px solid rgba(255,255,255,0.03)', transition:'all 0.3s', position:'relative' }}>
              <div style={{ position:'absolute', top:20, right:20, color:'var(--gold)', fontSize:16, opacity:0.4 }}>↗</div>
              <div style={{ fontSize:11, letterSpacing:2, color:'var(--gold)', textTransform:'uppercase', marginBottom:16 }}>
                {new Date(p.published_at).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}
              </div>
              <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(18px,3vw,24px)', fontWeight:300, color:'var(--cream)', marginBottom:14, lineHeight:1.3 }}>{p.title}</h2>
              <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.8, marginBottom:24 }}>{p.excerpt}</p>
              <div style={{ fontSize:12, color:'var(--text-muted)' }}>By {p.author}</div>
            </Link>
          ))}
        </div>
      </section>
    </PublicLayout>
  )
}
