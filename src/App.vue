<template>
  <div id="app">
    <!-- Mobile Layout (≤768px) -->
    <div class="mobile-layout" v-if="isMobile">
      <!-- Fixed Header -->
      <header class="mobile-header">
        <div class="header-left">
          <div class="logo glitch">AGENT PORTFOLIO</div>
        </div>
        <div class="header-center">
          <div class="weather-info">☀️ 22°C</div>
          <div class="location">Sydney, Australia</div>
          <div class="time">{{ currentTime }}</div>
        </div>
        <div class="header-right">
          <button class="sound-toggle" @click="toggleSound">
            {{ soundEnabled ? '🔊' : '🔇' }}
          </button>
          <button class="hamburger-btn" @click="toggleDrawer" :class="{ active: drawerOpen }">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <!-- Command Drawer -->
      <div class="command-drawer" :class="{ open: drawerOpen }" @click="closeDrawer">
        <div class="drawer-content" @click.stop>
          <div class="drawer-header">
            <h3>NAVIGATION</h3>
            <button class="close-btn" @click="closeDrawer">✕</button>
          </div>
          <nav class="drawer-nav">
            <a href="#about" @click="scrollToSection" class="nav-link">
              <span class="nav-icon">👤</span>
              <span class="nav-text">About</span>
            </a>
            <a href="#skills" @click="scrollToSection" class="nav-link">
              <span class="nav-icon">⚡</span>
              <span class="nav-text">Skills</span>
            </a>
            <a href="#projects" @click="scrollToSection" class="nav-link">
              <span class="nav-icon">📁</span>
              <span class="nav-text">Projects</span>
            </a>
            <a href="#contact" @click="scrollToSection" class="nav-link">
              <span class="nav-icon">📡</span>
              <span class="nav-text">Contact</span>
            </a>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <main class="mobile-main">
        <!-- About Section -->
        <section id="about" class="mobile-section">
          <div class="section-content">
            <div class="photo-card">
              <div class="photo-frame">
                <div class="agent-avatar">🕵️</div>
              </div>
            </div>
            <div class="agent-info">
              <h2 class="agent-name">AGENT [REDACTED]</h2>
              <p class="agent-title">Full-Stack Developer</p>
              <div class="clearance">CLEARANCE LEVEL: TOP SECRET</div>
            </div>
            <div class="terminal">
              <div class="terminal-line"><span class="terminal-prompt">></span> cat agent_profile.txt</div>
              <div class="terminal-line">NAME: [CLASSIFIED]</div>
              <div class="terminal-line">SPECIALIZATION: Full-Stack Operations</div>
              <div class="terminal-line">EXPERIENCE: 5+ Years Active Service</div>
              <div class="terminal-line">STATUS: Active <span class="blinking-cursor"></span></div>
            </div>
            <p class="agent-bio">
              Highly skilled operative specializing in digital infrastructure and web-based intelligence systems. 
              Expertise in creating secure, scalable applications for mission-critical operations.
            </p>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="mobile-section">
          <div class="section-content">
            <h2 class="section-title">TECHNICAL EXPERTISE</h2>
            <div class="skills-grid">
              <div class="skill-category">
                <h4>Frontend Operations</h4>
                <ul class="skill-list">
                  <li>React / Vue.js</li>
                  <li>JavaScript (ES6+)</li>
                  <li>HTML5 / CSS3</li>
                  <li>TypeScript</li>
                </ul>
              </div>
              <div class="skill-category">
                <h4>Backend Systems</h4>
                <ul class="skill-list">
                  <li>Node.js / Express</li>
                  <li>Python / Django</li>
                  <li>REST APIs</li>
                  <li>GraphQL</li>
                </ul>
              </div>
              <div class="skill-category">
                <h4>Database Intelligence</h4>
                <ul class="skill-list">
                  <li>MongoDB</li>
                  <li>PostgreSQL</li>
                  <li>MySQL</li>
                  <li>Redis</li>
                </ul>
              </div>
              <div class="skill-category">
                <h4>Security Protocols</h4>
                <ul class="skill-list">
                  <li>OAuth / JWT</li>
                  <li>Encryption</li>
                  <li>Cybersecurity</li>
                  <li>Secure APIs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="mobile-section">
          <div class="section-content">
            <h2 class="section-title">CLASSIFIED CASE FILES</h2>
            <div class="projects-list">
              <div class="project-card">
                <div class="project-header">
                  <div class="project-title">Operation: E-Commerce Fortress</div>
                  <div class="project-classification">CONFIDENTIAL</div>
                </div>
                <div class="project-content">
                  <p><strong>Mission Brief:</strong> Developed secure online marketplace with advanced encryption protocols.</p>
                  <p><strong>Technologies:</strong> React, Node.js, MongoDB, Stripe API</p>
                  <p><strong>Status:</strong> <span style="color: var(--accent-green)">MISSION SUCCESSFUL</span></p>
                </div>
              </div>
              <div class="project-card">
                <div class="project-header">
                  <div class="project-title">Operation: Neural Network</div>
                  <div class="project-classification">TOP SECRET</div>
                </div>
                <div class="project-content">
                  <p><strong>Mission Brief:</strong> AI-powered data analysis system for pattern recognition.</p>
                  <p><strong>Technologies:</strong> Python, TensorFlow, Flask, PostgreSQL</p>
                  <p><strong>Status:</strong> <span style="color: var(--accent-cyan)">IN PROGRESS</span></p>
                </div>
              </div>
              <div class="project-card">
                <div class="project-header">
                  <div class="project-title">Operation: Mobile Command</div>
                  <div class="project-classification">RESTRICTED</div>
                </div>
                <div class="project-content">
                  <p><strong>Mission Brief:</strong> Cross-platform mobile application for field operations.</p>
                  <p><strong>Technologies:</strong> React Native, Firebase, GPS Integration</p>
                  <p><strong>Status:</strong> <span style="color: var(--accent-green)">DEPLOYED</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="mobile-section">
          <div class="section-content">
            <h2 class="section-title">SECURE COMMUNICATION</h2>
            <div class="warning">⚠️ ENCRYPTED TRANSMISSION REQUIRED ⚠️</div>
            <form @submit="handleContactForm" class="contact-form">
              <div class="form-group">
                <label>Agent ID:</label>
                <input type="text" v-model="contactForm.agentId" placeholder="Enter your agent identification" required>
              </div>
              <div class="form-group">
                <label>Secure Email:</label>
                <input type="email" v-model="contactForm.email" placeholder="agent@classified.gov" required>
              </div>
              <div class="form-group">
                <label>Encrypted Message:</label>
                <textarea v-model="contactForm.message" rows="6" placeholder="Begin encrypted transmission..." required></textarea>
              </div>
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                {{ submitButtonText }}
              </button>
            </form>
            <div class="contact-info">
              <h4>ALTERNATIVE CONTACT METHODS:</h4>
              <p>📧 Email: agent@portfolio.classified</p>
              <p>📱 Secure Line: +1 (555) 000-0000</p>
              <p>🔗 LinkedIn: /in/classified-agent</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- Desktop Layout (>768px) -->
    <div class="desktop-layout" v-else>
      <LoadingScreen v-if="showLoading" @system-ready="showLoading = false" />
      
      <div v-if="!showLoading" class="desktop-content">
        <div class="scanlines"></div>
        
        <header class="header">
          <div class="logo glitch">AGENT PORTFOLIO v2.7</div>
          <SoundToggle :enabled="soundEnabled" @toggle="toggleSound" />
        </header>

        <ControlPanel @open-window="openWindow" />

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

        <div class="taskbar">
          <div class="taskbar-left">
            <div class="system-time">{{ currentTime }}</div>
          </div>
          <div class="taskbar-center">
            <button 
              v-for="(minimized, windowType) in minimizedWindows" 
              :key="windowType"
              v-if="minimized"
              class="taskbar-btn"
              @click="restoreWindow(windowType as WindowType)"
            >
              {{ windowType.toUpperCase() }}
            </button>
          </div>
          <div class="taskbar-right">
            <button class="dangle-btn" @click="triggerDangle" :class="{ dangling: isDangling }">
              🕷️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import type { WindowType } from './types/windows'
import { useWindowManagement } from './composables/useWindowManagement'
import { useKonamiCode } from './composables/useKonamiCode'

// Components
import LoadingScreen from './components/LoadingScreen.vue'
import SoundToggle from './components/SoundToggle.vue'
import ControlPanel from './components/ControlPanel.vue'
import AboutWindow from './components/AboutWindow.vue'
import ProjectsWindow from './components/ProjectsWindow.vue'
import ResumeWindow from './components/ResumeWindow.vue'
import ContactWindow from './components/ContactWindow.vue'
import TerminalWindow from './components/TerminalWindow.vue'

// Composables
const {
  minimizedWindows,
  activeWindows,
  maximizedWindows,
  windowPositions,
  isDangling,
  openWindow,
  closeWindow,
  minimizeWindow,
  restoreWindow,
  maximizeWindow,
  updateWindowPosition,
  triggerDangle
} = useWindowManagement()

const { initKonamiCode } = useKonamiCode()

// Reactive data
const showLoading = ref(true)
const soundEnabled = ref(true)
const currentTime = ref('')
const isMobile = ref(false)
const drawerOpen = ref(false)
const isSubmitting = ref(false)
const submitButtonText = ref('TRANSMIT SECURE MESSAGE')

const contactForm = reactive({
  agentId: '',
  email: '',
  message: ''
})

let timeInterval: NodeJS.Timeout | null = null

// Methods
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
}

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const scrollToSection = (event: Event) => {
  event.preventDefault()
  closeDrawer()
  
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href')
  if (href) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const handleContactForm = (event: Event) => {
  event.preventDefault()
  
  isSubmitting.value = true
  submitButtonText.value = 'TRANSMITTING...'
  
  setTimeout(() => {
    submitButtonText.value = 'MESSAGE SENT ✓'
    setTimeout(() => {
      submitButtonText.value = 'TRANSMIT SECURE MESSAGE'
      isSubmitting.value = false
      contactForm.agentId = ''
      contactForm.email = ''
      contactForm.message = ''
    }, 2000)
  }, 2000)
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Lifecycle
onMounted(() => {
  checkMobile()
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  
  window.addEventListener('resize', checkMobile)
  
  const cleanup = initKonamiCode()
  
  return () => {
    cleanup()
    window.removeEventListener('resize', checkMobile)
  }
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
  window.removeEventListener('resize', checkMobile)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

:root {
  --bg-primary: #0A0F1F;
  --bg-secondary: #001F3F;
  --window-bg: rgba(0, 31, 63, 0.9);
  --accent-cyan: #00FFFF;
  --accent-green: #00FF41;
  --text-primary: #E0E0E0;
  --text-secondary: #A0A0A0;
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
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
}

/* Mobile Layout Styles */
.mobile-layout {
  display: block;
}

.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-bottom: 2px solid var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
}

.header-left .logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.1em;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-center {
  text-align: center;
  font-size: 0.8em;
}

.weather-info {
  margin-bottom: 2px;
}

.location, .time {
  font-size: 0.75em;
  color: var(--text-secondary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sound-toggle {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1em;
  transition: all 0.3s ease;
}

.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
}

.hamburger-btn span {
  display: block;
  height: 3px;
  width: 100%;
  background: var(--accent-cyan);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.hamburger-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.command-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.command-drawer.open {
  opacity: 1;
  visibility: visible;
}

.drawer-content {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-left: 2px solid var(--accent-cyan);
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.command-drawer.open .drawer-content {
  transform: translateX(0);
}

.drawer-header {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-header h3 {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1em;
  text-transform: uppercase;
}

.close-btn {
  background: none;
  border: 1px solid var(--danger-red);
  color: var(--danger-red);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-nav {
  padding: 20px 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(0, 255, 255, 0.1);
}

.nav-icon {
  font-size: 1.2em;
  margin-right: 15px;
  width: 25px;
}

.nav-text {
  font-size: 0.9em;
  text-transform: uppercase;
}

.mobile-main {
  margin-top: 70px;
}

.mobile-section {
  min-height: 100vh;
  padding: 40px 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.section-content {
  max-width: 100%;
  margin: 0 auto;
}

.section-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.8em;
  margin-bottom: 30px;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 0 0 20px var(--accent-cyan);
}

.photo-card {
  text-align: center;
  margin-bottom: 30px;
}

.photo-frame {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  border-radius: 50%;
  border: 3px solid var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 255, 255, 0.1);
}

.agent-avatar {
  font-size: 4em;
}

.agent-info {
  text-align: center;
  margin-bottom: 30px;
}

.agent-name {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.5em;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.agent-title {
  color: var(--text-secondary);
  font-size: 1.1em;
  margin-bottom: 10px;
}

.clearance {
  color: var(--danger-red);
  font-size: 0.9em;
  text-transform: uppercase;
}

.terminal {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 15px;
  color: var(--accent-green);
  margin: 20px 0;
  text-align: left;
}

.terminal-line {
  margin-bottom: 5px;
}

.terminal-prompt {
  color: var(--accent-cyan);
}

.blinking-cursor::after {
  content: '█';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.agent-bio {
  line-height: 1.6;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.skill-category {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  padding: 20px;
}

.skill-category h4 {
  color: var(--accent-green);
  margin-bottom: 15px;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
}

.skill-list {
  list-style: none;
}

.skill-list li {
  margin-bottom: 8px;
  color: var(--text-secondary);
  padding-left: 15px;
  position: relative;
}

.skill-list li::before {
  content: '•';
  color: var(--accent-cyan);
  position: absolute;
  left: 0;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-card {
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 31, 63, 0.3);
}

.project-header {
  background: rgba(0, 255, 255, 0.1);
  padding: 15px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
}

.project-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.1em;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.project-classification {
  color: var(--danger-red);
  font-size: 0.8em;
  text-transform: uppercase;
}

.project-content {
  padding: 15px;
}

.project-content p {
  margin-bottom: 10px;
}

.warning {
  color: var(--danger-red);
  font-size: 0.9em;
  text-align: center;
  margin-bottom: 20px;
}

.contact-form {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--accent-cyan);
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  font-size: 0.9em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 3px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border: none;
  font-family: 'Orbitron', monospace;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: var(--accent-green);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact-info {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}

.contact-info h4 {
  color: var(--accent-green);
  margin-bottom: 15px;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
}

.contact-info p {
  margin-bottom: 8px;
  color: var(--text-secondary);
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

/* Desktop Layout Styles */
.desktop-layout {
  display: block;
}

.desktop-content {
  position: relative;
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
}

.header {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-bottom: 2px solid var(--accent-cyan);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
}

.header .logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.5em;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-top: 2px solid var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 100;
  box-shadow: 0 -2px 20px rgba(0, 255, 255, 0.3);
}

.taskbar-left {
  display: flex;
  align-items: center;
}

.system-time {
  color: var(--accent-cyan);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9em;
}

.taskbar-center {
  display: flex;
  gap: 10px;
}

.taskbar-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 5px 15px;
  cursor: pointer;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  transition: all 0.3s ease;
}

.taskbar-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.taskbar-right {
  display: flex;
  align-items: center;
}

.dangle-btn {
  background: transparent;
  border: none;
  color: var(--accent-cyan);
  font-size: 1.5em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dangle-btn:hover {
  transform: scale(1.2);
}

.dangle-btn.dangling {
  animation: dangle 1s ease-in-out;
}

@keyframes dangle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

/* Hide mobile layout on desktop */
@media (min-width: 769px) {
  .mobile-layout {
    display: none;
  }
}

/* Hide desktop layout on mobile */
@media (max-width: 768px) {
  .desktop-layout {
    display: none;
  }
}
</style>