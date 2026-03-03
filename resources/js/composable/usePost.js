import { reactive, ref, watch } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { createPost, updatePost, deletePostById } from '../services/post.service'

export function usePosts(initialPosts) {
  // Local copy of posts (immutable prop -> mutable local)
  const localPosts = reactive({
    data: Array.isArray(initialPosts?.data) ? [...initialPosts.data] : [],
  })

  // Keep in sync if server rehydrates
  const setPosts = (next) => {
    localPosts.data = Array.isArray(next) ? [...next] : []
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
    } catch (e) {
      if (e.response?.status === 422) form.setError(e.response.data.errors || {})
      else alert('Something went wrong while saving.')
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
      cancelEdit()
    } catch (e) {
      if (e.response?.status === 422) form.setError(e.response.data.errors || {})
      else alert('Something went wrong while updating.')
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
    if (!confirm('Delete this post?')) return

    isProcessing.value = true
    try {
      await deletePostById(id)
      if (editingId.value === id) cancelEdit()
    } catch (e) {
      alert('Something went wrong while deleting.')
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
    submit,
    startEdit,
    clearForm,
    cancelEdit,
    remove,
  }
}
