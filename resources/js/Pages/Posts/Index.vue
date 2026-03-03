<template>
  <div class="grid grid-cols-1 gap-6 items-start md:grid-cols-2 p-5 bg-gray-50">
    <PostForm
      :form="form"
      :editing-id="editingId"
      :is-processing="isProcessing"
      @submit="submit"
      @clear="clearForm"
      @cancel="cancelEdit"
    />

    <PostList
      :posts="localPosts.data"
      :is-loading="isLoading"
      @edit="startEdit"
      @delete="remove"
    />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
import { usePosts } from '../../composable/usePost.js'

const props = defineProps({
  posts: { type: Object, required: true },
})

// Composable holds all the logic
const {
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
} = usePosts(props.posts)

// Keep in sync when Inertia rehydrates
watch(
  () => props.posts?.data,
  (next) => setPosts(next),
  { immediate: true }
)
</script>
