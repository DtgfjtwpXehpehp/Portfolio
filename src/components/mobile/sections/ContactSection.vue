<template>
  <section class="contact-section mobile-section">
    <div class="section-content">
      <h2 class="section-title">CONTACT ME</h2>
      
      <!-- <div class="warning">
        ⚠️ ENCRYPTED TRANSMISSION REQUIRED ⚠️
      </div> -->

      <form @submit="sendMessage" class="contact-form">
        <div class="form-group">
          <label>Name:</label>
          <input 
            v-model="form.agentId"
            type="text" 
            placeholder="Enter your name"
            class="form-input"
          >
        </div>
        
        <div class="form-group">
          <label>Email:</label>
          <input 
            v-model="form.email"
            type="email" 
            placeholder="email@domain.com"
            class="form-input"
          >
        </div>
        
        <div class="form-group">
          <label>Enter your Message:</label>
          <textarea 
            v-model="form.message"
            placeholder="Hi Sivuyile, I am reaching out to you because..." 
            rows="6"
            class="form-textarea"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          class="submit-btn"
          :disabled="isTransmitting"
        >
          {{ buttonText }}
        </button>
      </form>

      <div class="contact-info">
        <h4>ALTERNATIVE CONTACT METHODS:</h4>
        <p>📧 Email: {{ contact?.email }}</p>
        <p>📱 Secure Line: {{ contact?.phone }}</p>
        <p>🔗 LinkedIn: <a :href="contact?.linkedin_url" target="_blank">{{ about?.name }}</a></p> 
        <p>📍 Location: Cape Town, South Africa</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import emailjs from '@emailjs/browser'
import { useSoundEffects } from '../../../composables/useSoundEffects'
import { useContact } from '../../../composables/useContact'
import { useAbout } from '../../../composables/useAbout'


const {contact,fetchContact }= useContact()
const {about , fetchAbout} = useAbout()


onMounted(async()=>{
  await fetchContact()
  await fetchAbout()
})



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

const form = reactive({
  agentId: '',
  email: '',
  message: ''
})

const isTransmitting = ref(false)
const buttonText = ref('SEND MESSAGE')

// 🧠 REPLACE THESE with your actual EmailJS values
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY


const sendMessage = async (event: Event) => {
  event.preventDefault()
  playSound('beep')

  isTransmitting.value = true
  buttonText.value = 'SENDING...'

  const templateParams = {
    agentId: form.agentId,
    email: form.email,
    message: form.message
  }

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey)
    buttonText.value = 'MESSAGE SENT ✓'

    setTimeout(() => {
      buttonText.value = 'SEND MESSAGE'
      isTransmitting.value = false
      form.agentId = ''
      form.email = ''
      form.message = ''
    }, 2000)
  } catch (error) {
    console.error('Failed to send message:', error)
    buttonText.value = 'FAILED TO SEND ❌'
    isTransmitting.value = false
    setTimeout(() => {
      buttonText.value = 'SEND MESSAGE'
    }, 3000)
  }
}

</script>

<style scoped>
.mobile-section {
  min-height: 100vh;
  padding: 40px 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.section-content {
  max-width: 100%;
  margin: 0 auto;
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

.warning {
  color: var(--danger-red);
  font-size: 0.9em;
  text-align: center;
  margin-bottom: 20px;
}

.contact-form {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  padding: 20px;
  backdrop-filter: blur(10px);
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--accent-cyan);
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  font-size: 0.9em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 3px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border: none;
  font-family: 'Orbitron', monospace;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: var(--accent-green);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact-info {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}

.contact-info h4 {
  color: var(--accent-green);
  margin-bottom: 15px;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
}

.contact-info p {
  margin-bottom: 8px;
  color: var(--text-secondary);
}
</style>