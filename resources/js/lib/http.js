import axios from 'axios'

const http = axios.create({
  headers: { 
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Add CSRF token to request headers
http.interceptors.request.use((config) => {
  // Get CSRF token from meta tag
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token
  }
  return config
})

// Handle response errors
http.interceptors.response.use(
  (r) => r,
  (error) => {
    // Handle CSRF/session token mismatch (419)
    if (error.response?.status === 419) {
      // Refresh the page to get a new CSRF token and session
      window.location.reload()
      return Promise.reject(error)
    }
    
    if (error.response?.status === 422) {
      // Validation errors - let the component handle them
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default http