<template>
  <div class="w-full border border-gray-300/60 rounded-2xl px-8 bg-white p-4">
    <h2 class="text-xl font-semibold mb-4">Posts</h2>

    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-4">
      <div
        v-for="i in 3"
        :key="`skeleton-${i}`"
        class="animate-pulse">
        <div class="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div class="h-4 bg-gray-100 rounded w-full mb-1"></div>
        <div class="h-4 bg-gray-100 rounded w-5/6"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="posts.length === 0"
      class="text-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto text-gray-300 mb-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
      </svg>
      <h3 class="text-gray-500 font-semibold mb-1">No posts yet</h3>
      <p class="text-gray-400 text-sm">Create your first post to get started</p>
    </div>

    <!-- Posts List -->
    <ul v-else class="list-none p-0 m-0 space-y-4">
      <li
        v-for="post in posts"
        :key="post.id"
        class="group animate-in fade-in">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h3 class="m-0 mb-1 text-[1.05rem] font-semibold truncate">
              {{ post.title }}
            </h3>
            <p class="m-0 text-gray-700 leading-relaxed">
              {{ post.body }}
            </p>
          </div>
          <div class="shrink-0 flex items-center gap-1 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-indigo-600"
              @click="$emit('edit', post)"
              aria-label="Edit post"
              title="Edit">
              <!-- pencil -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                      d="M16.862 4.487l1.651-1.65a2.338 2.338 0 013.305 3.306l-9.46 9.46a4.5 4.5 0 01-1.88 1.128l-3.12.936a.75.75 0 01-.926-.926l.936-3.12a4.5 4.5 0 011.128-1.88l9.366-9.364z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                      d="M15 5l4 4" />
              </svg>
            </button>

            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md hover:bg-red-50 text-gray-600 hover:text-red-600"
              @click="$emit('delete', post)"
              aria-label="Delete post"
              title="Delete">
              <!-- trash -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                      d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m3 0V5a2 2 0 012-2h4a2 2 0 012 2v2m-5 4v6m4-6v6" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                      d="M4 7h16M10 3h4" />
              </svg>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  posts: { type: Array, required: true },
  isLoading: { type: Boolean, default: false },
})
defineEmits(['edit', 'delete'])
</script>