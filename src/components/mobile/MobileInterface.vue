<template>
  <div class="mobile-interface">
    <!-- Scanlines effect -->
    <div class="scanlines"></div>
    
    <!-- Mobile Header -->
    <MobileHeader
      @toggle-menu="toggleCommandDrawer"
    />
    
    <!-- Command Drawer -->
    <CommandDrawer
      :is-open="commandDrawerOpen"
      @close="closeCommandDrawer"
      @navigate="handleNavigation"
    />
    
    <!-- Main Content -->
    <main class="mobile-main">
      <!-- About Section -->
      <AboutSection 
        id="about" 
        @toggle-sound="handleToggleSound"
      />
     
      <!-- Skills Section -->
      <SkillsSection id="skills" />
     
      <!-- Projects Section -->
      <ProjectsSection id="projects" />
     
      <!-- Contact Section -->
      <ContactSection id="contact" />
     
      <!-- Terminal Section (uncomment when needed) -->
      <!-- <TerminalSection id="terminal" /> -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MobileHeader from './MobileHeader.vue'
import CommandDrawer from './CommandDrawer.vue'
import AboutSection from './sections/AboutSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import ContactSection from './sections/ContactSection.vue'
// import TerminalSection from './sections/TerminalSection.vue'
import { useSoundEffects } from '../../composables/useSoundEffects'

// Composables
const { playSound } = useSoundEffects()

// Reactive state
const commandDrawerOpen = ref(false)

// Methods
const toggleCommandDrawer = () => {
  commandDrawerOpen.value = !commandDrawerOpen.value
  playSound('click')
}

const closeCommandDrawer = () => {
  commandDrawerOpen.value = false
}

const handleNavigation = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  closeCommandDrawer()
  playSound('click')
}

// Handle sound toggle from AboutSection
const handleToggleSound = () => {
  // Add your sound toggle logic here if needed
  playSound('click')
}
</script>

<style scoped>
.mobile-interface {
  width: 100vw;
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow-x: hidden;
}

.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(
    transparent 50%, 
    rgba(0, 255, 255, 0.02) 50%
  );
  background-size: 100% 4px;
  animation: scanlines 0.1s linear infinite;
}

@keyframes scanlines {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}

.mobile-main {
  margin-top: 70px;
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

/* Ensure smooth scrolling behavior */
html {
  scroll-behavior: smooth;
}

/* Add responsive breakpoints */
@media (min-width: 768px) {
  .mobile-interface {
    /* Hide mobile interface on larger screens if needed */
    display: none;
  }
}

@media (max-width: 767px) {
  .mobile-main {
    padding: 0 10px;
  }
}
</style>