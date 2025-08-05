<template>
  <div class="desktop-interface" :class="{ 'command-center-open': commandCenterOpen }">
    <!-- Scanlines effect -->
    <div class="scanlines"></div>

    <!-- Desktop Header -->
    <DesktopHeader 
      :sound-enabled="soundEnabled"
      @toggle-sound="$emit('toggle-sound')"
    />

    <!-- Control Panel -->
    <ControlPanel 
      v-show="commandCenterOpen"
      @open-window="openWindow" 
    />

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Hi, I'm <span 
              class="name-highlight"
              ref="nameSpan"
              @mouseenter="unscrambleName"
              @mouseleave="scrambleName"
            >{{ scrambledName }}</span>, a <span class="role-highlight">{{ about?.title }}</span>
          </h1>
          <p class="hero-subtitle">Specialized in creating secure, scalable web applications for mission-critical operations</p>
        </div>
        <div class="hero-photo">
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
                <h2 class="card-title">{{ about?.title }}</h2>
                <p class="card-subtitle">Creative • Innovative • Dedicated</p>
                <div class="social-icons">
                  <ul class="wrapper">
                    <li v-if="contact?.email" class="icon email">
                      <span class="tooltip">Email</span>
                      <a :href="`mailto:${contact.email}`" target="_blank" rel="noopener">
                        <svg viewBox="0 0 512 512" height="1.2em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                        </svg>
                      </a>
                    </li>
                    <li v-if="contact?.linkedin_url" class="icon linkedin">
                      <span class="tooltip">LinkedIn</span>
                      <a :href="contact.linkedin_url" target="_blank" rel="noopener">
                        <svg viewBox="0 0 448 512" height="1.2em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                        </svg>
                      </a>
                    </li>
                    <li v-if="contact?.github_url" class="icon github">
                      <span class="tooltip">GitHub</span>
                      <a :href="contact.github_url" target="_blank" rel="noopener">
                        <svg viewBox="0 0 496 512" height="1.2em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      </svg>
                    </a>
                  </li>
                  <li class="icon discord">
                    <span class="tooltip">Discord</span>
                    <a href="#" target="_blank" rel="noopener">
                      <svg viewBox="0 0 640 512" height="1.2em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/>
                      </svg>
                    </a>
                  </li>
                </ul>
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
import { useContact } from '../../../composables/useContact'


const photoCard = ref<HTMLElement>()

defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
}>()

// Fetch about info (name, image)
const { about, fetchAbout } = useAbout()
const { contact, fetchContact } = useContact()

onMounted(() => {
  fetchAbout()
  fetchContact()
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
  await fetchContact()
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

/* New wrapper styling for mobile */
.wrapper {
  display: inline-flex;
  list-style: none;
  height: 80px;
  width: 100%;
  padding-top: 20px;
  font-family: "Poppins", sans-serif;
  justify-content: center;
  margin: 0;
  padding-left: 0;
}

.wrapper .icon {
  position: relative;
  background: #fff;
  border-radius: 50%;
  margin: 5px;
  width: 35px;
  height: 35px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon a {
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 12px;
  background: #fff;
  color: #333;
  padding: 4px 6px;
  border-radius: 4px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  white-space: nowrap;
}

.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 6px;
  width: 6px;
  background: #fff;
  bottom: -2px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -35px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

.wrapper .email:hover,
.wrapper .email:hover .tooltip,
.wrapper .email:hover .tooltip::before {
  background: #ea4335;
  color: #fff;
}

.wrapper .email:hover a {
  color: #fff;
}

.wrapper .linkedin:hover,
.wrapper .linkedin:hover .tooltip,
.wrapper .linkedin:hover .tooltip::before {
  background: #0077b5;
  color: #fff;
}

.wrapper .linkedin:hover a {
  color: #fff;
}

.wrapper .github:hover,
.wrapper .github:hover .tooltip,
.wrapper .github:hover .tooltip::before {
  background: #333;
  color: #fff;
}

.wrapper .github:hover a {
  color: #fff;
}

.wrapper .discord:hover,
.wrapper .discord:hover .tooltip,
.wrapper .discord:hover .tooltip::before {
  background: #5865f2;
  color: #fff;
}

.wrapper .discord:hover a {
  color: #fff;
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

.terminal {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 15px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  margin: 20px 0;
  text-align: left;
}

.terminal-line {
  margin-bottom: 5px;
}

.terminal-prompt {
  color: var(--accent-cyan);
}

.blinking-cursor::after {
  content: '█';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.content-text {
  line-height: 1.6;
  white-space: pre-wrap;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  padding: 10px 0;
}
</style>

                        </svg>
                      </a>
                    </li>
                    <li class="icon discord">
                      <span class="tooltip">Discord</span>
                      <a href="#" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" height="1.2em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
      :command-center-open="commandCenterOpen"
      @restore-window="restoreWindow"
      @toggle-command-center="toggleCommandCenter"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
gsap.registerPlugin(ScrambleTextPlugin)
import DesktopHeader from './DesktopHeader.vue'
import ControlPanel from './ControlPanel.vue'
import AboutWindow from '../AboutWindow.vue'
import ProjectsWindow from '../ProjectsWindow.vue'
import ResumeWindow from '../ResumeWindow.vue'
import ContactWindow from '../ContactWindow.vue'
import TerminalWindow from '../TerminalWindow.vue'

import DesktopTaskbar from './DesktopTaskbar.vue'
import textSound from '../../assets/sounds/textsound.mp3'
import { useAbout } from '../../composables/useAbout'
import { useContact } from '../../composables/useContact'
import { useWindowManagement } from '../../composables/useWindowManagement'

defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
}>()

const commandCenterOpen = ref(true)
const photoCard = ref<HTMLElement>()

// Fetch about info (name, image)
const { about, fetchAbout } = useAbout()
const { contact, fetchContact } = useContact()

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


function scrambleName() {
  // Do nothing if the real name is already shown
  // This prevents scrambling back to cipher after the real name is revealed
  // Only allow scrambling if the scrambled version is currently displayed (i.e., never after real name is shown)
  // So, do nothing here
}

onMounted(async () => {
  await fetchContact()
  textAudio = new Audio(textSound)
  textAudio.preload = 'auto'
  await fetchAbout()
  realName.value = about.value?.name || 'Your Real Name'
  scrambledName.value = caesarCipher(realName.value, shift)
  if (nameSpan.value) nameSpan.value.textContent = scrambledName.value
})

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
  commandCenterOpen.value = !commandCenterOpen.value
  console.log('Command center toggled:', commandCenterOpen.value)
}

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


// function fetchContact() {
//   throw new Error('Function not implemented.')
// }
</script>

<style scoped>
.desktop-interface {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;
}

/* Hero Section */
.hero-section {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 40px;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 60px;
  max-width: 1400px;
  width: 100%;
  transition: margin-left 0.3s ease;
}

/* Adjust margin based on command center state */
.hero-content {
  margin-left: 240px; /* Default offset for command center */
}

/* When command center is hidden, remove the margin */
.desktop-interface:not(.command-center-open) .hero-content {
  margin-left: 0;
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

.hero-photo {
  flex-shrink: 0;
}

/* Photo Card Styles */
.card-container {
  perspective: 1000px;
}

.photo-card {
  width: 350px;
  height: 480px;
  background: linear-gradient(145deg, rgba(0, 31, 63, 0.9), rgba(0, 15, 31, 0.95));
  border-radius: 25px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.2);
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.photo-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 
    0 35px 70px rgba(0, 0, 0, 0.5),
    0 0 0 2px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.3);
}

.photo-frame {
  width: 240px;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  margin-bottom: 25px;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    inset 0 0 0 3px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.photo-frame:hover {
  transform: scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    inset 0 0 0 3px var(--accent-cyan);
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
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-subtitle {
  font-size: 14px;
  font-weight: 300;
  color: var(--text-secondary);
  margin-bottom: 15px;
  letter-spacing: 1px;
  font-family: 'Share Tech Mono', monospace;
}

.wrapper {
  display: inline-flex;
  list-style: none;
  height: 60px;
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif;
  justify-content: center;
}

.wrapper .icon {
  position: relative;
  background: #fff;
  border-radius: 50%;
  margin: 5px;
  width: 40px;
  height: 40px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon a {
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 12px;
  background: #fff;
  color: #333;
  padding: 4px 6px;
  border-radius: 4px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  white-space: nowrap;
}

.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 6px;
  width: 6px;
  background: #fff;
  bottom: -2px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -35px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

.wrapper .email:hover,
.wrapper .email:hover .tooltip,
.wrapper .email:hover .tooltip::before {
  background: #ea4335;
  color: #fff;
}

.wrapper .email:hover a {
  color: #fff;
}

.wrapper .linkedin:hover,
.wrapper .linkedin:hover .tooltip,
.wrapper .linkedin:hover .tooltip::before {
  background: #0077b5;
  color: #fff;
}

.wrapper .linkedin:hover a {
  color: #fff;
}

.wrapper .github:hover,
.wrapper .github:hover .tooltip,
.wrapper .github:hover .tooltip::before {
  background: #333;
  color: #fff;
}

.wrapper .github:hover a {
  color: #fff;
}

.wrapper .discord:hover,
.wrapper .discord:hover .tooltip,
.wrapper .discord:hover .tooltip::before {
  background: #5865f2;
  color: #fff;
}

.wrapper .discord:hover a {
  color: #fff;
}

.decorative-element {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 50px;
  height: 50px;
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
  font-size: 20px;
}

.floating {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

/* Tablet view - keep side by side layout */
@media (max-width: 1200px) and (min-width: 769px) {
  .hero-content {
    gap: 40px;
    margin-left: 200px; /* Smaller offset for tablet */
  }
  
  .desktop-interface:not(.command-center-open) .hero-content {
    margin-left: 0;
  }
  
  .hero-title {
    font-size: 2.8em;
  }
  
  .photo-card {
    width: 300px;
    height: 400px;
  }
  
  .photo-frame {
    width: 200px;
    height: 250px;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: row;
    gap: 20px;
    margin-left: 0;
    padding: 0 15px;
  }
  
  .hero-title {
    font-size: 2.2em;
    line-height: 1.1;
  }
  
  .hero-text {
    flex: 1;
    min-width: 0; /* Allow text to shrink */
  }
  
  .hero-subtitle {
    font-size: 1em;
  }
  
  .photo-card {
    width: 200px;
    height: 280px;
    padding: 15px;
  }
  
  .photo-frame {
    width: 140px;
    height: 180px;
    margin-bottom: 15px;
  }
  
  .card-title {
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .card-subtitle {
    font-size: 11px;
    margin-bottom: 10px;
  }
  
  .social-icons {
    gap: 8px;
  }
  
  .social-icon {
    width: 25px;
    height: 25px;
  }
  
  .social-icon svg {
    width: 12px;
    height: 12px;
  }
  
  .decorative-element {
    width: 30px;
    height: 30px;
    top: 10px;
    right: 10px;
  }
  
  .decorative-element::before {
    font-size: 14px;
  }
}
</style>