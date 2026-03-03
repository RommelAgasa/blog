<template>
  <div class="w-full">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2v-5.5a2 2 0 012-2H7m2 0a2 2 0 00-2 2v2.75m0 0V7a2 2 0 012-2h5.25V21" />
      </svg>
      {{ showTitle }}
    </h2>

    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-4">
      <div v-for="i in 3" :key="`skeleton-${i}`" class="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 space-y-3">
            <div class="h-5 bg-gray-200 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-100 rounded w-full"></div>
              <div class="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
            <div class="h-3 bg-gray-100 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="posts.length === 0" class="text-center py-16 bg-white rounded-lg border border-gray-200">
      <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
      <p class="text-gray-600 text-sm">Start creating your first post to share your thoughts with the world</p>
    </div>

    <!-- Posts List -->
    <div v-else class="space-y-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="group bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 overflow-hidden animate-in fade-in">
        <!-- Post Content -->
        <div class="p-5 sm:p-6">
          <!-- User Info Section -->
          <div class="flex items-center gap-3 mb-4">
            <button
              type="button"
              @click="goToProfile(post.user.id)"
              class="flex items-center gap-3 hover:opacity-75 transition-opacity flex-1">
              <!-- User Avatar -->
              <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                {{ getInitials(post.user.name) }}
              </div>
              <!-- User Name -->
              <div class="text-sm">
                <p class="font-semibold text-gray-900 hover:text-indigo-600">{{ post.user.name }}</p>
                <p class="text-gray-500 text-xs">{{ formatDate(post.created_at) }}</p>
              </div>
            </button>
          </div>

          <div class="flex items-start justify-between gap-4">
            <!-- Main Content -->
            <div class="min-w-0 flex-1">
              <!-- Title -->
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {{ post.title }}
              </h3>
              
              <!-- Body Preview -->
              <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 line-clamp-3">
                {{ post.body }}
              </p>
              
              <!-- Metadata -->
              <div class="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {{ post.body.split(' ').length }} words
                </span>
              </div>
            </div>

            <!-- Action Buttons (only for own posts) -->
            <div v-if="isOwnPost(post)" class="shrink-0 flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                class="inline-flex items-center justify-center p-2 rounded-lg hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-colors"
                @click="$emit('edit', post)"
                aria-label="Edit post"
                title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <button
                type="button"
                class="inline-flex items-center justify-center p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                @click="$emit('delete', post)"
                aria-label="Delete post"
                title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'

const props = defineProps({
  posts: { type: Array, required: true },
  isLoading: { type: Boolean, default: false },
  showTitle: { type: String, default: 'Posts' },
  isProfilePage: { type: Boolean, default: false },
})

defineEmits(['edit', 'delete'])

const page = usePage()
const currentUserId = computed(() => page.props.auth?.user?.id)

const isOwnPost = (post) => {
  return currentUserId.value === post.user.id
}

const goToProfile = (userId) => {
  router.get(`/profile/${userId}`)
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const formatFullDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}
</script>