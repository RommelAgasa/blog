<template>
  <transition name="dialog">
    <div
      v-if="confirmDialog.isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      @click="cancel">
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-sm mx-4 p-6 animate-in fade-in zoom-in duration-200"
        @click.stop>
        <h2 class="text-lg font-bold text-gray-900 mb-2">{{ confirmDialog.title }}</h2>
        <p v-if="confirmDialog.message" class="text-gray-600 text-sm mb-6">
          {{ confirmDialog.message }}
        </p>

        <div class="flex gap-3 justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            @click="cancel">
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
            @click="confirm">
            Delete
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useConfirm } from '@/composable/useConfirm'

const { confirmDialog } = useConfirm()

function confirm() {
  confirmDialog.value.onConfirm?.()
}

function cancel() {
  confirmDialog.value.onCancel?.()
}
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from > div,
.dialog-leave-to > div {
  transform: scale(0.95);
}
</style>
