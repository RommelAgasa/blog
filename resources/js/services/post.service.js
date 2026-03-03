import http from '@/lib/http'
import { router } from '@inertiajs/vue3'

export async function createPost(payload) {
  const response = await http.post('/posts', payload)
  // Reload page to sync with server
  await router.visit('/posts', { method: 'get' })
  return response.data?.data || response.data
}

export async function updatePost(id, payload) {
  const response = await http.put(`/posts/${id}`, payload)
  // Reload page to sync with server
  await router.visit('/posts', { method: 'get' })
  return response.data?.data || response.data
}

export async function deletePostById(id) {
  await http.delete(`/posts/${id}`)
  // Reload page to sync with server
  await router.visit('/posts', { method: 'get' })
}