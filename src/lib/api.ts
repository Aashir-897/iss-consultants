import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token')
    }
    return Promise.reject(err)
  }
)

export default api

export const submitConsultation = (data: ConsultationForm) => api.post('/consultations', data)
export const subscribeNewsletter = (email: string) => api.post('/newsletter', { email })
export const getDestinations = () => api.get('/destinations')
export const getDestination = (slug: string) => api.get(`/destinations/${slug}`)
export const getServices = () => api.get('/services')
export const getTestimonials = () => api.get('/testimonials')
export const getStats = () => api.get('/stats')
export const getBlogPosts = (page = 1, limit = 6) => api.get('/blog-posts', { params: { page, limit } })
export const getBlogPost = (slug: string) => api.get(`/blog-posts/${slug}`)

export interface ConsultationForm {
  name: string; email: string; phone: string
  visa_type: string; destination: string; message?: string
}

export interface Destination {
  id: number; name: string; slug: string; flag: string
  visa_types: string[]; description: string; image?: string
  is_active: boolean
}

export interface Testimonial {
  id: number; name: string; destination: string; avatar?: string
  text: string; rating: number; is_active: boolean
}

export interface BlogPost {
  id: number; title: string; slug: string; excerpt: string
  content: string; author: string; image?: string
  published_at: string; is_published: boolean
}
