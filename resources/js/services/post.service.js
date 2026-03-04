import http from '@/lib/http'

export async function createPost(payload) {
  try {
    const response = await http.post('/posts', payload)

    console.log('Raw response from server:', response)
    // Extract the post from response.data.post
    return response.data?.post || response.data?.data || response.data
  } catch (error) {
    console.error('Post creation failed:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      payload: payload
    })
    throw error
  }
}

export async function updatePost(id, payload) {
  try {
    const response = await http.put(`/posts/${id}`, payload)
    return response.data?.post || response.data?.data || response.data
  } catch (error) {
    console.error('Post update failed:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    })
    throw error
  }
}

export async function deletePostById(id) {
  try {
    await http.delete(`/posts/${id}`)
  } catch (error) {
    console.error('Post deletion failed:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    })
    throw error
  }
}