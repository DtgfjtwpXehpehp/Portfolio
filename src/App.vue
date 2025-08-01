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
        
        <div class="card-container">
          <div class="photo-card floating">
            <!-- <div class="decorative-element"></div> -->
            <div class="photo-frame">
              <img
                v-if="about?.image_url"
                :src="about.image_url"
                :alt="realName"
                id="photoImage"
                @error="handleImageError"
              >
              <div v-else class="photo-placeholder photo-placeholder-rect">👤</div>
            </div>
            <div class="card-info">
              <h2 class="card-title">{{ about?.title || 'Professional Profile' }}</h2>
              <p class="card-subtitle">Creative • Innovative • Dedicated</p>
              <div class="social-icons">
                <a
                  v-if="contact && contact.email"
                  :href="`mailto:${contact.email}`"
                  class="social-icon"
                  :title="contact.email"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
                <a
                  v-if="contact && contact.linkedin_url"
                  :href="contact.linkedin_url"
                  class="social-icon"
                  :title="contact.linkedin_url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </a>
                <a
                  v-if="contact && contact.github_url"
                  :href="contact.github_url"
                  class="social-icon"
                  :title="contact.github_url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                </a>
              </div>
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
const { contact, fetchContact } = useContact()

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
  
  // Play text scrambling sound
  const audio = new Audio('/src/assets/sounds/textsound.mp3')
  audio.volume = 0.3
  audio.play().catch(() => {
    // Silently handle audio play errors (e.g., user hasn't interacted with page yet)
  })
  
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
      fetchContact()
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

/* Move the landing content to the right to avoid overlap with command center */
.welcome-landing {
  position: fixed;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 80px;
  z-index: 10;
  width: 100vw;
  padding: 0 6vw;
}

/* Ensure welcome-text stays left */
.welcome-text {
  flex: 1 1 0%;
  min-width: 0;
  max-width: 520px;
  margin-left: 260px; /* Push text to the right to clear command center */
}

.card-container {
  perspective: 1000px;
  min-width: 400px;
  flex: 0 0 auto;
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
.card-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* W3.CSS card style */
.id-card.card-w3.card-example {
  width: 370px;
  min-height: 420px;
  background: var(--bg-secondary);
  border: none;
  border-radius: 2px;
  box-shadow: 4px 8px 16px 0 rgba(0,0,0,0.3);
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s;
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
  background: transparent;
  color: var(--text-primary);
  padding: 22px 0 10px 0;
  text-align: center;
  border-radius: 0;
  width: 100%;
}

.card-title {
  font-family: Arial, sans-serif;
  font-weight: 400;
  font-size: 2em;
  letter-spacing: 0;
  color: var(--text-primary);
}

.security-level {
  font-size: 0.8em;
  margin-top: 5px;
  color: var(--danger-red);
  font-weight: bold;
}

.card-content {
  padding: 0 0 0 0;
  text-align: center;
  width: 100%;
}

.agent-photo.agent-photo-square {
  width: 90%;
  max-width: 280px;
  height: 220px;
  border: none;
  border-radius: 0;
  margin: 0 auto 0 auto;
  background: var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-shadow: none;
}
.agent-image.agent-image-square {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 0;
  background: #4682a9;
}
.photo-placeholder.photo-placeholder-square {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5em;
  color: #222;
  background: #4682a9;
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
  margin-bottom: 0;
}

.agent-name {
  font-size: 1.2em;
  color: #fff;
  margin-bottom: 0;
  font-weight: bold;
}

.agent-role {
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 0.9em;
}

.agent-info.agent-info-centered {
  font-family: Arial, sans-serif;
  margin: 18px 0 0 0;
}
.agent-name.agent-name-white {
  font-size: 1.3em;
  color: var(--text-primary);
  margin-bottom: 0;
  font-weight: normal;
  margin-top: 15px;
  min-height: 36px;
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
}
.social-button.prominent {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border: 2px solid var(--accent-cyan);
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,255,255,0.2);
}
.social-button.prominent:hover {
  background: var(--accent-green);
  color: var(--bg-primary);
  border-color: var(--accent-green);
}
.social-button:hover {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

.card-footer {
  background: #333;
  padding: 15px 0;
  border-radius: 0 0 8px 8px;
  border-top: 1px solid #444;
  width: 100%;
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
  
.card-actions.card-actions-row.contact-icons-row {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 18px 0 0 0;
}
.contact-icon-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.7em;
  color: var(--accent-cyan);
  background: rgba(0,255,255,0.08);
  border: 2px solid var(--accent-cyan);
  transition: background 0.2s, color 0.2s, border 0.2s;
  text-decoration: none;
}
.contact-icon-btn.email:hover {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border-color: var(--accent-cyan);
}
.contact-icon-btn.linkedin {
  color: #0a66c2;
  border-color: #0a66c2;
}
.contact-icon-btn.linkedin:hover {
  background: #0a66c2;
  color: #fff;
}
.contact-icon-btn.github {
  color: #fff;
  border-color: #fff;
}
.contact-icon-btn.github:hover {
  background: #fff;
  color: #222;
}
.social-links-rect {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
  min-height: 36px;
}
.social-button-rect {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #555;
  color: #fff;
  border-radius: 4px;
  padding: 6px 14px;
  font-size: 1em;
  text-decoration: none;
  border: 1px solid #888;
  transition: background 0.2s, color 0.2s;
  font-family: 'Share Tech Mono', monospace;
}
.social-button-rect:hover {
  background: #00FFFF;
  color: #222;
  border-color: #00FFFF;
}
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



/* Card container and card styles from provided HTML/CSS */
.card-container {
  perspective: 1000px;
  margin-left: auto;
}

/* Card overrides for portfolio theme */
.photo-card {
  width: 400px;
  height: 550px;
  background: var(--bg-secondary);
  border-radius: 25px;
  box-shadow: 0 25px 50px rgba(0, 255, 255, 0.08), 0 0 0 1px var(--accent-cyan), inset 0 1px 0 rgba(0,255,255,0.05);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid var(--accent-cyan);
}
.photo-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 0 35px 70px rgba(0,255,255,0.12), 0 0 0 1px var(--accent-cyan), inset 0 1px 0 rgba(0,255,255,0.08);
}
.photo-frame {
  width: 280px;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  margin-bottom: 30px;
  box-shadow: 0 15px 35px rgba(0,255,255,0.08), inset 0 0 0 3px var(--accent-cyan);
  transition: all 0.3s ease;
  background: var(--bg-primary);
}
.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(1.1);
  transition: all 0.3s ease;
}
.photo-frame:hover img {
  filter: contrast(1.2) saturate(1.2) brightness(1.05);
}
.photo-placeholder-rect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5em;
  color: var(--accent-cyan);
  background: var(--bg-primary);
}
.card-info {
  text-align: center;
  color: var(--text-primary);
  width: 100%;
}
.card-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--accent-cyan);
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
  text-shadow: 0 2px 4px rgba(0,255,255,0.08);
}
.card-subtitle {
  font-size: 16px;
  font-weight: 300;
  color: var(--text-secondary);
  margin-bottom: 20px;
  letter-spacing: 1px;
}
.social-icons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 10px;
}
.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--accent-cyan);
}
.social-icon:hover {
  background: var(--accent-cyan);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,255,255,0.18);
}
.social-icon svg {
  width: 20px;
  height: 20px;
  fill: var(--accent-cyan);
}
.social-icon:hover svg {
  fill: var(--bg-primary);
}
.floating {
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@media (max-width: 480px) {
  .photo-card {
    width: 350px;
    height: 500px;
    padding: 25px;
  }
  .photo-frame {
    width: 240px;
    height: 300px;
  }
  .card-title {
    font-size: 20px;
  }
}

</style>