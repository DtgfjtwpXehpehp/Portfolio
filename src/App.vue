<template>
  <div id="app">
    <!-- Loading Screen -->
    <LoadingScreen 
      v-if="showLoading" 
      @system-ready="handleSystemReady"
    />
    
    <!-- Dynamic Layout Based on Screen Size -->
    <component 
      v-else
      :is="currentLayout" 
      :sound-enabled="soundEnabled"
      @toggle-sound="toggleSound"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import LoadingScreen from './components/shared/LoadingScreen.vue'
import { useResponsive } from './composables/useResponsive'
import { useSoundEffects } from './composables/useSoundEffects'

// Lazy load layouts
const DesktopInterface = defineAsyncComponent(() => import('./components/desktop/DesktopInterface.vue'))
const MobileInterface = defineAsyncComponent(() => import('./components/mobile/MobileInterface.vue'))

const { isMobile } = useResponsive()
const { playSound } = useSoundEffects()

const showLoading = ref(true)
const soundEnabled = ref(true)

// Dynamically choose layout based on screen size
const currentLayout = computed(() => {
  return isMobile.value ? MobileInterface : DesktopInterface
})

const handleSystemReady = () => {
  showLoading.value = false
  playSound('systemReady')
}

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
  playSound('click')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

:root {
  --bg-primary: #0A0F1F;
  --bg-secondary: #001F3F;
  --window-bg: rgba(10, 15, 31, 0.95);
  --accent-cyan: #00FFFF;
  --accent-green: #00FF41;
  --text-primary: #E0E0E0;
  --text-secondary: #A0A0A0;
  --border-glow: #00FFFF;
  --danger-red: #FF0040;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Share Tech Mono', monospace;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
  cursor: crosshair;
  scroll-behavior: smooth;
}

#app {
  width: 100vw;
  height: 100vh;
  position: relative;
}

/* Global glitch effect */
.glitch {
  animation: glitch 2s infinite;
}

@keyframes glitch {
  0%, 90%, 100% { transform: translate(0); }
  91% { transform: translate(-2px, 1px); }
  92% { transform: translate(2px, -1px); }
  93% { transform: translate(-1px, 2px); }
}

/* Global scanlines effect */
.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1;
  animation: scanlineMove 3s linear infinite;
}

@keyframes scanlineMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}

/* Global terminal styles */
.terminal {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 15px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  text-align: left;
}

.terminal-line {
  margin-bottom: 5px;
}

.terminal-prompt {
  color: var(--accent-cyan);
}

.blinking-cursor::after {
  content: '█';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>