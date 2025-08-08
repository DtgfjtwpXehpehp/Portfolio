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
    <div v-if="loading" class="loading">
      LOADING PROJECT FILES...
    </div>
    
    <div v-else-if="error" class="error">
      ERROR: {{ error }}
      <button @click="fetchProjects" class="retry-button">RETRY</button>
    </div>

    <div v-else>
      <!-- Filter Buttons -->
      <div class="filter-section">
        <h3 class="filter-title">FILTER BY TECHNOLOGY</h3>
        <div class="filter-buttons">
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            ALL
          </button>
          <button 
            v-for="tech in availableTechnologies" 
            :key="tech"
            class="filter-btn" 
            :class="{ active: activeFilter === tech }"
            @click="setFilter(tech)"
          >
            {{ tech.toUpperCase() }}
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="card group relative"
        >
          <div class="card__img">
            <img 
              v-if="getProjectImageUrl(project)" 
              :src="getProjectImageUrl(project)" 
              :alt="project.title + ' screenshot'"
              class="project-image"
            >
            <div v-else class="project-placeholder">
              <div class="project-icon">{{ project.icon || '📁' }}</div>
            </div>
          </div>
          <div class="card__descr-wrapper">
            <p class="card__title">{{ project.title }}</p>
            
            <!-- Technology Tags -->
            <div class="tech-tags">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            
          <!-- Tooltip -->
          <div class="tooltip">
            <div class="tooltip-content">
              <div class="tooltip-header">
                <div class="tooltip-icon-wrapper">
                  <svg viewBox="0 0 20 20" fill="currentColor" class="tooltip-icon">
                    <path
                      clip-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h3 class="tooltip-title">{{ project.title }}</h3>
              </div>
              <div class="tooltip-body">
                <p class="tooltip-description">{{ project.description }}</p>
                <div class="tooltip-footer">
               
                </div>
              </div>
              <div class="tooltip-glow"></div>
              <div class="tooltip-arrow"></div>
            </div>
          </div>
            
            <div class="card__links">


<div
  class="card__tooltip"
  @mouseenter="showTooltip = 'code'"
  @mouseleave="showTooltip = null"
>
  <a
    :href="getProjectGithubUrl(project)"
    class="card__button"
    target="_blank"
    rel="noopener noreferrer"
  >
    <CodeIcon class="svg" />
    <span class="link">Code</span>
  </a>
  <span
    v-if="showTooltip === 'code'"
    class="tooltip-text"
  >
    View Code
  </span>
</div>
<div
  class="card__tooltip"
  @mouseenter="showTooltip = 'preview'"
  @mouseleave="showTooltip = null"
>
  <a
    :href="getProjectLiveUrl(project)"
    class="card__button"
    target="_blank"
    rel="noopener noreferrer"
  >
       <!-- <svg viewBox="0 0 24 24" height="1.2em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                        </svg> -->
    <span class="link">Preview</span>
  </a>
  <span
    v-if="showTooltip === 'preview'"
    class="tooltip-text"
  >
    Live Preview
  </span>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </BaseWindow>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseWindow from './BaseWindow.vue'
import { useSoundEffects } from '../composables/useSoundEffects'
import { useProjects } from '../composables/useProjects'

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
const { projects, loading, error, fetchProjects } = useProjects()

const activeFilter = ref('all')

// Get all unique technologies for filter buttons
const availableTechnologies = computed(() => {
  const allTechs = projects.value.flatMap(project => project.technologies)
  return [...new Set(allTechs)].sort()
})

// Filter projects based on selected technology
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects.value
  }
  return projects.value.filter(project => 
    project.technologies.includes(activeFilter.value)
  )
})

const setFilter = (filter: string) => {
  activeFilter.value = filter
  playSound('click')
}

// Helper function to get project image URL
const getProjectImageUrl = (project: any) => {
  return project.image_url || project.imageUrl
}

// Helper function to get project URLs
const getProjectLiveUrl = (project: any) => {
  return project.live_url || project.liveUrl
}

const getProjectGithubUrl = (project: any) => {
  return project.github_url || project.githubUrl
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.projects-content {
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: visible;
  padding-right: 10px;
  padding-top: 120px; /* Add space at top for tooltips */
}

.projects-content::-webkit-scrollbar {
  width: 6px;
}

.projects-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.projects-content::-webkit-scrollbar-thumb {
  background-color: var(--accent-cyan);
  border-radius: 3px;
}

/* Filter Section */
.filter-section {
  margin-bottom: 30px;
  text-align: center;
}

.filter-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.1em;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.filter-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 20px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.filter-btn.active {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  padding: 10px 0;
  width: 100%;
  justify-items: center;
  overflow: visible; /* Ensure tooltips aren't clipped */
}

/* Card Styles - Neumorphism Design */
.card {
  --font-color: var(--text-primary);
  --bg-color: rgba(0, 31, 63, 0.4);
  --border-color: var(--accent-cyan);
  width: 100%;
  max-width: 300px;
  height: 420px;
  border-radius: 20px;
  background: var(--bg-color);
  box-shadow:var(--accent-cyan);
  display: flex;
  flex-direction: column;
  transition: .4s;
  position: relative;
  margin: 0 auto;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0px 0px 15px 4px #5a5a5a,
              inset -2px 2px 6px #c0c0c0,
              inset 2px -2px 6px #f0f0f0;
}

.card__img {
  width: 100%;
  height: 180px;
  border-radius: 20px 20px 0 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .project-image {
  transform: scale(1.05);
}

.project-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #b8b8b8, #d0d0d0);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset -4px 4px 8px #a0a0a0,
              inset 4px -4px 8px #e8e8e8;
}

.project-icon {
  font-size: 3em;
  opacity: 0.6;
  color: #666;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.card__descr-wrapper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.card__title {
  color: var(--font-color);
  text-align: center;
  margin-bottom: 15px;
  font-weight: 900;
  font-size: 18px;
  text-transform: uppercase;
}

.tech-tags {
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
  justify-content: center;
}

.tech-tag {
  background: rgba(0, 255, 255, 0.1);
  color: var(--font-color);
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.65em;
  border: 1px solid var(--accent-cyan);
  text-transform: uppercase;
  box-shadow: var(--accent-cyan);
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

/* Tooltip Styles */
.tooltip {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  width: 280px;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  pointer-events: none;
  margin-top: -20px; /* Increased spacing from card */
}

.card:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.tooltip-content {
  position: relative;
  padding: 16px;
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95));
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(79, 70, 229, 0.15);
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.tooltip-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(79, 70, 229, 0.2);
}

.tooltip-icon {
  width: 16px;
  height: 16px;
  color: rgb(129, 140, 248);
}

.tooltip-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tooltip-body {
  margin-bottom: 0;
}

.tooltip-description {
  font-size: 13px;
  color: rgb(209, 213, 219);
  line-height: 1.5;
  margin-bottom: 12px;
  font-family: 'Share Tech Mono', monospace;
}

.tooltip-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: rgb(156, 163, 175);
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tooltip-check {
  width: 16px;
  height: 16px;
  color: rgb(34, 197, 94);
}

.tooltip-glow {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(147, 51, 234, 0.1));
  filter: blur(10px);
  opacity: 0.5;
}

.tooltip-arrow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95));
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.svg {
  width: 20px;
  height: 20px;
  transform: translateY(25%);
  fill: var(--font-color);
  margin-right: 6px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.card__links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  box-sizing: border-box;
}

.card__links > div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  padding: 10px 14px;
  border-radius: 9999px;
  background: rgba(0, 255, 255, 0.05);
  border: 1px solid var(--accent-cyan);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: -4px 4px 10px rgba(0, 255, 255, 0.1),
              4px -4px 10px rgba(0, 255, 255, 0.05);
}

.card__links > div:hover {
  background: var(--accent-cyan);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  transform: scale(1.02);
}

.card__links > div:hover .svg,
.card__links > div:hover .link {
  color: var(--bg-primary);
  fill: var(--bg-primary);
  font-weight: bold;
}


.card__links .link {
  color: var(--font-color);
  font-weight: 600;
  font-size: 13px;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  text-decoration: none;
  transition: color 0.3s ease;
}


/* Responsive Design */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 20px;
  }
  
  .card {
    width: 90%;
    max-width: 320px;
  }
  
  .filter-buttons {
    gap: 8px;
  }
  
  .filter-btn {
    padding: 6px 12px;
    font-size: 0.75em;
  }

  .tooltip {
    width: 250px;
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1201px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.loading {
  color: var(--accent-cyan);
  font-family: 'Share Tech Mono', monospace;
  animation: blink 1s infinite;
  padding: 20px;
  text-align: center;
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

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}


</style>