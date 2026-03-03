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
        :value="form.title"
        @input="form.title = $event.target.value"
        placeholder="Enter title"
        required
        class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
      />
      <p v-if="form.errors.title" class="text-sm text-red-600">{{ form.errors.title }}</p>

      <label for="body" class="font-semibold text-[0.95rem]">Body</label>
      <textarea
        id="body"
        rows="6"
        :value="form.body"
        @input="form.body = $event.target.value"
        placeholder="Write something..."
        required
        class="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
      ></textarea>
      <p v-if="form.errors.body" class="text-sm text-red-600">{{ form.errors.body }}</p>

      <div class="flex gap-2 mt-1">
        <button
          type="submit"
          :disabled="isProcessing"
          class="inline-flex items-center justify-center font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-60">
          {{ isProcessing ? (editingId ? 'Updating…' : 'Saving…') : (editingId ? 'Update' : 'Add') }}
        </button>

        <button
          type="button"
          class="inline-flex items-center justify-center font-semibold text-gray-900 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg cursor-pointer"
          @click="$emit('clear')">
          Clear
        </button>

        <button
          v-if="editingId"
          type="button"
          class="inline-flex items-center justify-center font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer"
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
