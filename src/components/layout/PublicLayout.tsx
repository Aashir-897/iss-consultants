import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const WhatsAppFloat = () => (
  <a href="https://wa.me/923352397730" target="_blank" rel="noreferrer"
    style={{ position:'fixed', bottom:24, right:24, zIndex:99, background:'var(--gold)', color:'var(--dark)', width:52, height:52, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, cursor:'pointer', boxShadow:'0 8px 32px rgba(201,168,76,0.3)', textDecoration:'none', transition:'all 0.3s', borderRadius:2 }}
    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)' }}
    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)' }}
    title="Chat on WhatsApp"
  >💬</a>
)


export default function PublicLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <Navbar />
      <main style={{ flex:1 }} className="page-enter">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
