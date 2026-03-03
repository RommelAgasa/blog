<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Profile Header -->
      <div class="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <div class="flex items-start justify-between gap-6">
          <!-- Profile Info -->
          <div class="flex items-center gap-6">
            <!-- Avatar -->
            <div class="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
              {{ getInitials(profile.name) }}
            </div>
            <!-- User Details -->
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ profile.name }}</h1>
              <p class="text-gray-600 mb-2">{{ profile.email }}</p>
              <p class="text-sm text-gray-500">
                Joined {{ formatFullDate(profile.created_at) }}
              </p>
            </div>
          </div>

          <!-- Action Button -->
          <div class="flex items-center gap-3">
            <button
              @click="backToFeed"
              class="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
              Back to Feed
            </button>
            <button
              @click="handleLogout"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Grid Layout -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Form Section (only on own profile) -->
        <div v-if="isOwnProfile" class="lg:col-span-1">
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
        <div :class="isOwnProfile ? 'lg:col-span-2' : 'lg:col-span-3'">
          <PostList
            :posts="localPosts"
            :is-loading="isLoading"
            :show-title="`${profile.name}'s Posts`"
            :is-profile-page="true"
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
import PostForm from '../Posts/components/PostForm.vue'
import PostList from '../Posts/components/PostList.vue'
import { usePosts } from '../../composable/usePost.js'

const props = defineProps({
  profile: { type: Object, required: true },
  posts: { type: Object, required: true },
  isOwnProfile: { type: Boolean, default: false },
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

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatFullDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const backToFeed = () => {
  window.location.href = '/posts'
}

const handleLogout = () => {
  window.location.href = '/auth/logout'
}
</script>
