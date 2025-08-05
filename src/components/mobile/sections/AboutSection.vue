<template>
  <section class="about-section mobile-section">
    <div class="section-content">
          <div class="agent-info">
            <div class="hero-text">
<h1 class="hero-title">
            Hi, I'm <span 
              class="name-highlight"
              ref="nameSpan"
              @mouseenter="unscrambleName"
              @mouseleave="scrambleName"
            >{{ scrambledName }}</span>, a <span class="role-highlight">{{ about?.title }}</span>
          </h1>
          <!-- <div class="clearance">CLEARANCE LEVEL: TOP SECRET</div> -->
        </div>
        </div>
      <div class="photo-card-container">
        <div class="card-container">
          <div class="photo-card floating" ref="photoCard" @mousemove="handlePhotoCardMouseMove" @mouseleave="resetPhotoCard">
            <!-- <div class="decorative-element"></div> -->
            
            <div class="photo-frame">
              <img 
                :src="about?.image_url || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='" 
                alt="Agent Profile Photo"
              >
            </div>
            
            <div class="card-info">
              <h2 class="card-title">{{ about?.name || 'CLASSIFIED AGENT' }}</h2>
              <p class="card-subtitle">Secure • Innovative • Elite</p>
              
              <div class="social-icons">
                <div class="social-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div class="social-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
                <div class="social-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
    
      </div>

      <div class="terminal">
        <div class="terminal-line"><span class="terminal-prompt">></span> cat agent_profile.txt</div>
        <div class="terminal-line">NAME: {{ about?.name }}</div>
        <!-- <div class="terminal-line">CODENAME: {{ about?.codename }}</div> -->
        <div class="terminal-line">SPECIALIZATION: {{ about?.title }}</div>
        <div class="terminal-line">EXPERIENCE: 5+ Years Active</div>
        <div class="terminal-line">STATUS: Active <span class="blinking-cursor"></span></div>
      </div>

     <div class="terminal mission-brief">
          <div class="terminal-line"><span class="terminal-prompt">></span> cat mission_brief.txt</div>
          <div class="terminal-line content-text" v-html="about?.content"></div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import { ref, onMounted } from 'vue'
import { defineProps, defineEmits, ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
gsap.registerPlugin(ScrambleTextPlugin)
import textSound from '../../../assets/sounds/textsound.mp3'
import { useAbout } from '../../../composables/useAbout'


const photoCard = ref<HTMLElement>()

defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
}>()

// Fetch about info (name, image)
const { about, fetchAbout } = useAbout()
onMounted(() => {
  fetchAbout()
})

const nameSpan = ref()
const realName = ref('')
const scrambledName = ref('')
const shift = 11

// Sound effect for unscramble
let textAudio: HTMLAudioElement | null = null

function caesarCipher(str, shift) {
  return str.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0)
      const base = code >= 97 ? 97 : 65
      return String.fromCharCode(((code - base + shift) % 26) + base)
    }
    return char
  }).join('')
}


let animationInProgress = false

function runScramble(toReal: boolean) {
  if (!nameSpan.value) return
  if (animationInProgress) return
  animationInProgress = true
  const from = toReal ? caesarCipher(realName.value, shift) : realName.value
  const to = toReal ? realName.value : caesarCipher(realName.value, shift)
  gsap.to(nameSpan.value, {
    scrambleText: {
      text: to,
      chars: 'upperCase',
      revealDelay: 0.2,
      speed: 0.4
    },
    duration: 1.2,
    ease: 'power1.inOut',
    onStart: () => { nameSpan.value.textContent = from },
    onComplete: () => {
      nameSpan.value.textContent = toReal ? realName.value : to
      scrambledName.value = toReal ? realName.value : to
      animationInProgress = false
      // Stop sound when animation is done
      if (toReal && textAudio) {
        textAudio.pause()
        textAudio.currentTime = 0
      }
    }
  })
}


function unscrambleName() {
  if (scrambledName.value !== realName.value) {
    if (textAudio) {
      textAudio.currentTime = 0
      textAudio.play()
    }
    runScramble(true)
  }
}




onMounted(async () => {
  textAudio = new Audio(textSound)
  textAudio.preload = 'auto'
  await fetchAbout()
  realName.value = about.value?.name || 'Your Real Name'
  scrambledName.value = caesarCipher(realName.value, shift)
  if (nameSpan.value) nameSpan.value.textContent = scrambledName.value
})

const handlePhotoCardMouseMove = (event: MouseEvent) => {
  if (!photoCard.value) return
  
  const rect = photoCard.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20
  
  photoCard.value.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

const resetPhotoCard = () => {
  if (photoCard.value) {
    photoCard.value.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)'
  }
}
</script>

<style scoped>
.about-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-card-container {
  text-align: center;
  margin-bottom: 30px;
}

.card-container {
  perspective: 1000px;
}

.photo-card {
  width: 280px;
  height: 380px;
  background: linear-gradient(145deg, rgba(0, 31, 63, 0.9), rgba(0, 15, 31, 0.95));
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.3);
  margin: 0 auto;
}

.photo-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.5),
    0 0 0 2px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.3);
}

.photo-frame {
  width: 180px;
  height: 220px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 
    0 12px 25px rgba(0, 0, 0, 0.4),
    inset 0 0 0 2px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.photo-frame:hover {
  transform: scale(1.02);
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.5),
    inset 0 0 0 2px var(--accent-cyan);
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(0.8) hue-rotate(180deg);
  transition: all 0.3s ease;
}

.photo-frame:hover img {
  filter: contrast(1.2) saturate(1.0) hue-rotate(180deg) brightness(1.1);
}

.photo-frame::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    rgba(0, 255, 255, 0.1) 0%, 
    transparent 30%, 
    transparent 70%, 
    rgba(0, 255, 255, 0.05) 100%);
  pointer-events: none;
}

.card-info {
  text-align: center;
  color: var(--text-primary);
  width: 100%;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-subtitle {
  font-size: 12px;
  font-weight: 300;
  color: var(--text-secondary);
  margin-bottom: 12px;
  letter-spacing: 1px;
  font-family: 'Share Tech Mono', monospace;
}

.social-icons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 6px;
}

.social-icon {
  width: 28px;
  height: 100%;
  border-radius: 50%;
  background: rgba(0, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.social-icon:hover {
  background: rgba(0, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 255, 255, 0.3);
}

.social-icon svg {
  width: 14px;
  height: 14px;
  fill: var(--accent-cyan);
}

.decorative-element {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.1));
  border: 1px solid rgba(0, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.decorative-element::before {
  content: '⚡';
  color: var(--accent-cyan);
  font-size: 16px;
}

.mission-brief {
  margin-top: 20px;
}

.floating {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

.agent-info {
  margin-bottom: 30px;
}

.agent-name {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.5em;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.agent-title {
  color: var(--text-secondary);
  font-size: 1.1em;
  margin-bottom: 10px;
}

.clearance {
  color: var(--danger-red);
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.agent-bio {
  line-height: 1.6;
  text-align: center;
}

.mobile-section {
  min-height: 100vh;
  padding: 40px 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.section-content {
  max-width: 100%;
  margin: 0 auto;
}


.hero-text {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-family: 'Orbitron', monospace;
  font-size: 3.5em;
  line-height: 1.2;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.name-highlight {
  color: var(--accent-cyan);
  text-shadow: 0 0 20px var(--accent-cyan);
  animation: glow 2s ease-in-out infinite alternate;
}

.role-highlight {
  color: var(--accent-green);
  text-shadow: 0 0 20px var(--accent-green);
}

@keyframes glow {
  from { text-shadow: 0 0 20px var(--accent-cyan); }
  to { text-shadow: 0 0 30px var(--accent-cyan), 0 0 40px var(--accent-cyan); }
}

.hero-subtitle {
  font-size: 1.3em;
  color: var(--text-secondary);
  line-height: 1.6;
  font-family: 'Share Tech Mono', monospace;
}

</style>