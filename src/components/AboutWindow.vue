<template>
  <BaseWindow
    :active="active"
    :maximized="maximized"
    :position="position"
    title="PERSONNEL FILE - CLASSIFIED"
    @close="$emit('close')"
    @minimize="$emit('minimize')"
    @maximize="$emit('maximize')"
    @move="$emit('move', $event)"
  >
    <div class="about-content">
      <div v-if="loading" class="loading">
        LOADING PERSONNEL FILE...
      </div>
      
      <div v-else-if="error" class="error">
        ERROR: {{ error }}
        <button @click="fetchAbout" class="retry-button">RETRY</button>
      </div>

      <div v-else-if="about" class="agent-profile">
        <div class="card-container">
          <div class="photo-card floating" @click="triggerDangle">
            <div class="photo-frame">
              <img
                v-if="about.image_url"
                :src="about.image_url"
                :alt="realName"
                id="photoImage"
                @error="handleImageError"
              >
              <div v-else class="photo-placeholder photo-placeholder-rect">👤</div>
            </div>
            <div class="card-info">
              <h2 class="card-title">{{ about.title || 'Professional Profile' }}</h2>
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
        
        <h2>AGENT {{ about.name || '[REDACTED]' }}</h2>
      
        <div class="terminal">
          <div class="terminal-line"><span class="terminal-prompt">></span> cat agent_profile.txt</div>
          <div class="terminal-line">NAME: {{ about.name || '[CLASSIFIED]' }}</div>
          <div class="terminal-line">TITLE: {{ about.title || 'Web Developer' }}</div>
          <div class="terminal-line">STATUS: ACTIVE</div>
          <div class="terminal-line"><span class="terminal-prompt">></span> cat skills.txt</div>
          <div class="skills-grid">
            <div v-for="(skill, index) in about.skills" :key="index" class="terminal-line skill-item">
              [{{ String(index).padStart(2, '0') }}] {{ skill }}
            </div>
          </div>
          <div class="terminal-line"><span class="blinking-cursor"></span></div>
        </div>

        <div class="terminal mission-brief">
          <div class="terminal-line"><span class="terminal-prompt">></span> cat mission_brief.txt</div>
          <div class="terminal-line content-text" v-html="about.content"></div>
        </div>
      </div>
    </div>
  </BaseWindow>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BaseWindow from './BaseWindow.vue';
import { useAbout } from '../composables/useAbout';
import { useContact } from '../composables/useContact';

defineProps<{
  active: boolean
  maximized?: boolean
  position: { x: number, y: number }
}>();

defineEmits<{
  close: []
  minimize: []
  maximize: []
  move: [position: { x: number, y: number }]
}>();

const { about, loading, error, fetchAbout } = useAbout();
const { contact, fetchContact } = useContact();

const realName = 'Agent Profile';

const handleImageError = () => {
  console.log('Image failed to load');
};

const triggerDangle = () => {
  console.log('Photo card clicked - dangle effect triggered');
};

onMounted(() => {
  fetchAbout();
  fetchContact();
});
</script>

<style scoped>
.about-content {
  text-align: center;
  max-height: 80vh;
  overflow-y: auto;
  padding-right: 10px;
  /* Scrollbar Styling */
  scrollbar-width: thin;
  scrollbar-color: var(--accent-cyan) rgba(0, 0, 0, 0.3);
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}

.about-content::-webkit-scrollbar {
  width: 6px;
}

.about-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.about-content::-webkit-scrollbar-thumb {
  background-color: var(--accent-cyan);
  border-radius: 3px;
}

.agent-profile {
  padding: 10px 0;
}

.agent-avatar {
  width: 120px;
  height: 120px;
  border: 2px solid var(--accent-cyan);
  border-radius: 50%;
  margin: 0 auto 15px;
  background: rgba(0, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  overflow: hidden;
}

.agent-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-profile h2 {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  margin-bottom: 5px;
}

.clearance {
  color: var(--danger-red);
  font-size: 0.9em;
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 5px;
  margin: 10px 0;
}

.skill-item {
  margin-bottom: 0;
  padding: 2px 5px;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.skill-item:hover {
  background: rgba(0, 255, 255, 0.1);
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

.mission-brief {
  margin-top: 20px;
}

.content-text {
  line-height: 1.6;
  white-space: pre-wrap;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  padding: 10px 0;
}

.loading {
  color: var(--accent-cyan);
  font-family: 'Share Tech Mono', monospace;
  animation: blink 1s infinite;
  padding: 20px;
}

.error {
  color: var(--danger-red);
  font-family: 'Share Tech Mono', monospace;
  padding: 20px;
  text-align: center;
}

.retry-button {
  background: transparent;
  border: 1px solid var(--danger-red);
  color: var(--danger-red);
  font-family: 'Share Tech Mono', monospace;
  padding: 5px 15px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-button:hover {
  background: var(--danger-red);
  color: black;
}

/* Card Container Styles */
.card-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.photo-card {
  background: linear-gradient(145deg, rgba(0, 31, 63, 0.8), rgba(0, 15, 31, 0.9));
  border: 1px solid var(--accent-cyan);
  border-radius: 15px;
  padding: 20px;
  max-width: 350px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 255, 255, 0.4);
}

.photo-card.floating {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.photo-frame {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  border: 3px solid var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  position: relative;
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 255, 255, 0.1);
  font-size: 3em;
  color: var(--accent-cyan);
}

.card-info {
  text-align: center;
}

.card-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.3em;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.card-subtitle {
  color: var(--text-secondary);
  font-size: 0.9em;
  margin-bottom: 20px;
  font-style: italic;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--accent-cyan);
  border-radius: 50%;
  background: rgba(0, 255, 255, 0.1);
  color: var(--accent-cyan);
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
  transform: scale(1.1);
}

.social-icon svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>

