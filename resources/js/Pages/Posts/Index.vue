<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Navigation Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Posts Feed</h1>
          <p class="text-gray-600 mt-2">Discover posts from the community</p>
        </div>
        <Link :href="`/profile/${currentUser.id}`" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          My Profile
        </Link>
      </div>

      <!-- Posts List -->
      <PostList
        :posts="localPosts"
        :is-loading="isLoading"
        :show-title="'All Posts'"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { usePage, Link } from '@inertiajs/vue3'
import PostList from './components/PostList.vue'

const page = usePage()

const props = defineProps({
  posts: { type: Object, required: true },
})

const currentUser = computed(() => page.props.auth?.user || {})

// Local copy of posts as a reactive array
const localPosts = reactive(
  Array.isArray(props.posts?.data) ? [...props.posts.data] : []
)

const isLoading = ref(!(Array.isArray(props.posts?.data) && props.posts.data.length >= 0))
</script>
