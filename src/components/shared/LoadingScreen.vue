<template>
  <div class="loading-screen" :class="{ hidden: isHidden }">
    <div class="scanlines"></div>
    <div class="loading-content">
      <div class="loading-text">INITIALIZING SECURE CONNECTION</div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="loading-status">{{ currentMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
  'system-ready': []
}>()

const progress = ref(0)
const currentMessage = ref('Establishing encrypted tunnel...')
const isHidden = ref(false)

const loadingMessages = [
  'Establishing encrypted tunnel...',
  'Verifying agent credentials...',
  'Loading classified databases...',
  'Initializing security protocols...',
  'Decrypting personnel files...',
  'System ready. Welcome, Welkom, Wamkelekile'
]

onMounted(() => {
  let messageIndex = 0
  
  const loadingInterval = setInterval(() => {
    progress.value += Math.random() * 15 + 5
    if (progress.value > 100) progress.value = 100

    if (messageIndex < loadingMessages.length - 1 && progress.value > (messageIndex + 1) * 16) {
      messageIndex++
      currentMessage.value = loadingMessages[messageIndex]
    }

    if (progress.value >= 100) {
      clearInterval(loadingInterval)
      setTimeout(() => {
        isHidden.value = true
        setTimeout(() => {
          emit('system-ready')
        }, 1000)
      }, 1000)
    }
  }, 100)
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: opacity 1s ease-out;
}

.loading-screen.hidden {
  opacity: 0;
  pointer-events: none;
}

.loading-content {
  text-align: center;
  z-index: 2;
}

.loading-text {
  font-family: 'Orbitron', monospace;
  font-size: 1.2em;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 20px;
  text-shadow: 0 0 10px var(--accent-cyan);
}

.progress-bar {
  width: 800px;
  height: 4px;
  background: rgba(0, 255, 255, 0.2);
  border: 1px solid var(--accent-cyan);
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-cyan), var(--accent-green));
  transition: width 0.1s ease;
  box-shadow: 0 0 10px var(--accent-cyan);
}

.loading-status {
  margin-top: 20px;
  font-size: 0.9em;
  color: var(--text-secondary);
}
</style>