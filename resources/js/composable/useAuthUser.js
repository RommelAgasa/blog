import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

/**
 * Composable to access authenticated user from Inertia shared props
 * Usage: const { user, isAuthenticated } = useAuthUser()
 */
export function useAuthUser() {
  const page = usePage()

  const user = computed(() => page.props.auth?.user || null)

  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    isAuthenticated,
  }
}
