<template>
  <section class="projects-section mobile-section">
    <div class="section-content">
      <h2 class="section-title">CLASSIFIED CASE FILES</h2>
      
      <div class="projects-list">
        <div 
          v-for="project in projects" 
          :key="project.id"
          class="project-card"
        >
          <div class="project-header">
            <div class="project-title">{{ project.title }}</div>
            <div class="project-classification">{{ project.classification }}</div>
          </div>
          <div class="project-content">
            <p><strong>Mission Brief:</strong> {{ project.brief }}</p>
            <p><strong>Technologies:</strong> {{ project.technologies }}</p>
            <p><strong>Status:</strong> <span :style="{ color: project.statusColor }">{{ project.status }}</span></p>
            <p>{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const projects = ref([
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
</style>