<template>
  <BaseWindow
    :active="active"
    :position="position"
    title="SERVICE RECORD"
    @close="$emit('close')"
    @minimize="$emit('minimize')"
    @move="$emit('move', $event)"
  >
    <div class="resume-content">
      <h3>CLASSIFIED RESUME</h3>
      
      <h4>TECHNICAL EXPERTISE</h4>
      <ul class="skills-list">
        <li>• Frontend: React, Vue.js, HTML5, CSS3, JavaScript (ES6+)</li>
        <li>• Backend: Node.js, Python, Express.js, Django</li>
        <li>• Database: MongoDB, PostgreSQL, MySQL, Redis</li>
        <li>• Cloud: AWS, Google Cloud, Azure, Docker</li>
        <li>• Security: OAuth, JWT, Encryption Protocols</li>
      </ul>

      <h4>MISSION HISTORY</h4>
      <div class="mission-entry">
        <strong>Senior Full-Stack Developer</strong><br>
        <em>TechCorp Industries | 2020 - Present</em><br>
        Led development of mission-critical web applications serving 100k+ users.
      </div>

      <div class="mission-entry">
        <strong>Software Engineer</strong><br>
        <em>Digital Solutions Inc | 2018 - 2020</em><br>
        Specialized in cybersecurity implementations and secure data transmission.
      </div>

      <h4>CERTIFICATIONS</h4>
      <ul class="skills-list">
        <li>• Certified Ethical Hacker (CEH)</li>
        <li>• AWS Solutions Architect</li>
        <li>• Google Cloud Professional Developer</li>
        <li>• Cybersecurity Fundamentals</li>
      </ul>
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
.resume-content h3 {
  color: var(--accent-cyan);
  font-family: 'Orbitron', monospace;
  margin-bottom: 15px;
}

.resume-content h4 {
  color: var(--accent-green);
  margin: 20px 0 10px 0;
}

.skills-list {
  list-style: none;
  padding: 0;
}

.mission-entry {
  margin-bottom: 15px;
}

.mission-entry strong {
  color: var(--accent-cyan);
}
</style>