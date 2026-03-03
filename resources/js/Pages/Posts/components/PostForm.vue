<template>
  <div class="w-full border border-gray-300/60 rounded-2xl px-8 bg-white p-4">
    <h2 class="text-xl font-semibold mb-4">
      {{ editingId ? 'Edit Post' : 'Add Post' }}
    </h2>

    <form @submit.prevent="$emit('submit')" class="grid gap-3">
      <label for="title" class="font-semibold text-[0.95rem]">Title</label>
      <input
        id="title"
        type="text"
        v-model="form.title"
        placeholder="Enter title"
        required
        class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
      />
      <p v-if="form.errors.title" class="text-sm text-red-600">{{ form.errors.title }}</p>

      <label for="body" class="font-semibold text-[0.95rem]">Body</label>
      <textarea
        id="body"
        rows="6"
        v-model="form.body"
        placeholder="Write something..."
        required
        class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
      ></textarea>
      <p v-if="form.errors.body" class="text-sm text-red-600">{{ form.errors.body }}</p>

      <div class="flex gap-2 mt-1">
        <button
          type="submit"
          :disabled="isProcessing"
          class="inline-flex items-center justify-center gap-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
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
          {{ isProcessing ? (editingId ? 'Updating…' : 'Saving…') : (editingId ? 'Update' : 'Add') }}
        </button>

        <button
          type="button"
          class="inline-flex items-center justify-center font-semibold text-gray-900 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg cursor-pointer transition-colors"
          @click="$emit('clear')">
          Clear
        </button>

        <button
          v-if="editingId"
          type="button"
          class="inline-flex items-center justify-center font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition-colors"
          @click="$emit('cancel')">
          Cancel
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
