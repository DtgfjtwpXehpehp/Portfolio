<template>
  <div class="mobile-interface">
    <!-- Scanlines effect -->
    <div class="scanlines"></div>

    <!-- Mobile Header -->
    <MobileHeader 
      :sound-enabled="soundEnabled"
      @toggle-sound="$emit('toggle-sound')"
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
      <AboutSection id="about" />
      
      <!-- Skills Section -->
      <SkillsSection id="skills" />
      
      <!-- Projects Section -->
      <ProjectsSection id="projects" />
      
      <!-- Contact Section -->
      <ContactSection id="contact" />
      
      <!-- Terminal Section -->
      <TerminalSection />
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
import TerminalSection from './sections/TerminalSection.vue'
import { useSoundEffects } from '../../composables/useSoundEffects'

defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
}>()

const { playSound } = useSoundEffects()
const commandDrawerOpen = ref(false)

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
</script>

<style scoped>
.mobile-interface {
  width: 100vw;
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
}

.mobile-main {
  margin-top: 70px;
  position: relative;
  z-index: 2;
}
</style>