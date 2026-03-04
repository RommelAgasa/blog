import http from '@/lib/http'

export async function createPost(payload) {
  try {
    const response = await http.post('/posts', payload)
    // Extract the post from response.data.post
    return response.data?.post || response.data?.data || response.data
  } catch (error) {
    throw error
  }
}

export async function updatePost(id, payload) {
  try {
    const response = await http.put(`/posts/${id}`, payload)
    return response.data?.post || response.data?.data || response.data
  } catch (error) {
    throw error
  }
}

export async function deletePostById(id) {
  try {
    await http.delete(`/posts/${id}`)
  } catch (error) {
    throw error
  }
}