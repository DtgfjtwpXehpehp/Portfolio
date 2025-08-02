import { ref, onMounted, onUnmounted } from 'vue'

export function useResponsive() {
  const isMobile = ref(false)
  const screenWidth = ref(0)

  const updateScreenSize = () => {
    screenWidth.value = window.innerWidth
    isMobile.value = window.innerWidth <= 768
  }

  onMounted(() => {
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize)
  })

  return {
    isMobile,
    screenWidth,
    isDesktop: ref(!isMobile.value),
    isTablet: ref(screenWidth.value > 768 && screenWidth.value <= 1024)
  }
}