<template>
  <div class="control-panel">
    <h3>COMMAND CENTER</h3>
    <button 
      v-for="button in buttons" 
      :key="button.id"
      class="control-btn" 
      @click="$emit('open-window', button.id)"
    >
      {{ button.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  'open-window': [windowType: string]
}>()

const buttons = [
  { id: 'about', label: 'PERSONNEL FILE' },
  { id: 'projects', label: 'CASE FILES' },
  { id: 'resume', label: 'SERVICE RECORD' },
  { id: 'contact', label: 'SECURE COMM' },
  { id: 'terminal', label: 'TERMINAL ACCESS' }
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
  display: block;
  width: 100%;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.control-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transform: translateX(5px);
}

.control-btn:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .control-panel {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    transform: none;
    border-radius: 0;
    border-left: none;
    border-right: none;
    padding: 20px;
    background: var(--window-bg);
    backdrop-filter: blur(15px);
    box-shadow: 0 4px 20px rgba(0, 255, 255, 0.3);
  }
  
  .control-btn {
    margin-bottom: 8px;
  }
}
</style>