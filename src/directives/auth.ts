import type { DirectiveBinding } from 'vue'
import { useAuth } from '@/composables/useAuth'

const auth = (el: HTMLElement, binding: DirectiveBinding) => {
  const auth = useAuth(binding.value, binding.modifiers.every)
  if (!auth) {
    el.remove()
  }
}

export default auth
