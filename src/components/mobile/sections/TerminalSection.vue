<template>
  <section class="terminal-section mobile-section">
    <div class="section-content">
      <div class="interactive-terminal">
        <div class="terminal-output" ref="terminalOutput">
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
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { useSoundEffects } from '../../../composables/useSoundEffects'

const { playSound } = useSoundEffects()

const terminalOutput = ref<HTMLElement>()
const terminalInput = ref<HTMLInputElement>()
const currentInput = ref('')

const terminalLines = reactive([
  '<span class="terminal-prompt">root@classified:~$</span> whoami',
  'Agent [REDACTED] - Security Clearance: TOP SECRET',
  '<span class="terminal-prompt">root@classified:~$</span> status',
  'All systems operational. Standing by for new assignments.',
  '<span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span>'
])

const handleCommand = () => {
  const command = currentInput.value.trim()
  if (!command) return
  
  playSound('beep')

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
}

const processCommand = (command: string): string => {
  const cmd = command.toLowerCase()
  
  switch(cmd) {
    case 'help':
      return 'Available commands: help, status, skills, clear, date, whoami, ls'
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
    default:
      return `Command not found: ${command}`
  }
}
</script>

<style scoped>
.mobile-section {
  min-height: auto;
  padding: 20px;
}

.section-content {
  max-width: 100%;
  margin: 0 auto;
}

.interactive-terminal {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 15px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
}

.terminal-output {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.terminal-input-container {
  border-top: 1px solid rgba(0, 255, 255, 0.3);
  padding-top: 10px;
}

.terminal-input {
  width: 100%;
  padding: 8px;
  background: transparent;
  border: none;
  color: var(--accent-green);
  font-family: 'Share Tech Mono', monospace;
  outline: none;
}

.terminal-input::placeholder {
  color: rgba(0, 255, 65, 0.5);
}
</style>