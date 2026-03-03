import { ref } from 'vue'

const toasts = ref([])

let toastId = 0

export function useToast() {
  function show(message, type = 'info', duration = 4000) {
    const id = ++toastId
    const toast = { id, message, type }

    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
      }, duration)
    }

    return id
  }

  function success(message, duration) {
    return show(message, 'success', duration)
  }

  function error(message, duration) {
    return show(message, 'error', duration)
  }

  function info(message, duration) {
    return show(message, 'info', duration)
  }

  function warning(message, duration) {
    return show(message, 'warning', duration)
  }

  function remove(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return {
    toasts,
    show,
    success,
    error,
    info,
    warning,
    remove,
  }
}
