<template>
  <div class="desktop-interface" :class="{ 'command-center-open': commandCenterOpen }">
    <!-- Scanlines effect -->
    <div class="scanlines"></div>

    <!-- Desktop Header -->
    <DesktopHeader 
      :sound-enabled="soundEnabled"
      @toggle-sound="$emit('toggle-sound')"
    />

    <!-- Control Panel -->
    <ControlPanel 
      v-show="commandCenterOpen"
      @open-window="openWindow" 
    />

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Hi, I'm <span 
              class="name-highlight"
              ref="nameSpan"
              @mouseenter="unscrambleName"
              @mouseleave="scrambleName"
            >{{ scrambledName }}</span>, a <span class="role-highlight">Full-Stack Developer</span>
          </h1>
          <p class="hero-subtitle">Specialized in creating secure, scalable web applications for mission-critical operations</p>
        </div>
        <div class="hero-photo">
          <div class="card-container">
            <div class="photo-card floating" ref="photoCard" @mousemove="handlePhotoCardMouseMove" @mouseleave="resetPhotoCard">
              <div class="decorative-element"></div>
              
              <div class="photo-frame">
                <img 
                  :src="about?.image_url || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='" 
                  alt="Agent Profile Photo"
                >
              </div>
              
              <div class="card-info">
                <h2 class="card-title">CLASSIFIED AGENT</h2>
                <p class="card-subtitle">Secure • Innovative • Elite</p>
                
                <div class="social-icons">
                  <div class="social-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div class="social-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </div>
                  <div class="social-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Windows -->
    <AboutWindow
      v-if="activeWindows.about"
      :active="activeWindows.about"
      :maximized="maximizedWindows.about"
      :position="windowPositions.about"
      @close="closeWindow('about')"
      @minimize="minimizeWindow('about')"
      @maximize="maximizeWindow('about')"
      @move="updateWindowPosition('about', $event)"
    />

    <ProjectsWindow
      v-if="activeWindows.projects"
      :active="activeWindows.projects"
      :maximized="maximizedWindows.projects"
      :position="windowPositions.projects"
      @close="closeWindow('projects')"
      @minimize="minimizeWindow('projects')"
      @maximize="maximizeWindow('projects')"
      @move="updateWindowPosition('projects', $event)"
    />

    <ResumeWindow
      v-if="activeWindows.resume"
      :active="activeWindows.resume"
      :maximized="maximizedWindows.resume"
      :position="windowPositions.resume"
      @close="closeWindow('resume')"
      @minimize="minimizeWindow('resume')"
      @maximize="maximizeWindow('resume')"
      @move="updateWindowPosition('resume', $event)"
    />

    <ContactWindow
      v-if="activeWindows.contact"
      :active="activeWindows.contact"
      :maximized="maximizedWindows.contact"
      :position="windowPositions.contact"
      @close="closeWindow('contact')"
      @minimize="minimizeWindow('contact')"
      @maximize="maximizeWindow('contact')"
      @move="updateWindowPosition('contact', $event)"
    />

    <TerminalWindow
      v-if="activeWindows.terminal"
      :active="activeWindows.terminal"
      :position="windowPositions.terminal"
      @close="closeWindow('terminal')"
      @minimize="minimizeWindow('terminal')"
      @move="updateWindowPosition('terminal', $event)"
    />

    <!-- Taskbar -->
    <DesktopTaskbar
      :minimized-windows="minimizedWindows"
      :command-center-open="commandCenterOpen"
      @restore-window="restoreWindow"
      @toggle-command-center="toggleCommandCenter"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
gsap.registerPlugin(ScrambleTextPlugin)
import DesktopHeader from './DesktopHeader.vue'
import ControlPanel from './ControlPanel.vue'
import AboutWindow from '../AboutWindow.vue'
import ProjectsWindow from '../ProjectsWindow.vue'
import ResumeWindow from '../ResumeWindow.vue'
import ContactWindow from '../ContactWindow.vue'
import TerminalWindow from '../TerminalWindow.vue'
import DesktopTaskbar from './DesktopTaskbar.vue'
import { useWindowManagement } from '../../composables/useWindowManagement'
import { useAbout } from '../../composables/useAbout'

defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
}>()

const commandCenterOpen = ref(true)
const photoCard = ref<HTMLElement>()

// Fetch about info (name, image)
const { about, fetchAbout } = useAbout()

const nameSpan = ref()
const realName = ref('')
const scrambledName = ref('')
const shift = 11

function caesarCipher(str, shift) {
  return str.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0)
      const base = code >= 97 ? 97 : 65
      return String.fromCharCode(((code - base + shift) % 26) + base)
    }
    return char
  }).join('')
}


let animationInProgress = false

function runScramble(toReal: boolean) {
  if (!nameSpan.value) return
  if (animationInProgress) return
  animationInProgress = true
  const from = toReal ? caesarCipher(realName.value, shift) : realName.value
  const to = toReal ? realName.value : caesarCipher(realName.value, shift)
  gsap.to(nameSpan.value, {
    scrambleText: {
      text: to,
      chars: 'upperCase',
      revealDelay: 0.2,
      speed: 0.4
    },
    duration: 1.2,
    ease: 'power1.inOut',
    onStart: () => { nameSpan.value.textContent = from },
    onComplete: () => {
      nameSpan.value.textContent = toReal ? realName.value : to
      scrambledName.value = toReal ? realName.value : to
      animationInProgress = false
    }
  })
}


function unscrambleName() {
  if (scrambledName.value !== realName.value) {
    runScramble(true)
  }
}


function scrambleName() {
  // Do nothing if the real name is already shown
  // This prevents scrambling back to cipher after the real name is revealed
  // Only allow scrambling if the scrambled version is currently displayed (i.e., never after real name is shown)
  // So, do nothing here
}

onMounted(async () => {
  await fetchAbout()
  realName.value = about.value?.name || 'Your Real Name'
  scrambledName.value = caesarCipher(realName.value, shift)
  if (nameSpan.value) nameSpan.value.textContent = scrambledName.value
})

const {
  activeWindows,
  minimizedWindows,
  maximizedWindows,
  windowPositions,
  openWindow,
  closeWindow,
  minimizeWindow,
  restoreWindow,
  maximizeWindow,
  updateWindowPosition
} = useWindowManagement()

const toggleCommandCenter = () => {
  commandCenterOpen.value = !commandCenterOpen.value
  console.log('Command center toggled:', commandCenterOpen.value)
}

const handlePhotoCardMouseMove = (event: MouseEvent) => {
  if (!photoCard.value) return
  
  const rect = photoCard.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20
  
  photoCard.value.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

const resetPhotoCard = () => {
  if (photoCard.value) {
    photoCard.value.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)'
  }
}
</script>

<style scoped>
.desktop-interface {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;
}

/* Hero Section */
.hero-section {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 40px;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 60px;
  max-width: 1400px;
  width: 100%;
  transition: margin-left 0.3s ease;
}

/* Adjust margin based on command center state */
.hero-content {
  margin-left: 240px; /* Default offset for command center */
}

/* When command center is hidden, remove the margin */
.desktop-interface:not(.command-center-open) .hero-content {
  margin-left: 0;
}

.hero-text {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-family: 'Orbitron', monospace;
  font-size: 3.5em;
  line-height: 1.2;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.name-highlight {
  color: var(--accent-cyan);
  text-shadow: 0 0 20px var(--accent-cyan);
  animation: glow 2s ease-in-out infinite alternate;
}

.role-highlight {
  color: var(--accent-green);
  text-shadow: 0 0 20px var(--accent-green);
}

@keyframes glow {
  from { text-shadow: 0 0 20px var(--accent-cyan); }
  to { text-shadow: 0 0 30px var(--accent-cyan), 0 0 40px var(--accent-cyan); }
}

.hero-subtitle {
  font-size: 1.3em;
  color: var(--text-secondary);
  line-height: 1.6;
  font-family: 'Share Tech Mono', monospace;
}

.hero-photo {
  flex-shrink: 0;
}

/* Photo Card Styles */
.card-container {
  perspective: 1000px;
}

.photo-card {
  width: 350px;
  height: 480px;
  background: linear-gradient(145deg, rgba(0, 31, 63, 0.9), rgba(0, 15, 31, 0.95));
  border-radius: 25px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.2);
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.photo-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 
    0 35px 70px rgba(0, 0, 0, 0.5),
    0 0 0 2px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.3);
}

.photo-frame {
  width: 240px;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  margin-bottom: 25px;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    inset 0 0 0 3px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.photo-frame:hover {
  transform: scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    inset 0 0 0 3px var(--accent-cyan);
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(0.8) hue-rotate(180deg);
  transition: all 0.3s ease;
}

.photo-frame:hover img {
  filter: contrast(1.2) saturate(1.0) hue-rotate(180deg) brightness(1.1);
}

.photo-frame::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    rgba(0, 255, 255, 0.1) 0%, 
    transparent 30%, 
    transparent 70%, 
    rgba(0, 255, 255, 0.05) 100%);
  pointer-events: none;
}

.card-info {
  text-align: center;
  color: var(--text-primary);
  width: 100%;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-subtitle {
  font-size: 14px;
  font-weight: 300;
  color: var(--text-secondary);
  margin-bottom: 15px;
  letter-spacing: 1px;
  font-family: 'Share Tech Mono', monospace;
}

.social-icons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;
}

.social-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(0, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.social-icon:hover {
  background: rgba(0, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
}

.social-icon svg {
  width: 18px;
  height: 18px;
  fill: var(--accent-cyan);
}

.decorative-element {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.1));
  border: 1px solid rgba(0, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.decorative-element::before {
  content: '⚡';
  color: var(--accent-cyan);
  font-size: 20px;
}

.floating {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

/* Tablet view - keep side by side layout */
@media (max-width: 1200px) and (min-width: 769px) {
  .hero-content {
    gap: 40px;
    margin-left: 200px; /* Smaller offset for tablet */
  }
  
  .desktop-interface:not(.command-center-open) .hero-content {
    margin-left: 0;
  }
  
  .hero-title {
    font-size: 2.8em;
  }
  
  .photo-card {
    width: 300px;
    height: 400px;
  }
  
  .photo-frame {
    width: 200px;
    height: 250px;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: row;
    gap: 20px;
    margin-left: 0;
    padding: 0 15px;
  }
  
  .hero-title {
    font-size: 2.2em;
    line-height: 1.1;
  }
  
  .hero-text {
    flex: 1;
    min-width: 0; /* Allow text to shrink */
  }
  
  .hero-subtitle {
    font-size: 1em;
  }
  
  .photo-card {
    width: 200px;
    height: 280px;
    padding: 15px;
  }
  
  .photo-frame {
    width: 140px;
    height: 180px;
    margin-bottom: 15px;
  }
  
  .card-title {
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .card-subtitle {
    font-size: 11px;
    margin-bottom: 10px;
  }
  
  .social-icons {
    gap: 8px;
  }
  
  .social-icon {
    width: 25px;
    height: 25px;
  }
  
  .social-icon svg {
    width: 12px;
    height: 12px;
  }
  
  .decorative-element {
    width: 30px;
    height: 30px;
    top: 10px;
    right: 10px;
  }
  
  .decorative-element::before {
    font-size: 14px;
  }
}
</style>