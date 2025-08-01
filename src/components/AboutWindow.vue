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
        <div class="agent-avatar">
          <img v-if="about.image_url" :src="about.image_url" :alt="about.name" class="agent-image">
          <span v-else>👤</span>
        </div>
        <h2>AGENT {{ about.name || '[REDACTED]' }}</h2>
        <!-- <p class="clearance">CLEARANCE LEVEL: TOP SECRET</p> -->
      
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

onMounted(() => {
  fetchAbout();
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
</style>

