import http from '@/lib/http'
import { router } from '@inertiajs/vue3'

export async function createPost(payload) {
  const { data } = await http.post('/posts', payload)
  await router.reload({ only: ['posts'], preserveScroll: true })
  return data
}

export async function updatePost(id, payload) {
  await http.put(`/posts/${id}`, payload)
  await router.reload({ only: ['posts'], preserveScroll: true })
}

export async function deletePostById(id) {
  await http.delete(`/posts/${id}`)
  await router.reload({ only: ['posts'], preserveScroll: true })
}