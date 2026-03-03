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
    <div v-else-if="paginatedPosts.length === 0" class="text-center py-16 bg-white rounded-lg border border-gray-200">
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
        v-for="post in paginatedPosts"
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

              <!-- Comments Toggle Button -->
              <div class="mt-4 pt-4 border-t border-gray-100">
                <button
                  @click="toggleComments(post.id)"
                  class="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'rotate-180': expandedComments[post.id] }" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" />
                  </svg>
                  <span>Comments ({{ getCommentCount(post) }})</span>
                </button>
              </div>

              <!-- Comments Section -->
              <div v-if="expandedComments[post.id]" class="mt-4 space-y-4">
                <!-- Previous Comments -->
                <div v-if="post.comments && post.comments.length > 0" class="space-y-3 pb-4 border-b border-gray-100">
                  <h4 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Comments</h4>
                  <div
                    v-for="comment in post.comments"
                    :key="comment.id"
                    class="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <!-- Comment Avatar -->
                    <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                      {{ getInitials(comment.user.name) }}
                    </div>
                    <!-- Comment Content -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between gap-2">
                        <p class="text-sm font-medium text-gray-900">{{ comment.user.name }}</p>
                        <span class="text-xs text-gray-500 flex-shrink-0">{{ formatDate(comment.created_at) }}</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-1">{{ comment.content }}</p>
                    </div>
                  </div>
                </div>

                <!-- Empty Comments Message -->
                <div v-else class="text-center py-4">
                  <p class="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                </div>

                <!-- Add Comment Form -->
                <div class="pt-3 border-t border-gray-100">
                  <div class="flex gap-3">
                    <!-- User Avatar -->
                    <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                      {{ getInitials(currentUserId ? page.props.auth?.user?.name : 'Guest') }}
                    </div>
                    <!-- Comment Input -->
                    <div class="flex-1">
                      <div class="flex gap-2">
                        <textarea
                          v-model="commentText[post.id]"
                          placeholder="Add a comment..."
                          rows="2"
                          class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
                        <button
                          @click="submitComment(post.id)"
                          :disabled="!commentText[post.id]?.trim()"
                          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.40,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16151496 C3.34915502,0.9045127451 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99021575 L3.03521743,10.4312088 C3.03521743,10.5883061 3.34915502,10.7454035 3.50612381,10.7454035 L16.6915026,11.5308905 C16.6915026,11.5308905 17.1624089,11.5308905 17.1624089,12.0021827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                          </svg>
                        </button>
                      </div>
                      <p class="text-xs text-gray-500 mt-1">Press Enter or click send to post your comment</p>
                    </div>
                  </div>
                </div>
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

      <!-- Pagination Controls -->
      <div v-if="paginationMeta" class="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
        <div class="text-sm text-gray-600">
          Showing page <span class="font-semibold">{{ paginationMeta.current_page }}</span> of
          <span class="font-semibold">{{ paginationMeta.last_page }}</span> 
          ({{ paginationMeta.total }} total posts)
        </div>

        <!-- Pagination Links -->
        <div class="flex items-center gap-2">
          <!-- Previous Button -->
          <button
            v-if="paginationMeta.current_page > 1"
            @click="goToPage(paginationMeta.current_page - 1)"
            class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button
            v-else
            disabled
            class="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="flex items-center gap-1">
            <button
              v-for="page in pageNumbers"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                page === paginationMeta.current_page
                  ? 'bg-indigo-600 text-white border border-indigo-600'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              ]">
              {{ page }}
            </button>
          </div>

          <!-- Next Button -->
          <button
            v-if="paginationMeta.current_page < paginationMeta.last_page"
            @click="goToPage(paginationMeta.current_page + 1)"
            class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Next
          </button>
          <button
            v-else
            disabled
            class="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'

const props = defineProps({
  posts: { type: Object, required: true },
  isLoading: { type: Boolean, default: false },
  showTitle: { type: String, default: 'Posts' },
  isProfilePage: { type: Boolean, default: false },
})

defineEmits(['edit', 'delete'])

// Track expanded comments per post
const expandedComments = ref({})
const commentText = ref({})

const page = usePage()
const currentUserId = computed(() => page.props.auth?.user?.id)

const toggleComments = (postId) => {
  expandedComments.value[postId] = !expandedComments.value[postId]
}

const submitComment = (postId) => {
  const text = commentText.value[postId]?.trim()
  if (!text) return
  
  // Here you would typically call an API endpoint to save the comment
  // For now, this is a placeholder
  console.log(`Comment on post ${postId}: ${text}`)
  
  // Clear the input
  commentText.value[postId] = ''
}

const getCommentCount = (post) => {
  return post.comments?.length || 0
}

// Extract posts data and pagination info
const paginatedPosts = computed(() => {
  return Array.isArray(props.posts?.data) ? props.posts.data : []
})

const paginationMeta = computed(() => {
  return props.posts?.meta || null
})

// Calculate visible page numbers (show max 5 pages)
const pageNumbers = computed(() => {
  if (!paginationMeta.value) return []
  
  const current = paginationMeta.value.current_page
  const last = paginationMeta.value.last_page
  const range = 2
  
  let start = Math.max(1, current - range)
  let end = Math.min(last, current + range)
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const isOwnPost = (post) => {
  return currentUserId.value === post.user.id
}

const goToProfile = (userId) => {
  router.get(`/profile/${userId}`)
}

const goToPage = (pageNum) => {
  const url = new URL(window.location.href)
  url.searchParams.set('page', pageNum)
  router.get(url.pathname + url.search)
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