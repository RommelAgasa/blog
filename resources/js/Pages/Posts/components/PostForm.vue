<template>
  <div class="sticky top-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-transparent">
      <div class="flex items-center gap-2">
        <div class="p-2 bg-indigo-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 class="text-lg font-bold text-gray-900">
          {{ editingId ? 'Edit Post' : 'Create New Post' }}
        </h2>
      </div>
    </div>

    <!-- Form Content -->
    <form @submit.prevent="$emit('submit')" class="p-6 space-y-5">
      <!-- Title Field -->
      <div class="space-y-2">
        <label for="title" class="block text-sm font-semibold text-gray-900">
          Post Title
          <span class="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          v-model="form.title"
          placeholder="Give your post an engaging title..."
          required
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-gray-400"
        />
        <p v-if="form.errors.title" class="text-sm text-red-600 font-medium flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586l-6.687-6.686a1 1 0 00-1.414 1.414l8.1 8.1a1 1 0 001.414 0l8.1-8.1z" clip-rule="evenodd" />
          </svg>
          {{ form.errors.title }}
        </p>
      </div>

      <!-- Body Field -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <label for="body" class="block text-sm font-semibold text-gray-900">
            Post Content
            <span class="text-red-500">*</span>
          </label>
          <span class="text-xs text-gray-500">{{ form.body.length }} characters</span>
        </div>
        <textarea
          id="body"
          rows="7"
          v-model="form.body"
          placeholder="Share your thoughts and ideas..."
          required
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-gray-400 resize-none"
        ></textarea>
        <p v-if="form.errors.body" class="text-sm text-red-600 font-medium flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586l-6.687-6.686a1 1 0 00-1.414 1.414l8.1 8.1a1 1 0 001.414 0l8.1-8.1z" clip-rule="evenodd" />
          </svg>
          {{ form.errors.body }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2 pt-4 border-t border-gray-200">
        <button
          type="submit"
          :disabled="isProcessing"
          class="flex-1 inline-flex items-center justify-center gap-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 px-4 py-2.5 rounded-lg cursor-pointer disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg disabled:shadow-none">
          <svg
            v-if="isProcessing"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2" class="opacity-25"></circle>
            <path d="M12 2a10 10 0 0110 10" stroke-width="2" class="opacity-75"></path>
          </svg>
          <span>{{ isProcessing ? (editingId ? 'Updating…' : 'Saving…') : (editingId ? 'Update Post' : 'Publish') }}</span>
        </button>

        <button
          type="button"
          class="px-4 py-2.5 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors duration-200"
          @click="$emit('clear')"
          title="Clear form">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          v-if="editingId"
          type="button"
          class="px-4 py-2.5 font-semibold text-gray-700 bg-red-100 hover:bg-red-200 rounded-lg cursor-pointer transition-colors duration-200"
          @click="$emit('cancel')"
          title="Cancel editing">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
defineProps({
  form: { type: Object, required: true },
  editingId: { type: [Number, null], default: null },
  isProcessing: { type: Boolean, default: false },
})

defineEmits(['submit', 'clear', 'cancel'])
</script>
