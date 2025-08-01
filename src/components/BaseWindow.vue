<template>
  <div 
    v-if="active"
    class="window" 
    :class="{ active, maximized }"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
    ref="windowRef"
  >
    <div 
      class="window-header"
      @mousedown="startDrag"
      @touchstart="startDrag"
      @dblclick="toggleMaximize"
    >
      <div class="window-title">{{ title }}</div>
      <div class="window-controls">
        <button class="window-btn maximize-btn" @click="toggleMaximize">{{ maximized ? '🗗' : '🗖' }}</button>
        <button class="window-btn minimize-btn" @click="$emit('minimize')">−</button>
        <button class="window-btn close-btn" @click="$emit('close')">×</button>
      </div>
    </div>
    <div class="window-content">
      <slot></slot>
    </div>
    
    <!-- Resize Handles -->
    <div v-if="!maximized" class="resize-handles">
      <!-- Corner handles -->
      <div class="resize-handle resize-nw" @mousedown="startResize($event, 'top-left')" @touchstart="startResize($event, 'top-left')"></div>
      <div class="resize-handle resize-ne" @mousedown="startResize($event, 'top-right')" @touchstart="startResize($event, 'top-right')"></div>
      <div class="resize-handle resize-sw" @mousedown="startResize($event, 'bottom-left')" @touchstart="startResize($event, 'bottom-left')"></div>
      <div class="resize-handle resize-se" @mousedown="startResize($event, 'bottom-right')" @touchstart="startResize($event, 'bottom-right')"></div>
      
      <!-- Edge handles -->
      <div class="resize-handle resize-n" @mousedown="startResize($event, 'top')" @touchstart="startResize($event, 'top')"></div>
      <div class="resize-handle resize-s" @mousedown="startResize($event, 'bottom')" @touchstart="startResize($event, 'bottom')"></div>
      <div class="resize-handle resize-w" @mousedown="startResize($event, 'left')" @touchstart="startResize($event, 'left')"></div>
      <div class="resize-handle resize-e" @mousedown="startResize($event, 'right')" @touchstart="startResize($event, 'right')"></div>
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
  maximized?: boolean
}>()

const emit = defineEmits<{
  close: []
  minimize: []
  move: [position: Position]
  maximize: []
}>()

const windowRef = ref<HTMLElement>()
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const originalPosition = ref<Position>({ x: 0, y: 0 })
const originalSize = ref({ width: 0, height: 0 })
const isResizing = ref(false)
const resizeDirection = ref('')
const resizeStartPos = ref({ x: 0, y: 0 })
const resizeStartSize = ref({ width: 0, height: 0 })

const toggleMaximize = () => {
  if (!windowRef.value) return
  
  if (!props.maximized) {
    // Store original position and size before maximizing
    originalPosition.value = { ...props.position }
    const rect = windowRef.value.getBoundingClientRect()
    originalSize.value = { width: rect.width, height: rect.height }
  }
  
  emit('maximize')
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  if (!windowRef.value || props.maximized) return // Don't drag if maximized
  
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
  if (!isDragging.value || !windowRef.value || props.maximized) return
  
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

const startResize = (e: MouseEvent | TouchEvent, direction: string) => {
  if (!windowRef.value || props.maximized) return
  
  e.preventDefault()
  e.stopPropagation()
  
  isResizing.value = true
  resizeDirection.value = direction
  
  const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX
  const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY
  
  resizeStartPos.value = { x: clientX, y: clientY }
  
  const rect = windowRef.value.getBoundingClientRect()
  resizeStartSize.value = { width: rect.width, height: rect.height }
  
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  document.addEventListener('touchmove', handleResize)
  document.addEventListener('touchend', stopResize)
}

const handleResize = (e: MouseEvent | TouchEvent) => {
  if (!isResizing.value || !windowRef.value) return
  
  const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX
  const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY
  
  const deltaX = clientX - resizeStartPos.value.x
  const deltaY = clientY - resizeStartPos.value.y
  
  let newWidth = resizeStartSize.value.width
  let newHeight = resizeStartSize.value.height
  let newX = props.position.x
  let newY = props.position.y
  
  // Handle different resize directions
  if (resizeDirection.value.includes('right')) {
    newWidth = Math.max(300, resizeStartSize.value.width + deltaX)
  }
  if (resizeDirection.value.includes('left')) {
    const proposedWidth = Math.max(300, resizeStartSize.value.width - deltaX)
    const widthDiff = proposedWidth - resizeStartSize.value.width
    newWidth = proposedWidth
    newX = Math.max(0, props.position.x - widthDiff)
    
    // Adjust width if we hit the left boundary
    if (newX === 0 && props.position.x > 0) {
      newWidth = resizeStartSize.value.width + props.position.x
    }
  }
  if (resizeDirection.value.includes('bottom')) {
    newHeight = Math.max(200, resizeStartSize.value.height + deltaY)
  }
  if (resizeDirection.value.includes('top')) {
    const proposedHeight = Math.max(200, resizeStartSize.value.height - deltaY)
    const heightDiff = proposedHeight - resizeStartSize.value.height
    newHeight = proposedHeight
    newY = Math.max(70, props.position.y - heightDiff) // 70px for header
    
    // Adjust height if we hit the top boundary
    if (newY === 70 && props.position.y > 70) {
      newHeight = resizeStartSize.value.height + (props.position.y - 70)
    }
  }
  
  // Ensure window doesn't exceed viewport bounds
  if (newX + newWidth > window.innerWidth) {
    newWidth = window.innerWidth - newX
  }
  if (newY + newHeight > window.innerHeight - 120) { // Account for header/taskbar
    newHeight = window.innerHeight - 120 - newY
  }
  
  // Apply new size and position
  windowRef.value.style.width = newWidth + 'px'
  windowRef.value.style.height = newHeight + 'px'
  
  if (newX !== props.position.x || newY !== props.position.y) {
    emit('move', { x: newX, y: newY })
  }
}

const stopResize = () => {
  isResizing.value = false
  resizeDirection.value = ''
  
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchmove', handleResize)
  document.removeEventListener('touchend', stopResize)
}

// Update window position and size when maximized state changes
watch(() => props.maximized, (isMaximized) => {
  if (!windowRef.value) return
  
  if (isMaximized) {
    // Maximize window
    windowRef.value.style.left = '0px'
    windowRef.value.style.top = '70px' // Account for header
    windowRef.value.style.width = '100vw'
    windowRef.value.style.height = 'calc(100vh - 120px)' // Account for header and taskbar
    windowRef.value.style.borderRadius = '0'
  } else {
    // Restore window
    windowRef.value.style.left = originalPosition.value.x + 'px'
    windowRef.value.style.top = originalPosition.value.y + 'px'
    windowRef.value.style.width = originalSize.value.width ? originalSize.value.width + 'px' : 'auto'
    windowRef.value.style.height = originalSize.value.height ? originalSize.value.height + 'px' : 'auto'
    windowRef.value.style.borderRadius = '8px'
  }
})

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
  resize: none; /* Disable default browser resize */
}

.window.maximized {
  border-radius: 0 !important;
  box-shadow: none;
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

.maximize-btn {
  background: #00FF41;
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

/* Resize Handles */
.resize-handles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.resize-handle {
  position: absolute;
  pointer-events: all;
  background: transparent;
}

/* Corner handles */
.resize-nw {
  top: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  cursor: nw-resize;
}

.resize-ne {
  top: -5px;
  right: -5px;
  width: 10px;
  height: 10px;
  cursor: ne-resize;
}

.resize-sw {
  bottom: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  cursor: sw-resize;
}

.resize-se {
  bottom: -5px;
  right: -5px;
  width: 10px;
  height: 10px;
  cursor: se-resize;
}

/* Edge handles */
.resize-n {
  top: -5px;
  left: 10px;
  right: 10px;
  height: 10px;
  cursor: n-resize;
}

.resize-s {
  bottom: -5px;
  left: 10px;
  right: 10px;
  height: 10px;
  cursor: s-resize;
}

.resize-w {
  left: -5px;
  top: 10px;
  bottom: 10px;
  width: 10px;
  cursor: w-resize;
}

.resize-e {
  right: -5px;
  top: 10px;
  bottom: 10px;
  width: 10px;
  cursor: e-resize;
}

/* Visual feedback for resize handles on hover */
.resize-handle:hover {
  background: rgba(0, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .window {
    min-width: 90vw;
    left: 5vw !important;
    top: 10vh !important;
  }
  
  .window.maximized {
    left: 0 !important;
    top: 70px !important;
    width: 100vw !important;
    height: calc(100vh - 120px) !important;
  }
  
  .maximize-btn {
    display: none; /* Hide maximize button on mobile */
  }
  
  .resize-handles {
    display: none; /* Hide resize handles on mobile */
  }
}
</style>