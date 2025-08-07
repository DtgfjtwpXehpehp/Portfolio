<template>
  <BaseWindow
    :active="active"
    title="Contact"
    @close="$emit('close')"
  >
    <div class="contact-container">
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="form-input"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-input"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea
            id="message"
            v-model="form.message"
            class="form-textarea"
            rows="5"
            required
          ></textarea>
        </div>
        
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </form>
      
      <div class="contact-info">
        <h4>Alternative Contact Methods:</h4>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Location: Cyber City, Digital Realm</p>
      </div>
    </div>
  </BaseWindow>
</template>

<script>
export default {
  name: 'ContactWindow',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      isSubmitting: false
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Reset form
      this.form = {
        name: '',
        email: '',
        message: ''
      }
      
      this.isSubmitting = false
      alert('Message sent successfully!')
    }
  }
}
</script>

<style scoped>
.contact-container {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.contact-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
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