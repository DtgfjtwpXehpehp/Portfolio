<template>
  <button class="sound-toggle" @click="$emit('toggle')">
    {{ enabled ? '🔊 AUDIO ON' : '🔇 AUDIO OFF' }}
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
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--window-bg);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  z-index: 200;
  transition: background 0.3s ease;
}

.sound-toggle:hover {
  background: rgba(0, 255, 255, 0.2);
}
</style>