<template>
  <div id="app">
    <!-- Mobile Single Page Layout (≤768px) -->
    <div v-if="isMobile" class="mobile-layout">
      <!-- Fixed Header -->
      <header class="mobile-header">
        <div class="mobile-logo glitch">AGENT PORTFOLIO v2.7</div>
        <div class="mobile-header-center">
          <div class="mobile-weather">{{ weather.location }} {{ weather.temp }}°C {{ weather.condition }}</div>
          <div class="mobile-time">{{ currentTime }}</div>
        </div>
        <div class="mobile-header-right">
          <button class="mobile-sound-toggle" @click="toggleSound">
            {{ soundEnabled ? '🔊' : '🔇' }}
          </button>
          <button class="mobile-hamburger" @click="toggleMobileMenu">☰</button>
        </div>
      </header>

      <!-- Command Drawer -->
      <div class="mobile-drawer" :class="{ open: mobileMenuOpen }">
        <nav class="mobile-nav">
          <a href="#mobile-about" @click="scrollToSection('mobile-about')" class="mobile-nav-btn">
            👤 About
          </a>
          <a href="#mobile-skills" @click="scrollToSection('mobile-skills')" class="mobile-nav-btn">
            🛠️ Skills
          </a>
          <a href="#mobile-projects" @click="scrollToSection('mobile-projects')" class="mobile-nav-btn">
            📁 Projects
          </a>
          <a href="#mobile-contact" @click="scrollToSection('mobile-contact')" class="mobile-nav-btn">
            📞 Contact
          </a>
        </nav>
      </div>

      <!-- Main Content -->
      <main class="mobile-main">
        <!-- About Section -->
        <section class="mobile-section mobile-hero" id="mobile-about">
          <h2 class="mobile-section-title">PERSONNEL FILE</h2>
          <div class="mobile-agent-profile">
            <div class="mobile-agent-card">
              <div class="mobile-photo-card">
                <div class="mobile-photo-frame">
                  <img v-if="about?.image_url" :src="about.image_url" :alt="about?.name || 'Agent'" class="mobile-photo-image">
                  <div v-else class="mobile-photo-placeholder">🕵️</div>
                </div>
                <div class="mobile-agent-info">
                  <h3 class="mobile-agent-name">{{ about?.name || 'Agent [REDACTED]' }}</h3>
                  <div class="mobile-agent-title">{{ about?.title || 'Web Developer' }}</div>
                </div>
              </div>
            </div>
            
            <div class="mobile-classification">CLEARANCE LEVEL: TOP SECRET</div>
            
            <div class="mobile-terminal">
              <div class="terminal-line"><span class="terminal-prompt">></span> cat agent_profile.txt</div>
              <div class="terminal-line">NAME: {{ about?.name || '[CLASSIFIED]' }}</div>
              <div class="terminal-line">CODENAME: {{ about?.title || 'Web Developer' }}</div>
              <div class="terminal-line">SPECIALIZATION: Full-Stack Operations</div>
              <div class="terminal-line">STATUS: Active <span class="blinking-cursor"></span></div>
            </div>

            <div class="mobile-bio" v-if="about?.content" v-html="about.content"></div>
            <div v-else class="mobile-bio">
              Highly skilled operative specializing in digital infrastructure and web-based intelligence systems. 
              Expertise in creating secure, scalable applications for mission-critical operations.
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section class="mobile-section" id="mobile-skills">
          <h2 class="mobile-section-title">TECHNICAL EXPERTISE</h2>
          <div class="mobile-skills-container">
            <div class="mobile-skills-grid">
              <div class="mobile-skill-category">
                <h4>Frontend Operations</h4>
                <ul class="mobile-skill-list">
                  <li>React / Vue.js</li>
                  <li>JavaScript (ES6+)</li>
                  <li>HTML5 / CSS3</li>
                  <li>TypeScript</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
              <div class="mobile-skill-category">
                <h4>Backend Systems</h4>
                <ul class="mobile-skill-list">
                  <li>Node.js / Express</li>
                  <li>Python / Django</li>
                  <li>REST APIs</li>
                  <li>GraphQL</li>
                  <li>Microservices</li>
                </ul>
              </div>
              <div class="mobile-skill-category">
                <h4>Database Intelligence</h4>
                <ul class="mobile-skill-list">
                  <li>MongoDB</li>
                  <li>PostgreSQL</li>
                  <li>MySQL</li>
                  <li>Redis</li>
                  <li>Data Analytics</li>
                </ul>
              </div>
              <div class="mobile-skill-category">
                <h4>Security Protocols</h4>
                <ul class="mobile-skill-list">
                  <li>OAuth / JWT</li>
                  <li>Encryption</li>
                  <li>Cybersecurity</li>
                  <li>Secure APIs</li>
                  <li>Penetration Testing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section class="mobile-section" id="mobile-projects">
          <h2 class="mobile-section-title">CLASSIFIED CASE FILES</h2>
          <div class="mobile-projects-container">
            <div class="mobile-project-card">
              <div class="mobile-project-header">
                <div class="mobile-project-title">Operation: E-Commerce Fortress</div>
                <div class="mobile-project-classification">CONFIDENTIAL</div>
              </div>
              <div class="mobile-project-content">
                <p><strong>Mission Brief:</strong> Developed secure online marketplace with advanced encryption protocols.</p>
                <p><strong>Technologies:</strong> React, Node.js, MongoDB, Stripe API</p>
                <p><strong>Status:</strong> <span style="color: var(--accent-green);">MISSION SUCCESSFUL</span></p>
              </div>
            </div>

            <div class="mobile-project-card">
              <div class="mobile-project-header">
                <div class="mobile-project-title">Operation: Neural Network</div>
                <div class="mobile-project-classification">TOP SECRET</div>
              </div>
              <div class="mobile-project-content">
                <p><strong>Mission Brief:</strong> AI-powered data analysis system for pattern recognition.</p>
                <p><strong>Technologies:</strong> Python, TensorFlow, Flask, PostgreSQL</p>
                <p><strong>Status:</strong> <span style="color: var(--accent-cyan);">IN PROGRESS</span></p>
              </div>
            </div>

            <div class="mobile-project-card">
              <div class="mobile-project-header">
                <div class="mobile-project-title">Operation: Mobile Command</div>
                <div class="mobile-project-classification">RESTRICTED</div>
              </div>
              <div class="mobile-project-content">
                <p><strong>Mission Brief:</strong> Cross-platform mobile application for field operations.</p>
                <p><strong>Technologies:</strong> React Native, Firebase, GPS Integration</p>
                <p><strong>Status:</strong> <span style="color: var(--accent-green);">DEPLOYED</span></p>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="mobile-section" id="mobile-contact">
          <h2 class="mobile-section-title">SECURE COMMUNICATION</h2>
          <div class="mobile-contact-container">
            <div class="mobile-warning">⚠️ ENCRYPTED TRANSMISSION REQUIRED ⚠️</div>
            
            <form @submit="sendMobileMessage" class="mobile-contact-form">
              <div class="mobile-form-group">
                <label>Agent ID:</label>
                <input v-model="mobileForm.agentId" type="text" placeholder="Enter your agent identification" class="mobile-form-input">
              </div>
              <div class="mobile-form-group">
                <label>Secure Email:</label>
                <input v-model="mobileForm.email" type="email" placeholder="agent@classified.gov" class="mobile-form-input">
              </div>
              <div class="mobile-form-group">
                <label>Encrypted Message:</label>
                <textarea v-model="mobileForm.message" placeholder="Begin encrypted transmission..." rows="6" class="mobile-form-textarea"></textarea>
              </div>
              <button type="submit" class="mobile-submit-btn" :disabled="mobileTransmitting">
                {{ mobileButtonText }}
              </button>
            </form>

            <div class="mobile-contact-info">
              <h4>ALTERNATIVE CONTACT METHODS:</h4>
              <p>📧 Email: agent@portfolio.classified</p>
              <p>📱 Secure Line: +1 (555) 000-0000</p>
              <p>🔗 LinkedIn: /in/classified-agent</p>
              <p>📍 Location: [REDACTED]</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- Desktop Layout (>768px) -->
    <div v-else class="desktop-layout">
    <!-- Loading Screen -->
    <LoadingScreen 
      v-if="!systemInitialized"
      @system-ready="handleSystemReady"
    />

    <!-- Sound Toggle -->
    <!-- Scanlines effect -->
    <div class="scanlines"></div>

    <!-- Desktop Layout -->
    <div class="desktop-layout">
      <!-- Main Interface -->
      <div 
        v-if="systemInitialized"
        class="main-interface"
      >
        <!-- Header -->
        <header class="header">
          <!-- Mobile Layout -->
          <div class="header-mobile" v-if="isMobile">
            <div class="header-top">
              <div class="logo-mobile glitch">{{ realName || 'AGENT [REDACTED]' }}</div>
            </div>
            <div class="header-middle">
              <div class="weather-time-widget">
                <span class="weather-icon">{{ currentWeather.condition }}</span>
                <span class="weather-location">{{ currentWeather.location }}</span>
                <span class="current-time">{{ currentTime }}</span>
              </div>
            </div>
            <div class="header-bottom">
              <SoundToggle 
                :enabled="soundEnabled"
                @toggle="handleToggleSound"
              />
              <button class="mobile-menu-btn" @click="toggleCommandCenter">
                <span class="hamburger-icon" :class="{ active: showCommandCenter }">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>

          <!-- Desktop Layout -->
          <div class="header-desktop" v-else>
            <div class="logo glitch">AGENT PORTFOLI v2.7</div>
            <div class="status-panel">
              <div class="status-item">
                <div class="status-dot"></div>
                <span>SECURE</span>
              </div>
              <div class="status-item">
                <div class="status-dot"></div>
                <span>ENCRYPTED</span>
              </div>
              
              <div class="status-item">
                <div class="status-dot"></div>
                <span>CLASSIFIED</span>
              </div>
              <div class="audio-toggle-container">
                <SoundToggle 
                  :enabled="soundEnabled"
                  @toggle="handleToggleSound"
                />
              </div>
            </div>
          </div>
        </header>

        <!-- Control Panel -->
        <ControlPanel 
          v-show="showCommandCenter"
          @open-window="handleWindowOpen" 
        />

        <!-- Central Interactive Display -->
        <!-- Welcome Landing -->
        <div class="welcome-landing">
          <div class="landing-content">
            <div class="welcome-text">
              <h1 v-if="loading">
                ACCESSING PERSONNEL FILES...
              </h1>
              <h1 v-else-if="error">
                ERROR: PERSONNEL FILE NOT FOUND
              </h1>
              <h1 v-else>
                Hi, I'm 
                <span 
                  class="name-cipher"
                  ref="nameElement"
                  @mouseenter="startScrambleEffect"
                >
                  <span class="scramble-text">{{ currentDisplayName }}</span>
                  <span class="scramble-cursor" :class="{ 'cursor-hidden': isDecrypted }">_</span>
                </span>
              </h1>
              <h2>a <span class="role">{{ about?.title || 'Full-Stack Developer' }}</span></h2>
            </div>
            
            <div class="card-container">
              <div class="photo-card floating" @click="triggerDangle">
                <div class="photo-frame">
                  <img
                    v-if="about?.image_url"
                    :src="about.image_url"
                    :alt="realName"
                    id="photoImage"
                    @error="handleImageError"
                  >
                  <div v-else class="photo-placeholder photo-placeholder-rect">👤</div>
                </div>
                <div class="card-info">
                  <h2 class="card-title">{{ about?.title || 'Professional Profile' }}</h2>
                  <p class="card-subtitle">Creative • Innovative • Dedicated</p>
                  <div class="social-icons">
                    <a
                      v-if="contact && contact.email"
                      :href="`mailto:${contact.email}`"
                      class="social-icon"
                      :title="contact.email"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </a>
                    <a
                      v-if="contact && contact.linkedin_url"
                      :href="contact.linkedin_url"
                      class="social-icon"
                      :title="contact.linkedin_url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    </a>
                    <a
                      v-if="contact && contact.github_url"
                      :href="contact.github_url"
                      class="social-icon"
                      :title="contact.github_url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Windows -->
        <AboutWindow
          :active="activeWindows.about"
          :maximized="maximizedWindows.about"
          :minimized="minimizedWindows.about"
          :position="windowPositions.about"
          @close="() => closeWindow('about')"
          @minimize="() => minimizeWindow('about')"
          @maximize="() => maximizeWindow('about')"
          @restore="() => restoreWindow('about')"
          @move="(pos) => updateWindowPosition('about', pos)"
        />

        <ProjectsWindow
          :active="activeWindows.projects"
          :maximized="maximizedWindows.projects"
          :minimized="minimizedWindows.projects"
          :position="windowPositions.projects"
          @close="() => closeWindow('projects')"
          @minimize="() => minimizeWindow('projects')"
          @maximize="() => maximizeWindow('projects')"
          @restore="() => restoreWindow('projects')"
          @move="(pos) => updateWindowPosition('projects', pos)"
        />

        <ResumeWindow
          :active="activeWindows.resume"
          :maximized="maximizedWindows.resume"
          :minimized="minimizedWindows.resume"
          :position="windowPositions.resume"
          @close="() => closeWindow('resume')"
          @minimize="() => minimizeWindow('resume')"
          @maximize="() => maximizeWindow('resume')"
          @restore="() => restoreWindow('resume')"
          @move="(pos) => updateWindowPosition('resume', pos)"
        />

        <ContactWindow
          :active="activeWindows.contact"
          :maximized="maximizedWindows.contact"
          :minimized="minimizedWindows.contact"
          :position="windowPositions.contact"
          @close="() => closeWindow('contact')"
          @minimize="() => minimizeWindow('contact')"
          @maximize="() => maximizeWindow('contact')"
          @restore="() => restoreWindow('contact')"
          @move="(pos) => updateWindowPosition('contact', pos)"
        />

        <!-- Taskbar -->
        <div class="taskbar" v-if="!isMobile">
          <div class="taskbar-left">
            <button class="start-button" @click="toggleCommandCenter">
              <span class="start-icon">⚡</span>
              <span class="start-text">COMMAND</span>
            </button>
          </div>
          
          <div class="taskbar-center">
            <!-- Minimized Windows -->
            <div class="minimized-windows">
              <button 
                v-for="(isMinimized, windowType) in minimizedWindows" 
                :key="windowType"
                v-show="isMinimized"
                class="minimized-window-btn"
                @click="restoreWindow(windowType as WindowType)"
              >
                <span class="window-icon">{{ getWindowIcon(windowType) }}</span>
                <span class="window-name">{{ getWindowName(windowType) }}</span>
              </button>
            </div>
          </div>
          
          <div class="taskbar-right">
            <div class="weather-widget">
              <span class="weather-icon">{{ currentWeather.condition }}</span>
              <span class="weather-temp">{{ currentWeather.temp }}°C</span>
              <span class="weather-location">{{ currentWeather.location }}</span>
            </div>
            <div class="time-widget">
              <span class="current-time">{{ currentTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Layout (≤768px) -->
    <div class="mobile-layout">
      <!-- Fixed Mobile Header -->
      <header class="mobile-header">
        <div class="mobile-header-left">
          <h1 class="mobile-logo glitch-text" data-text="AGENT PORTFOLIO">AGENT PORTFOLIO</h1>
        </div>
        <div class="mobile-header-center">
          <div class="mobile-system-info">
            <div class="mobile-weather">{{ weather }}</div>
            <div class="mobile-location">{{ location }}</div>
            <div class="mobile-time">{{ currentTime }}</div>
          </div>
        </div>
        <div class="mobile-header-right">
          <button class="mobile-sound-toggle" @click="toggleSound">
            {{ soundEnabled ? '🔊' : '🔇' }}
          </button>
          <button class="mobile-hamburger" @click="toggleMobileMenu">
            ☰
          </button>
        </div>
      </header>

      <!-- Command Drawer -->
      <div class="command-drawer" :class="{ open: mobileMenuOpen }">
        <div class="drawer-overlay" @click="closeMobileMenu"></div>
        <div class="drawer-content">
          <h3>COMMAND CENTER</h3>
          <nav class="drawer-nav">
            <a href="#about" @click="scrollToSection('about')" class="drawer-link">
              <i class="fas fa-user-secret"></i>
              ABOUT
            </a>
            <a href="#skills" @click="scrollToSection('skills')" class="drawer-link">
              <i class="fas fa-code"></i>
              SKILLS
            </a>
            <a href="#projects" @click="scrollToSection('projects')" class="drawer-link">
              <i class="fas fa-folder-open"></i>
              PROJECTS
            </a>
            <a href="#contact" @click="scrollToSection('contact')" class="drawer-link">
              <i class="fas fa-satellite-dish"></i>
              CONTACT
            </a>
          </nav>
        </div>
      </div>

      <!-- Mobile Content Sections -->
      <main class="mobile-content">
        <!-- About Section -->
        <section id="about" class="mobile-section about-section">
          <div class="section-content">
            <h2 class="section-title">PERSONNEL FILE - CLASSIFIED</h2>
            
            <div class="mobile-photo-card">
              <div class="agent-avatar">
                <img v-if="about?.image_url" :src="about.image_url" :alt="about?.name" class="agent-image">
                <span v-else class="avatar-placeholder">👤</span>
              </div>
              <div class="agent-info">
                <h3 class="agent-name">AGENT {{ about?.name || '[REDACTED]' }}</h3>
                <p class="agent-title">{{ about?.title || 'Full-Stack Developer' }}</p>
              </div>
            </div>

            <div class="mobile-terminal">
              <div class="terminal-header">PERSONNEL DATA</div>
              <div class="terminal-content">
                <div class="terminal-line">
                  <span class="terminal-prompt">></span> cat agent_profile.txt
                </div>
                <div class="terminal-line">NAME: {{ about?.name || '[CLASSIFIED]' }}</div>
                <div class="terminal-line">TITLE: {{ about?.title || 'Web Developer' }}</div>
                <div class="terminal-line">STATUS: ACTIVE</div>
                <div class="terminal-line">
                  <span class="terminal-prompt">></span> cat mission_brief.txt
                </div>
                <div class="mission-brief">
                  {{ about?.content || 'Mission briefing classified. Agent specializes in full-stack development and cybersecurity protocols.' }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="mobile-section skills-section">
          <div class="section-content">
            <h2 class="section-title">TECHNICAL ARSENAL</h2>
            
            <div class="skills-grid">
              <div class="skill-category">
                <h3>Frontend</h3>
                <div class="skill-items">
                  <span class="skill-tag">React</span>
                  <span class="skill-tag">Vue.js</span>
                  <span class="skill-tag">TypeScript</span>
                  <span class="skill-tag">HTML5</span>
                  <span class="skill-tag">CSS3</span>
                </div>
              </div>
              
              <div class="skill-category">
                <h3>Backend</h3>
                <div class="skill-items">
                  <span class="skill-tag">Node.js</span>
                  <span class="skill-tag">Python</span>
                  <span class="skill-tag">Express</span>
                  <span class="skill-tag">Django</span>
                  <span class="skill-tag">PostgreSQL</span>
                </div>
              </div>
              
              <div class="skill-category">
                <h3>DevOps</h3>
                <div class="skill-items">
                  <span class="skill-tag">Docker</span>
                  <span class="skill-tag">AWS</span>
                  <span class="skill-tag">Git</span>
                  <span class="skill-tag">CI/CD</span>
                  <span class="skill-tag">Linux</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="mobile-section projects-section">
          <div class="section-content">
            <h2 class="section-title">CASE FILES - ACTIVE OPERATIONS</h2>
            
            <div class="mobile-projects">
              <div class="project-card">
                <div class="project-header">
                  <h3>Operation: E-Commerce Fortress</h3>
                  <span class="classification">CONFIDENTIAL</span>
                </div>
                <p class="project-brief">Developed secure online marketplace with advanced encryption protocols.</p>
                <div class="project-tech">React • Node.js • MongoDB • Stripe API</div>
                <div class="project-status success">MISSION SUCCESSFUL</div>
              </div>
              
              <div class="project-card">
                <div class="project-header">
                  <h3>Operation: Neural Network</h3>
                  <span class="classification">TOP SECRET</span>
                </div>
                <p class="project-brief">AI-powered data analysis system for pattern recognition in large datasets.</p>
                <div class="project-tech">Python • TensorFlow • Flask • PostgreSQL</div>
                <div class="project-status active">IN PROGRESS</div>
              </div>
              
              <div class="project-card">
                <div class="project-header">
                  <h3>Operation: Mobile Command</h3>
                  <span class="classification">RESTRICTED</span>
                </div>
                <p class="project-brief">Cross-platform mobile application for field operations coordination.</p>
                <div class="project-tech">React Native • Firebase • GPS Integration</div>
                <div class="project-status success">DEPLOYED</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="mobile-section contact-section">
          <div class="section-content">
            <h2 class="section-title">SECURE COMMUNICATION CHANNEL</h2>
            
            <div class="contact-warning">
              ⚠️ ENCRYPTED TRANSMISSION REQUIRED ⚠️
            </div>

            <form class="mobile-contact-form" @submit="handleMobileContactSubmit">
              <div class="form-group">
                <label>Agent ID:</label>
                <input 
                  v-model="mobileContactForm.name"
                  type="text" 
                  placeholder="Enter your agent identification"
                  class="form-input"
                  required
                >
              </div>
              
              <div class="form-group">
                <label>Secure Email:</label>
                <input 
                  v-model="mobileContactForm.email"
                  type="email" 
                  placeholder="agent@classified.gov"
                  class="form-input"
                  required
                >
              </div>
              
              <div class="form-group">
                <label>Encrypted Message:</label>
                <textarea 
                  v-model="mobileContactForm.message"
                  placeholder="Begin encrypted transmission..." 
                  rows="6"
                  class="form-textarea"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                class="mobile-submit-btn"
                :disabled="mobileContactSubmitting"
              >
                {{ mobileContactButtonText }}
              </button>
            </form>

            <div class="mobile-contact-info">
              <h4>ALTERNATIVE CONTACT METHODS:</h4>
              <div class="contact-methods">
                <div class="contact-method">
                  <i class="fas fa-envelope"></i>
                  <span>agent@portfolio.classified</span>
                </div>
                <div class="contact-method">
                  <i class="fas fa-phone"></i>
                  <span>+1 (555) 000-0000</span>
                </div>
                <div class="contact-method">
                  <i class="fab fa-linkedin"></i>
                  <span>/in/classified-agent</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Terminal Section -->
        <section class="mobile-section terminal-section">
          <div class="section-content">
            <h2 class="section-title">SECURE TERMINAL v3.2</h2>
            
            <div class="mobile-terminal-container">
              <div class="mobile-terminal-output" ref="mobileTerminalOutput">
                <div 
                  v-for="(line, index) in mobileTerminalLines" 
                  :key="index"
                  class="terminal-line"
                  v-html="line"
                ></div>
              </div>
              <div class="mobile-terminal-input-container">
                <input 
                  ref="mobileTerminalInput"
                  v-model="mobileCurrentInput"
                  type="text" 
                  placeholder="Enter command..." 
                  class="mobile-terminal-input"
                  @keydown.enter="handleMobileCommand"
                >
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive, nextTick } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'
import SoundToggle from './components/SoundToggle.vue'
import ControlPanel from './components/ControlPanel.vue'
import AboutWindow from './components/AboutWindow.vue'
import ProjectsWindow from './components/ProjectsWindow.vue'
import ResumeWindow from './components/ResumeWindow.vue'
import ContactWindow from './components/ContactWindow.vue'
import { useSoundEffects } from './composables/useSoundEffects'
import { useKonamiCode } from './composables/useKonamiCode'
import { useAbout } from './composables/useAbout'
import { useWindowManagement } from './composables/useWindowManagement'
import { useContact } from './composables/useContact'
import type { WindowType } from './types/windows'

// Load composables
const { playSound } = useSoundEffects()
const { initKonamiCode } = useKonamiCode()
const {
  minimizedWindows,
  activeWindows,
  maximizedWindows,
  windowPositions,
  isDangling,
  openWindow,
  closeWindow,
  minimizeWindow,
  restoreWindow,
  maximizeWindow,
  updateWindowPosition,
  triggerDangle
} = useWindowManagement()

const { about, loading, error, fetchAbout } = useAbout()

// Application state
const systemInitialized = ref(false)
const soundEnabled = ref(true) // Audio enabled by default
const nameElement = ref<HTMLElement | null>(null)
const scrambleInterval = ref<number | null>(null)
const isDecrypted = ref(false)
const targetName = computed(() => about.value?.name || 'Agent [REDACTED]')
const currentDisplayName = ref('CZPYE [CPONXEPO]')

const encryptName = (name: string) => {
  return name.split('').map(char => {
    if (char === ' ') return ' '
    if (char === '[' || char === ']') return char
    if (!/[A-Za-z]/.test(char)) return char
    const isUpperCase = char === char.toUpperCase()
    const code = char.toUpperCase().charCodeAt(0)
    const shifted = String.fromCharCode(((code - 65 + 11) % 26) + 65)
    return isUpperCase ? shifted : shifted.toLowerCase()
  }).join('')
}

// Data management
const { contact, fetchContact } = useContact()

const realName = computed(() => about.value?.name || 'Agent [REDACTED]')

const getSocialIcon = (platform: string) => {
  const iconMap: Record<string, string> = {
    'github': 'fab fa-github',
    'linkedin': 'fab fa-linkedin',
    // 'twitter': 'fab fa-twitter',
    'email': 'fas fa-envelope',
    // 'discord': 'fab fa-discord',
    // 'portfolio': 'fas fa-globe',
    // 'instagram': 'fab fa-instagram',
    // 'facebook': 'fab fa-facebook',
    // Add more mappings as needed
  }
  return iconMap[platform.toLowerCase()] || 'fas fa-link'
}

const generateRandomChar = (char: string) => {
  if (char === ' ') return ' '
  if (!/[A-Za-z]/.test(char)) return char
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  return chars[Math.floor(Math.random() * chars.length)]
}

const startScrambleEffect = () => {
  if (scrambleInterval.value || isDecrypted.value) return
  
  // Always play text scrambling sound
  try {
    const audio = new Audio('/src/assets/sounds/textsound.mp3')
    audio.volume = 0.3
    audio.play().catch(() => {
      // Silently handle if audio can't play
      console.log('Audio playback blocked by browser')
    })
  } catch (error) {
    console.log('Audio not available')
  }
  
  const target = targetName.value
  let iterations = 0
  const maxIterations = 15
  
  // Start with the current cipher text
  const startText = currentDisplayName.value
  
  scrambleInterval.value = window.setInterval(() => {
    iterations++
    
    currentDisplayName.value = startText
      .split('')
      .map((char, index) => {
        if (char === target[index]) return char
        if (Math.random() < iterations / maxIterations) return target[index]
        return generateRandomChar(char)
      })
      .join('')
    
    if (currentDisplayName.value === target) {
      if (scrambleInterval.value) {
        clearInterval(scrambleInterval.value)
        scrambleInterval.value = null
        isDecrypted.value = true // Set decrypted state to true
      }
    }
  }, 50)
}

const agentId = ref('A-' + Math.random().toString(36).substr(2, 6).toUpperCase())

// Taskbar state
const showCommandCenter = ref(false)
const currentTime = ref('')
const currentWeather = ref({ temp: '--', location: 'Loading...', condition: '🌤️' })
const isMobile = ref(false)

// Mobile state
const mobileMenuOpen = ref(false)
const mobileContactForm = reactive({
  name: '',
  email: '',
  message: ''
})
const mobileContactSubmitting = ref(false)
const mobileContactButtonText = ref('TRANSMIT SECURE MESSAGE')

// Mobile terminal state
const mobileTerminalOutput = ref<HTMLElement>()
const mobileTerminalInput = ref<HTMLInputElement>()
const mobileCurrentInput = ref('')
const mobileTerminalLines = reactive([
  '<span class="terminal-prompt">root@classified:~$</span> whoami',
  'Agent [REDACTED] - Security Clearance: TOP SECRET',
  '<span class="terminal-prompt">root@classified:~$</span> ls -la /skills/',
  '-rwxr-xr-x 1 agent agent 4096 Jan 21 2025 javascript.exe',
  '-rwxr-xr-x 1 agent agent 2048 Jan 21 2025 python.exe',
  '-rwxr-xr-x 1 agent agent 3072 Jan 21 2025 react.exe',
  '<span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span>'
])

const weather = ref('⛅ 22°C')
const location = ref('📍 Loading...')

// Weather and time functions
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
}

const fetchWeather = async () => {
  try {
    // Try to get user's location first
    if (!navigator.geolocation) {
      throw new Error('Geolocation not supported')
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        await fetchWeatherByCoords(latitude, longitude)
      },
      async (error) => {
        console.log('Location access denied, using IP-based location')
        await fetchWeatherByIP()
      },
      { timeout: 10000, enableHighAccuracy: false }
    )
  } catch (error) {
    console.log('Weather fetch failed:', error)
    await fetchWeatherByIP()
  }
}

const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    // Get weather data from Open-Meteo (free, no API key needed)
    let weatherData
    
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
      )
      
      if (!response.ok) throw new Error('Weather service unavailable')
      const data = await response.json()
      
      weatherData = {
        main: { temp: Math.round(data.current_weather.temperature) },
        weather: [{ main: getWeatherCondition(data.current_weather.weathercode) }],
        name: 'Current Location'
      }
    } catch (error) {
      console.log('Weather fetch failed:', error)
      throw error
    }
    
    // Get precise location details (suburb + city)
    let locationName = 'Current Location'
    try {
      // Try multiple geocoding services for best accuracy
      locationName = await getPreciseLocation(lat, lon)
    } catch {
      locationName = 'Current Location'
    }
    
    currentWeather.value = {
      temp: Math.round(weatherData.main.temp),
      location: locationName,
      condition: getWeatherEmoji(weatherData.weather[0].main)
    }
  } catch (error) {
    console.log('Coords weather fetch failed:', error)
    setFallbackWeather()
  }
}

const getPreciseLocation = async (lat: number, lon: number): Promise<string> => {
  // Try multiple geocoding services for best precision
  const geocodingServices = [
    // Nominatim (OpenStreetMap) - Very detailed, free
    {
      url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      parser: (data: any) => {
        const addr = data.address || {}
        const parts = []
        
        // Get suburb/neighborhood
        const suburb = addr.suburb || addr.neighbourhood || addr.hamlet || addr.village
        if (suburb) parts.push(suburb)
        
        // Get city/town
        const city = addr.city || addr.town || addr.municipality || addr.county
        if (city && city !== suburb) parts.push(city)
        
        return parts.length > 0 ? parts.join(', ') : null
      }
    },
    // BigDataCloud - Good for detailed addresses
    {
      url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      parser: (data: any) => {
        const parts = []
        
        // Get suburb/locality
        if (data.locality && data.locality !== data.city) {
          parts.push(data.locality)
        }
        
        // Get city
        if (data.city) {
          parts.push(data.city)
        } else if (data.principalSubdivision) {
          parts.push(data.principalSubdivision)
        }
        
        return parts.length > 0 ? parts.join(', ') : null
      }
    },
    // Geocode.xyz - Alternative service
    {
      url: `https://geocode.xyz/${lat},${lon}?json=1`,
      parser: (data: any) => {
        const parts = []
        
        // Get neighborhood/suburb
        if (data.neighbourhood && data.neighbourhood !== data.city) {
          parts.push(data.neighbourhood)
        }
        
        // Get city
        if (data.city) {
          parts.push(data.city)
        }
        
        return parts.length > 0 ? parts.join(', ') : null
      }
    }
  ]
  
  // Try each service until we get a good result
  for (const service of geocodingServices) {
    try {
      const response = await fetch(service.url, {
        headers: {
          'User-Agent': 'Portfolio-Weather-Widget/1.0'
        }
      })
      
      if (!response.ok) continue
      
      const data = await response.json()
      const location = service.parser(data)
      
      if (location && location.length > 3) { // Ensure we got meaningful data
        return location
      }
    } catch (error) {
      console.log(`Geocoding service failed:`, error)
      continue
    }
  }
  
  // If all services fail, return fallback
  return 'Current Location'
}

const fetchWeatherByIP = async () => {
  try {
    // Get location by IP
    const ipResponse = await fetch('https://ipapi.co/json/')
    const ipData = await ipResponse.json()
    
    if (ipData.latitude && ipData.longitude) {
      await fetchWeatherByCoords(ipData.latitude, ipData.longitude)
    } else {
      throw new Error('IP location failed')
    }
  } catch (error) {
    console.log('IP weather fetch failed:', error)
    setFallbackWeather()
  }
}

const getWeatherCondition = (weatherCode: number): string => {
  // Open-Meteo weather codes to conditions
  if (weatherCode === 0) return 'Clear'
  if (weatherCode <= 3) return 'Clouds'
  if (weatherCode <= 67) return 'Rain'
  if (weatherCode <= 77) return 'Snow'
  if (weatherCode <= 82) return 'Rain'
  if (weatherCode <= 86) return 'Snow'
  return 'Clouds'
}

const getWeatherEmoji = (condition: string): string => {
  const conditionMap: Record<string, string> = {
    'Clear': '☀️',
    'Clouds': '⛅',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️'
  }
  return conditionMap[condition] || '🌤️'
}

const setFallbackWeather = () => {
  currentWeather.value = {
    temp: 22,
    location: 'Weather Unavailable',
    condition: '🌤️'
  }
}

const toggleCommandCenter = () => {
  showCommandCenter.value = !showCommandCenter.value
  playSound('click')
}

const closeCommandCenter = () => {
  showCommandCenter.value = false
}

// Mobile functions
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const scrollToSection = (sectionId: string) => {
  closeMobileMenu()
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 70 // Account for fixed header
    const elementPosition = element.offsetTop - headerHeight
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

const handleMobileContactSubmit = (event: Event) => {
  event.preventDefault()
  
  mobileContactSubmitting.value = true
  mobileContactButtonText.value = 'TRANSMITTING...'
  
  setTimeout(() => {
    mobileContactButtonText.value = 'MESSAGE SENT ✓'
    setTimeout(() => {
      mobileContactButtonText.value = 'TRANSMIT SECURE MESSAGE'
      mobileContactSubmitting.value = false
      // Reset form
      mobileContactForm.name = ''
      mobileContactForm.email = ''
      mobileContactForm.message = ''
    }, 2000)
  }, 2000)
}

const handleMobileCommand = () => {
  const command = mobileCurrentInput.value.trim()
  if (!command) return

  // Remove blinking cursor from last line
  const lastIndex = mobileTerminalLines.length - 1
  mobileTerminalLines[lastIndex] = mobileTerminalLines[lastIndex].replace('<span class="blinking-cursor"></span>', '')

  // Add command to terminal
  mobileTerminalLines.push(`<span class="terminal-prompt">root@classified:~$</span> ${command}`)

  // Process command and add response
  const response = processMobileCommand(command)
  if (response) {
    mobileTerminalLines.push(response)
  }

  // Add new prompt with cursor
  mobileTerminalLines.push('<span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span>')

  mobileCurrentInput.value = ''
  
  nextTick(() => {
    if (mobileTerminalOutput.value) {
      mobileTerminalOutput.value.scrollTop = mobileTerminalOutput.value.scrollHeight
    }
  })
}

const processMobileCommand = (command: string): string => {
  const cmd = command.toLowerCase()
  
  switch(cmd) {
    case 'help':
      return 'Available commands: help, status, skills, clear, date, whoami, ls, cat'
    case 'status':
      return 'All systems operational. Security status: GREEN'
    case 'skills':
      return 'JavaScript, Python, React, Node.js, MongoDB, AWS, Docker, Cybersecurity'
    case 'clear':
      setTimeout(() => {
        mobileTerminalLines.splice(0, mobileTerminalLines.length)
        mobileTerminalLines.push('<span class="terminal-prompt">root@classified:~$</span> <span class="blinking-cursor"></span>')
      }, 100)
      return ''
    case 'date':
      return new Date().toString()
    case 'whoami':
      return 'Agent [REDACTED] - Full-Stack Developer'
    case 'ls':
      return 'projects/ skills/ contacts/ classified/'
    case 'cat classified/mission.txt':
      return 'Mission: Create innovative web solutions. Status: IN PROGRESS'
    default:
      return `Command not found: ${command}`
  }
}

// Watch for changes in about data
watch(() => about.value?.name, (newName) => {
  if (!scrambleInterval.value) {
    currentDisplayName.value = newName ? encryptName(newName) : 'Agent [REDACTED]'
  }
}, { immediate: true })

// Event handlers
const handleSystemReady = () => {
  systemInitialized.value = true
  playSound('systemReady')
  fetchAbout()
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = '👤'
  }
}

const handleToggleSound = (enabled: boolean) => {
  soundEnabled.value = enabled
  playSound(enabled ? 'click' : 'beep')
}

const handleWindowOpen = (type: WindowType) => {
  // Close command center when opening a window
  showCommandCenter.value = false
  openWindow(type)
}

const getWindowIcon = (windowType: string) => {
  const icons: Record<string, string> = {
    about: '👤',
    projects: '📁',
    resume: '📄',
    contact: '📧',
    terminal: '💻'
  }
  return icons[windowType] || '🪟'
}

const getWindowName = (windowType: string) => {
  const names: Record<string, string> = {
    about: 'PERSONNEL',
    projects: 'CASE FILES',
    resume: 'SERVICE RECORD',
    contact: 'SECURE COMM',
    terminal: 'TERMINAL'
  }
  return names[windowType] || windowType.toUpperCase()
}

// Check if mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Listen for resize events
window.addEventListener('resize', checkMobile)

// Glitch effect interval
  onMounted(async () => {
    await Promise.all([
      fetchAbout(),
      fetchContact()
    ]);
    if (about.value?.name) {
      currentDisplayName.value = encryptName(about.value.name);
    }
    
    // Check mobile on mount
    checkMobile()
    initKonamiCode();
    
    // Initialize time and weather
    updateTime()
    fetchWeather()
    
    // Update time every second
    setInterval(updateTime, 1000)
    
    // Update weather every 10 minutes
    setInterval(fetchWeather, 600000)
    
    setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch')
    glitchElements.forEach(el => {
      if (Math.random() < 0.1) {
        (el as HTMLElement).style.animation = 'none'
        setTimeout(() => {
          (el as HTMLElement).style.animation = 'glitch 2s infinite'
        }, 100)
      }
    })
  }, 5000)
})
</script>


<style scoped>
/* Mobile Layout Styles (≤768px) */
@media (max-width: 768px) {
  .desktop-layout {
    display: none;
  }
  
  .mobile-layout {
    display: block;
  }
}

@media (min-width: 769px) {
  .mobile-layout {
    display: none;
  }
  
  .desktop-layout {
    display: block;
  }
}

/* Mobile Header */
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-bottom: 2px solid var(--accent-cyan);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
}

.mobile-logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.2em;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-header-center {
  text-align: center;
  font-size: 0.8em;
}

.mobile-weather {
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.mobile-time {
  color: var(--accent-green);
  font-family: 'Share Tech Mono', monospace;
}

.mobile-header-right {
  display: flex;
  gap: 10px;
  align-items: center;
}

.mobile-sound-toggle,
.mobile-hamburger {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9em;
  transition: all 0.3s ease;
}

.mobile-sound-toggle:hover,
.mobile-hamburger:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

/* Mobile Drawer */
.mobile-drawer {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100vh;
  background: var(--window-bg);
  border-left: 2px solid var(--accent-cyan);
  z-index: 200;
  transition: right 0.3s ease;
  backdrop-filter: blur(15px);
  box-shadow: -5px 0 20px rgba(0, 255, 255, 0.3);
}

.mobile-drawer.open {
  right: 0;
}

.mobile-nav {
  padding: 100px 30px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mobile-nav-btn {
  display: block;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 15px 20px;
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.mobile-nav-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transform: translateX(-5px);
}

/* Mobile Main Content */
.mobile-main {
  margin-top: 80px;
  position: relative;
  z-index: 2;
}

.mobile-section {
  min-height: 100vh;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.mobile-section-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 2em;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  text-shadow: 0 0 20px var(--accent-cyan);
}

.mobile-hero {
  background: radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 50%);
}

/* Mobile Photo Card - Matching Desktop Style */
.mobile-agent-profile {
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.mobile-agent-card {
  perspective: 1000px;
  margin-bottom: 30px;
}

.mobile-photo-card {
  width: 280px;
  height: 350px;
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

.mobile-photo-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 
    0 35px 70px rgba(0, 0, 0, 0.5),
    0 0 0 2px var(--accent-cyan),
    inset 0 1px 0 rgba(0, 255, 255, 0.3);
}

.mobile-photo-frame {
  width: 180px;
  height: 220px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    inset 0 0 0 2px rgba(0, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.mobile-photo-frame:hover {
  transform: scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    inset 0 0 0 2px var(--accent-cyan);
}

.mobile-photo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(0.8);
  transition: all 0.3s ease;
}

.mobile-photo-frame:hover .mobile-photo-image {
  filter: contrast(1.2) saturate(1.0) brightness(1.1);
}

.mobile-photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  background: rgba(0, 255, 255, 0.1);
}

.mobile-photo-frame::before {
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

.mobile-agent-info {
  text-align: center;
}

.mobile-agent-name {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.4em;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.mobile-agent-title {
  color: var(--text-secondary);
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-classification {
  color: var(--danger-red);
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

.mobile-terminal {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 20px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  margin: 20px 0;
  text-align: left;
  width: 100%;
  max-width: 500px;
}

.mobile-bio {
  line-height: 1.8;
  font-size: 1em;
  max-width: 500px;
  margin: 20px auto 0;
  color: var(--text-secondary);
}

/* Mobile Skills */
.mobile-skills-container {
  max-width: 600px;
  width: 100%;
}

.mobile-skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.mobile-skill-category {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}

.mobile-skill-category h4 {
  color: var(--accent-green);
  margin-bottom: 15px;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
}

.mobile-skill-list {
  list-style: none;
  padding: 0;
}

.mobile-skill-list li {
  margin-bottom: 8px;
  color: var(--text-secondary);
}

/* Mobile Projects */
.mobile-projects-container {
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mobile-project-card {
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 31, 63, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.mobile-project-card:hover {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  transform: translateY(-5px);
}

.mobile-project-header {
  background: rgba(0, 255, 255, 0.1);
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
}

.mobile-project-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.1em;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.mobile-project-classification {
  color: var(--danger-red);
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-project-content {
  padding: 20px;
}

/* Mobile Contact */
.mobile-contact-container {
  max-width: 500px;
  width: 100%;
}

.mobile-warning {
  color: var(--danger-red);
  font-size: 0.9em;
  margin-bottom: 20px;
  text-align: center;
}

.mobile-contact-form {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  padding: 30px;
  backdrop-filter: blur(10px);
  margin-bottom: 30px;
}

.mobile-form-group {
  margin-bottom: 20px;
}

.mobile-form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--accent-cyan);
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  font-size: 0.9em;
}

.mobile-form-input,
.mobile-form-textarea {
  width: 100%;
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 3px;
}

.mobile-form-input:focus,
.mobile-form-textarea:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.mobile-submit-btn {
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

.mobile-submit-btn:hover:not(:disabled) {
  background: var(--accent-green);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.mobile-submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.mobile-contact-info {
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  text-align: center;
}

.mobile-contact-info h4 {
  color: var(--accent-green);
  margin-bottom: 15px;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
}

.mobile-contact-info p {
  margin-bottom: 8px;
  color: var(--text-secondary);
}

/* Glitch effect for mobile */
.glitch {
  animation: glitch 2s infinite;
}

@keyframes glitch {
  0%, 90%, 100% { transform: translate(0); }
  91% { transform: translate(-1px, 1px); }
  92% { transform: translate(1px, -1px); }
  93% { transform: translate(-1px, 1px); }
}

/* Terminal effects */
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

/* Desktop styles remain unchanged */
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

:root {
  --bg-primary: #0A0F1F;
  --bg-secondary: #001F3F;
  --accent-cyan: #00FFFF;
  --accent-green: #00FF41;
  --text-primary: #E0E0E0;
  --text-secondary: #A0A0A0;
  --border-glow: #00FFFF;
  --window-bg: rgba(0, 31, 63, 0.95);
  --danger-red: #FF0040;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Share Tech Mono', monospace;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
  cursor: crosshair;
}

#app {
  min-height: 100vh;
}

.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1;
  animation: scanlineMove 3s linear infinite;
}

@keyframes scanlineMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}

/* Desktop styles remain unchanged */
.desktop-layout {
  display: block;
}

.mobile-layout {
  display: none;
}

.main-interface {
  min-height: 100vh;
  position: relative;
  z-index: 2;
  padding-bottom: 60px; /* Space for taskbar on desktop */
}

@media (max-width: 768px) {
  .main-interface {
    padding-bottom: 0; /* No taskbar on mobile */
  }
}

.header {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-bottom: 2px solid var(--accent-cyan);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  z-index: 200;
}

@media (max-width: 768px) {
  .taskbar {
    display: none;
  }
}

/* Mobile Content Styles */
.mobile-content {
  padding-top: 80px;
  min-height: 100vh;
}

.mobile-command-center {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: var(--window-bg);
  border-bottom: 2px solid var(--accent-cyan);
  padding: 20px;
  z-index: 150;
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 20px rgba(0, 255, 255, 0.3);
}

.mobile-command-center h3 {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-nav-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-nav-btn {
  display: block;
  width: 100%;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 12px 15px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 3px;
}

.mobile-nav-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.mobile-section {
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.mobile-section-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 2em;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  text-shadow: 0 0 20px var(--accent-cyan);
}

.mobile-hero {
  background: radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 50%);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.agent-profile-mobile {
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.welcome-text-mobile {
  margin: 30px 0;
}

.welcome-text-mobile h1 {
  font-size: clamp(1.8rem, 6vw, 2.5rem);
  font-family: 'Orbitron', monospace;
  color: var(--text-primary);
  margin-bottom: 15px;
  line-height: 1.2;
}

.welcome-text-mobile h2 {
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-family: 'Orbitron', monospace;
  color: var(--text-secondary);
  font-weight: 400;
}

.mobile-terminal {
  margin: 30px 0;
  max-width: 100%;
}

.mobile-projects-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
}

.mobile-project-card {
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 31, 63, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.mobile-project-card:hover {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  transform: translateY(-2px);
}

.mobile-skills-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
}

.mobile-skill-category {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}

.mobile-skill-category h4 {
  color: var(--accent-green);
  margin-bottom: 15px;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
}

.skill-list {
  list-style: none;
  padding: 0;
}

.skill-list li {
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.mobile-contact-container {
  width: 100%;
  max-width: 400px;
}

.mobile-contact-form {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.mobile-contact-form .form-group {
  margin-bottom: 15px;
}

.mobile-contact-form .form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--accent-cyan);
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  font-size: 0.8em;
}

.mobile-contact-form .form-input,
.mobile-contact-form .form-textarea {
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 3px;
  font-size: 0.9em;
}

.mobile-contact-form .form-textarea {
  resize: vertical;
}

.mobile-contact-form .submit-btn {
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
  font-size: 0.9em;
}

.mobile-contact-form .submit-btn:hover:not(:disabled) {
  background: var(--accent-green);
  box-shadow: 0 0 10px var(--accent-cyan);
}

.mobile-contact-form .submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Mobile Header Layout */
.header-mobile {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
}

.header-top {
  display: flex;
  justify-content: flex-start;
}

.logo-mobile {
  font-family: 'Orbitron', monospace;
  font-size: 1.2em;
  font-weight: 700;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-middle {
  display: flex;
  justify-content: center;
  flex: 1;
}

.weather-time-widget {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85em;
  color: var(--text-primary);
  background: rgba(0, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 3px;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.weather-location {
  color: var(--text-secondary);
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.current-time {
  color: var(--accent-green);
  font-weight: bold;
  min-width: 45px;
}

.header-bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.mobile-menu-btn {
  background: transparent;
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 8px;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.3s ease;
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-btn:hover {
  background: rgba(0, 255, 255, 0.2);
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  width: 18px;
  height: 12px;
  justify-content: space-between;
}

.hamburger-icon span {
  display: block;
  height: 2px;
  width: 100%;
  background: var(--accent-cyan);
  transition: all 0.3s ease;
}

.hamburger-icon.active span:nth-child(1) {
  transform: rotate(45deg) translate(3px, 3px);
}

.hamburger-icon.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-icon.active span:nth-child(3) {
  transform: rotate(-45deg) translate(3px, -3px);
}

.header-desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.5em;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.status-panel {
  display: flex;
  gap: 20px;
  align-items: center;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9em;
}

.audio-toggle-container {
  margin-left: 10px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-green);
  box-shadow: 0 0 5px var(--accent-green);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.glitch {
  animation: glitch 2s infinite;
}

@keyframes glitch {
  0%, 90%, 100% { transform: translate(0); }
  91% { transform: translate(-2px, 1px); }
  92% { transform: translate(2px, -1px); }
  93% { transform: translate(-1px, 2px); }
}

/* Mobile Styles (≤768px) */
@media (max-width: 768px) {
  .desktop-layout {
    display: none;
  }
  
  .mobile-layout {
    display: block;
  }
  
  /* Mobile Header */
  .mobile-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: var(--window-bg);
    border-bottom: 2px solid var(--accent-cyan);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 1000;
    backdrop-filter: blur(15px);
  }
  
  .mobile-logo {
    font-family: 'Orbitron', monospace;
    font-size: 1.2em;
    color: var(--accent-cyan);
    margin: 0;
  }
  
  .mobile-system-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7em;
    color: var(--text-secondary);
  }
  
  .mobile-weather,
  .mobile-location,
  .mobile-time {
    margin: 1px 0;
  }
  
  .mobile-header-right {
    display: flex;
    gap: 10px;
  }
  
  .mobile-sound-toggle,
  .mobile-hamburger {
    background: transparent;
    border: 1px solid var(--accent-cyan);
    color: var(--text-primary);
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 3px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1em;
    transition: background 0.3s ease;
  }
  
  .mobile-sound-toggle:hover,
  .mobile-hamburger:hover {
    background: rgba(0, 255, 255, 0.2);
  }
  
  /* Command Drawer */
  .command-drawer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .command-drawer.open {
    pointer-events: all;
    opacity: 1;
  }
  
  .drawer-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .drawer-content {
    position: absolute;
    top: 0;
    right: 0;
    width: 280px;
    height: 100%;
    background: var(--window-bg);
    border-left: 2px solid var(--accent-cyan);
    padding: 80px 20px 20px;
    backdrop-filter: blur(15px);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  
  .command-drawer.open .drawer-content {
    transform: translateX(0);
  }
  
  .drawer-content h3 {
    font-family: 'Orbitron', monospace;
    color: var(--accent-cyan);
    margin-bottom: 30px;
    text-align: center;
    font-size: 1.1em;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .drawer-nav {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .drawer-link {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: rgba(0, 255, 255, 0.1);
    border: 1px solid var(--accent-cyan);
    color: var(--text-primary);
    text-decoration: none;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9em;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  
  .drawer-link:hover {
    background: rgba(0, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    transform: translateX(5px);
  }
  
  .drawer-link i {
    font-size: 1.2em;
    color: var(--accent-cyan);
  }
  
  /* Mobile Content */
  .mobile-content {
    margin-top: 70px;
    padding-bottom: 20px;
  }
  
  .mobile-section {
    min-height: 100vh;
    padding: 40px 20px;
    border-bottom: 2px solid rgba(0, 255, 255, 0.3);
  }
  
  .mobile-section:last-child {
    border-bottom: none;
  }
  
  .section-content {
    max-width: 100%;
    margin: 0 auto;
  }
  
  .section-title {
    font-family: 'Orbitron', monospace;
    color: var(--accent-cyan);
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.3em;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  /* About Section */
  .mobile-photo-card {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .agent-avatar {
    width: 200px;
    height: 200px;
    border: 3px solid var(--accent-cyan);
    border-radius: 50%;
    margin: 0 auto 20px;
    background: rgba(0, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
  }
  
  .agent-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .avatar-placeholder {
    color: var(--accent-cyan);
  }
  
  .agent-info {
    margin-top: 20px;
  }
  
  .agent-name {
    font-family: 'Orbitron', monospace;
    color: var(--accent-cyan);
    margin-bottom: 10px;
    font-size: 1.4em;
  }
  
  .agent-title {
    color: var(--text-secondary);
    font-family: 'Share Tech Mono', monospace;
    font-size: 1em;
  }
  
  .mobile-terminal {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid var(--accent-green);
    border-radius: 8px;
    padding: 20px;
    font-family: 'Share Tech Mono', monospace;
    color: var(--accent-green);
    margin-top: 30px;
  }
  
  .terminal-header {
    color: var(--accent-cyan);
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .terminal-content .terminal-line {
    margin-bottom: 8px;
    font-size: 0.9em;
  }
  
  .terminal-prompt {
    color: var(--accent-cyan);
  }
  
  .mission-brief {
    margin-top: 10px;
    padding: 10px;
    background: rgba(0, 255, 255, 0.1);
    border-radius: 3px;
    line-height: 1.5;
  }
  
  /* Skills Section */
  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  
  .skill-category {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 8px;
    padding: 20px;
  }
  
  .skill-category h3 {
    color: var(--accent-green);
    font-family: 'Orbitron', monospace;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .skill-items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .skill-tag {
    background: rgba(0, 255, 255, 0.1);
    border: 1px solid var(--accent-cyan);
    color: var(--text-primary);
    padding: 8px 12px;
    border-radius: 15px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8em;
    transition: all 0.3s ease;
  }
  
  .skill-tag:hover {
    background: rgba(0, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
  
  /* Projects Section */
  .mobile-projects {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  
  .project-card {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 8px;
    padding: 20px;
    transition: all 0.3s ease;
  }
  
  .project-card:hover {
    border-color: var(--accent-cyan);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  }
  
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .project-header h3 {
    font-family: 'Orbitron', monospace;
    color: var(--accent-cyan);
    font-size: 1.1em;
    margin: 0;
  }
  
  .classification {
    background: var(--danger-red);
    color: white;
    padding: 4px 8px;
    border-radius: 3px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .project-brief {
    color: var(--text-secondary);
    margin-bottom: 15px;
    line-height: 1.5;
  }
  
  .project-tech {
    font-family: 'Share Tech Mono', monospace;
    color: var(--accent-green);
    font-size: 0.9em;
    margin-bottom: 10px;
  }
  
  .project-status {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  
  .project-status.success {
    color: var(--accent-green);
  }
  
  .project-status.active {
    color: var(--accent-cyan);
  }
  
  /* Contact Section */
  .contact-warning {
    color: var(--danger-red);
    text-align: center;
    font-size: 0.9em;
    margin-bottom: 30px;
    font-family: 'Share Tech Mono', monospace;
  }
  
  .mobile-contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    color: var(--accent-cyan);
    margin-bottom: 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9em;
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 12px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid var(--accent-cyan);
    color: var(--text-primary);
    font-family: 'Share Tech Mono', monospace;
    border-radius: 3px;
    font-size: 1em;
    box-sizing: border-box;
  }
  
  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .mobile-submit-btn {
    padding: 15px;
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
    font-size: 1em;
  }
  
  .mobile-submit-btn:hover:not(:disabled) {
    background: var(--accent-green);
    box-shadow: 0 0 15px var(--accent-cyan);
  }
  
  .mobile-submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .mobile-contact-info {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 8px;
    padding: 20px;
  }
  
  .mobile-contact-info h4 {
    color: var(--accent-green);
    margin-bottom: 15px;
    font-family: 'Orbitron', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .contact-method {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-secondary);
    font-family: 'Share Tech Mono', monospace;
  }
  
  .contact-method i {
    color: var(--accent-cyan);
    width: 20px;
  }
  
  /* Terminal Section */
  .terminal-section {
    background: rgba(0, 0, 0, 0.2);
  }
  
  .mobile-terminal-container {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid var(--accent-green);
    border-radius: 8px;
    padding: 20px;
    font-family: 'Share Tech Mono', monospace;
    color: var(--accent-green);
  }
  
  .mobile-terminal-output {
    min-height: 200px;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 15px;
    padding-right: 10px;
  }
  
  .mobile-terminal-output::-webkit-scrollbar {
    width: 6px;
  }
  
  .mobile-terminal-output::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }
  
  .mobile-terminal-output::-webkit-scrollbar-thumb {
    background-color: var(--accent-green);
    border-radius: 3px;
  }
  
  .mobile-terminal-output .terminal-line {
    margin-bottom: 5px;
    word-wrap: break-word;
    font-size: 0.9em;
  }
  
  .mobile-terminal-output .terminal-prompt {
    color: var(--accent-cyan);
  }
  
  .mobile-terminal-output .blinking-cursor::after {
    content: '█';
    animation: blink 1s infinite;
  }
  
  .mobile-terminal-input {
    width: 100%;
    padding: 12px;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid var(--accent-green);
    color: var(--accent-green);
    font-family: 'Share Tech Mono', monospace;
    border-radius: 3px;
    font-size: 1em;
    box-sizing: border-box;
  }
  
  .mobile-terminal-input:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .header {
    padding: 12px 20px;
  }
  
  .header-mobile {
    gap: 10px;
  }
  
  .weather-time-widget {
    font-size: 0.8em;
  }


  .status-panel {
    gap: 10px;
  }
  
  .status-item {
    font-size: 0.8em;
  }
  
  .logo-mobile {
    font-size: 1.1em;
  }
}

/* Mobile Command Center Drawer */
.mobile-command-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 300;
  backdrop-filter: blur(10px);
}

.drawer-content {
  position: absolute;
  top: 80px;
  right: 0;
  width: 280px;
  height: calc(100vh - 80px);
  background: var(--window-bg);
  border-left: 2px solid var(--accent-cyan);
  padding: 20px;
  box-shadow: -10px 0 30px rgba(0, 255, 255, 0.3);
}

.drawer-content h3 {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  margin-bottom: 20px;
  text-align: center;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 15px;
  text-decoration: none;
  border-radius: 5px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  transform: translateX(-5px);
}

.nav-icon {
  font-size: 1.2em;
}

/* Mobile Single Page Sections */
.mobile-content {
  width: 100%;
}

.mobile-section {
  min-height: 100vh;
  padding: 40px 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-content {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.section-title {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 2em;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  text-shadow: 0 0 20px var(--accent-cyan);
}

/* Mobile Photo Card */
.mobile-photo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.photo-frame-mobile {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-cyan);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  margin-bottom: 20px;
  background: var(--bg-primary);
}

.agent-photo-mobile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder-mobile {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  color: var(--accent-cyan);
}

.agent-info-mobile {
  text-align: center;
}

.agent-name-mobile {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 1.5em;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.agent-title-mobile {
  color: var(--text-secondary);
  font-size: 1.1em;
  margin-bottom: 0;
}

/* Mobile Terminal */
.mobile-terminal {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  padding: 20px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  margin-top: 20px;
}

.mobile-terminal .terminal-line {
  margin-bottom: 8px;
  line-height: 1.4;
}

.mobile-terminal .terminal-prompt {
  color: var(--accent-cyan);
}

.mobile-terminal .content-text {
  color: var(--accent-green);
  white-space: pre-wrap;
  line-height: 1.6;
}

/* Mobile Projects */
.mobile-projects {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mobile-project-card {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  padding: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.mobile-project-card:hover {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  transform: translateY(-2px);
}

.mobile-project-card h3 {
  color: var(--accent-cyan);
  font-family: 'Orbitron', monospace;
  margin-bottom: 10px;
  font-size: 1.2em;
}

.project-classification {
  color: var(--danger-red);
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.project-tech {
  color: var(--accent-green);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9em;
  margin-top: 10px;
}

/* Mobile Resume */
.skills-grid-mobile {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
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

.skill-category ul {
  list-style: none;
  padding: 0;
}

.skill-category li {
  margin-bottom: 8px;
  color: var(--text-secondary);
}

/* Mobile Contact */
.warning-mobile {
  color: var(--danger-red);
  font-size: 0.9em;
  margin-bottom: 20px;
  text-align: center;
}

.mobile-contact-form {
  background: rgba(0, 31, 63, 0.3);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.mobile-contact-form .form-group {
  margin-bottom: 15px;
}

.mobile-contact-form .form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--accent-cyan);
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  font-size: 0.8em;
}

.form-input-mobile,
.form-textarea-mobile {
  width: 100%;
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  font-family: 'Share Tech Mono', monospace;
  border-radius: 3px;
  font-size: 0.9em;
}

.form-textarea-mobile {
  resize: vertical;
}

.submit-btn-mobile {
  width: 100%;
  padding: 15px;
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
  font-size: 0.9em;
}

.submit-btn-mobile:hover:not(:disabled) {
  background: var(--accent-green);
  box-shadow: 0 0 10px var(--accent-cyan);
}

.submit-btn-mobile:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Mobile Terminal Container */
.mobile-terminal-container {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-green);
  border-radius: 5px;
  overflow: hidden;
}

.mobile-terminal-output {
  padding: 20px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  max-height: 300px;
  overflow-y: auto;
}

.mobile-terminal-output .terminal-line {
  margin-bottom: 5px;
  word-wrap: break-word;
}

.mobile-terminal-output .terminal-prompt {
  color: var(--accent-cyan);
}

.mobile-terminal-output .blinking-cursor::after {
  content: '█';
  animation: blink 1s infinite;
}

.mobile-terminal-input-container {
  border-top: 1px solid var(--accent-green);
}

.mobile-terminal-input {
  width: 100%;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.9);
  border: none;
  color: var(--accent-green);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9em;
}

.mobile-terminal-input:focus {
  outline: none;
  background: rgba(0, 0, 0, 1);
}

.welcome-landing {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: auto;
  max-width: 90vw;
}

.landing-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 120px;
}

.welcome-text {
  text-align: left;
  flex: 1;
  min-width: 300px;
}


.welcome-text h1 {
  font-size: clamp(2rem, 8vw, 4rem);
  font-family: 'Orbitron', monospace;
  color: var(--text-primary);
  margin-bottom: 20px;
  line-height: 1.2;
}

.welcome-text h2 {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-family: 'Orbitron', monospace;
  color: var(--text-secondary);
  font-weight: 400;
}

.name-cipher {
  color: var(--accent-cyan);
  cursor: pointer;
  text-shadow: 0 0 10px var(--accent-cyan);
  position: relative;
  display: inline-block;
}

.name-cipher:hover {
  color: var(--accent-green);
  text-shadow: 0 0 15px var(--accent-green);
}

.scramble-text {
  display: inline-block;
  font-family: 'Share Tech Mono', monospace;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.scramble-cursor {
  display: inline-block;
  width: 0.5em;
  animation: blink 1s step-end infinite;
  opacity: 1;
  color: var(--accent-cyan);
  transition: opacity 0.3s ease;
}

.scramble-cursor.cursor-hidden {
  opacity: 0;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.role {
  color: var(--accent-cyan);
  text-shadow: 0 0 5px var(--accent-cyan);
}

.id-card-container {
  perspective: 1000px;
}
.card-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* W3.CSS card style */
.id-card.card-w3.card-example {
  width: min(370px, 90vw);
  min-height: min(420px, 60vh);
  background: var(--bg-secondary);
  border: none;
  border-radius: 2px;
  box-shadow: 4px 8px 16px 0 rgba(0,0,0,0.3);
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s;
}

.id-card:hover {
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  transform: translateY(-5px);
}

.id-card.dangling {
  animation: dangle 1s ease-in-out;
}

@keyframes dangle {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(-3deg); }
  75% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
}

.card-header {
  background: transparent;
  color: var(--text-primary);
  padding: 22px 0 10px 0;
  text-align: center;
  border-radius: 0;
  width: 100%;
}

.card-title {
  font-family: Arial, sans-serif;
  font-weight: 400;
  font-size: 2em;
  letter-spacing: 0;
  color: var(--text-primary);
}

.security-level {
  font-size: 0.8em;
  margin-top: 5px;
  color: var(--danger-red);
  font-weight: bold;
}

.card-content {
  padding: 0 0 0 0;
  text-align: center;
  width: 100%;
}

.agent-photo.agent-photo-square {
  width: min(90%, 280px);
  height: min(220px, 25vh);
  border: none;
  border-radius: 0;
  margin: 0 auto 0 auto;
  background: var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-shadow: none;
}
.agent-image.agent-image-square {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 0;
  background: #4682a9;
}
.photo-placeholder.photo-placeholder-square {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5em;
  color: #222;
  background: #4682a9;
}

.agent-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.agent-photo:hover .agent-image {
  transform: scale(1.1);
}

.photo-placeholder {
  font-size: 3em;
  color: var(--accent-cyan);
}

.agent-info {
  font-family: 'Share Tech Mono', monospace;
  margin-bottom: 0;
}

.agent-name {
  font-size: 1.2em;
  color: #fff;
  margin-bottom: 0;
  font-weight: bold;
}

.agent-role {
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 0.9em;
}

.agent-info.agent-info-centered {
  font-family: Arial, sans-serif;
  margin: 18px 0 0 0;
}
.agent-name.agent-name-white {
  font-size: 1.3em;
  color: var(--text-primary);
  margin-bottom: 0;
  font-weight: normal;
  margin-top: 15px;
  min-height: 36px;
}

.social-button {
  width: 36px;
  height: 36px;
  border: 1px solid var(--accent-cyan);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-cyan);
  background: rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
  font-size: 1.1em;
  text-decoration: none;
  position: relative; /* For debugging */
  z-index: 10; /* Ensure buttons are above other elements */
}
.social-button.prominent {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border: 2px solid var(--accent-cyan);
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,255,255,0.2);
}
.social-button.prominent:hover {
  background: var(--accent-green);
  color: var(--bg-primary);
  border-color: var(--accent-green);
}
.social-button:hover {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

.card-footer {
  background: #333;
  padding: 15px 0;
  border-radius: 0 0 8px 8px;
  border-top: 1px solid #444;
  width: 100%;
}

.clearance {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  color: var(--accent-green);
  text-align: center;
  letter-spacing: 1px;
}

/* Taskbar Styles */
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-top: 2px solid var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 200;
  box-shadow: 0 -2px 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.taskbar-left {
  display: flex;
  align-items: center;
}

.start-button {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.start-button:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.start-icon {
  font-size: 1.2em;
}

.taskbar-center {
  display: flex;
  align-items: center;
  gap: 20px;
}

.minimized-windows {
  display: flex;
  gap: 10px;
  align-items: center;
}

.minimized-window-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 120px;
}

.minimized-window-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.window-icon {
  font-size: 1em;
}

.window-name {
  font-size: 0.8em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.system-info {
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
}

.agent-id {
  color: var(--accent-cyan);
  font-weight: bold;
}

.status-indicator {
  color: var(--accent-green);
  position: relative;
}

.status-indicator::before {
  content: '●';
  margin-right: 5px;
  animation: pulse 2s infinite;
}

.taskbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.weather-widget {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  color: var(--text-primary);
}

.weather-icon {
  font-size: 1.2em;
}

.weather-temp {
  color: var(--accent-cyan);
  font-weight: bold;
}

.weather-location {
  color: var(--text-secondary);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time-widget {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1em;
  color: var(--accent-green);
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

/* Mobile Responsive */
@media (max-width: 768px) {  
  .taskbar {
    position: fixed;
    bottom: 0;
    top: auto;
    height: 50px;
    padding: 0 15px;
  }
  
  .minimized-windows {
    display: none; /* Hide on mobile to save space */
  }
  
  .main-interface {
    padding-top: 70px;
    padding-bottom: 50px;
  }
  
  .start-text {
    display: none;
  }
  
  .weather-location {
    max-width: 80px;
    font-size: 0.7em;
  }
  
  .taskbar-right {
    gap: 15px;
  }
  
  .weather-widget {
    font-size: 0.7em;
    gap: 5px;
  }
  
.card-actions.card-actions-row.contact-icons-row {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 18px 0 0 0;
}
.contact-icon-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.7em;
  color: var(--accent-cyan);
  background: rgba(0,255,255,0.08);
  border: 2px solid var(--accent-cyan);
  transition: background 0.2s, color 0.2s, border 0.2s;
  text-decoration: none;
}
.contact-icon-btn.email:hover {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border-color: var(--accent-cyan);
}
.contact-icon-btn.linkedin {
  color: #0a66c2;
  border-color: #0a66c2;
}
.contact-icon-btn.linkedin:hover {
  background: #0a66c2;
  color: #fff;
}
.contact-icon-btn.github {
  color: #fff;
  border-color: #fff;
}
.contact-icon-btn.github:hover {
  background: #fff;
  color: #222;
}
.social-links-rect {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
  min-height: 36px;
}
.social-button-rect {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #555;
  color: #fff;
  border-radius: 4px;
  padding: 6px 14px;
  font-size: 1em;
  text-decoration: none;
  border: 1px solid #888;
  transition: background 0.2s, color 0.2s;
  font-family: 'Share Tech Mono', monospace;
}
.social-button-rect:hover {
  background: #00FFFF;
  color: #222;
  border-color: #00FFFF;
}

@media (max-width: 600px) {
  .landing-content {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }
  
  .welcome-text {
    text-align: center;
    min-width: auto;
  }
  
  .card-container {
    margin-left: 0;
  }
  
  .welcome-landing {
    top: 60%;
  }
}

@media (max-width: 480px) {
  .photo-card {
    width: 350px;
    height: 500px;
    padding: 25px;
  }
  
  .photo-frame {
    width: 240px;
    height: 300px;
  }
  
  .card-title {
    font-size: 20px;
  }
  
  .weather-temp {
    font-size: 0.9em;
  }
  
  .time-widget {
    font-size: 0.9em;
    min-width: 50px;
  }
}
}
.mission-briefing h3 {
  color: var(--accent-green);
  font-family: 'Orbitron', monospace;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.mission-briefing p {
  line-height: 1.6;
  margin-bottom: 20px;
  color: var(--text-secondary);
}

.briefing-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .central-display {
    padding: 20px;
    gap: 20px;
  }
  
  .holo-container {
    width: 300px;
    height: 300px;
  }
  
  .data-node {
    width: 50px;
    height: 50px;
  }
  
  .node-icon {
    font-size: 1em;
  }
  
  .node-label {
    font-size: 0.5em;
  }
  
  .status-line {
    min-width: 250px;
  }
  
  .mission-briefing {
    max-width: 90vw;
    padding: 20px;
  }
  
  .briefing-actions {
    flex-direction: column;
  }
}

.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-top: 2px solid var(--accent-cyan);
  padding: 10px 20px;
  z-index: 150;
  box-shadow: 0 -2px 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.taskbar-items {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.taskbar-item {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  animation: taskbarSlideIn 0.3s ease-out;
}

.taskbar-item:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transform: translateY(-2px);
}

@keyframes taskbarSlideIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}



/* Card container and card styles from provided HTML/CSS */
.card-container {
  perspective: 1000px;
  flex: 0 0 auto;
  margin-left: auto;
}

/* Card overrides for portfolio theme */
.photo-card {
  width: 400px;
  height: 550px;
  background: var(--bg-secondary);
  border-radius: 25px;
  box-shadow: 0 25px 50px rgba(0, 255, 255, 0.08), 0 0 0 1px var(--accent-cyan), inset 0 1px 0 rgba(0,255,255,0.05);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid var(--accent-cyan);
  cursor: pointer;
}
.photo-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 0 35px 70px rgba(0,255,255,0.12), 0 0 0 1px var(--accent-cyan), inset 0 1px 0 rgba(0,255,255,0.08);
}
.photo-frame {
  width: 280px;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  margin-bottom: 30px;
  box-shadow: 0 15px 35px rgba(0,255,255,0.08), inset 0 0 0 3px var(--accent-cyan);
  transition: all 0.3s ease;
  background: var(--bg-primary);
}
.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(1.1);
  transition: all 0.3s ease;
}
.photo-frame:hover img {
  filter: contrast(1.2) saturate(1.2) brightness(1.05);
}
.photo-placeholder-rect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5em;
  color: var(--accent-cyan);
  background: var(--bg-primary);
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
  color: var(--accent-cyan);
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
  text-shadow: 0 2px 4px rgba(0,255,255,0.08);
}
.card-subtitle {
  font-size: 16px;
  font-weight: 300;
  color: var(--text-secondary);
  margin-bottom: 20px;
  letter-spacing: 1px;
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
  background: rgba(0,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--accent-cyan);
}
.social-icon:hover {
  background: var(--accent-cyan);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,255,255,0.18);
}
.social-icon svg {
  width: 20px;
  height: 20px;
  fill: var(--accent-cyan);
}
.social-icon:hover svg {
  fill: var(--bg-primary);
}
.floating {
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@media (max-width: 480px) {
  .photo-card {
    width: 350px;
    height: 500px;
    padding: 25px;
  }
  .photo-frame {
    width: 240px;
    height: 300px;
  }
  .card-title {
    font-size: 20px;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
</style>