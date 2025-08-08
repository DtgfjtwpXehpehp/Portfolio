<template>
  <div class="projects-content" >
      <h2 class="section-title">MY PROJECTS</h2>
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
        <div class="projects-list">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="card"
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
              
              <p class="card__descr">
                {{ project.description }}
              </p>
              
              <div class="card__links">
                <div @click="openCode(project)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                  <a 
                    :href="getProjectGithubUrl(project)"
                    class="link" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code
                  </a>
                </div>
                <div @click="openPreview(project)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg">
                    <path d="M562.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L405.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C189.5 251.2 196 330 246 380c56.5 56.5 148 56.5 204.5 0L562.8 267.7zM43.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C57 372 57 321 88.5 289.5L200.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C416.5 260.8 410 182 360 132c-56.5-56.5-148-56.5-204.5 0L43.2 244.3z"></path>
                  </svg>
                  <a 
                    :href="getProjectLiveUrl(project)"
                    class="link" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// import BaseWindow from '../../BaseWindow.vue'
import { useSoundEffects } from '../../../composables/useSoundEffects'
import { useProjects } from '../../../composables/useProjects'

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
  return project.live_url || project.liveUrl || '#'
}

const getProjectGithubUrl = (project: any) => {
  return project.github_url || project.githubUrl || '#'
}

const openPreview = (project: any) => {
  const url = getProjectLiveUrl(project)
  if (url !== '#') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  playSound('click')
}

const openCode = (project: any) => {
  const url = getProjectGithubUrl(project)
  if (url !== '#') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  playSound('click')
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
  padding-top: 20px;
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

/* Projects Grid */
.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  justify-items: center;
  padding: 10px 0;
}

/* Neumorphic Card Styles */
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
  box-shadow: 0px 0px 10px 2px #5a5a5a;
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


.card:hover .project-image {
  transform: scale(1.05);
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
}

.card__title {
  color: var(--font-color);
  text-align: center;
  margin-bottom: 12px;
  font-weight: 900;
  font-size: 16px;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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


.card__descr {
  color: var(--font-color);
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: auto;
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
}

.svg {
  width: 18px;
  height: 18px;
  transform: translateY(15%);
  fill: var(--font-color);
  margin-right: 6px;
  transition: all 0.3s ease;
}

.card__links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}

.card__links > div {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.05);
  flex: 1;
  box-shadow: inset -2px 2px 4px rgba(0,0,0,0.1),
              inset 2px -2px 4px rgba(255,255,255,0.7);
}

.card__links > div:hover {
  background: rgba(79, 70, 229, 0.1);
  box-shadow: 0 0 8px rgba(79, 70, 229, 0.3);
  transform: scale(1.02);
}

.card__links > div:hover .svg,
.card__links > div:hover .link {
  color: #4F46E5;
  fill: #4F46E5;
}

.card__links .link {
  color: var(--font-color);
  font-weight: 600;
  font-size: 12px;
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.card__links .link:hover {
  text-decoration: underline;
}

/* Loading and Error States */
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

/* Responsive Design */
@media (max-width: 768px) {
  .projects-list {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .card {
    width: 95%;
    max-width: 320px;
  }
  
  .filter-buttons {
    gap: 8px;
  }
  
  .filter-btn {
    padding: 6px 12px;
    font-size: 0.75em;
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  .projects-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1201px) {
  .projects-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>