<template>
  <BaseWindow
    :active="active"
    :maximized="maximized"
    :position="position"
    title="CASE FILES - ACTIVE OPERATIONS"
    @close="$emit('close')"
    @minimize="$emit('minimize')"
    @maximize="$emit('maximize')"
    @move="$emit('move', $event)"
  >
    <div class="projects-content">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="case-file"
      >
        <div class="case-header" @click="toggleCase(project.id)">
          <div class="case-title">{{ project.title }}</div>
          <div class="case-classification">{{ project.classification }}</div>
        </div>
        <div 
          class="case-content"
          :class="{ expanded: expandedCases.includes(project.id) }"
        >
          <p><strong>Mission Brief:</strong> {{ project.brief }}</p>
          <p><strong>Technologies:</strong> {{ project.technologies }}</p>
          <p><strong>Status:</strong> 
            <span :style="{ color: project.statusColor }">{{ project.status }}</span>
          </p>
          <p><strong>Classification:</strong> {{ project.description }}</p>
        </div>
      </div>
    </div>
  </BaseWindow>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseWindow from './BaseWindow.vue'
import { useSoundEffects } from '../composables/useSoundEffects'

defineProps<{
  active: boolean
  maximized?: boolean
  position: { x: number, y: number }
}>()

defineEmits<{
  close: []
  minimize: []
  maximize: []
  move: [position: { x: number, y: number }]
}>()

const { playSound } = useSoundEffects()
const expandedCases = ref<string[]>([])

const projects = [
  {
    id: 'ecommerce',
    title: 'Operation: E-Commerce Fortress',
    classification: 'CONFIDENTIAL',
    brief: 'Developed secure online marketplace with advanced encryption protocols.',
    technologies: 'React, Node.js, MongoDB, Stripe API',
    status: 'MISSION SUCCESSFUL',
    statusColor: 'var(--accent-green)',
    description: 'Full-stack e-commerce platform with user authentication, payment processing, and inventory management.'
  },
  {
    id: 'neural',
    title: 'Operation: Neural Network',
    classification: 'TOP SECRET',
    brief: 'AI-powered data analysis system for pattern recognition in large datasets.',
    technologies: 'Python, TensorFlow, Flask, PostgreSQL',
    status: 'IN PROGRESS',
    statusColor: 'var(--accent-cyan)',
    description: 'Machine learning application for predictive analytics and anomaly detection.'
  },
  {
    id: 'mobile',
    title: 'Operation: Mobile Command',
    classification: 'RESTRICTED',
    brief: 'Cross-platform mobile application for field operations coordination.',
    technologies: 'React Native, Firebase, GPS Integration',
    status: 'DEPLOYED',
    statusColor: 'var(--accent-green)',
    description: 'Real-time communication and location tracking system for mobile devices.'
  }
]

const toggleCase = (caseId: string) => {
  playSound('click')
  const index = expandedCases.value.indexOf(caseId)
  if (index > -1) {
    expandedCases.value.splice(index, 1)
  } else {
    expandedCases.value.push(caseId)
  }
}
</script>

<style scoped>
.case-file {
  border: 1px solid rgba(0, 255, 255, 0.3);
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.case-file:hover {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

.case-header {
  background: rgba(0, 255, 255, 0.1);
  padding: 15px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
  cursor: pointer;
}

.case-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.1em;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.case-classification {
  color: var(--danger-red);
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.case-content {
  padding: 15px;
  display: none;
  background: rgba(0, 0, 0, 0.3);
}

.case-content.expanded {
  display: block;
  animation: expandCase 0.3s ease-out;
}

@keyframes expandCase {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 200px;
  }
}
</style>