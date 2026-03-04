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

  const handleCommentSubmit = async (postId, text) => {
    try {
      const response = await fetch('/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify({
          postId: postId,
          comment: text
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('Comment submission error:', response.status, data)
        throw new Error(data.message || 'Failed to submit comment')
      }

      // Reload the page to get updated comments
      router.reload()
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('Failed to submit comment: ' + error.message)
    }
  }

  const handleDeleteComment = async (commentId) => {
    const confirmed = await showConfirm(
      'Delete Comment',
      'Are you sure you want to delete this comment? This action cannot be undone.'
    )
    
    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(`/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': getCsrfToken()
        }
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Comment deletion error:', response.status, data)
        throw new Error(data.message || 'Failed to delete comment')
      }

      // Reload the page to get updated comments
      router.reload()
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('Failed to delete comment: ' + error.message)
    }
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
