<template>
  <!-- Loading Screen -->
  <div 
    class="loading-screen" 
    :class="{ hidden: !showLoading }"
  >
    <div class="loading-text">INITIALIZING SECURE CONNECTION</div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: loadingProgress + '%' }"></div>
    </div>
    <div class="loading-status">
      {{ loadingMessage }}
    </div>
  </div>

  <!-- Sound Toggle -->

  <!-- Scanlines effect -->
  <div class="scanlines"></div>

  <!-- Header -->
  <header class="header">
    <!-- Hamburger Menu Button -->
    <button class="hamburger-btn" @click="toggleMobileMenu" :class="{ active: mobileMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Logo in center -->
    <div class="logo glitch">AGENT PORTFOLIO v2.7</div>

    <!-- Sound Toggle -->
    <button class="sound-toggle-header" @click="toggleSound">
      {{ soundEnabled ? '🔊' : '🔇' }}
    </button>

    <!-- Desktop Navigation -->
    <nav class="nav-menu desktop-nav">
      <a href="#about" class="nav-btn" @click="scrollToSection">Personnel</a>
      <a href="#projects" class="nav-btn" @click="scrollToSection">Case Files</a>
      <a href="#skills" class="nav-btn" @click="scrollToSection">Skills</a>
      <a href="#contact" class="nav-btn" @click="scrollToSection">Contact</a>
    </nav>

    <!-- Mobile Navigation Overlay -->
    <div class="mobile-nav-overlay" :class="{ active: mobileMenuOpen }" @click="closeMobileMenu">
      <nav class="mobile-nav" @click.stop>
        <div class="mobile-nav-header">
          <div class="mobile-logo">NAVIGATION</div>
          <button class="close-btn" @click="closeMobileMenu">✕</button>
        </div>
        <div class="mobile-nav-content">
          <a href="#about" class="mobile-nav-btn" @click="scrollToSection">
            <span class="nav-icon">👤</span>
            <span class="nav-text">Personnel</span>
          </a>
          <a href="#projects" class="mobile-nav-btn" @click="scrollToSection">
            <span class="nav-icon">📁</span>
            <span class="nav-text">Case Files</span>
          </a>
          <a href="#skills" class="mobile-nav-btn" @click="scrollToSection">
            <span class="nav-icon">⚡</span>
            <span class="nav-text">Skills</span>
          </a>
          <a href="#contact" class="mobile-nav-btn" @click="scrollToSection">
            <span class="nav-icon">📡</span>
            <span class="nav-text">Contact</span>
          </a>
        </div>
        <div class="mobile-nav-footer">
          <div class="sound-control">
            <span>Audio:</span>
            <button class="sound-toggle-mobile" @click="toggleSound">
              {{ soundEnabled ? '🔊 ON' : '🔇 OFF' }}
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="main-content" v-show="!showLoading">
    <!-- About Section -->
    <section class="section hero" id="about">
      <div class="agent-profile">
        <div class="agent-card">
          <div 
            class="photo-card" 
            @mousemove="handlePhotoCardMouseMove"
            @mouseleave="resetPhotoCard"
            ref="photoCard"
          >
            <div class="photo-frame">
              <img 
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" 
                alt="Agent Profile Photo"
              >
            </div>
            <div class="agent-avatar">🕵️</div>
          </div>
        </div>
        <h1 class="agent-title">{{ about?.name || 'Agent [REDACTED]' }}</h1>
        <div class="classification">CLEARANCE LEVEL: TOP SECRET</div>
        
        <div class="terminal">
          <div class="terminal-line"><span class="terminal-prompt">></span> cat agent_profile.txt</div>
          <div class="terminal-line">NAME: [CLASSIFIED]</div>
          <div class="terminal-line">CODENAME: Web Developer</div>
          <div class="terminal-line">SPECIALIZATION: Full-Stack Operations</div>
          <div class="terminal-line">EXPERIENCE: 5+ Years Active Service</div>
          <div class="terminal-line">SKILLS: JavaScript, Python, React, Node.js</div>
          <div class="terminal-line">STATUS: Active <span class="blinking-cursor"></span></div>
        </div>

        <p class="agent-description">
          Highly skilled operative specializing in digital infrastructure and web-based intelligence systems. 
          Expertise in creating secure, scalable applications for mission-critical operations. 
          Proven track record in cybersecurity protocols and data encryption methodologies.
        </p>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="section" id="projects">
      <h2>CLASSIFIED CASE FILES</h2>
      <div class="projects-grid">
        <div 
          v-for="project in projects" 
          :key="project.id"
          class="project-card"
          @mouseenter="playSound('beep')"
        >
          <div class="project-header">
            <div class="project-title">{{ project.title }}</div>
            <div class="project-classification">{{ project.classification }}</div>
          </div>
          <div class="project-content">
            <p><strong>Mission Brief:</strong> {{ project.brief }}</p>
            <p><strong>Technologies:</strong> {{ project.technologies }}</p>
            <p><strong>Status:</strong> <span :style="{ color: project.statusColor }">{{ project.status }}</span></p>
            <p style="margin-top: 10px;">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="section" id="skills">
      <h2>TECHNICAL EXPERTISE</h2>
      <div class="skills-container">
        <div class="skills-grid">
          <div 
            v-for="category in skillCategories" 
            :key="category.title"
            class="skill-category"
          >
            <h4>{{ category.title }}</h4>
            <ul class="skill-list">
              <li v-for="skill in category.skills" :key="skill">{{ skill }}</li>
            </ul>
          </div>
        </div>

        <div class="terminal" style="margin: 40px auto; max-width: 800px;">
          <div class="terminal-line"><span class="terminal-prompt">root@classified:~$</span> cat certifications.txt</div>
          <div v-for="cert in certifications" :key="cert" class="terminal-line">• {{ cert }}</div>
          <div class="terminal-line"><span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span></div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section" id="contact">
      <h2>SECURE COMMUNICATION</h2>
      <div class="contact-container">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="color: var(--danger-red); font-size: 0.9em; margin-bottom: 10px;">⚠️ ENCRYPTED TRANSMISSION REQUIRED ⚠️</div>
        </div>

        <form class="contact-form" @submit="handleContactForm">
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
          <h4 style="color: var(--accent-green); margin-bottom: 15px;">ALTERNATIVE CONTACT METHODS:</h4>
          <p>📧 Email: agent@portfolio.classified</p>
          <p>📱 Secure Line: +1 (555) 000-0000</p>
          <p>🔗 LinkedIn: /in/classified-agent</p>
          <p>📍 Location: [REDACTED]</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useAbout } from '../composables/useAbout'

// Types
interface Project {
  id: number
  title: string
  classification: string
  brief: string
  technologies: string
  status: string
  statusColor: string
  description: string
}

interface SkillCategory {
  title: string
  skills: string[]
}

interface ContactForm {
  agentId: string
  email: string
  message: string
}

// Reactive data
const showLoading = ref(true)
const loadingProgress = ref(0)
const loadingMessage = ref('Establishing encrypted tunnel...')
const soundEnabled = ref(true)
const isSubmitting = ref(false)
const submitButtonText = ref('TRANSMIT SECURE MESSAGE')
const mobileMenuOpen = ref(false)

const photoCard = ref<HTMLElement | null>(null)

const contactForm = reactive<ContactForm>({
  agentId: '',
  email: '',
  message: ''
})

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Operation: E-Commerce Fortress',
    classification: 'CONFIDENTIAL',
    brief: 'Developed secure online marketplace with advanced encryption protocols.',
    technologies: 'React, Node.js, MongoDB, Stripe API',
    status: 'MISSION SUCCESSFUL',
    statusColor: 'var(--accent-green)',
    description: 'Full-stack e-commerce platform with user authentication, payment processing, and inventory management systems.'
  },
  {
    id: 2,
    title: 'Operation: Neural Network',
    classification: 'TOP SECRET',
    brief: 'AI-powered data analysis system for pattern recognition in large datasets.',
    technologies: 'Python, TensorFlow, Flask, PostgreSQL',
    status: 'IN PROGRESS',
    statusColor: 'var(--accent-cyan)',
    description: 'Machine learning application for predictive analytics and anomaly detection in security systems.'
  },
  {
    id: 3,
    title: 'Operation: Mobile Command',
    classification: 'RESTRICTED',
    brief: 'Cross-platform mobile application for field operations coordination.',
    technologies: 'React Native, Firebase, GPS Integration',
    status: 'DEPLOYED',
    statusColor: 'var(--accent-green)',
    description: 'Real-time communication and location tracking system for mobile field operatives.'
  }
])

const skillCategories = ref<SkillCategory[]>([
  {
    title: 'Frontend Operations',
    skills: ['React / Vue.js', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'TypeScript', 'Responsive Design']
  },
  {
    title: 'Backend Systems',
    skills: ['Node.js / Express', 'Python / Django', 'REST APIs', 'GraphQL', 'Microservices']
  },
  {
    title: 'Database Intelligence',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Data Analytics']
  },
  {
    title: 'Security Protocols',
    skills: ['OAuth / JWT', 'Encryption', 'Cybersecurity', 'Secure APIs', 'Penetration Testing']
  }
])

const certifications = ref<string[]>([
  'Certified Ethical Hacker (CEH)',
  'AWS Solutions Architect',
  'Google Cloud Professional Developer',
  'Cybersecurity Fundamentals',
  'Docker Certified Associate'
])

const loadingMessages = [
  'Establishing encrypted tunnel...',
  'Verifying agent credentials...',
  'Loading classified databases...',
  'Initializing security protocols...',
  'Decrypting personnel files...',
  'System ready. Welcome, Agent.'
]

// Konami code detection
const konamiCode = ref<number[]>([])
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

let loadingInterval: NodeJS.Timeout | null = null
let glitchInterval: NodeJS.Timeout | null = null

// Fetch about info (name, image)
const { about, fetchAbout } = useAbout()
onMounted(() => {
  setTimeout(initializeSystem, 500)
  document.addEventListener('keydown', handleKeyDown)
  startGlitchEffect()
  fetchAbout()
})

// Methods
const playSound = (type: 'beep' | 'click' | 'systemReady') => {
  if (!soundEnabled.value) return
  
  try {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    let frequency: number, duration: number

    switch(type) {
      case 'beep':
        frequency = 800
        duration = 100
        break
      case 'click':
        frequency = 1200
        duration = 50
        break
      case 'systemReady':
        frequency = 600
        duration = 200
        break
      default:
        return
    }

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

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  playSound('click')
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const initializeSystem = () => {
  let progress = 0
  let messageIndex = 0

  loadingInterval = setInterval(() => {
    progress += Math.random() * 15 + 5
    if (progress > 100) progress = 100

    loadingProgress.value = progress

    if (messageIndex < loadingMessages.length - 1 && progress > (messageIndex + 1) * 16) {
      messageIndex++
      loadingMessage.value = loadingMessages[messageIndex]
    }

    if (progress >= 100) {
      if (loadingInterval) {
        clearInterval(loadingInterval)
        loadingInterval = null
      }
      setTimeout(() => {
        showLoading.value = false
        playSound('systemReady')
      }, 1000)
    }
  }, 100)
}

const scrollToSection = (event: Event) => {
  event.preventDefault()
  playSound('click')
  closeMobileMenu()
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

const handlePhotoCardMouseMove = (event: MouseEvent) => {
  if (!photoCard.value) return
  
  const rect = photoCard.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = (y - centerY) / 15
  const rotateY = (centerX - x) / 15
  
  photoCard.value.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

const resetPhotoCard = () => {
  if (photoCard.value) {
    photoCard.value.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)'
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  konamiCode.value.push(event.keyCode)
  if (konamiCode.value.length > konami.length) {
    konamiCode.value.shift()
  }
  
  if (konamiCode.value.toString() === konami.toString()) {
    document.body.style.filter = 'hue-rotate(180deg)'
    setTimeout(() => {
      document.body.style.filter = 'none'
    }, 3000)
    
    // Show secret message
    const secret = document.createElement('div')
    secret.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 31, 63, 0.95);
      border: 2px solid var(--danger-red);
      padding: 30px;
      color: var(--danger-red);
      font-family: 'Orbitron', monospace;
      z-index: 9999;
      text-align: center;
      border-radius: 8px;
      backdrop-filter: blur(15px);
      box-shadow: 0 0 30px rgba(255, 0, 64, 0.5);
    `
    secret.innerHTML = `
      <h3 style="margin-bottom: 15px; text-shadow: 0 0 10px var(--danger-red);">🕵️ SECRET UNLOCKED 🕵️</h3>
      <p style="margin-bottom: 10px;">You found the hidden easter egg!</p>
      <p>Agent, you have excellent attention to detail.</p>
      <p style="margin-top: 15px; font-size: 0.8em; color: var(--accent-cyan);">Mission Status: CLASSIFIED ACCESSED</p>
    `
    
    document.body.appendChild(secret)
    setTimeout(() => {
      document.body.removeChild(secret)
    }, 4000)
    
    konamiCode.value = []
    playSound('systemReady')
  }
}

const startGlitchEffect = () => {
  glitchInterval = setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch')
    glitchElements.forEach((el: Element) => {
      if (Math.random() < 0.1) {
        const htmlEl = el as HTMLElement
        htmlEl.style.animation = 'none'
        setTimeout(() => {
          htmlEl.style.animation = 'glitch 2s infinite'
        }, 100)
      }
    })
  }, 5000)
}

// Lifecycle
onMounted(() => {
  setTimeout(initializeSystem, 500)
  document.addEventListener('keydown', handleKeyDown)
  startGlitchEffect()
  fetchAbout()
})

onUnmounted(() => {
  if (loadingInterval) {
    clearInterval(loadingInterval)
  }
  if (glitchInterval) {
    clearInterval(glitchInterval)
  }
  document.removeEventListener('keydown', handleKeyDown)
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
  --border-glow: #00FFFF;
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
  cursor: crosshair;
  scroll-behavior: smooth;
}

/* Animated background */
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

/* Loading screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: opacity 1s ease-out;
}

.loading-screen.hidden {
  opacity: 0;
  pointer-events: none;
}

.loading-text {
  font-family: 'Orbitron', monospace;
  font-size: 1.2em;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 20px;
}

.progress-bar {
  width: 300px;
  height: 4px;
  background: rgba(0, 255, 255, 0.2);
  border: 1px solid var(--accent-cyan);
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-cyan), var(--accent-green));
  width: 0%;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px var(--accent-cyan);
}

.loading-status {
  margin-top: 20px;
  font-size: 0.9em;
  color: var(--text-secondary);
}

/* Header */
.header {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-bottom: 2px solid var(--accent-cyan);
  padding: 15px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

/* Hamburger Menu Button */
.hamburger-btn {
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  z-index: 101;
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

.hamburger-btn:hover span {
  background: var(--accent-green);
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.7);
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

.logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.5em;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  gap: 20px;
  position: absolute;
  right: 80px;
}

.nav-menu {
  display: none;
}

.nav-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 8px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
}

.nav-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transform: scale(1.05);
}

/* Sound Toggle in Header */
.sound-toggle-header {
  position: absolute;
  right: 20px;
  background: rgba(0, 31, 63, 0.9);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.2em;
  transition: all 0.3s ease;
}

.sound-toggle-header:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

/* Mobile Navigation */
.mobile-nav-overlay {
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

.mobile-nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-right: 2px solid var(--accent-cyan);
  box-shadow: 5px 0 20px rgba(0, 255, 255, 0.3);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.mobile-nav-overlay.active .mobile-nav {
  transform: translateX(0);
}

.mobile-nav-header {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-logo {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-weight: 700;
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 2px;
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
  box-shadow: 0 0 10px rgba(255, 0, 64, 0.5);
}

.mobile-nav-content {
  flex: 1;
  padding: 20px 0;
}

.mobile-nav-btn {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
}

.mobile-nav-btn:hover {
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

.mobile-nav-footer {
  padding: 20px;
  border-top: 1px solid rgba(0, 255, 255, 0.3);
}

.sound-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-secondary);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9em;
}

.sound-toggle-mobile {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  transition: all 0.3s ease;
}

.sound-toggle-mobile:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
}

/* Main content */
.main-content {
  margin-top: 80px;
  position: relative;
  z-index: 2;
}

.section {
  min-height: 100vh;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.section h2 {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 2.5em;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-align: center;
  text-shadow: 0 0 20px var(--accent-cyan);
}

/* Hero section */
.hero {
  background: radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 50%);
}

.agent-profile {
  text-align: center;
  max-width: 800px;
}

.agent-card {
  perspective: 1000px;
  margin-bottom: 30px;
}

.photo-card {
  width: 300px;
  height: 400px;
  background: linear-gradient(145deg, rgba(0, 31, 63, 0.8), rgba(0, 15, 31, 0.9));
  border-radius: 15px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.3);
  margin: 0 auto;
}

.photo-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 
    0 35px 70px rgba(0, 0, 0, 0.5),
    0 0 0 2px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.3);
}

.photo-frame {
  width: 200px;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    inset 0 0 0 2px rgba(0, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.photo-frame:hover {
  transform: scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    inset 0 0 0 2px var(--accent-cyan);
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

.agent-avatar {
  width: 80px;
  height: 80px;
  border: 2px solid var(--accent-cyan);
  border-radius: 50%;
  background: rgba(0, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.agent-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.8em;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.classification {
  color: var(--danger-red);
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

.terminal {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 20px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  margin: 20px 0;
  text-align: left;
  max-width: 600px;
  width: 100%;
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

.agent-description {
  line-height: 1.8;
  font-size: 1.1em;
  max-width: 600px;
  margin: 0 auto;
}

/* Projects section */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  width: 100%;
}

.project-card {
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 31, 63, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.project-card:hover {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  transform: translateY(-5px);
}

.project-header {
  background: rgba(0, 255, 255, 0.1);
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
}

.project-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.2em;
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
  padding: 20px;
}

/* Skills section */
.skills-container {
  max-width: 1000px;
  width: 100%;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.skill-category {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  padding: 20px;
  text-align: center;
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
}

/* Contact section */
.contact-container {
  max-width: 600px;
  width: 100%;
}

.contact-form {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  padding: 30px;
  backdrop-filter: blur(10px);
}

.form-group {
  margin-bottom: 20px;
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
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 3px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border: none;
  font-family: 'Orbitron', monospace;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
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
  margin-top: 30px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  text-align: center;
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

/* Responsive design */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .header {
    padding: 15px;
  }

  .logo {
    font-size: 1.2em;
    position: static;
    transform: none;
  }

  .sound-toggle-header {
    font-size: 1em;
    padding: 6px 10px;
  }

  .mobile-nav {
    width: 280px;
  }

  .section {
    padding: 40px 20px;
  }

  .section h2 {
    font-size: 2em;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 1em;
  }

  .mobile-nav {
    width: 100%;
  }

  .hamburger-btn {
    left: 15px;
  }

  .sound-toggle-header {
    right: 15px;
  }
}
</style>