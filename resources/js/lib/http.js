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
      console.error('❌ CSRF TOKEN MISMATCH (419):', {
        url: error.config?.url,
        method: error.config?.method,
        message: error.response?.data?.message,
        data: error.response?.data
      })
      console.warn('⚠️  CSRF token expired. Reloading in 3 seconds...')
      // Give 3 seconds to see the error before reloading
      setTimeout(() => {
        window.location.reload()
      }, 3000)
      return Promise.reject(error)
    }
    
    // Handle authentication failures (401, 403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn('❌ Authentication failed, redirecting to login...')
      window.location.href = '/'
      return Promise.reject(error)
    }
    
    if (error.response?.status === 422) {
      // Validation errors - let the component handle them
      console.warn('⚠️  Validation error (422):', error.response?.data)
      return Promise.reject(error)
    }
    
    // Log other errors for debugging
    if (error.response?.status >= 500) {
      console.error('❌ Server error:', error.response.status, error.response.data)
    }
    
    return Promise.reject(error)
  }
)

export default http