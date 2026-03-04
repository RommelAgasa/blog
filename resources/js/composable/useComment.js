import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useConfirm } from './useConfirm'

export function useComment() {
  // Track expanded comments per post
  const expandedComments = ref({})
  const commentText = ref({})
  const { show: showConfirm } = useConfirm()

  const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
  }

  const toggleComments = (postId) => {
    expandedComments.value[postId] = !expandedComments.value[postId]
  }

  const fetchComment = async (url, method, body, errorPrefix) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': getCsrfToken()
        },
        ...(body && { body: JSON.stringify(body) })
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error(`${errorPrefix} error:`, response.status, data)
        throw new Error(data.message || `Failed to ${errorPrefix.toLowerCase()}`)
      }

      // Reload the page to get updated comments
      router.reload()
    } catch (error) {
      console.error(`Error ${errorPrefix.toLowerCase()}:`, error)
      alert(`Failed to ${errorPrefix.toLowerCase()}: ` + error.message)
    }
  }

  const handleCommentSubmit = async (postId, text) => {
    await fetchComment('/comments', 'POST', { postId, comment: text }, 'submit comment')
  }

  const handleDeleteComment = async (commentId) => {
    const confirmed = await showConfirm(
      'Delete Comment',
      'Are you sure you want to delete this comment? This action cannot be undone.'
    )
    
    if (!confirmed) {
      return
    }

    await fetchComment(`/comments/${commentId}`, 'DELETE', null, 'delete comment')
  }

  const getCommentCount = (post) => {
    return post.comments?.length || 0
  }

  return {
    expandedComments,
    commentText,
    toggleComments,
    handleCommentSubmit,
    handleDeleteComment,
    getCommentCount,
  }
}
