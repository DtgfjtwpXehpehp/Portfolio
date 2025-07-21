<template>
  <button class="sound-toggle" @click="$emit('toggle')" :class="{ active: enabled }">
    <span class="audio-icon">🔊</span>
    <span class="audio-text">AUDIO {{ enabled ? 'ON' : 'OFF' }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  enabled: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<style scoped>
.sound-toggle {
  background: transparent;
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.sound-toggle:hover {
  background: rgba(0, 255, 255, 0.2);
}

.sound-toggle.active {
  background: rgba(0, 255, 255, 0.1);
}

.audio-icon {
  font-size: 0.9em;
}

.audio-text {
  font-size: 0.75em;
}
</style>