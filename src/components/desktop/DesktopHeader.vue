<template>
  <header class="desktop-header">
    <div class="header-left">
      <div class="logo glitch">AGENT PORTFOLIO v2.7</div>
    </div>
    
    <div class="header-center">
      <div class="status-indicators">
        <div class="status-item">
          <span class="status-dot secure"></span>
          <span>SECURE</span>
        </div>
        <div class="status-item">
          <span class="status-dot encrypted"></span>
          <span>ENCRYPTED</span>
        </div>
        <div class="status-item">
          <span class="status-dot classified"></span>
          <span>CLASSIFIED</span>
        </div>
      </div>
    </div>
    
    <div class="header-right">
      <button class="audio-toggle" @click="$emit('toggle-sound')">
        <i class="fas fa-volume-up" v-if="soundEnabled"></i>
        <i class="fas fa-volume-mute" v-else></i>
        <span>AUDIO {{ soundEnabled ? 'ON' : 'OFF' }}</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
}>()
</script>

<style scoped>
.desktop-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-bottom: 2px solid var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(15px);
}

.logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.5em;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.status-indicators {
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9em;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-dot.secure {
  background: var(--accent-green);
  box-shadow: 0 0 8px var(--accent-green);
}

.status-dot.encrypted {
  background: var(--accent-green);
  box-shadow: 0 0 8px var(--accent-green);
}

.status-dot.classified {
  background: var(--accent-green);
  box-shadow: 0 0 8px var(--accent-green);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-item span:not(.status-dot) {
  color: var(--accent-green);
}

.audio-toggle {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.audio-toggle:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}
</style>