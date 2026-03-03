import { reactive, ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { createPost, updatePost, deletePostById } from '../services/post.service'
import { useToast } from './useToast'
import { useConfirm } from './useConfirm'

export function usePosts(initialPosts) {
  const toast = useToast()
  const { show: showConfirm } = useConfirm()
  
  // Local copy of posts (immutable prop -> mutable local)
  const localPosts = reactive({
    data: Array.isArray(initialPosts?.data) ? [...initialPosts.data] : [],
  })

  // Keep in sync if server rehydrates
  const setPosts = (next) => {
    localPosts.data = Array.isArray(next) ? [...next] : []
    isLoading.value = false
  }

  // Edit state
  const editingId = ref(null)

  // Form with Inertia error bag
  const form = useForm({
    user_id: 12,
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
    try {
      await createPost({
        title: form.title,
        body: form.body,
        userId: form.user_id,
      })
      form.reset()
      toast.success('Post created successfully!')
    } catch (e) {
      if (e.response?.status === 422) form.setError(e.response.data.errors || {})
      else toast.error('Something went wrong while saving.')
    } finally {
      isProcessing.value = false
    }
  }

  async function onUpdate() {
    isProcessing.value = true
    form.clearErrors()
    try {
      await updatePost(editingId.value, {
        title: form.title,
        body: form.body,
        userId: form.user_id,
      })
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

  async function remove(post) {
    const id = post?.id
    if (!id) return

    const confirmed = await showConfirm('Delete Post', 'Are you sure you want to delete this post? This action cannot be undone.')
    if (!confirmed) return

    isProcessing.value = true
    try {
      await deletePostById(id)
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
    setPosts,
    editingId,
    form,
    isProcessing,
    isLoading,
    submit,
    startEdit,
    clearForm,
    cancelEdit,
    remove,
  }
}
