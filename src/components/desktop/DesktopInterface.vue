<template>
  <div class="desktop-interface">
    <!-- Scanlines effect -->
    <div class="scanlines"></div>

    <!-- Desktop Header -->
    <DesktopHeader 
      :sound-enabled="soundEnabled"
      @toggle-sound="$emit('toggle-sound')"
    />

    <!-- Control Panel -->
    <ControlPanel @open-window="openWindow" />

    <!-- Windows -->
    <AboutWindow
      v-if="activeWindows.about"
      :active="activeWindows.about"
      :maximized="maximizedWindows.about"
      :position="windowPositions.about"
      @close="closeWindow('about')"
      @minimize="minimizeWindow('about')"
      @maximize="maximizeWindow('about')"
      @move="updateWindowPosition('about', $event)"
    />

    <ProjectsWindow
      v-if="activeWindows.projects"
      :active="activeWindows.projects"
      :maximized="maximizedWindows.projects"
      :position="windowPositions.projects"
      @close="closeWindow('projects')"
      @minimize="minimizeWindow('projects')"
      @maximize="maximizeWindow('projects')"
      @move="updateWindowPosition('projects', $event)"
    />

    <ResumeWindow
      v-if="activeWindows.resume"
      :active="activeWindows.resume"
      :maximized="maximizedWindows.resume"
      :position="windowPositions.resume"
      @close="closeWindow('resume')"
      @minimize="minimizeWindow('resume')"
      @maximize="maximizeWindow('resume')"
      @move="updateWindowPosition('resume', $event)"
    />

    <ContactWindow
      v-if="activeWindows.contact"
      :active="activeWindows.contact"
      :maximized="maximizedWindows.contact"
      :position="windowPositions.contact"
      @close="closeWindow('contact')"
      @minimize="minimizeWindow('contact')"
      @maximize="maximizeWindow('contact')"
      @move="updateWindowPosition('contact', $event)"
    />

    <TerminalWindow
      v-if="activeWindows.terminal"
      :active="activeWindows.terminal"
      :position="windowPositions.terminal"
      @close="closeWindow('terminal')"
      @minimize="minimizeWindow('terminal')"
      @move="updateWindowPosition('terminal', $event)"
    />

    <!-- Taskbar -->
    <DesktopTaskbar
      :minimized-windows="minimizedWindows"
      :command-center-open="false"
      @restore-window="restoreWindow"
      @toggle-command-center="toggleCommandCenter"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import DesktopHeader from './DesktopHeader.vue'
import ControlPanel from './ControlPanel.vue'
import AboutWindow from '../AboutWindow.vue'
import ProjectsWindow from '../ProjectsWindow.vue'
import ResumeWindow from '../ResumeWindow.vue'
import ContactWindow from '../ContactWindow.vue'
import TerminalWindow from '../TerminalWindow.vue'
import DesktopTaskbar from './DesktopTaskbar.vue'
import { useWindowManagement } from '../../composables/useWindowManagement'

defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
}>()

const {
  activeWindows,
  minimizedWindows,
  maximizedWindows,
  windowPositions,
  openWindow,
  closeWindow,
  minimizeWindow,
  restoreWindow,
  maximizeWindow,
  updateWindowPosition
} = useWindowManagement()

const toggleCommandCenter = () => {
  // Toggle command center visibility - you can implement this logic
  console.log('Toggle command center')
}
</script>

<style scoped>
.desktop-interface {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;
}
</style>