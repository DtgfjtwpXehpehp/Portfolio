<template>
  <section class="about-section mobile-section">
    <div class="section-content">
      <div class="photo-card-container">
        <div class="photo-card">
          <div class="photo-frame">
            <img 
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" 
              alt="Agent Profile"
            >
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
        <div class="terminal-line">CODENAME: Web Developer</div>
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
</template>

<script setup lang="ts">
// Component logic here
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

.photo-card {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  position: relative;
}

.photo-frame {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.photo-frame:hover {
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.8);
  transform: scale(1.05);
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(0.8);
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
</style>