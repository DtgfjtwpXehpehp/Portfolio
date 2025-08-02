<template>
  <section class="skills-section mobile-section">
    <div class="section-content">
      <h2 class="section-title">TECHNICAL EXPERTISE</h2>
      
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

      <div class="terminal">
        <div class="terminal-line"><span class="terminal-prompt">root@classified:~$</span> cat certifications.txt</div>
        <div v-for="cert in certifications" :key="cert" class="terminal-line">• {{ cert }}</div>
        <div class="terminal-line"><span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const skillCategories = ref([
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

const certifications = ref([
  'Certified Ethical Hacker (CEH)',
  'AWS Solutions Architect',
  'Google Cloud Professional Developer',
  'Cybersecurity Fundamentals',
  'Docker Certified Associate'
])
</script>

<style scoped>
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
</style>