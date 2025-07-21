<template>
  <div 
    v-if="active"
    class="window"
    :class="{ active }"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
    ref="windowRef"
  >
    <div 
      class="window-header"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div class="window-title">{{ title }}</div>
      <div class="window-controls">
        <button class="window-btn minimize-btn" @click="$emit('minimize')">−</button>
        <button class="window-btn close-btn" @click="$emit('close')">×</button>
      </div>
    </div>
    <div class="window-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Position {
  x: number
  y: number
}

const props = defineProps<{
  active: boolean
  position: Position
  title: string
}>()

const emit = defineEmits<{
  close: []
  minimize: []
  move: [position: Position]
}>()

const windowRef = ref<HTMLElement>()
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

const startDrag = (e: MouseEvent | TouchEvent) => {
  if (!windowRef.value) return
  
  isDragging.value = true
  const rect = windowRef.value.getBoundingClientRect()
  const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX
  const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY
  
  dragOffset.value.x = clientX - rect.left
  dragOffset.value.y = clientY - rect.top
  
  windowRef.value.style.zIndex = '1000'
  
  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', drag)
  document.addEventListener('touchend', stopDrag)
  
  e.preventDefault()
}

const drag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !windowRef.value) return
  
  const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX
  const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY
  
  let newX = clientX - dragOffset.value.x
  let newY = clientY - dragOffset.value.y
  
  // Keep window within viewport
  newX = Math.max(0, Math.min(newX, window.innerWidth - windowRef.value.offsetWidth))
  newY = Math.max(0, Math.min(newY, window.innerHeight - windowRef.value.offsetHeight))
  
  emit('move', { x: newX, y: newY })
}

const stopDrag = () => {
  isDragging.value = false
  if (windowRef.value) {
    windowRef.value.style.zIndex = '50'
  }
  
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', drag)
  document.removeEventListener('touchend', stopDrag)
}

watch(() => props.active, (newActive) => {
  if (newActive && windowRef.value) {
    windowRef.value.style.animation = 'windowAppear 0.5s ease-out'
  }
})
</script>

<style scoped>
.window {
  position: fixed;
  background: var(--window-bg);
  border: 2px solid var(--accent-cyan);
  border-radius: 8px;
  min-width: 400px;
  min-height: 300px;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
  backdrop-filter: blur(15px);
  z-index: 50;
}

@keyframes windowAppear {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(-50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.window-header {
  background: linear-gradient(135deg, var(--accent-cyan), var(--bg-secondary));
  color: var(--bg-primary);
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
  border-radius: 6px 6px 0 0;
}

.window-title {
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9em;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.window-btn {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.window-btn:hover {
  transform: scale(1.1);
}

.minimize-btn {
  background: #FFB000;
  color: #000;
}

.close-btn {
  background: var(--danger-red);
  color: white;
}

.window-content {
  padding: 25px;
  height: calc(100% - 50px);
  overflow-y: auto;
}

@media (max-width: 768px) {
  .window {
    min-width: 90vw;
    left: 5vw !important;
    top: 10vh !important;
  }
}
</style>