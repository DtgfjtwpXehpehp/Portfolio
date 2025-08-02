<template>
  <!-- Loading Screen -->
  <LoadingScreen 
    v-if="showLoading" 
    @system-ready="handleSystemReady"
  />
  
  <!-- Dynamic Layout Based on Screen Size -->
  <component 
    v-else
    :is="currentLayout" 
    :sound-enabled="soundEnabled"
    @toggle-sound="toggleSound"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import LoadingScreen from './components/shared/LoadingScreen.vue'
import { useResponsive } from './composables/useResponsive'
import { useSoundEffects } from './composables/useSoundEffects'

// Lazy load layouts
const DesktopInterface = defineAsyncComponent(() => import('./components/desktop/DesktopInterface.vue'))
const MobileInterface = defineAsyncComponent(() => import('./components/mobile/MobileInterface.vue'))

const { isMobile } = useResponsive()
const { playSound } = useSoundEffects()

const showLoading = ref(true)
const soundEnabled = ref(true)

// Dynamically choose layout based on screen size
const currentLayout = computed(() => {
  return isMobile.value ? MobileInterface : DesktopInterface
})

const handleSystemReady = () => {
  showLoading.value = false
  playSound('systemReady')
}

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
  playSound('click')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Share Tech Mono', monospace;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden !important;
  cursor: crosshair;
  scroll-behavior: smooth;
}

#app {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  max-width: 100%;
}

/* Global glitch effect */
.glitch {
  animation: glitch 2s infinite;
}

@keyframes glitch {
  0%, 90%, 100% { transform: translate(0); }
  91% { transform: translate(-2px, 1px); }
  92% { transform: translate(2px, -1px); }
  93% { transform: translate(-1px, 2px); }
}

/* Global scanlines effect */
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

/* Global terminal styles */
.terminal {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 15px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  text-align: left;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  word-wrap: break-word;
}

.terminal-line {
  margin-bottom: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
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

/* Section Styles */
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
</style>