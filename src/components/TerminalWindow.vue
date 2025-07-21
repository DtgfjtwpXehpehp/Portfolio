<template>
  <BaseWindow
    :active="active"
    :position="position"
    title="SECURE TERMINAL v3.2"
    @close="$emit('close')"
    @minimize="$emit('minimize')"
    @move="$emit('move', $event)"
  >
    <div class="terminal-content">
      <div class="terminal" ref="terminalOutput">
        <div 
          v-for="(line, index) in terminalLines" 
          :key="index"
          class="terminal-line"
          v-html="line"
        ></div>
      </div>
      <div class="terminal-input-container">
        <input 
          ref="terminalInput"
          v-model="currentInput"
          type="text" 
          placeholder="Enter command..." 
          class="terminal-input"
          @keydown.enter="handleCommand"
          @focus="inputFocused = true"
          @blur="inputFocused = false"
        >
      </div>
    </div>
  </BaseWindow>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, watch } from 'vue'
import BaseWindow from './BaseWindow.vue'
import { useSoundEffects } from '../composables/useSoundEffects'

defineProps<{
  active: boolean
  position: { x: number, y: number }
}>()

defineEmits<{
  close: []
  minimize: []
  move: [position: { x: number, y: number }]
}>()

const { playSound } = useSoundEffects()

const terminalOutput = ref<HTMLElement>()
const terminalInput = ref<HTMLInputElement>()
const currentInput = ref('')
const inputFocused = ref(false)

const terminalLines = reactive([
  '<span class="terminal-prompt">root@classified:~$</span> whoami',
  'Agent [REDACTED] - Security Clearance: TOP SECRET',
  '<span class="terminal-prompt">root@classified:~$</span> ls -la /skills/',
  '-rwxr-xr-x 1 agent agent 4096 Jan 21 2025 javascript.exe',
  '-rwxr-xr-x 1 agent agent 2048 Jan 21 2025 python.exe',
  '-rwxr-xr-x 1 agent agent 3072 Jan 21 2025 react.exe',
  '-rwxr-xr-x 1 agent agent 1536 Jan 21 2025 nodejs.exe',
  '<span class="terminal-prompt">root@classified:~$</span> cat mission_status.txt',
  'All systems operational. Standing by for new assignments.',
  '<span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span>'
])

const handleCommand = () => {
  const command = currentInput.value.trim()
  if (!command) return

  // Remove blinking cursor from last line
  const lastIndex = terminalLines.length - 1
  terminalLines[lastIndex] = terminalLines[lastIndex].replace('<span class="blinking-cursor"></span>', '')

  // Add command to terminal
  terminalLines.push(`<span class="terminal-prompt">root@classified:~$</span> ${command}`)

  // Process command and add response
  const response = processCommand(command)
  if (response) {
    terminalLines.push(response)
  }

  // Add new prompt with cursor
  terminalLines.push('<span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span>')

  currentInput.value = ''
  
  nextTick(() => {
    if (terminalOutput.value) {
      terminalOutput.value.scrollTop = terminalOutput.value.scrollHeight
    }
  })
  
  playSound('beep')
}

const processCommand = (command: string): string => {
  const cmd = command.toLowerCase()
  
  switch(cmd) {
    case 'help':
      return 'Available commands: help, status, skills, clear, date, whoami, ls, cat, history'
    case 'status':
      return 'All systems operational. Security status: GREEN'
    case 'skills':
      return 'JavaScript, Python, React, Node.js, MongoDB, AWS, Docker, Cybersecurity'
    case 'clear':
      setTimeout(() => {
        terminalLines.splice(0, terminalLines.length)
        terminalLines.push('<span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span>')
      }, 100)
      return ''
    case 'date':
      return new Date().toString()
    case 'whoami':
      return 'Agent [REDACTED] - Full-Stack Developer'
    case 'ls':
      return 'projects/ skills/ contacts/ classified/'
    case 'cat classified/mission.txt':
      return 'Mission: Create innovative web solutions. Status: IN PROGRESS'
    case 'history':
      return 'Command history: [ENCRYPTED]'
    default:
      return `Command not found: ${command}`
  }
}

// Auto-focus terminal input when window becomes active
watch(() => props.active, (newActive) => {
  if (newActive) {
    nextTick(() => {
      terminalInput.value?.focus()
    })
  }
})
</script>

<style scoped>
.terminal-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.terminal {
  flex: 1;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 15px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  overflow-y: auto;
  margin-bottom: 15px;
  min-height: 300px;
}

.terminal-line {
  margin-bottom: 5px;
  word-wrap: break-word;
}

.terminal-line :deep(.terminal-prompt) {
  color: var(--accent-cyan);
}

.terminal-line :deep(.blinking-cursor)::after {
  content: '█';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.terminal-input-container {
  margin-top: auto;
}

.terminal-input {
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  color: var(--accent-green);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 3px;
}

.terminal-input:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
}
</style>