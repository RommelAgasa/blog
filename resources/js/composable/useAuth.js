import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { signup as signupApi, login as loginApi, logout as logoutApi } from '../services/auth.service'
import { useToast } from './useToast'

export function useAuth() {
  const toast = useToast()

  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const isProcessing = ref(false)
  const isAuthModeSignup = ref(true) // true for signup, false for login

  async function submit() {
    isAuthModeSignup.value ? await onSignup() : await onLogin()
  }

  async function onSignup() {
    isProcessing.value = true
    form.clearErrors()
    try {
      await signupApi({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      })
      form.reset()
      toast.success('Account created successfully!')
    } catch (e) {
      if (e.response?.status === 422) form.setError(e.response.data.errors || {})
      else toast.error('Something went wrong while signing up.')
    } finally {
      isProcessing.value = false
    }
  }

  async function onLogin() {
    isProcessing.value = true
    form.clearErrors()
    try {
      await loginApi({
        email: form.email,
        password: form.password,
      })
      form.reset()
      toast.success('Logged in successfully!')
    } catch (e) {
      if (e.response?.status === 422 || e.response?.status === 401) {
        form.setError(e.response.data.errors || { email: 'Invalid credentials' })
      } else {
        toast.error('Something went wrong while logging in.')
      }
    } finally {
      isProcessing.value = false
    }
  }

  async function handleLogout() {
    isProcessing.value = true
    try {
      await logoutApi()
      toast.success('Logged out successfully!')
    } catch (e) {
      toast.error('Something went wrong while logging out.')
    } finally {
      isProcessing.value = false
    }
  }

  function toggleMode() {
    isAuthModeSignup.value = !isAuthModeSignup.value
    clearForm()
  }

  function clearForm() {
    form.reset()
    form.clearErrors()
  }

  return {
    form,
    isProcessing,
    isAuthModeSignup,
    submit,
    clearForm,
    toggleMode,
    handleLogout,
  }
}
