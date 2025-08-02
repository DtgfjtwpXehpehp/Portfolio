<template>
  <section class="contact-section mobile-section">
    <div class="section-content">
      <h2 class="section-title">SECURE COMMUNICATION</h2>
      
      <div class="warning">
        ⚠️ ENCRYPTED TRANSMISSION REQUIRED ⚠️
      </div>

      <form @submit="handleContactForm" class="contact-form">
        <div class="form-group">
          <label for="agentId">Agent ID:</label>
          <input 
            type="text" 
            id="agentId" 
            v-model="contactForm.agentId"
            placeholder="Enter your agent identification" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="email">Secure Email:</label>
          <input 
            type="email" 
            id="email" 
            v-model="contactForm.email"
            placeholder="agent@classified.gov" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="message">Encrypted Message:</label>
          <textarea 
            id="message" 
            v-model="contactForm.message"
            rows="6" 
            placeholder="Begin encrypted transmission..." 
            required
          ></textarea>
        </div>
        
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ submitButtonText }}
        </button>
      </form>

      <div class="contact-info">
        <h4>ALTERNATIVE CONTACT METHODS:</h4>
        <p>📧 Email: agent@portfolio.classified</p>
        <p>📱 Secure Line: +1 (555) 000-0000</p>
        <p>🔗 LinkedIn: /in/classified-agent</p>
        <p>📍 Location: [REDACTED]</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSoundEffects } from '../../../composables/useSoundEffects'

const { playSound } = useSoundEffects()

const isSubmitting = ref(false)
const submitButtonText = ref('TRANSMIT SECURE MESSAGE')

const contactForm = reactive({
  agentId: '',
  email: '',
  message: ''
})

const handleContactForm = (event: Event) => {
  event.preventDefault()
  playSound('beep')
  
  isSubmitting.value = true
  submitButtonText.value = 'TRANSMITTING...'
  
  setTimeout(() => {
    submitButtonText.value = 'MESSAGE SENT ✓'
    setTimeout(() => {
      submitButtonText.value = 'TRANSMIT SECURE MESSAGE'
      isSubmitting.value = false
      // Reset form
      contactForm.agentId = ''
      contactForm.email = ''
      contactForm.message = ''
    }, 2000)
  }, 2000)
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