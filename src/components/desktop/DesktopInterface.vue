<template>
  <div class="desktop-interface">
    <!-- Scanlines effect -->
    <div class="scanlines"></div>

    <!-- Desktop Header -->
    <DesktopHeader 
      :sound-enabled="soundEnabled"
      @toggle-sound="$emit('toggle-sound')"
    />

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <div class="greeting">Hi, I'm</div>
          <div class="name-primary">Sivuyile</div>
          <div class="name-secondary">Mtwetwe</div>
          <div class="divider"></div>
          <div class="title">a Full Stack</div>
          <div class="title">Developer</div>
        </div>
        
        <div class="profile-card">
          <div class="profile-image">
            <img 
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop" 
              alt="Sivuyile Mtwetwe"
            >
          </div>
          <div class="profile-info">
            <h3>Full Stack Developer</h3>
            <p class="profile-tagline">Creative • Innovative • Dedicated</p>
            <div class="social-links">
              <a href="mailto:contact@example.com" class="social-link">
                <i class="fas fa-envelope"></i>
              </a>
              <a href="https://linkedin.com" class="social-link" target="_blank">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com" class="social-link" target="_blank">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Command Panel (Bottom Left) -->
    <div class="command-panel">
      <button class="command-btn" @click="openWindow('about')">
        <i class="fas fa-bolt"></i>
        COMMAND
      </button>
    </div>

    <!-- Status Panel (Bottom Right) -->
    <div class="status-panel">
      <div class="weather-info">
        <i class="fas fa-sun"></i>
        <span>9°C Cape Town Ward 3</span>
      </div>
      <div class="time-info">02:12</div>
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
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import DesktopHeader from './DesktopHeader.vue'
import AboutWindow from '../AboutWindow.vue'
import ProjectsWindow from '../ProjectsWindow.vue'
import ResumeWindow from '../ResumeWindow.vue'
import ContactWindow from '../ContactWindow.vue'
import TerminalWindow from '../TerminalWindow.vue'
import { useWindowManagement } from '../../composables/useWindowManagement'

defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
}>()

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
</script>

<style scoped>
.desktop-interface {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;
}

.hero-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 100px;
  max-width: 1200px;
  width: 100%;
  padding: 0 50px;
}

.hero-text {
  flex: 1;
  text-align: left;
}

.greeting {
  font-size: 3rem;
  color: var(--text-primary);
  font-family: 'Share Tech Mono', monospace;
  margin-bottom: 10px;
}

.name-primary,
.name-secondary {
  font-size: 4rem;
  font-family: 'Orbitron', monospace;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: 0 0 20px var(--accent-cyan);
  line-height: 0.9;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.divider {
  width: 60px;
  height: 4px;
  background: var(--accent-cyan);
  margin: 30px 0;
  box-shadow: 0 0 10px var(--accent-cyan);
}

.title {
  font-size: 2.5rem;
  color: var(--accent-cyan);
  font-family: 'Share Tech Mono', monospace;
  line-height: 1.2;
  margin-bottom: 5px;
}

.profile-card {
  background: rgba(0, 31, 63, 0.3);
  border: 2px solid var(--accent-cyan);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  text-align: center;
  min-width: 350px;
}

.profile-image {
  width: 200px;
  height: 250px;
  margin: 0 auto 20px;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(0.9);
}

.profile-info h3 {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.3rem;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.profile-tagline {
  color: var(--text-secondary);
  font-family: 'Share Tech Mono', monospace;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-link {
  width: 40px;
  height: 40px;
  border: 1px solid var(--accent-cyan);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-cyan);
  text-decoration: none;
  transition: all 0.3s ease;
  background: rgba(0, 255, 255, 0.1);
}

.social-link:hover {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  transform: scale(1.1);
}

.command-panel {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 100;
}

.command-btn {
  background: rgba(0, 31, 63, 0.8);
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  padding: 12px 20px;
  border-radius: 5px;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.command-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  transform: translateY(-2px);
}

.status-panel {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(0, 31, 63, 0.8);
  border: 1px solid var(--accent-cyan);
  border-radius: 5px;
  padding: 12px 20px;
  backdrop-filter: blur(10px);
  font-family: 'Share Tech Mono', monospace;
  color: var(--text-primary);
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--accent-green);
}

.time-info {
  color: var(--accent-cyan);
  font-size: 1.1rem;
  font-weight: bold;
}
</style>