<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Grid Layout -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Form Section -->
        <div class="lg:col-span-1">
          <PostForm
            :form="form"
            :editing-id="editingId"
            :is-processing="isProcessing"
            @submit="submit"
            @clear="clearForm"
            @cancel="cancelEdit"
          />
        </div>

        <!-- Posts List Section -->
        <div class="lg:col-span-2">
          <PostList
            :posts="localPosts"
            :is-loading="isLoading"
            @edit="startEdit"
            @delete="remove"
          />
        </div>
      </div>
    </div>
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
