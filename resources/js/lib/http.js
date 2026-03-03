import axios from 'axios'

const http = axios.create({
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
})

// Optionally add request/response interceptors (e.g., global error toast)
http.interceptors.response.use(
  (r) => r,
  (error) => {
    // console.error(error)
    return Promise.reject(error)
  }
)

export default http