import { ref } from 'vue'

const confirmDialog = ref({
  isOpen: false,
  title: '',
  message: '',
  onConfirm: null,
  onCancel: null,
})

export function useConfirm() {
  function show(title, message = '') {
    return new Promise((resolve) => {
      confirmDialog.value = {
        isOpen: true,
        title,
        message,
        onConfirm: () => {
          confirmDialog.value.isOpen = false
          resolve(true)
        },
        onCancel: () => {
          confirmDialog.value.isOpen = false
          resolve(false)
        },
      }
    })
  }

  function close() {
    confirmDialog.value.isOpen = false
  }

  return {
    confirmDialog,
    show,
    close,
  }
}
