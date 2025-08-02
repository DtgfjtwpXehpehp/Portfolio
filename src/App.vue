<template>
  <!-- Loading Screen -->
  <LoadingScreen 
    v-if="showLoading" 
    @system-ready="handleSystemReady"
  />
  
  <div id="app">
    <!-- Dynamic Layout Based on Screen Size -->
    <component 
      v-if="!showLoading"
      :is="currentLayout" 
      :sound-enabled="soundEnabled"
      @toggle-sound="toggleSound"
    />

    <!-- About Section -->
    <section class="about-section mobile-section">
      <div class="section-content">
        <div class="photo-card-container">
          <div class="card-container">
            <div class="photo-card floating" ref="photoCard" @mousemove="handlePhotoCardMouseMove" @mouseleave="resetPhotoCard">
              <div class="decorative-element"></div>
              
              <div class="photo-frame">
                <img 
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" 
                  alt="Agent Profile Photo"
                >
              </div>
              
              <div class="card-info">
                <h2 class="card-title">CLASSIFIED AGENT</h2>
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
          <div class="agent-info">
            <h2 class="agent-name">AGENT [REDACTED]</h2>
            <p class="agent-title">Full-Stack Developer</p>
            <div class="clearance">CLEARANCE LEVEL: TOP SECRET</div>
          </div>
        </div>

        <div class="terminal">
          <div class="terminal-line"><span class="terminal-prompt">></span> cat agent_profile.txt</div>
          <div class="terminal-line">NAME: [CLASSIFIED]</div>
          <div class="terminal-line">TITLE: Web Developer</div>
          <div class="terminal-line">SPECIALIZATION: Full-Stack Operations</div>
          <div class="terminal-line">EXPERIENCE: 5+ Years Active Service</div>
          <div class="terminal-line">STATUS: Active <span class="blinking-cursor"></span></div>
        </div>

        <div class="agent-bio">
          <p>Highly skilled operative specializing in digital infrastructure and web-based intelligence systems. 
          Expertise in creating secure, scalable applications for mission-critical operations.</p>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="projects-section mobile-section">
      <div class="section-content">
        <h2 class="section-title">CLASSIFIED CASE FILES</h2>
        
        <div class="projects-list">
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="project-card"
          >
            <div class="project-header">
              <div class="project-title">{{ project.title }}</div>
              <div class="project-classification">{{ project.classification }}</div>
            </div>
            <div class="project-content">
              <p><strong>Mission Brief:</strong> {{ project.brief }}</p>
              <p><strong>Technologies:</strong> {{ project.technologies }}</p>
              <p><strong>Status:</strong> <span :style="{ color: project.statusColor }">{{ project.status }}</span></p>
              <p>{{ project.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section mobile-section">
      <div class="section-content">
        <h2 class="section-title">TECHNICAL EXPERTISE</h2>
        
        <div class="skills-grid">
          <div 
            v-for="category in skillCategories" 
            :key="category.title"
            class="skill-category"
          >
            <h4>{{ category.title }}</h4>
            <ul class="skill-list">
              <li v-for="skill in category.skills" :key="skill">{{ skill }}</li>
            </ul>
          </div>
        </div>

        <div class="terminal">
          <div class="terminal-line"><span class="terminal-prompt">root@classified:~$</span> cat certifications.txt</div>
          <div v-for="cert in certifications" :key="cert" class="terminal-line">• {{ cert }}</div>
          <div class="terminal-line"><span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span></div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section mobile-section">
      <div class="section-content">
        <h2 class="section-title">SECURE COMMUNICATION</h2>
        
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
    </section>
  </div>
</template>

<style>
.photo-card {
  width: 300px;
  height: 400px;
  background: linear-gradient(145deg, rgba(0, 31, 63, 0.8), rgba(0, 15, 31, 0.9));
  border-radius: 15px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
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
    0 35px 70px rgba(0, 0, 0, 0.5),
    0 0 0 2px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.3);
}

.photo-frame {
  width: 200px;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    inset 0 0 0 2px rgba(0, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.photo-frame:hover {
  transform: scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
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

.agent-avatar {
  width: 80px;
  height: 80px;
  border: 2px solid var(--accent-cyan);
  border-radius: 50%;
  background: rgba(0, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.agent-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.8em;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.classification {
  color: var(--danger-red);
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

.agent-description {
  line-height: 1.8;
  font-size: 1.1em;
  max-width: 600px;
  margin: 0 auto;
}

/* Projects section */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  width: 100%;
}

.project-card {
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 31, 63, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.project-card:hover {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  transform: translateY(-5px);
}

.project-header {
  background: rgba(0, 255, 255, 0.1);
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
}

.project-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.2em;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.project-classification {
  color: var(--danger-red);
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.project-content {
  padding: 20px;
}

/* Skills section */
.skills-container {
  max-width: 1000px;
  width: 100%;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.skill-category {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}

.skill-category h4 {
  color: var(--accent-green);
  margin-bottom: 15px;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
}

.skill-list {
  list-style: none;
}

.skill-list li {
  margin-bottom: 8px;
  color: var(--text-secondary);
}

/* Contact section */
.contact-container {
  max-width: 600px;
  width: 100%;
}

.contact-form {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  padding: 30px;
  backdrop-filter: blur(10px);
}

.form-group {
  margin-bottom: 20px;
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
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 3px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border: none;
  font-family: 'Orbitron', monospace;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
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
  margin-top: 30px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  text-align: center;
}
</style>