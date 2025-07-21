<template>
  <BaseWindow
    :active="active"
    :position="position"
    title="SECURE COMMUNICATION CHANNEL"
    @close="$emit('close')"
    @minimize="$emit('minimize')"
    @move="$emit('move', $event)"
  >
    <div class="contact-content">
      <div class="warning">
        ⚠️ ENCRYPTED TRANSMISSION REQUIRED ⚠️
      </div>

      <form @submit="sendMessage" class="contact-form">
        <div class="form-group">
          <label>Agent ID:</label>
          <input 
            v-model="form.agentId"
            type="text" 
            placeholder="Enter your agent identification"
            class="form-input"
          >
        </div>
        
        <div class="form-group">
          <label>Secure Email:</label>
          <input 
            v-model="form.email"
            type="email" 
            placeholder="agent@classified.gov"
            class="form-input"
          >
        </div>
        
        <div class="form-group">
          <label>Encrypted Message:</label>
          <textarea 
            v-model="form.message"
            placeholder="Begin encrypted transmission..." 
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
        <p>📧 Email: agent@portfolio.classified</p>
        <p>📱 Secure Line: +1 (555) 000-0000</p>
        <p>🔗 LinkedIn: /in/classified-agent</p>
        <p>📍 Location: [REDACTED]</p>
      </div>
    </div>
  </BaseWindow>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseWindow from './BaseWindow.vue'
import { useSoundEffects } from '../composables/useSoundEffects'

defineProps<{
  active: boolean
  position: { x: number, y: number }
}>()

defineEmits<{
  close: []
  minimize: []
  move: [position: { x: number, y: number }]
}>()

const { playSound } = useSoundEffects()

const form = reactive({
  agentId: '',
  email: '',
  message: ''
})

const isTransmitting = ref(false)
const buttonText = ref('TRANSMIT SECURE MESSAGE')

const sendMessage = (event: Event) => {
  event.preventDefault()
  playSound('beep')
  
  isTransmitting.value = true
  buttonText.value = 'TRANSMITTING...'
  
  setTimeout(() => {
    buttonText.value = 'MESSAGE SENT ✓'
    setTimeout(() => {
      buttonText.value = 'TRANSMIT SECURE MESSAGE'
      isTransmitting.value = false
      // Reset form
      form.agentId = ''
      form.email = ''
      form.message = ''
    }, 2000)
  }, 2000)
}
</script>

<style scoped>
.contact-content {
  text-align: center;
}

.warning {
  color: var(--danger-red);
  font-size: 0.9em;
  margin-bottom: 20px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--accent-cyan);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 3px;
}

.form-textarea {
  resize: vertical;
}

.submit-btn {
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

.submit-btn:hover:not(:disabled) {
  background: var(--accent-green);
  box-shadow: 0 0 10px var(--accent-cyan);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact-info {
  margin-top: 20px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  text-align: left;
}

.contact-info h4 {
  color: var(--accent-green);
  margin-bottom: 10px;
}
</style>