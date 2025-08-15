<template>
  <div class="mobile-portfolio">
    <!-- Scanlines effect -->
    <div class="scanlines"></div>

    <!-- Fixed Header -->
    <header class="mobile-header">
      <div class="header-left">
        <div class="logo glitch">AGENT PORTFOLIO</div>
      </div>
      
      <div class="header-center">
        <div class="weather-info">
          <span class="weather-icon">{{ weatherData.icon }}</span>
          <span class="temperature">{{ weatherData.temp }}°C</span>
        </div>
        <div class="location">{{ weatherData.location }}</div>
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
          <h3>COMMAND CENTER</h3>
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
      <section id="about" class="mobile-section about-section">
        <div class="section-content">
          <div class="photo-card-container">
            <div class="photo-card">
              <div class="photo-frame">
                <img 
                  :src="about?.image_url || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='" 
                  alt="Agent Profile"
                >
              </div>
            </div>
            <div class="agent-info">
              <h2 class="agent-name">{{ about?.name || 'AGENT [REDACTED]' }}</h2>
              <p class="agent-title">Full-Stack Developer</p>
              <div class="clearance">CLEARANCE LEVEL: TOP SECRET</div>
            </div>
          </div>

          <div class="terminal">
            <div class="terminal-line"><span class="terminal-prompt">></span> cat agent_profile.txt</div>
            <div class="terminal-line">NAME: [CLASSIFIED]</div>
            <div class="terminal-line">CODENAME: Web Developer</div>
            <div class="terminal-line">SPECIALIZATION: Full-Stack Operations</div>
            <div class="terminal-line">EXPERIENCE: 5+ Years Active Service</div>
            <div class="terminal-line">STATUS: Active <span class="blinking-cursor"></span></div>
          </div>

          <div class="agent-bio">
            <p>Highly skilled operative specializing in digital infrastructure and web-based intelligence systems. 
            Expertise in creating secure, scalable applications for mission-critical operations.</p>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section id="skills" class="mobile-section skills-section">
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
                <li>Responsive Design</li>
              </ul>
            </div>

            <div class="skill-category">
              <h4>Backend Systems</h4>
              <ul class="skill-list">
                <li>Node.js / Express</li>
                <li>Python / Django</li>
                <li>REST APIs</li>
                <li>GraphQL</li>
                <li>Microservices</li>
              </ul>
            </div>

            <div class="skill-category">
              <h4>Database Intelligence</h4>
              <ul class="skill-list">
                <li>MongoDB</li>
                <li>PostgreSQL</li>
                <li>MySQL</li>
                <li>Redis</li>
                <li>Data Analytics</li>
              </ul>
            </div>

            <div class="skill-category">
              <h4>Security Protocols</h4>
              <ul class="skill-list">
                <li>OAuth / JWT</li>
                <li>Encryption</li>
                <li>Cybersecurity</li>
                <li>Secure APIs</li>
                <li>Penetration Testing</li>
              </ul>
            </div>
          </div>

          <div class="terminal">
            <div class="terminal-line"><span class="terminal-prompt">root@classified:~$</span> cat certifications.txt</div>
            <div class="terminal-line">• Certified Ethical Hacker (CEH)</div>
            <div class="terminal-line">• AWS Solutions Architect</div>
            <div class="terminal-line">• Google Cloud Professional Developer</div>
            <div class="terminal-line">• Cybersecurity Fundamentals</div>
            <div class="terminal-line">• Docker Certified Associate</div>
            <div class="terminal-line"><span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span></div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="mobile-section projects-section">
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
                <p>Full-stack e-commerce platform with user authentication, payment processing, and inventory management systems.</p>
              </div>
            </div>

            <div class="project-card">
              <div class="project-header">
                <div class="project-title">Operation: Neural Network</div>
                <div class="project-classification">TOP SECRET</div>
              </div>
              <div class="project-content">
                <p><strong>Mission Brief:</strong> AI-powered data analysis system for pattern recognition in large datasets.</p>
                <p><strong>Technologies:</strong> Python, TensorFlow, Flask, PostgreSQL</p>
                <p><strong>Status:</strong> <span style="color: var(--accent-cyan)">IN PROGRESS</span></p>
                <p>Machine learning application for predictive analytics and anomaly detection in security systems.</p>
              </div>
            </div>

            <div class="project-card">
              <div class="project-header">
                <div class="project-title">Operation: Mobile Command</div>
                <div class="project-classification">RESTRICTED</div>
              </div>
              <div class="project-content">
                <p><strong>Mission Brief:</strong> Cross-platform mobile application for field operations coordination.</p>
                <p><strong>Technologies:</strong> React Native, Firebase, GPS Integration</p>
                <p><strong>Status:</strong> <span style="color: var(--accent-green)">DEPLOYED</span></p>
                <p>Real-time communication and location tracking system for mobile field operatives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="mobile-section contact-section">
        <div class="section-content">
          <h2 class="section-title">SECURE COMMUNICATION</h2>
          
          <div class="warning">
            ⚠️ ENCRYPTED TRANSMISSION REQUIRED ⚠️
          </div>

          <form @submit="handleContactForm" class="contact-form">
            <div class="form-group">
              <label for="agentId">Agent ID:</label>
              <input 
                type="text" 
                id="agentId" 
                v-model="contactForm.agentId"
                placeholder="Enter your agent identification" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="email">Secure Email:</label>
              <input 
                type="email" 
                id="email" 
                v-model="contactForm.email"
                placeholder="agent@classified.gov" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="message">Encrypted Message:</label>
              <textarea 
                id="message" 
                v-model="contactForm.message"
                rows="6" 
                placeholder="Begin encrypted transmission..." 
                required
              ></textarea>
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
            <p>📍 Location: [REDACTED]</p>
          </div>
        </div>
      </section>

      <!-- Terminal Section -->
      <section class="mobile-section terminal-section">
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
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { useAbout } from '../composables/useAbout'

// Reactive data
const soundEnabled = ref(true)
const drawerOpen = ref(false)
const currentTime = ref('')
const isSubmitting = ref(false)
const submitButtonText = ref('TRANSMIT SECURE MESSAGE')
const currentInput = ref('')
const terminalOutput = ref<HTMLElement>()
const terminalInput = ref<HTMLInputElement>()

const weatherData = reactive({
  icon: '☀️',
  temp: 22,
  location: 'Sydney, Australia'
})

const contactForm = reactive({
  agentId: '',
  email: '',
  message: ''
})

const terminalLines = reactive([
  '<span class="terminal-prompt">root@classified:~$</span> whoami',
  'Agent [REDACTED] - Security Clearance: TOP SECRET',
  '<span class="terminal-prompt">root@classified:~$</span> status',
  'All systems operational. Standing by for new assignments.',
  '<span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span>'
])

// let timeInterval: NodeJS.Timeout | null = null

// Fetch about info (name, image)
const { about, fetchAbout } = useAbout()
onMounted(() => {
  fetchAbout()
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

const playSound = (type: 'beep' | 'click') => {
  if (!soundEnabled.value) return
  
  try {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const frequency = type === 'beep' ? 800 : 1200
    const duration = type === 'beep' ? 100 : 50

    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    oscillator.frequency.setValueAtTime(frequency, context.currentTime)
    oscillator.type = 'square'

    gainNode.gain.setValueAtTime(0.1, context.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration / 1000)

    oscillator.start(context.currentTime)
    oscillator.stop(context.currentTime + duration / 1000)
  } catch (e) {
    console.log('Audio not supported')
  }
}

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
  playSound('click')
}

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
  playSound('click')
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const scrollToSection = (event: Event) => {
  event.preventDefault()
  playSound('click')
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
  playSound('beep')
  
  isSubmitting.value = true
  submitButtonText.value = 'TRANSMITTING...'
  
  setTimeout(() => {
    submitButtonText.value = 'MESSAGE SENT ✓'
    setTimeout(() => {
      submitButtonText.value = 'TRANSMIT SECURE MESSAGE'
      isSubmitting.value = false
      // Reset form
      contactForm.agentId = ''
      contactForm.email = ''
      contactForm.message = ''
    }, 2000)
  }, 2000)
}

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
  fetchAbout()
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  // if (timeInterval) {
    clearInterval(timeInterval)
  // }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

:root {
  --bg-primary: #0A0F1F;
  --bg-secondary: #001F3F;
  --accent-cyan: #00FFFF;
  --accent-green: #00FF41;
  --text-primary: #E0E0E0;
  --text-secondary: #A0A0A0;
  --danger-red: #FF0040;
}

.mobile-portfolio {
  font-family: 'Share Tech Mono', monospace;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  overflow-x: hidden;
}

/* Scanlines effect */
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

/* Fixed Header */
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
  backdrop-filter: blur(15px);
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
  display: flex;
  align-items: center;
  gap: 5px;
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

.sound-toggle:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
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
  transform-origin: center;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
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

/* Command Drawer */
.command-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
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
  box-shadow: -5px 0 20px rgba(0, 255, 255, 0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
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
  letter-spacing: 1px;
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
  font-size: 1.2em;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--danger-red);
  color: var(--bg-primary);
}

.drawer-nav {
  flex: 1;
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
  font-family: 'Share Tech Mono', monospace;
}

.nav-link:hover {
  background: rgba(0, 255, 255, 0.1);
  border-left: 3px solid var(--accent-cyan);
  padding-left: 17px;
}

.nav-icon {
  font-size: 1.2em;
  margin-right: 15px;
  width: 25px;
  text-align: center;
}

.nav-text {
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Main Content */
.mobile-main {
  margin-top: 70px;
  position: relative;
  z-index: 2;
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
  letter-spacing: 2px;
  text-align: center;
  text-shadow: 0 0 20px var(--accent-cyan);
}

/* About Section */
.about-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-card-container {
  text-align: center;
  margin-bottom: 30px;
}

.photo-card {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  position: relative;
}

.photo-frame {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.photo-frame:hover {
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.8);
  transform: scale(1.05);
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(0.8);
}

.agent-info {
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
  letter-spacing: 1px;
}

.terminal {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 15px;
  font-family: 'Share Tech Mono', monospace;
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

/* Skills Section */
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
  backdrop-filter: blur(10px);
}

.skill-category h4 {
  color: var(--accent-green);
  margin-bottom: 15px;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  font-size: 1em;
}

.skill-list {
  list-style: none;
  padding: 0;
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

/* Projects Section */
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
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.project-card:hover {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
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
  letter-spacing: 1px;
}

.project-content {
  padding: 15px;
  line-height: 1.5;
}

.project-content p {
  margin-bottom: 10px;
}

/* Contact Section */
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
  backdrop-filter: blur(10px);
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
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
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
  letter-spacing: 1px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: var(--accent-green);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
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

/* Terminal Section */
.terminal-section {
  min-height: auto;
  padding: 20px;
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

/* Glitch effects */
.glitch {
  animation: glitch 2s infinite;
}

@keyframes glitch {
  0%, 90%, 100% { transform: translate(0); }
  91% { transform: translate(-2px, 1px); }
  92% { transform: translate(2px, -1px); }
  93% { transform: translate(-1px, 2px); }
}
</style>