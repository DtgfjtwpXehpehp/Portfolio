<template>
  <section class="about-section">
    <div class="container">
      
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
      
      <div class="about-content">
        <div class="photo-container">
          <div class="card-container">
            <div 
              class="photo-card floating" 
              ref="photoCard" 
              @mousemove="handlePhotoCardMouseMove" 
              @mouseleave="resetPhotoCard"
              >
              <!-- <div class="decorative-element"></div> -->
              
              <div class="photo-frame">
                <img 
                  :src="about?.image_url || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='" 
                  alt="Profile Photo"
                >
              </div>
              
              <div class="card-info">
                <h3 class="card-title">{{ about?.name || 'Agent Name' }}</h3>
                <p class="card-subtitle">{{ about?.title || 'Full Stack Developer' }}</p>
                
                <div class="social-icons">
                  <div v-if="contact?.email" class="social-icon" @click="handleSocialClick">
                    <a :href="`mailto:${contact.email}`" target="_blank" rel="noopener">
                      <svg viewBox="0 0 512 512">
                        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                      </svg>
                    </a>
                  </div>
                  <div v-if="contact?.linkedin_url" class="social-icon" @click="handleSocialClick">
                    <a :href="contact.linkedin_url" target="_blank" rel="noopener">
                      <svg viewBox="0 0 448 512">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                      </svg>
                    </a>
                  </div>
                  <div v-if="contact?.github_url" class="social-icon" @click="handleSocialClick">
                    <a :href="contact.github_url" target="_blank" rel="noopener">
                      <svg viewBox="0 0 496 512">
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.9-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.6.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                      </svg>
                    </a>
                  </div>
                  <div class="social-icon" @click="handleSocialClick">
                    <a :href="`https://discord.com/users/${contact?.discord}`" target="_blank" rel="noopener">
                      <svg viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </a>
                    <li class="icon cv">
                      <span class="tooltip">View CV</span>
                      <a :href="document?.file_url" target="_blank" rel="noopener" v-if="document?.file_url">
                        <svg viewBox="0 0 24 24" height="1.2em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                        </svg>
                      </a>
                    </li>
                  </div>
                  <div v-if="document?.file_url" class="social-icon" @click="handleSocialClick">
                    <a :href="document.file_url" target="_blank" rel="noopener">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>


              <h2 class="section-title">About</h2>

            <div class="terminal">
                           <div class="terminal-line"><span class="terminal-prompt">></span> cat about_me.txt</div>
                                <div class="terminal-line">NAME: {{ about?.name }}</div>
                    <!-- <div class="terminal-line">CODENAME: {{ about?.codename }}</div> -->
                    <div class="terminal-line">SPECIALIZATION: {{ about?.title }}</div>
                    <div class="terminal-line">EXPERIENCE: 3+ Years Active</div>
                    <div class="terminal-line">STATUS: Active </div>
                  </div>
                  
                  <div class="terminal mission-brief">
                    <div class="terminal-line"><span class="terminal-prompt">></span> cat mission_brief.txt</div>
                    <div class="terminal-line content-text" v-html="about?.content"></div><span class="blinking-cursor"></span>
        </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAbout } from '../../../composables/useAbout'
import { useContact } from '../../../composables/useContact'
import { useResume } from '../../../composables/useResume'
// import { ref, onMounted } from 'vue'
import { defineProps, defineEmits, ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
gsap.registerPlugin(ScrambleTextPlugin)
import textSound from '../../../assets/sounds/textsound.mp3'

const { about, fetchAbout } = useAbout()
const { contact, fetchContact } = useContact()
const { document, fetchDocument } = useResume()

defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
}>()

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
  await fetchDocument()
  realName.value = about.value?.name || 'Your Real Name'
  scrambledName.value = caesarCipher(realName.value, shift)
  if (nameSpan.value) nameSpan.value.textContent = scrambledName.value
})


const photoCard = ref<HTMLElement>()

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

const handleSocialClick = (event: Event) => {
  const target = event.currentTarget as HTMLElement
  target.style.transform = 'translateY(-2px) scale(1.1)'
  setTimeout(() => {
    target.style.transform = 'translateY(-2px) scale(1)'
  }, 150)
}

onMounted(async () => {
  await fetchAbout()
  await fetchContact()
  await fetchDocument()
})
</script>

<style scoped>

.mission-brief {
  margin-top: 20px;
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

.about-section {
  padding: 40px 20px;
  background: var(--bg-primary);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

.section-title {
  font-family: 'Orbitron', monospace;
  font-size: 2.5em;
  color: var(--accent-cyan);
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 0 0 20px var(--accent-cyan);
}

.about-content {
  display: flex;
  justify-content: center;
}

.photo-container {
  perspective: 1000px;
}

.card-container {
  perspective: 1000px;
}

.photo-card {
  width: 350px;
  height: 480px;
  background: linear-gradient(145deg, rgba(0, 31, 63, 0.9), rgba(0, 15, 31, 0.95));
  border-radius: 25px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.3),
    0 0 0 1px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 255, 0.1);
}

.photo-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 
    0 35px 70px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(0, 255, 255, 0.15),
    inset 0 1px 0 rgba(0, 255, 255, 0.3);
}

.photo-frame {
  width: 240px;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  margin-bottom: 30px;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.3),
    inset 0 0 0 3px rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.photo-frame:hover {
  transform: scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    inset 0 0 0 3px rgba(0, 255, 255, 0.2);
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(0.8) hue-rotate(180deg);
  transition: all 0.3s ease;
}

.photo-frame:hover img {
  filter: contrast(1.2) saturate(1.2) hue-rotate(180deg) brightness(1.05);
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
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  font-family: 'Orbitron', monospace;
  background: linear-gradient(135deg, var(--accent-cyan), #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-subtitle {
  font-size: 16px;
  font-weight: 300;
  color: var(--accent-green);
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-family: 'Share Tech Mono', monospace;
}

.social-icons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 10px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 255, 255, 0.2);
  position: relative;
}

.social-icon:hover {
  background: rgba(0, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
}

.social-icon a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--text-primary);
  text-decoration: none;
}

.social-icon svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: all 0.3s ease;
}

.decorative-element {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(0, 255, 255, 0.05));
  border: 1px solid rgba(0, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.decorative-element::before {
  content: '⚡';
  color: var(--accent-cyan);
  font-size: 20px;
}

.floating {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.wrapper .cv:hover,
.wrapper .cv:hover .tooltip,
.wrapper .cv:hover .tooltip::before {
  background: #28a745;
  color: #fff;
}

.wrapper .cv:hover a {
  color: #fff;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .photo-card {
    width: 300px;
    height: 420px;
    padding: 25px;
  }
  
  .photo-frame {
    width: 200px;
    height: 250px;
  }
  
  .card-title {
    font-size: 20px;
  }
  
  .card-subtitle {
    font-size: 14px;
  }
  
  .social-icon {
    width: 35px;
    height: 35px;
  }
  
  .social-icon svg {
    width: 18px;
    height: 18px;
  }
}
</style>