<template>
  <header class="desktop-header">
    <div class="header-left">
      <div class="logo glitch">{{about?.name }}</div>
    </div>
    
    <div class="header-center">
      <div class="system-info">
        <!-- <span class="status-indicator"></span> -->
        <!-- <span class="system-status">SECURE CONNECTION ESTABLISHED</span> -->
      </div>
    </div>
    
    <div class="header-right">
      <div class="checkbox-wrapper-35">
        <input 
          :checked="soundEnabled" 
          @change="toggleSound" 
          name="sound-switch" 
          id="sound-switch" 
          type="checkbox" 
          class="switch"
        >
        <label for="sound-switch">
          <span class="switch-x-text">AUDIO </span>
          <span class="switch-x-toggletext">
            <span class="switch-x-unchecked"><span class="switch-x-hiddenlabel">Unchecked: </span>OFF</span>
            <span class="switch-x-checked"><span class="switch-x-hiddenlabel">Checked: </span>ON</span>
          </span>
        </label>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAbout } from '../../composables/useAbout';
import { useSoundEffects } from '../../composables/useSoundEffects';

const { soundEnabled, setSoundEnabled, playSound } = useSoundEffects()

const { about, fetchAbout } = useAbout()

onMounted(async ()=> {
 await fetchAbout()
})

const toggleSound = () => {
  setSoundEnabled(!soundEnabled.value)
  playSound('click')
}
</script>

<style scoped>
.desktop-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-bottom: 2px solid var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(15px);
}

.logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.5em;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.system-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9em;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: var(--accent-green);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-green);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.system-status {
  color: var(--accent-green);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Switch Toggle Styles */
.checkbox-wrapper-35 .switch {
  display: none;
}

.checkbox-wrapper-35 .switch + label {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: var(--text-primary);
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  line-height: 15px;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.checkbox-wrapper-35 .switch + label::before,
.checkbox-wrapper-35 .switch + label::after {
  content: '';
  display: block;
}

.checkbox-wrapper-35 .switch + label::before {
  background-color: rgba(0, 255, 255, 0.3);
  border: 1px solid var(--accent-cyan);
  border-radius: 500px;
  height: 15px;
  margin-right: 8px;
  -webkit-transition: background-color 0.125s ease-out;
  transition: background-color 0.125s ease-out;
  width: 25px;
}

.checkbox-wrapper-35 .switch + label::after {
  background-color: var(--accent-cyan);
  border-radius: 13px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  height: 13px;
  left: 1px;
  position: absolute;
  top: 1px;
  -webkit-transition: -webkit-transform 0.125s ease-out;
  transition: -webkit-transform 0.125s ease-out;
  transition: transform 0.125s ease-out;
  transition: transform 0.125s ease-out, -webkit-transform 0.125s ease-out;
  width: 13px;
}

.checkbox-wrapper-35 .switch + label .switch-x-text {
  display: block;
  margin-right: .3em;
}

.checkbox-wrapper-35 .switch + label .switch-x-toggletext {
  display: block;
  font-weight: bold;
  height: 15px;
  overflow: hidden;
  position: relative;
  width: 25px;
}

.checkbox-wrapper-35 .switch + label .switch-x-unchecked,
.checkbox-wrapper-35 .switch + label .switch-x-checked {
  left: 0;
  position: absolute;
  top: 0;
  -webkit-transition: opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
  transition: opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
  transition: transform 0.125s ease-out, opacity 0.125s ease-out;
  transition: transform 0.125s ease-out, opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
}

.checkbox-wrapper-35 .switch + label .switch-x-unchecked {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
}

.checkbox-wrapper-35 .switch + label .switch-x-checked {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

.checkbox-wrapper-35 .switch + label .switch-x-hiddenlabel {
  position: absolute;
  visibility: hidden;
}

.checkbox-wrapper-35 .switch:checked + label::before {
  background-color: var(--accent-green);
  border-color: var(--accent-green);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.checkbox-wrapper-35 .switch:checked + label::after {
  -webkit-transform: translate3d(10px, 0, 0);
  transform: translate3d(10px, 0, 0);
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
}

.checkbox-wrapper-35 .switch:checked + label .switch-x-unchecked {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

.checkbox-wrapper-35 .switch:checked + label .switch-x-checked {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
}

/* Hover effects */
.checkbox-wrapper-35 .switch + label:hover::before {
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
}

.checkbox-wrapper-35 .switch:checked + label:hover::before {
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
}
</style>