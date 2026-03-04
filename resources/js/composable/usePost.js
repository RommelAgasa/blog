import { reactive, ref, watch, computed } from 'vue'
import { useForm } from '@inertiajs/vue3' // use for form management and vaidaltion error handling
import { usePage } from '@inertiajs/vue3'
import { createPost, updatePost, deletePostById } from '../services/post.service'
import { useToast } from './useToast'
import { useConfirm } from './useConfirm'

export function usePosts(initialPosts) {
  const toast = useToast()
  const { show: showConfirm } = useConfirm()
  const page = usePage()
  
  // Local copy of posts as a reactive array
  const localPosts = reactive(
    Array.isArray(initialPosts?.data) ? [...initialPosts.data] : []
  )

  // Store pagination metadata
  const paginationMeta = reactive(initialPosts?.meta || {})

  // Keep in sync if server rehydrates
  const setPosts = (next) => {
    localPosts.splice(0, localPosts.length, ...(Array.isArray(next) ? next : []))
    isLoading.value = false
  }

  // Update pagination metadata and posts
  const updatePostsWithPagination = (postsObj) => {
    if (postsObj?.data) {
      localPosts.splice(0, localPosts.length, ...postsObj.data)
    }
    if (postsObj?.meta) {
      Object.assign(paginationMeta, postsObj.meta)
    }
    isLoading.value = false
  }

  // Edit state
  const editingId = ref(null)

  // Track current user ID reactively
  const userId = computed(() => page.props.auth?.user?.id || null)

  // Form with Inertia error bag  
  const form = useForm({
    title: '',
    body: '',
  })

  const isProcessing = ref(false)
  const isLoading = ref(!(Array.isArray(initialPosts?.data) && initialPosts.data.length >= 0))

  async function submit() {
    editingId.value ? await onUpdate() : await onCreate()
  }

  async function onCreate() {
    isProcessing.value = true
    form.clearErrors()

    // Debug: Log current state
    console.log('=== POST CREATION DEBUG ===')
    console.log('User ID:', userId.value)
    console.log('Auth props:', page.props.auth)
    console.log('Form data:', { title: form.title, body: form.body })

    if (!userId.value) {
      console.error('❌ User ID not available!')
      toast.error('User not authenticated. Please refresh the page.')
      isProcessing.value = false
      return
    }

    if (!form.title?.trim() || !form.body?.trim()) {
      console.error('❌ Form fields are empty!')
      toast.error('Please fill in all fields.')
      isProcessing.value = false
      return
    }
    
    try {
      const newPost = await createPost({
        title: form.title,
        body: form.body,
        userId: userId.value,
      })
      
      // Add newly created post to the beginning of the list
      if (newPost && newPost.id) {
        localPosts.unshift(newPost)
        // Update pagination total count if available
        if (paginationMeta.total) {
          paginationMeta.total += 1
        }
      } else {
        console.warn('⚠️  No post ID in response:', newPost)
      }
      
      clearForm()
      toast.success('Post created successfully!')
    } catch (e) {

      
      console.error('❌ POST CREATION ERROR:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        stack: e.stack
      })
      
      if (e.response?.status === 422) {
        console.error('Validation errors:', e.response.data.errors)
        form.setError(e.response.data.errors || {})
      } else if (e.response?.status === 419) {
        console.error('CSRF token error - should be retried automatically')
        toast.error('Session expired. Please refresh and try again.')
      } else if (e.response?.status === 401 || e.response?.status === 403) {
        console.error('Auth error - redirecting to login')
        toast.error('Authentication failed. Please login again.')
      } else {
        toast.error('Something went wrong while saving.')
      }
    } finally {
      isProcessing.value = false
    }
  }

  async function onUpdate() {
    isProcessing.value = true
    form.clearErrors()
    try {
      const updatedPost = await updatePost(editingId.value, {
        title: form.title,
        body: form.body,
        userId: userId.value,
      })
      
      // Update the post in the local list
      const postIndex = localPosts.findIndex(p => p.id === editingId.value)
      if (postIndex > -1 && updatedPost) {
        localPosts[postIndex] = updatedPost
      }
      
      toast.success('Post updated successfully!')
      cancelEdit()
    } catch (e) {
      console.error('Post update error:', e)
      if (e.response?.status === 422) form.setError(e.response.data.errors || {})
      else toast.error('Something went wrong while updating.')
    } finally {
      isProcessing.value = false
    }
  }

  function startEdit(post) {
    editingId.value = post?.id ?? null
    form.title = post?.title ?? ''
    form.body = post?.body ?? ''
  }

  function clearForm() {
    form.reset()
    form.clearErrors()
  }

  function cancelEdit() {
    editingId.value = null
    clearForm()
  }

  async function remove(post) {
    const id = post?.id
    if (!id) return

    const confirmed = await showConfirm('Delete Post', 'Are you sure you want to delete this post? This action cannot be undone.')
    if (!confirmed) return

    isProcessing.value = true
    try {
      await deletePostById(id)
      
      // Remove the post from the local list
      const postIndex = localPosts.findIndex(p => p.id === id)
      if (postIndex > -1) {
        localPosts.splice(postIndex, 1)
        // Update pagination total count if available
        if (paginationMeta.total) {
          paginationMeta.total -= 1
        }
      }
      
      toast.success('Post deleted successfully!')
      if (editingId.value === id) cancelEdit()
    } catch (e) {
      console.error('Post deletion error:', e)
      toast.error('Something went wrong while deleting.')
    } finally {
      isProcessing.value = false
    }
  }

  return {
    localPosts,
    paginationMeta,
    setPosts,
    updatePostsWithPagination,
    editingId,
    form,
    isProcessing,
    isLoading,
    userId,
    submit,
    startEdit,
    clearForm,
    cancelEdit,
    remove,
  }
}
