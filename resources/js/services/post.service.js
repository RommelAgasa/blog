import http from '@/lib/http'
import { router } from '@inertiajs/vue3'

export async function createPost(payload) {
  const response = await http.post('/posts', payload)
  // Reload current page to sync with server (stay on current page)
  await router.reload()
  return response.data?.data || response.data
}

export async function updatePost(id, payload) {
  const response = await http.put(`/posts/${id}`, payload)
  // Reload current page to sync with server (stay on current page)
  await router.reload()
  return response.data?.data || response.data
}

export async function deletePostById(id) {
  await http.delete(`/posts/${id}`)
  // Reload current page to sync with server (stay on current page)
  await router.reload()
}