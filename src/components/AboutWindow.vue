<template>
  <BaseWindow
    :active="active"
    :position="position"
    title="PERSONNEL FILE - CLASSIFIED"
    @close="$emit('close')"
    @minimize="$emit('minimize')"
    @move="$emit('move', $event)"
  >
    <div class="about-content">
      <div class="agent-profile">
        <div class="agent-avatar">👤</div>
        <h2>AGENT [REDACTED]</h2>
        <p class="clearance">CLEARANCE LEVEL: TOP SECRET</p>
      </div>
      
      <div class="terminal">
        <div class="terminal-line"><span class="terminal-prompt">></span> cat agent_profile.txt</div>
        <div class="terminal-line">NAME: [CLASSIFIED]</div>
        <div class="terminal-line">CODENAME: Web Developer</div>
        <div class="terminal-line">SPECIALIZATION: Full-Stack Operations</div>
        <div class="terminal-line">EXPERIENCE: 5+ Years Active Service</div>
        <div class="terminal-line">SKILLS: JavaScript, Python, React, Node.js</div>
        <div class="terminal-line">STATUS: Active <span class="blinking-cursor"></span></div>
      </div>

      <p class="description">
        Highly skilled operative specializing in digital infrastructure and web-based intelligence systems. 
        Expertise in creating secure, scalable applications for mission-critical operations. 
        Proven track record in cybersecurity protocols and data encryption methodologies.
      </p>
    </div>
  </BaseWindow>
</template>

<script setup lang="ts">
import BaseWindow from './BaseWindow.vue'

defineProps<{
  active: boolean
  position: { x: number, y: number }
}>()

defineEmits<{
  close: []
  minimize: []
  move: [position: { x: number, y: number }]
}>()
</script>

<style scoped>
.about-content {
  text-align: center;
}

.agent-profile {
  margin-bottom: 20px;
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

.description {
  line-height: 1.6;
  margin-top: 15px;
  text-align: left;
}
</style>