<template>
  <!-- Loading Screen -->
  <div v-if="!systemReady" class="loading-screen">
    <div class="loading-text">INITIALIZING SECURE CONNECTION</div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="loading-status">{{ currentMessage }}</div>
  </div>

  <!-- Sound Toggle -->
  <SoundToggle 
    :enabled="soundEnabled" 
    @toggle="toggleSound"
    class="sound-toggle-btn"
  />

  <!-- Scanlines effect -->
  <div class="scanlines"></div>

  <!-- Desktop Layout (>768px) -->
  <div class="desktop-layout">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <h1 class="logo glitch">AGENT PORTFOLIO v2.7</h1>
      </div>
      <div class="header-center">
        <div class="system-info">
          <span class="weather">{{ weather }}</span>
          <span class="location">{{ location }}</span>
          <span class="time">{{ currentTime }}</span>
        </div>
      </div>
      <div class="header-right">
        <SoundToggle :enabled="soundEnabled" @toggle="toggleSound" />
      </div>
    </header>

    <!-- Control Panel -->
    <ControlPanel @open-window="openWindow" />

    <!-- Taskbar -->
    <div class="taskbar" :class="{ dangling: isDangling }" @click="triggerDangle">
      <div class="taskbar-left">
        <div class="start-menu">
          <span class="start-icon">⚡</span>
          <span>COMMAND CENTER</span>
        </div>
      </div>
      <div class="taskbar-center">
        <div 
          v-for="(window, type) in minimizedWindows" 
          :key="type"
          v-show="window"
          class="taskbar-item"
          @click.stop="restoreWindow(type as WindowType)"
        >
          {{ getWindowTitle(type as WindowType) }}
        </div>
      </div>
      <div class="taskbar-right">
        <div class="system-tray">
          <span class="time">{{ currentTime }}</span>
          <span class="weather">{{ weather }}</span>
          <span class="location">{{ location }}</span>
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
  </div>

  <!-- Mobile Layout (≤768px) -->
  <div class="mobile-layout">
    <!-- Mobile Header -->
    <header class="mobile-header">
      <div class="mobile-logo glitch">AGENT PORTFOLIO v2.7</div>
      <nav class="mobile-nav">
        <a href="#about" class="nav-btn" @click="scrollToSection('about')">Personnel</a>
        <a href="#projects" class="nav-btn" @click="scrollToSection('projects')">Case Files</a>
        <a href="#skills" class="nav-btn" @click="scrollToSection('skills')">Skills</a>
        <a href="#contact" class="nav-btn" @click="scrollToSection('contact')">Contact</a>
      </nav>
    </header>

    <!-- Mobile Main Content -->
    <main class="mobile-main-content">
      <!-- About Section -->
      <section class="mobile-section hero" id="about">
        <div class="agent-profile">
          <div class="agent-card">
            <div class="photo-card">
              <div class="photo-frame">
                <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Agent Profile Photo">
              </div>
              <div class="agent-avatar">🕵️</div>
            </div>
          </div>
          <h1 class="agent-title">Agent [REDACTED]</h1>
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

          <p class="agent-bio">
            Highly skilled operative specializing in digital infrastructure and web-based intelligence systems. 
            Expertise in creating secure, scalable applications for mission-critical operations. 
            Proven track record in cybersecurity protocols and data encryption methodologies.
          </p>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="mobile-section" id="projects">
        <h2>CLASSIFIED CASE FILES</h2>
        <div class="projects-grid">
          <div class="project-card">
            <div class="project-header">
              <div class="project-title">Operation: E-Commerce Fortress</div>
              <div class="project-classification">CONFIDENTIAL</div>
            </div>
            <div class="project-content">
              <p><strong>Mission Brief:</strong> Developed secure online marketplace with advanced encryption protocols.</p>
              <p><strong>Technologies:</strong> React, Node.js, MongoDB, Stripe API</p>
              <p><strong>Status:</strong> <span style="color: var(--accent-green);">MISSION SUCCESSFUL</span></p>
              <p style="margin-top: 10px;">Full-stack e-commerce platform with user authentication, payment processing, and inventory management systems.</p>
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
              <p><strong>Status:</strong> <span style="color: var(--accent-cyan);">IN PROGRESS</span></p>
              <p style="margin-top: 10px;">Machine learning application for predictive analytics and anomaly detection in security systems.</p>
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
              <p><strong>Status:</strong> <span style="color: var(--accent-green);">DEPLOYED</span></p>
              <p style="margin-top: 10px;">Real-time communication and location tracking system for mobile field operatives.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="mobile-section" id="skills">
        <h2>TECHNICAL EXPERTISE</h2>
        <div class="skills-container">
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

          <div class="terminal skills-terminal">
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

      <!-- Contact Section -->
      <section class="mobile-section" id="contact">
        <h2>SECURE COMMUNICATION</h2>
        <div class="contact-container">
          <div class="contact-warning">
            <div class="warning-text">⚠️ ENCRYPTED TRANSMISSION REQUIRED ⚠️</div>
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
            
            <button 
              type="submit" 
              class="submit-btn"
              :disabled="isTransmitting"
            >
              {{ buttonText }}
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
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import type { WindowType } from './types/windows'
import { useWindowManagement } from './composables/useWindowManagement'
import { useSoundEffects } from './composables/useSoundEffects'
import { useKonamiCode } from './composables/useKonamiCode'

// Components
import LoadingScreen from './components/LoadingScreen.vue'
import ControlPanel from './components/ControlPanel.vue'
import SoundToggle from './components/SoundToggle.vue'
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

const { playSound } = useSoundEffects()
const { initKonamiCode } = useKonamiCode()

// Loading screen
const systemReady = ref(false)
const progress = ref(0)
const currentMessage = ref('Establishing encrypted tunnel...')

const loadingMessages = [
  'Establishing encrypted tunnel...',
  'Verifying agent credentials...',
  'Loading classified databases...',
  'Initializing security protocols...',
  'Decrypting personnel files...',
  'System ready. Welcome, Agent.'
]

// System info
const currentTime = ref('')
const weather = ref('☀️ 22°C')
const location = ref('Loading...')
const soundEnabled = ref(true)

// Contact form
const contactForm = reactive({
  agentId: '',
  email: '',
  message: ''
})
const isTransmitting = ref(false)
const buttonText = ref('TRANSMIT SECURE MESSAGE')

// Methods
const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
  playSound('click')
}

const getWindowTitle = (type: WindowType): string => {
  const titles = {
    about: 'PERSONNEL',
    projects: 'CASE FILES',
    resume: 'SERVICE RECORD',
    contact: 'SECURE COMM',
    terminal: 'TERMINAL'
  }
  return titles[type]
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchWeatherAndLocation = async () => {
  try {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // Get weather data from Open-Meteo (free API)
          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`
          )
          const weatherData = await weatherResponse.json()
          
          if (weatherData.current_weather) {
            const temp = Math.round(weatherData.current_weather.temperature)
            const weatherCode = weatherData.current_weather.weathercode
            
            // Map weather codes to emojis
            const weatherEmojis: { [key: number]: string } = {
              0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
              45: '🌫️', 48: '🌫️',
              51: '🌦️', 53: '🌦️', 55: '🌦️',
              61: '🌧️', 63: '🌧️', 65: '🌧️',
              71: '❄️', 73: '❄️', 75: '❄️',
              95: '⛈️', 96: '⛈️', 97: '⛈️'
            }
            
            const emoji = weatherEmojis[weatherCode] || '🌤️'
            weather.value = `${emoji} ${temp}°C`
          }
          
          // Get location name using multiple geocoding services
          await getLocationName(latitude, longitude)
          
        } catch (error) {
          console.error('Weather fetch failed:', error)
          weather.value = '🌤️ 22°C'
        }
      }, (error) => {
        console.error('Geolocation failed:', error)
        // Fallback to IP-based location
        getLocationFromIP()
      })
    } else {
      getLocationFromIP()
    }
  } catch (error) {
    console.error('Location services failed:', error)
    location.value = 'Location Unknown'
    weather.value = '🌤️ 22°C'
  }
}

const getLocationName = async (lat: number, lon: number) => {
  const services = [
    // Nominatim (OpenStreetMap) - most detailed
    {
      url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      parser: (data: any) => {
        const addr = data.address || {}
        const suburb = addr.suburb || addr.neighbourhood || addr.hamlet || addr.village
        const city = addr.city || addr.town || addr.municipality || addr.county
        
        if (suburb && city && suburb !== city) {
          return `${suburb}, ${city}`
        }
        return city || suburb || data.display_name?.split(',')[0]
      }
    },
    // BigDataCloud
    {
      url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      parser: (data: any) => {
        const locality = data.locality
        const city = data.city
        
        if (locality && city && locality !== city) {
          return `${locality}, ${city}`
        }
        return city || locality || data.principalSubdivision
      }
    },
    // Geocode.xyz
    {
      url: `https://geocode.xyz/${lat},${lon}?json=1`,
      parser: (data: any) => {
        if (data.city) {
          return data.city
        }
        return data.region || 'Unknown Location'
      }
    }
  ]

  for (const service of services) {
    try {
      const response = await fetch(service.url)
      const data = await response.json()
      const locationName = service.parser(data)
      
      if (locationName && locationName.length > 3) {
        location.value = locationName
        return
      }
    } catch (error) {
      console.error(`Geocoding service failed:`, error)
      continue
    }
  }
  
  location.value = 'Location Unknown'
}

const getLocationFromIP = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    if (data.city && data.country_name) {
      location.value = `${data.city}, ${data.country_name}`
    } else {
      location.value = 'Location Unknown'
    }
    
    // Get weather for IP location
    if (data.latitude && data.longitude) {
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current_weather=true&temperature_unit=celsius`
      )
      const weatherData = await weatherResponse.json()
      
      if (weatherData.current_weather) {
        const temp = Math.round(weatherData.current_weather.temperature)
        weather.value = `🌤️ ${temp}°C`
      }
    }
  } catch (error) {
    console.error('IP location failed:', error)
    location.value = 'Location Unknown'
  }
}

const initializeSystem = () => {
  let messageIndex = 0
  
  const loadingInterval = setInterval(() => {
    progress.value += Math.random() * 15 + 5
    if (progress.value > 100) progress.value = 100

    if (messageIndex < loadingMessages.length - 1 && progress.value > (messageIndex + 1) * 16) {
      messageIndex++
      currentMessage.value = loadingMessages[messageIndex]
    }

    if (progress.value >= 100) {
      clearInterval(loadingInterval)
      setTimeout(() => {
        systemReady.value = true
        playSound('systemReady')
      }, 1000)
    }
  }, 100)
}

const scrollToSection = (sectionId: string) => {
  playSound('click')
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleContactForm = (event: Event) => {
  event.preventDefault()
  playSound('beep')
  
  isTransmitting.value = true
  buttonText.value = 'TRANSMITTING...'
  
  setTimeout(() => {
    buttonText.value = 'MESSAGE SENT ✓'
    setTimeout(() => {
      buttonText.value = 'TRANSMIT SECURE MESSAGE'
      isTransmitting.value = false
      // Reset form
      contactForm.agentId = ''
      contactForm.email = ''
      contactForm.message = ''
    }, 2000)
  }, 2000)
}

// Lifecycle
onMounted(() => {
  // Initialize system
  setTimeout(initializeSystem, 500)
  
  // Start time updates
  updateTime()
  const timeInterval = setInterval(updateTime, 1000)
  
  // Fetch weather and location
  fetchWeatherAndLocation()
  
  // Initialize Konami code
  const cleanup = initKonamiCode()
  
  // Cleanup on unmount
  onUnmounted(() => {
    clearInterval(timeInterval)
    cleanup()
  })
})
</script>

<style scoped>
/* CSS Variables */
:root {
  --bg-primary: #0A0F1F;
  --bg-secondary: #001F3F;
  --window-bg: rgba(10, 15, 31, 0.95);
  --accent-cyan: #00FFFF;
  --accent-green: #00FF41;
  --text-primary: #E0E0E0;
  --text-secondary: #A0A0A0;
  --border-glow: #00FFFF;
  --danger-red: #FF0040;
}

/* Global Styles */
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

/* Loading Screen */
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
  transition: width 0.1s ease;
  box-shadow: 0 0 10px var(--accent-cyan);
}

.loading-status {
  margin-top: 20px;
  font-size: 0.9em;
  color: var(--text-secondary);
}

/* Sound Toggle */
.sound-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 200;
}

/* Scanlines */
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

/* Desktop Layout */
.desktop-layout {
  display: block;
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
  width: 100%;
  z-index: 100;
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

.system-info {
  display: flex;
  gap: 20px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9em;
}

.weather, .location, .time {
  color: var(--text-secondary);
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
  transition: all 0.3s ease;
}

.taskbar.dangling {
  animation: dangle 1s ease-in-out;
}

@keyframes dangle {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-10px) rotate(1deg); }
  75% { transform: translateY(-5px) rotate(-1deg); }
}

.start-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--accent-cyan);
  font-family: 'Orbitron', monospace;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.taskbar-center {
  display: flex;
  gap: 10px;
}

.taskbar-item {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 5px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  text-transform: uppercase;
}

.taskbar-item:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.system-tray {
  display: flex;
  gap: 15px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  color: var(--text-secondary);
}

/* Glitch Effect */
.glitch {
  animation: glitch 2s infinite;
}

@keyframes glitch {
  0%, 90%, 100% { transform: translate(0); }
  91% { transform: translate(-2px, 1px); }
  92% { transform: translate(2px, -1px); }
  93% { transform: translate(-1px, 2px); }
}

/* Mobile Layout */
.mobile-layout {
  display: none;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .desktop-layout {
    display: none;
  }
  
  .mobile-layout {
    display: block;
  }
  
  .sound-toggle-btn {
    display: none;
  }

  /* Mobile Header */
  .mobile-header {
    background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
    border-bottom: 2px solid var(--accent-cyan);
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
  }

  .mobile-logo {
    font-family: 'Orbitron', monospace;
    font-size: 1.2em;
    font-weight: 900;
    color: var(--accent-cyan);
    text-shadow: 0 0 10px var(--accent-cyan);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
  }

  .mobile-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
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

  /* Mobile Main Content */
  .mobile-main-content {
    margin-top: 120px;
    position: relative;
    z-index: 2;
  }

  .mobile-section {
    min-height: 100vh;
    padding: 60px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  }

  .mobile-section h2 {
    font-family: 'Orbitron', monospace;
    color: var(--accent-cyan);
    font-size: 2em;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-align: center;
    text-shadow: 0 0 20px var(--accent-cyan);
  }

  /* Hero Section */
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

  .agent-bio {
    line-height: 1.8;
    font-size: 1.1em;
    max-width: 600px;
    margin: 0 auto;
  }

  /* Projects Section */
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr;
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

  /* Skills Section */
  .skills-container {
    max-width: 1000px;
    width: 100%;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: 1fr;
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

  .skills-terminal {
    margin: 40px auto;
    max-width: 800px;
  }

  /* Contact Section */
  .contact-container {
    max-width: 600px;
    width: 100%;
  }

  .contact-warning {
    text-align: center;
    margin-bottom: 20px;
  }

  .warning-text {
    color: var(--danger-red);
    font-size: 0.9em;
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

  .submit-btn:hover:not(:disabled) {
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

  .contact-info h4 {
    color: var(--accent-green);
    margin-bottom: 15px;
  }
}
</style>