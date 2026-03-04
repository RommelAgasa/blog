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

  const setPaginationMeta = (meta) => {
    if (meta) {
      Object.assign(paginationMeta, meta)
    }
  }

  // Update pagination metadata and posts
  const updatePostsWithPagination = (postsObj) => {
    if (postsObj?.data) {
      setPosts(postsObj.data)
    }
    if (postsObj?.meta) {
      setPaginationMeta(postsObj.meta)
    }
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

    if (!userId.value) {
      toast.error('User not authenticated. Please refresh the page.')
      isProcessing.value = false
      return
    }
    
    try {
      const newPost = await createPost({
        title: form.title,
        body: form.body,
        userId: userId.value,
      })
      
      addPostToList(newPost)
      
      clearForm()
      toast.success('Post created successfully!')
    } catch (e) {
      if (e.response?.status === 422) {
        form.setError(e.response.data.errors || {})
      } else if (e.response?.status === 419) {
        toast.error('Session expired. Please refresh and try again.')
      } else if (e.response?.status === 401 || e.response?.status === 403) {
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
      
      updatePostInList(editingId.value, updatedPost)
      toast.success('Post updated successfully!')
      cancelEdit()
    } catch (e) {
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

  function addPostToList(newPost) {
    if (!newPost || !newPost.id) return
    
    localPosts.unshift(newPost)
    // Update pagination total count if available
    if (paginationMeta.total) {
      paginationMeta.total += 1
    }
  }

  function updatePostInList(id, updatedPost) {
    if (!updatedPost) return
    
    const postIndex = localPosts.findIndex(p => p.id === id)
    if (postIndex === -1) return
    
    localPosts[postIndex] = updatedPost
  }

  function removePostFromList(id) {
    const postIndex = localPosts.findIndex(p => p.id === id)
    if (postIndex === -1) return
    
    localPosts.splice(postIndex, 1)
    // Update pagination total count if available
    if (paginationMeta.total) {
      paginationMeta.total -= 1
    }
  }

  async function remove(post) {
    const id = post?.id
    if (!id) return

    const confirmed = await showConfirm('Delete Post', 'Are you sure you want to delete this post? This action cannot be undone.')
    if (!confirmed) return

    isProcessing.value = true
    try {
      await deletePostById(id)
      removePostFromList(id)
      
      toast.success('Post deleted successfully!')
      if (editingId.value === id) cancelEdit()
    } catch (e) {
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
