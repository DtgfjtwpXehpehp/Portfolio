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
      <div class="central-display">
        <div class="holographic-interface" @click="triggerHoloEffect">
          <div class="holo-container">
            <!-- Central Hologram -->
            <div class="central-hologram" :class="{ activated: holoActivated }">
              <div class="holo-ring outer-ring"></div>
              <div class="holo-ring middle-ring"></div>
              <div class="holo-ring inner-ring"></div>
              <div class="holo-core">
                <div class="core-symbol">⬢</div>
              </div>
            </div>
            
            <!-- Floating Data Nodes -->
            <div class="data-nodes">
              <div 
                v-for="(node, index) in dataNodes" 
                :key="index"
                class="data-node"
                :class="{ active: node.active }"
                :style="{ 
                  left: node.x + '%', 
                  top: node.y + '%',
                  animationDelay: node.delay + 's'
                }"
                @click="activateNode(index)"
                @mouseenter="highlightNode(index)"
                @mouseleave="unhighlightNode(index)"
              >
                <div class="node-icon">{{ node.icon }}</div>
                <div class="node-label">{{ node.label }}</div>
              </div>
            </div>
            
            <!-- Circuit Connections -->
            <svg class="circuit-overlay" viewBox="0 0 400 400">
              <defs>
                <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:var(--accent-cyan);stop-opacity:0.8" />
                  <stop offset="100%" style="stop-color:var(--accent-green);stop-opacity:0.3" />
                </linearGradient>
              </defs>
              <path 
                v-for="(path, index) in circuitPaths" 
                :key="index"
                :d="path.d"
                stroke="url(#circuitGradient)"
                stroke-width="2"
                fill="none"
                :class="{ energized: path.energized }"
                class="circuit-path"
              />
            </svg>
          </div>
        </div>
        
        <div class="system-status">
          <div class="status-line">
            <span class="status-label">SYSTEM STATUS:</span>
            <span class="status-value">{{ systemStatus }}</span>
          </div>
          <div class="status-line">
            <span class="status-label">ACTIVE CONNECTIONS:</span>
            <span class="status-value">{{ activeConnections }}</span>
          </div>
          <div class="status-line">
            <span class="status-label">SECURITY LEVEL:</span>
            <span class="status-value text-cyan">MAXIMUM</span>
          </div>
          <div class="status-line">
            <span class="status-label">HOLO-INTERFACE:</span>
            <span class="status-value" :class="{ 'text-cyan': holoActivated }">
              {{ holoActivated ? 'ACTIVE' : 'STANDBY' }}
            </span>
          </div>
        </div>
        
        <div class="mission-briefing">
          <h3>MISSION BRIEFING</h3>
          <p>Welcome to the holographic command interface. Interact with the data nodes to access classified information and mission parameters.</p>
          <div class="briefing-actions">
            <button class="action-btn" @click="openWindow('about')">
              <span class="btn-icon">👤</span>
              ACCESS PERSONNEL FILE
            </button>
            <button class="action-btn" @click="openWindow('projects')">
              <span class="btn-icon">📁</span>
              VIEW CASE FILES
            </button>
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
const holoActivated = ref(false)
const systemStatus = ref('OPERATIONAL')
const activeConnections = ref(7)

const dataNodes = ref([
  { x: 20, y: 30, delay: 0, active: false, icon: '🛡️', label: 'SECURITY' },
  { x: 80, y: 25, delay: 0.5, active: false, icon: '📊', label: 'ANALYTICS' },
  { x: 15, y: 70, delay: 1, active: false, icon: '🔐', label: 'ENCRYPTION' },
  { x: 85, y: 75, delay: 1.5, active: false, icon: '🌐', label: 'NETWORK' },
  { x: 50, y: 15, delay: 2, active: false, icon: '⚡', label: 'POWER' },
  { x: 50, y: 85, delay: 2.5, active: false, icon: '🎯', label: 'TARGET' }
])

const circuitPaths = ref([
  { d: 'M200,200 L80,120 L320,100', energized: false },
  { d: 'M200,200 L60,280 L340,300', energized: false },
  { d: 'M200,200 L200,60 L380,60', energized: false },
  { d: 'M200,200 L200,340 L20,340', energized: false },
  { d: 'M200,200 L320,120 L320,280', energized: false }
])
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

const triggerHoloEffect = () => {
  playSound('beep')
  holoActivated.value = true
  
  // Energize random circuit paths
  circuitPaths.value.forEach((path, index) => {
    setTimeout(() => {
      path.energized = true
      setTimeout(() => {
        path.energized = false
      }, 1000)
    }, index * 200)
  })
  
  setTimeout(() => {
    holoActivated.value = false
  }, 3000)
  
  // Update system status randomly
  const statuses = ['OPERATIONAL', 'PROCESSING', 'ANALYZING', 'SYNCHRONIZING']
  systemStatus.value = statuses[Math.floor(Math.random() * statuses.length)]
  
  // Update active connections
  activeConnections.value = Math.floor(Math.random() * 10) + 5
}

const activateNode = (index: number) => {
  playSound('click')
  dataNodes.value[index].active = !dataNodes.value[index].active
  
  const messages = [
    'Security protocols activated',
    'Data stream established',
    'Encryption layer enabled',
    'Network connection secured',
    'Power systems optimized',
    'Target parameters locked'
  ]
  
  // Show temporary message
  const message = document.createElement('div')
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--window-bg);
    border: 1px solid var(--accent-cyan);
    padding: 10px 20px;
    color: var(--accent-cyan);
    font-family: 'Share Tech Mono', monospace;
    z-index: 9999;
    border-radius: 3px;
    backdrop-filter: blur(15px);
  `
  message.textContent = messages[index] || 'Node activated'
  document.body.appendChild(message)
  
  setTimeout(() => {
    if (document.body.contains(message)) {
      document.body.removeChild(message)
    }
  }, 2000)
}

const highlightNode = (index: number) => {
  dataNodes.value[index].active = true
}

const unhighlightNode = (index: number) => {
  if (!dataNodes.value[index].active) {
    dataNodes.value[index].active = false
  }
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

.central-display {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  z-index: 10;
}

.radar-container {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.radar-container:hover {
  transform: scale(1.05);
}

.radar-screen {
  width: 300px;
  height: 300px;
  border: 2px solid var(--accent-cyan);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, rgba(0, 31, 63, 0.8) 70%);
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
  backdrop-filter: blur(10px);
}

.radar-sweep {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 50%;
  background: linear-gradient(to bottom, var(--accent-cyan), transparent);
  transform-origin: bottom center;
  animation: radarSweep 4s linear infinite;
  box-shadow: 0 0 10px var(--accent-cyan);
}

.radar-sweep.pulsing {
  animation: radarSweep 1s linear infinite, radarPulse 2s ease-out;
}

@keyframes radarSweep {
  from { transform: translate(-50%, -100%) rotate(0deg); }
  to { transform: translate(-50%, -100%) rotate(360deg); }
}

@keyframes radarPulse {
  0% { box-shadow: 0 0 10px var(--accent-cyan); }
  50% { box-shadow: 0 0 30px var(--accent-cyan), 0 0 60px var(--accent-cyan); }
  100% { box-shadow: 0 0 10px var(--accent-cyan); }
}

.radar-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.grid-line {
  position: absolute;
  background: rgba(0, 255, 255, 0.3);
}

.grid-line.horizontal {
  width: 100%;
  height: 1px;
}

.grid-line.vertical {
  width: 1px;
  height: 100%;
}

.radar-blips {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.radar-blip {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--accent-green);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: blipPulse 2s infinite;
  cursor: pointer;
  transition: all 0.3s ease;
}

.radar-blip:hover {
  background: var(--accent-cyan);
  box-shadow: 0 0 15px var(--accent-cyan);
  transform: translate(-50%, -50%) scale(1.5);
}

@keyframes blipPulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 5px var(--accent-green); }
  50% { opacity: 0.3; box-shadow: 0 0 15px var(--accent-green); }
}

.center-crosshair {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.crosshair-line {
  position: absolute;
  background: var(--accent-cyan);
}

.crosshair-line.horizontal {
  width: 20px;
  height: 1px;
  left: -10px;
}

.crosshair-line.vertical {
  width: 1px;
  height: 20px;
  top: -10px;
}

.system-status {
  background: var(--window-bg);
  border: 1px solid var(--accent-cyan);
  border-radius: 5px;
  padding: 20px;
  font-family: 'Share Tech Mono', monospace;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
}

.status-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  min-width: 300px;
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