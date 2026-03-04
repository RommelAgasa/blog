<template>
  <div class="mt-4 pt-4 border-t border-gray-100">
    <!-- Comments Toggle Button -->
    <button
      @click="$emit('toggle-comments')"
      class="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'rotate-180': expanded }" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" />
      </svg>
      <span>Comments ({{ commentCount }})</span>
    </button>

    <!-- Comments Content -->
    <div v-if="expanded" class="mt-4 space-y-4">
    <!-- Previous Comments -->
    <div v-if="post.comments && post.comments.length > 0" class="space-y-3 pb-4 border-b border-gray-100">
      <h4 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Comments</h4>
      <div
        v-for="comment in post.comments"
        :key="comment.id"
        class="flex gap-3 p-3 bg-gray-50 rounded-lg group">
        <!-- Comment Avatar -->
        <div class="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
          {{ getInitials(comment.user.name) }}
        </div>
        <!-- Comment Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2">
            <p class="text-sm font-medium text-gray-900">{{ comment.user.name }}</p>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500 flex-shrink-0">{{ formatDate(comment.created_at) }}</span>
              <!-- Delete Button (only show for own comments) -->
              <button
                v-if="currentUserId === comment.user.id"
                @click="$emit('delete-comment', comment.id)"
                class="text-xs text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                title="Delete comment">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
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
          {{ getInitials(currentUserName) }}
        </div>
        <!-- Comment Input -->
        <div class="flex-1">
          <div class="flex gap-2">
            <textarea
              v-model="localCommentText"
              placeholder="Add a comment..."
              rows="2"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
            <button
              @click="handleSubmit"
              :disabled="!localCommentText?.trim()"
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
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true },
  expanded: { type: Boolean, default: false },
  commentText: { type: String, default: '' },
  currentUserName: { type: String, default: 'Guest' },
  currentUserId: { type: Number, default: null },
  commentCount: { type: Number, default: 0 },
})

const emit = defineEmits(['submit-comment', 'update-comment-text', 'toggle-comments', 'delete-comment'])

const localCommentText = ref(props.commentText)

// Watch for changes from parent
watch(() => props.commentText, (newVal) => {
  localCommentText.value = newVal
})

// Watch for local changes
watch(localCommentText, (newVal) => {
  emit('update-comment-text', newVal)
})

const handleSubmit = () => {
  const text = localCommentText.value?.trim()
  if (!text) return
  
  emit('submit-comment', text)
  localCommentText.value = ''
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
</script>
