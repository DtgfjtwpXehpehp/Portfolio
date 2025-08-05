<template>
  <section class="about-section">
    <div class="container">
      <h2 class="section-title">About</h2>
      
      <div class="about-content">
        <div class="photo-container">
          <div class="photo-card">
            <div class="photo-frame">
              <img 
                :src="about?.image_url || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='" 
                alt="Profile Photo"
              >
            </div>
            
            <div class="card-info">
              <h3 class="name">{{ about?.name || 'Agent Name' }}</h3>
              <p class="title">{{ about?.title || 'Full Stack Developer' }}</p>
              <p class="description">{{ about?.description || 'Specialized in creating secure, scalable web applications for mission-critical operations' }}</p>
              
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
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.9-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.6.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
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
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAbout } from '../../../composables/useAbout'
import { useContact } from '../../../composables/useContact'

const { about, fetchAbout } = useAbout()
const { contact, fetchContact } = useContact()

onMounted(async () => {
  await fetchAbout()
  await fetchContact()
})
</script>

<style scoped>
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

.photo-card {
  width: 320px;
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
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.photo-frame {
  width: 200px;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.4),
    inset 0 0 0 2px rgba(0, 255, 255, 0.2);
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(0.8) hue-rotate(180deg);
}

.card-info {
  text-align: center;
  color: var(--text-primary);
  width: 100%;
}

.name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.title {
  font-size: 16px;
  font-weight: 300;
  color: var(--accent-green);
  margin-bottom: 15px;
  letter-spacing: 1px;
  font-family: 'Share Tech Mono', monospace;
}

.description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 20px;
  font-family: 'Share Tech Mono', monospace;
}

/* Social Icons */
.wrapper {
  display: inline-flex;
  list-style: none;
  height: 80px;
  width: 100%;
  padding-top: 20px;
  font-family: "Poppins", sans-serif;
  justify-content: center;
  margin: 0;
}

.wrapper .icon {
  position: relative;
  background: #fff;
  border-radius: 50%;
  margin: 8px;
  width: 35px;
  height: 35px;
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

/* Responsive adjustments */
@media (max-width: 480px) {
  .photo-card {
    width: 280px;
    padding: 15px;
  }
  
  .photo-frame {
    width: 160px;
    height: 200px;
  }
  
  .name {
    font-size: 20px;
  }
  
  .title {
    font-size: 14px;
  }
  
  .description {
    font-size: 12px;
  }
  
  .wrapper .icon {
    width: 30px;
    height: 30px;
    margin: 6px;
  }
}
</style>