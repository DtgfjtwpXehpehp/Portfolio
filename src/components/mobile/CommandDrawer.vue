<template>
  <div class="command-drawer" :class="{ open: isOpen }" @click="$emit('close')">
    <div class="drawer-content" @click.stop>
      <div class="drawer-header">
        <h3>QUICK ACCESS</h3>
        <button class="close-btn" @click="handleClose"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <nav class="drawer-nav">
        <a 
          v-for="link in navLinks" 
          :key="link.id"
          href="#"
          @click.prevent="handleNavigate(link.id)"
          class="nav-link"
        >
          <i :class="link.icon"> </i>
          <span class="nav-text"> {{ link.label }}</span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSoundEffects } from '../../composables/useSoundEffects'

const { playSound } = useSoundEffects()

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  navigate: [sectionId: string]
}>()

const handleNavigate = (sectionId: string) => {
  playSound('click')
  emit('navigate', sectionId)
}

const handleClose = () => {
  playSound('click')
  emit('close')
}

const navLinks = [
{ id: 'about', label: ' ABOUT ME', icon: 'fa-solid fa-user' },
  { id: 'projects', label: ' MY PROJECTS', icon: 'fa-solid fa-folder-open' },
  // { id: 'resume', label: ' RESUME', icon: 'fa-solid fa-file-pdf' },
  { id: 'contact', label: ' CONTACT ME', icon: 'fa-solid fa-phone' },
]
</script>

<style scoped>
.command-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.command-drawer.open {
  opacity: 1;
  visibility: visible;
}

.drawer-content {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-left: 2px solid var(--accent-cyan);
  box-shadow: -5px 0 20px rgba(0, 255, 255, 0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.command-drawer.open .drawer-content {
  transform: translateX(0);
}

.drawer-header {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-header h3 {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.close-btn {
  background: none;
  /* border: 1px solid var(--danger-red); */
  color: var(--danger-red);
  width: 30px;
  height: 30px;
  /* border-radius: 50%; */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--danger-red);
  color: var(--bg-primary);
}

.drawer-nav {
  flex: 1;
  padding: 20px 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
}

.nav-link:hover {
  background: rgba(0, 255, 255, 0.1);
  border-left: 3px solid var(--accent-cyan);
  padding-left: 17px;
}

i {
  font-size: 1.2em;
  margin-right: 15px;
  width: 25px;
  text-align: center;
}

.nav-text {
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>