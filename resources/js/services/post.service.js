import http from '@/lib/http'
import { router } from '@inertiajs/vue3'

export async function createPost(payload) {
  const response = await http.post('/posts', payload)
  // Reload posts to sync with server
  await router.reload({ only: ['posts'], preserveScroll: true })
  return response.data?.data || response.data
}

export async function updatePost(id, payload) {
  const response = await http.put(`/posts/${id}`, payload)
  // Reload posts to sync with server
  await router.reload({ only: ['posts'], preserveScroll: true })
  return response.data?.data || response.data
}

export async function deletePostById(id) {
  await http.delete(`/posts/${id}`)
  // Reload posts to sync with server
  await router.reload({ only: ['posts'], preserveScroll: true })
}