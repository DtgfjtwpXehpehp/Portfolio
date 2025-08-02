<template>
  <!-- Loading Screen -->
  <LoadingScreen 
    v-if="showLoading" 
    @system-ready="handleSystemReady"
  />
  
  <div id="app">
    <!-- Dynamic Layout Based on Screen Size -->
    <component 
      v-if="!showLoading"
      :is="currentLayout" 
      :sound-enabled="soundEnabled"
      @toggle-sound="toggleSound"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LoadingScreen from './components/shared/LoadingScreen.vue'
import DesktopInterface from './components/desktop/DesktopInterface.vue'
import MobileInterface from './components/mobile/MobileInterface.vue'
import { useResponsive } from './composables/useResponsive'
import { useSoundEffects } from './composables/useSoundEffects'

// Responsive layout
const { isMobile } = useResponsive()

// Sound effects
const { soundEnabled, toggleSound } = useSoundEffects()

// Loading state
const showLoading = ref(true)

// Current layout component
const currentLayout = computed(() => {
  return isMobile.value ? MobileInterface : DesktopInterface
})

// Handle system ready
const handleSystemReady = () => {
  showLoading.value = false
}
</script>

<style>
/* App-level styles can be added here if needed */
</style>