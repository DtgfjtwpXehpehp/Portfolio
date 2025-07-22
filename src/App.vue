<template>
  <div id="app">
    <!-- Loading Screen -->
    <LoadingScreen 
      v-if="!systemInitialized"
      @system-ready="handleSystemReady"
    />

    <!-- Sound Toggle -->
    <!-- Scanlines effect -->
    <div class="scanlines"></div>

    <!-- Main Interface -->
    <div 
      v-if="systemInitialized"
      class="main-interface"
    >
      <!-- Header -->
      <header class="header">
        <div class="logo glitch">AGENT PORTFOLI v2.7</div>
        <div class="status-panel">
          <div class="status-item">
            <div class="status-dot"></div>
            <span>SECURE</span>
          </div>
          <div class="status-item">
            <div class="status-dot"></div>
            <span>ENCRYPTED</span>
          </div>
          
          <div class="status-item">
            <div class="status-dot"></div>
            <span>CLASSIFIED</span>
          </div><div class="audio-toggle-container">
            <SoundToggle 
              :enabled="soundEnabled"
              @toggle="toggleSound"
            />
          </div>
        </div>
      </header>

      <!-- Control Panel -->
      <ControlPanel @open-window="openWindow" />

      <!-- Central Interactive Display -->
      <!-- Welcome Landing -->
      <div class="welcome-landing">
        <div class="welcome-text">
          <h1>
            Hi, I'm 
            <span 
              class="name-cipher"
              @mouseenter="showRealName = true"
              @mouseleave="showRealName = false"
            >
              {{ showRealName ? realName : cipherName }}
            </span>
          </h1>
          <h2>a <span class="role">Full-Stack Developer</span></h2>
        </div>
        
        <div class="id-card-container">
          <div 
            class="id-card"
            :class="{ dangling: isDangling }"
            @click="triggerDangle"
          >
            <div class="card-header">
              <div class="card-title">CLASSIFIED</div>
              <div class="security-level">TOP SECRET</div>
            </div>
            <div class="card-content">
              <div class="agent-photo">
                <div class="photo-placeholder">👤</div>
              </div>
              <div class="agent-info">
                <div class="agent-name">{{ realName }}</div>
                <div class="agent-role">FULL-STACK DEVELOPER</div>
                <div class="agent-id">ID: {{ agentId }}</div>
              </div>
            </div>
            <div class="card-footer">
              <div class="clearance">SECURITY CLEARANCE: MAXIMUM</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Windows -->
      <AboutWindow 
        :active="activeWindows.about"
        :position="windowPositions.about"
        @close="closeWindow('about')"
        @minimize="minimizeWindow('about')"
        @move="updateWindowPosition('about', $event)"
      />

      <ProjectsWindow 
        :active="activeWindows.projects"
        :position="windowPositions.projects"
        @close="closeWindow('projects')"
        @minimize="minimizeWindow('projects')"
        @move="updateWindowPosition('projects', $event)"
      />

      <ResumeWindow 
        :active="activeWindows.resume"
        :position="windowPositions.resume"
        @close="closeWindow('resume')"
        @minimize="minimizeWindow('resume')"
        @move="updateWindowPosition('resume', $event)"
      />

      <ContactWindow 
        :active="activeWindows.contact"
        :position="windowPositions.contact"
        @close="closeWindow('contact')"
        @minimize="minimizeWindow('contact')"
        @move="updateWindowPosition('contact', $event)"
      />

      <TerminalWindow 
        :active="activeWindows.terminal"
        :position="windowPositions.terminal"
        @close="closeWindow('terminal')"
        @minimize="minimizeWindow('terminal')"
        @move="updateWindowPosition('terminal', $event)"
      />

      <!-- Taskbar -->
      <div 
        v-if="Object.values(minimizedWindows).some(minimized => minimized)"
        class="taskbar"
      >
        <div class="taskbar-items">
          <button 
            v-for="windowType in Object.keys(minimizedWindows).filter(key => minimizedWindows[key as keyof typeof minimizedWindows])"
            :key="windowType"
            class="taskbar-item"
            @click="restoreWindow(windowType as string)"
          >
            <span v-if="windowType === 'about'">👤 PERSONNEL</span>
            <span v-else-if="windowType === 'projects'">📁 CASE FILES</span>
            <span v-else-if="windowType === 'resume'">📄 DOSSIER</span>
            <span v-else-if="windowType === 'contact'">📡 COMMS</span>
            <span v-else-if="windowType === 'terminal'">💻 TERMINAL</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'
import SoundToggle from './components/SoundToggle.vue'
import ControlPanel from './components/ControlPanel.vue'
import AboutWindow from './components/AboutWindow.vue'
import ProjectsWindow from './components/ProjectsWindow.vue'
import ResumeWindow from './components/ResumeWindow.vue'
import ContactWindow from './components/ContactWindow.vue'
import TerminalWindow from './components/TerminalWindow.vue'
import { useSoundEffects } from './composables/useSoundEffects'
import { useKonamiCode } from './composables/useKonamiCode'

const { playSound } = useSoundEffects()
const { initKonamiCode } = useKonamiCode()

const systemInitialized = ref(false)
const soundEnabled = ref(true)


// Welcome landing data
const realName = ref('Agent Smith')
const cipherName = ref('Ntrpg Fzvgu') // Caesar cipher with key 11
const showRealName = ref(false)
const isDangling = ref(false)
const agentId = ref('A-' + Math.random().toString(36).substr(2, 6).toUpperCase())
const activeWindows = reactive({
  about: false,
  projects: false,
  resume: false,
  contact: false,
  terminal: false
})

const minimizedWindows = reactive({
  about: false,
  projects: false,
  resume: false,
  contact: false,
  terminal: false
})

const windowPositions = reactive({
  about: { x: 200, y: 100 },
  projects: { x: 230, y: 130 },
  resume: { x: 260, y: 160 },
  contact: { x: 290, y: 190 },
  terminal: { x: 320, y: 220 }
})

const handleSystemReady = () => {
  systemInitialized.value = true
  playSound('systemReady')
}

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
  playSound('click')
}

const openWindow = (windowType: string) => {
  playSound('beep')
  activeWindows[windowType as keyof typeof activeWindows] = true
}

const closeWindow = (windowType: string) => {
  playSound('click')
  activeWindows[windowType as keyof typeof activeWindows] = false
}

const minimizeWindow = (windowType: string) => {
  playSound('click')
  activeWindows[windowType as keyof typeof activeWindows] = false
  minimizedWindows[windowType as keyof typeof minimizedWindows] = true
}

const restoreWindow = (windowType: string) => {
  playSound('beep')
  minimizedWindows[windowType as keyof typeof minimizedWindows] = false
  activeWindows[windowType as keyof typeof activeWindows] = true
}

const updateWindowPosition = (windowType: string, position: { x: number, y: number }) => {
  windowPositions[windowType as keyof typeof windowPositions] = position
}

const triggerDangle = () => {
  playSound('beep')
  isDangling.value = true
  setTimeout(() => {



    isDangling.value = false
  }, 1000)
}
const handleKeydown = (e: KeyboardEvent) => {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case '1':
        e.preventDefault()
        openWindow('about')
        break
      case '2':
        e.preventDefault()
        openWindow('projects')
        break
      case '3':
        e.preventDefault()
        openWindow('resume')
        break
      case '4':
        e.preventDefault()
        openWindow('contact')
        break
      case '5':
        e.preventDefault()
        openWindow('terminal')
        break
    }
  }
  
  if (e.key === 'Escape') {
    Object.keys(activeWindows).forEach(window => {
      activeWindows[window as keyof typeof activeWindows] = false
    })
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  initKonamiCode()
  
  // Glitch effect interval
  setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch')
    glitchElements.forEach(el => {
      if (Math.random() < 0.1) {
        (el as HTMLElement).style.animation = 'none'
        setTimeout(() => {
          (el as HTMLElement).style.animation = 'glitch 2s infinite'
        }, 100)
      }
    })
  }, 5000)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

:root {
  --bg-primary: #0A0F1F;
  --bg-secondary: #001F3F;
  --accent-cyan: #00FFFF;
  --accent-green: #00FF41;
  --text-primary: #E0E0E0;
  --text-secondary: #A0A0A0;
  --border-glow: #00FFFF;
  --window-bg: rgba(0, 31, 63, 0.95);
  --danger-red: #FF0040;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Share Tech Mono', monospace;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
  cursor: crosshair;
}

#app {
  min-height: 100vh;
}

.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1;
  animation: scanlineMove 3s linear infinite;
}

@keyframes scanlineMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}

.main-interface {
  min-height: 100vh;
  position: relative;
  z-index: 2;
}

.header {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-bottom: 2px solid var(--accent-cyan);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  z-index: 200;
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

.status-panel {
  display: flex;
  gap: 20px;
  align-items: center;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9em;
}

.audio-toggle-container {
  margin-left: 10px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-green);
  box-shadow: 0 0 5px var(--accent-green);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.glitch {
  animation: glitch 2s infinite;
}

@keyframes glitch {
  0%, 90%, 100% { transform: translate(0); }
  91% { transform: translate(-2px, 1px); }
  92% { transform: translate(2px, -1px); }
  93% { transform: translate(-1px, 2px); }
}

@media (max-width: 768px) {
  .header {
    padding: 10px 15px;
    flex-direction: column;
    gap: 10px;
  }

  .taskbar {
    bottom: 80px !important;
  }
}

.welcome-landing {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 80px;
  z-index: 10;
}

.welcome-text h1 {
  font-size: 4rem;
  font-family: 'Orbitron', monospace;
  color: var(--text-primary);
  margin-bottom: 20px;
  line-height: 1.2;
}

.welcome-text h2 {
  font-size: 2.5rem;
  font-family: 'Orbitron', monospace;
  color: var(--text-secondary);
  font-weight: 400;
}

.name-cipher {
  color: var(--accent-cyan);
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px var(--accent-cyan);
}

.name-cipher:hover {
  color: var(--accent-green);
  text-shadow: 0 0 15px var(--accent-green);
  transform: scale(1.05);
}

.role {
  color: var(--accent-cyan);
  text-shadow: 0 0 5px var(--accent-cyan);
}

.id-card-container {
  perspective: 1000px;
}

.id-card {
  width: 300px;
  height: 400px;
  background: var(--window-bg);
  border: 2px solid var(--accent-cyan);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: top center;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(15px);
}

.id-card:hover {
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  transform: translateY(-5px);
}

.id-card.dangling {
  animation: dangle 1s ease-in-out;
}

@keyframes dangle {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(-3deg); }
  75% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
}

.card-header {
  background: linear-gradient(135deg, var(--accent-cyan), var(--bg-secondary));
  color: var(--bg-primary);
  padding: 15px;
  text-align: center;
  border-radius: 8px 8px 0 0;
}

.card-title {
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  font-size: 1.2em;
  letter-spacing: 2px;
}

.security-level {
  font-size: 0.8em;
  margin-top: 5px;
  color: var(--danger-red);
  font-weight: bold;
}

.card-content {
  padding: 30px 20px;
  text-align: center;
}

.agent-photo {
  width: 120px;
  height: 120px;
  border: 2px solid var(--accent-cyan);
  border-radius: 50%;
  margin: 0 auto 20px;
  background: rgba(0, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.photo-placeholder {
  font-size: 3em;
  color: var(--accent-cyan);
}

.agent-info {
  font-family: 'Share Tech Mono', monospace;
}

.agent-name {
  font-size: 1.2em;
  color: var(--accent-cyan);
  margin-bottom: 10px;
  font-weight: bold;
}

.agent-role {
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 0.9em;
}

.agent-id {
  color: var(--text-secondary);
  font-size: 0.8em;
}

.card-footer {
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;
  border-radius: 0 0 8px 8px;
  border-top: 1px solid rgba(0, 255, 255, 0.3);
}

.clearance {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  color: var(--accent-green);
  text-align: center;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .welcome-landing {
    flex-direction: column;
    gap: 40px;
    padding: 20px;
  }
  
  .welcome-text h1 {
    font-size: 2.5rem;
    text-align: center;
  }
  
  .welcome-text h2 {
    font-size: 1.8rem;
    text-align: center;
  }
  
  .id-card {
    width: 280px;
    height: 360px;
  }
}

.status-line:last-child {
  margin-bottom: 0;
}

.status-label {
  color: var(--text-secondary);
}

.status-value {
  color: var(--accent-green);
  font-weight: bold;
}

.text-cyan {
  color: var(--accent-cyan) !important;
}

.mission-briefing {
  background: var(--window-bg);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 25px;
  text-align: center;
  max-width: 500px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
}

.mission-briefing h3 {
  color: var(--accent-green);
  font-family: 'Orbitron', monospace;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.mission-briefing p {
  line-height: 1.6;
  margin-bottom: 20px;
  color: var(--text-secondary);
}

.briefing-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .central-display {
    padding: 20px;
    gap: 20px;
  }
  
  .holo-container {
    width: 300px;
    height: 300px;
  }
  
  .data-node {
    width: 50px;
    height: 50px;
  }
  
  .node-icon {
    font-size: 1em;
  }
  
  .node-label {
    font-size: 0.5em;
  }
  
  .status-line {
    min-width: 250px;
  }
  
  .mission-briefing {
    max-width: 90vw;
    padding: 20px;
  }
  
  .briefing-actions {
    flex-direction: column;
  }
}

.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-top: 2px solid var(--accent-cyan);
  padding: 10px 20px;
  z-index: 150;
  box-shadow: 0 -2px 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.taskbar-items {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.taskbar-item {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  animation: taskbarSlideIn 0.3s ease-out;
}

.taskbar-item:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transform: translateY(-2px);
}

@keyframes taskbarSlideIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>