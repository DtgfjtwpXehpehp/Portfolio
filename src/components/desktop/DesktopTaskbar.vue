<template>
  <div class="taskbar">
    <div class="taskbar-left">
      <div class="system-time">{{ currentTime }}</div>
    </div>
    
    <div class="taskbar-center">
      <button
        v-for="(isMinimized, windowType) in minimizedWindows"
        :key="windowType"
        v-show="isMinimized"
        class="taskbar-btn"
        @click="$emit('restore-window', windowType)"
      >
        {{ getWindowTitle(windowType) }}
      </button>
    </div>
    
    <div class="taskbar-right">
      <div class="system-status">
        <span class="status-dot"></span>
        ALL SYSTEMS OPERATIONAL
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  minimizedWindows: Record<string, boolean>
}>()

defineEmits<{
  'restore-window': [windowType: string]
}>()

const currentTime = ref('')

const getWindowTitle = (windowType: string): string => {
  const titles: Record<string, string> = {
    about: 'PERSONNEL',
    projects: 'CASE FILES',
    resume: 'SERVICE RECORD',
    contact: 'SECURE COMM',
    terminal: 'TERMINAL'
  }
  return titles[windowType] || windowType.toUpperCase()
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
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
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-top: 2px solid var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 100;
  box-shadow: 0 -2px 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(15px);
}

.taskbar-left,
.taskbar-right {
  flex: 1;
}

.taskbar-center {
  flex: 2;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.system-time {
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-cyan);
  font-size: 0.9em;
  letter-spacing: 1px;
}

.taskbar-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.taskbar-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
}

.system-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  font-size: 0.8em;
  text-align: right;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-green);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent-green);
  animation: pulse 2s infinite;
}
</style>