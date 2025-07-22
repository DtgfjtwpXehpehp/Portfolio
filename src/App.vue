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
          </div>
          <div class="audio-toggle-container">
            <SoundToggle 
              :enabled="soundEnabled"
              @toggle="handleToggleSound"
            />
          </div>
        </div>
      </header>

      <!-- Control Panel -->
      <ControlPanel @open-window="handleWindowOpen" />

      <!-- Central Interactive Display -->
      <!-- Welcome Landing -->
      <div class="welcome-landing">
        <div class="welcome-text">
          <h1 v-if="loading">
            ACCESSING PERSONNEL FILES...
          </h1>
          <h1 v-else-if="error">
            ERROR: PERSONNEL FILE NOT FOUND
          </h1>
          <h1 v-else>
            Hi, I'm 
            <span 
              class="name-cipher"
              ref="nameElement"
              @mouseenter="startScrambleEffect"
            >
              <span class="scramble-text">{{ currentDisplayName }}</span>
              <span class="scramble-cursor" :class="{ 'cursor-hidden': isDecrypted }">_</span>
            </span>
          </h1>
          <h2>a <span class="role">{{ about?.title || 'Full-Stack Developer' }}</span></h2>
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
                <img 
                  v-if="about?.image_url" 
                  :src="about.image_url" 
                  :alt="realName"
                  class="agent-image"
                  @error="handleImageError"
                >
                <div v-else class="photo-placeholder">👤</div>
              </div>
              <div class="agent-info">
                <div class="agent-name">{{ realName }}</div>
                <div class="agent-role">{{ about?.title?.toUpperCase() || 'FULL-STACK DEVELOPER' }}</div>
                <div class="agent-id">ID: {{ agentId }}</div>
                <div class="social-links">
                  <template v-if="contacts?.length">
                    <a 
                      v-for="contact in contacts" 
                      :key="contact.id"
                      :href="contact.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="social-button"
                      :title="contact.platform"
                    >
                      <i :class="getSocialIcon(contact.platform)"></i>
                    </a>
                  </template>
                  <div v-else class="social-button" style="opacity: 0.5;">
                    <i class="fas fa-share-alt"></i>
                  </div>
                </div>
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
        :minimized="minimizedWindows.about"
        :position="windowPositions.about"
        @close="() => closeWindow('about')"
        @minimize="() => minimizeWindow('about')"
        @restore="() => restoreWindow('about')"
        @update:position="(pos) => updateWindowPosition('about', pos)"
      />

      <ProjectsWindow
        :active="activeWindows.projects"
        :minimized="minimizedWindows.projects"
        :position="windowPositions.projects"
        @close="() => closeWindow('projects')"
        @minimize="() => minimizeWindow('projects')"
        @restore="() => restoreWindow('projects')"
        @update:position="(pos) => updateWindowPosition('projects', pos)"
      />

      <ResumeWindow
        :active="activeWindows.resume"
        :minimized="minimizedWindows.resume"
        :position="windowPositions.resume"
        @close="() => closeWindow('resume')"
        @minimize="() => minimizeWindow('resume')"
        @restore="() => restoreWindow('resume')"
        @update:position="(pos) => updateWindowPosition('resume', pos)"
      />

      <ContactWindow
        :active="activeWindows.contact"
        :minimized="minimizedWindows.contact"
        :position="windowPositions.contact"
        @close="() => closeWindow('contact')"
        @minimize="() => minimizeWindow('contact')"
        @restore="() => restoreWindow('contact')"
        @update:position="(pos) => updateWindowPosition('contact', pos)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'
import SoundToggle from './components/SoundToggle.vue'
import ControlPanel from './components/ControlPanel.vue'
import AboutWindow from './components/AboutWindow.vue'
import ProjectsWindow from './components/ProjectsWindow.vue'
import ResumeWindow from './components/ResumeWindow.vue'
import ContactWindow from './components/ContactWindow.vue'
import { useSoundEffects } from './composables/useSoundEffects'
import { useKonamiCode } from './composables/useKonamiCode'
import { useAbout } from './composables/useAbout'
import { useWindowManagement } from './composables/useWindowManagement'
import { useContact } from './composables/useContact'
import type { WindowType } from './types/windows'

// Load composables
const { playSound } = useSoundEffects()
const { initKonamiCode } = useKonamiCode()
const {
  minimizedWindows,
  activeWindows,
  windowPositions,
  isDangling,
  openWindow,
  closeWindow,
  minimizeWindow,
  restoreWindow,
  updateWindowPosition,
  triggerDangle
} = useWindowManagement()

// Application state
const systemInitialized = ref(false)
const soundEnabled = ref(true)
const nameElement = ref<HTMLElement | null>(null)
const scrambleInterval = ref<number | null>(null)
const isDecrypted = ref(false)
const targetName = computed(() => about.value?.name || 'Agent [REDACTED]')
const currentDisplayName = ref('CZPYE [CPONXEPO]')

const encryptName = (name: string) => {
  return name.split('').map(char => {
    if (char === ' ') return ' '
    if (char === '[' || char === ']') return char
    if (!/[A-Za-z]/.test(char)) return char
    const isUpperCase = char === char.toUpperCase()
    const code = char.toUpperCase().charCodeAt(0)
    const shifted = String.fromCharCode(((code - 65 + 11) % 26) + 65)
    return isUpperCase ? shifted : shifted.toLowerCase()
  }).join('')
}

// Data management
const { about, loading, error, fetchAbout } = useAbout()
const { contacts, fetchContacts } = useContact()

const realName = computed(() => about.value?.name || 'Agent [REDACTED]')

const getSocialIcon = (platform: string) => {
  const iconMap: Record<string, string> = {
    'github': 'fab fa-github',
    'linkedin': 'fab fa-linkedin',
    // 'twitter': 'fab fa-twitter',
    'email': 'fas fa-envelope',
    // 'discord': 'fab fa-discord',
    // 'portfolio': 'fas fa-globe',
    // 'instagram': 'fab fa-instagram',
    // 'facebook': 'fab fa-facebook',
    // Add more mappings as needed
  }
  return iconMap[platform.toLowerCase()] || 'fas fa-link'
}

const generateRandomChar = (char: string) => {
  if (char === ' ') return ' '
  if (!/[A-Za-z]/.test(char)) return char
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  return chars[Math.floor(Math.random() * chars.length)]
}

const startScrambleEffect = () => {
  if (scrambleInterval.value || isDecrypted.value) return
  
  const target = targetName.value
  let iterations = 0
  const maxIterations = 15
  
  // Start with the current cipher text
  const startText = currentDisplayName.value
  
  scrambleInterval.value = window.setInterval(() => {
    iterations++
    
    currentDisplayName.value = startText
      .split('')
      .map((char, index) => {
        if (char === target[index]) return char
        if (Math.random() < iterations / maxIterations) return target[index]
        return generateRandomChar(char)
      })
      .join('')
    
    if (currentDisplayName.value === target) {
      if (scrambleInterval.value) {
        clearInterval(scrambleInterval.value)
        scrambleInterval.value = null
        isDecrypted.value = true // Set decrypted state to true
      }
    }
  }, 50)
}

const agentId = ref('A-' + Math.random().toString(36).substr(2, 6).toUpperCase())

// Watch for changes in about data
watch(() => about.value?.name, (newName) => {
  if (!scrambleInterval.value) {
    currentDisplayName.value = newName ? encryptName(newName) : 'Agent [REDACTED]'
  }
}, { immediate: true })

// Event handlers
const handleSystemReady = () => {
  systemInitialized.value = true
  playSound('systemReady')
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = '👤'
  }
}

const handleToggleSound = (enabled: boolean) => {
  soundEnabled.value = enabled
  playSound(enabled ? 'click' : 'beep')
}

const handleWindowOpen = (type: WindowType) => {
  openWindow(type)
}

// Glitch effect interval
  onMounted(async () => {
    await Promise.all([
      fetchAbout(),
      fetchContacts()
    ]);
    if (about.value?.name) {
      currentDisplayName.value = encryptName(about.value.name);
    }
    initKonamiCode();  setInterval(() => {
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
  text-shadow: 0 0 10px var(--accent-cyan);
  position: relative;
  display: inline-block;
}

.name-cipher:hover {
  color: var(--accent-green);
  text-shadow: 0 0 15px var(--accent-green);
}

.scramble-text {
  display: inline-block;
  font-family: 'Share Tech Mono', monospace;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.scramble-cursor {
  display: inline-block;
  width: 0.5em;
  animation: blink 1s step-end infinite;
  opacity: 1;
  color: var(--accent-cyan);
  transition: opacity 0.3s ease;
}

.scramble-cursor.cursor-hidden {
  opacity: 0;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
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
  position: relative;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

.agent-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.agent-photo:hover .agent-image {
  transform: scale(1.1);
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
  margin-bottom: 15px;
}

  .social-links {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 15px;
  min-height: 36px; /* Ensure the container is visible even when empty */
}

.social-button {
  width: 36px;
  height: 36px;
  border: 1px solid var(--accent-cyan);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-cyan);
  background: rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
  font-size: 1.1em;
  text-decoration: none;
  position: relative; /* For debugging */
  z-index: 10; /* Ensure buttons are above other elements */
}.social-button:hover {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
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