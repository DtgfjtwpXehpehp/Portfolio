<template>
  <div class="control-panel">
    <h3>COMMAND CENTER</h3>
    <button 
      v-for="button in buttons" 
      :key="button.id"
      class="control-btn" 
      @click="handleOpenWindow(button.id)"
    >
      <span class="btn-icon">{{ button.icon }}</span>
      <span class="btn-text">{{ button.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSoundEffects } from '../../composables/useSoundEffects'

const { playSound } = useSoundEffects()

const emit = defineEmits<{
  'open-window': [windowType: string]
}>()

const handleOpenWindow = (windowType: string) => {
  playSound('click')
  emit('open-window', windowType)
}

const buttons = [
  { id: 'about', label: 'PERSONNEL FILE', icon: '👤' },
  { id: 'projects', label: 'CASE FILES', icon: '📁' },
  { id: 'resume', label: 'SERVICE RECORD', icon: '📋' },
  { id: 'contact', label: 'SECURE COMM', icon: '📡' },
  // { id: 'terminal', label: 'TERMINAL ACCESS', icon: '💻' }
]
</script>

<style scoped>
.control-panel {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--window-bg);
  border: 1px solid var(--accent-cyan);
  border-radius: 5px;
  padding: 20px;
  z-index: 100;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  min-width: 200px;
}

.control-panel h3 {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.control-btn {
  display: flex;
  align-items: center;
  width: 100%;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 12px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 3px;
}

.control-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transform: translateX(5px);
}

.control-btn:last-child {
  margin-bottom: 0;
}

.btn-icon {
  margin-right: 10px;
  font-size: 1.1em;
}

.btn-text {
  flex: 1;
}
</style>