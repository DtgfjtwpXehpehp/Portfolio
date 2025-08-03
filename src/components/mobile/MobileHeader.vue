<template>
  <header class="mobile-header">
    <div class="header-left">
      <div class="logo glitch">AGENT PORTFOLIO</div>
    </div>
    
    <div class="header-center">
      <div class="weather-info">
        <span class="weather-icon">{{ weatherData.icon }}</span>
        <span class="temperature">{{ weatherData.temp }}°C</span>
      </div>
      <div class="location">{{ weatherData.location }}</div>
      <div class="time">{{ currentTime }}</div>
    </div>
    
    <div class="header-right">
      <button class="sound-toggle" @click="$emit('toggle-sound')">
        {{ soundEnabled ? '🔊' : '🔇' }}
      </button>
      <button class="hamburger-btn" @click="$emit('toggle-menu')" :class="{ active: false }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
  'toggle-menu': []
}>()

const currentTime = ref('')

const weatherData = reactive({
  icon: '☀️',
  temp: 22,
  location: 'Sydney, Australia'
})

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })
}

let timeInterval: NodeJS.Timeout

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-bottom: 2px solid var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(15px);
}

.header-left .logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.1em;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-center {
  text-align: center;
  font-size: 0.8em;
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 2px;
}

.location, .time {
  font-size: 0.75em;
  color: var(--text-secondary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sound-toggle {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1em;
  transition: all 0.3s ease;
}

.sound-toggle:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
}

.hamburger-btn span {
  display: block;
  height: 3px;
  width: 100%;
  background: var(--accent-cyan);
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
}

.hamburger-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}
</style>