import { ConsultationForm } from './api'
import { Newsletter } from './api'


export const submitContactRequest = async (form: ConsultationForm) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Contact API failed: ${response.status} ${response.statusText} - ${errorText}`)
  }

  return response.json()
}



export const subscribeNewsletter = async (form: Newsletter) => {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Contact API failed: ${response.status} ${response.statusText} - ${errorText}`)
  }

  return response.json()
}

