import http from '@/lib/http'
import { router } from '@inertiajs/vue3'

export async function signup(payload) {
  const response = await http.post('/auth/signup', payload)
  // Reload page to get authenticated user
  await router.visit('/', { method: 'get' }) // redirect to login page after signup
  return response.data?.data || response.data
}

export async function login(payload) {
  const response = await http.post('/auth/login', payload)
  // Reload page to get authenticated user
  await router.visit('/posts', { method: 'get' })
  return response.data?.data || response.data
}

export async function logout() {
  await http.post('/auth/logout')
  // Reload to redirect to login
  await router.visit('/', { method: 'get' })
}

export async function getAuthenticatedUser() {
  const response = await http.get('/auth/user')
  return response.data?.user || response.data
}
