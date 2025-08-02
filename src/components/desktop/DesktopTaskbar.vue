<template>
  <div class="taskbar">
    <!-- Start Button (Left) -->
    <div class="taskbar-left">
      <button 
        class="start-button" 
        @click="$emit('toggle-command-center')"
        :class="{ active: commandCenterOpen }"
      >
        <span class="start-icon">⚡</span>
        <span class="start-text">START</span>
      </button>
    </div>
    
    <!-- Minimized Windows (Center) -->
    <div class="taskbar-center">
      <button
        v-for="(isMinimized, windowType) in minimizedWindows"
        :key="windowType"
        v-show="isMinimized"
        class="taskbar-btn"
        @click="$emit('restore-window', windowType)"
      >
        <span class="window-icon">{{ getWindowIcon(windowType) }}</span>
        <span class="window-title">{{ getWindowTitle(windowType) }}</span>
      </button>
    </div>
    
    <!-- System Info (Right) -->
    <div class="taskbar-right">
      <div class="weather-info" v-if="weatherData.temperature">
        <span class="weather-icon">{{ weatherData.icon }}</span>
        <span class="temperature">{{ weatherData.temperature }}°{{ weatherData.unit }}</span>
      </div>
      
      <div class="location-info" v-if="locationData.suburb && locationData.city">
        <span class="location-text">{{ locationData.suburb }}, {{ locationData.city }}</span>
      </div>
      
      <div class="time-info">
        <span class="current-time">{{ currentTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

defineProps<{
  minimizedWindows: Record<string, boolean>
  commandCenterOpen?: boolean
}>()

defineEmits<{
  'restore-window': [windowType: string]
  'toggle-command-center': []
}>()

const currentTime = ref('')
const weatherData = reactive({
  temperature: null as number | null,
  icon: '🌤️',
  unit: 'C',
  condition: ''
})

const locationData = reactive({
  suburb: '',
  city: '',
  country: ''
})

const getWindowIcon = (windowType: string): string => {
  const icons: Record<string, string> = {
    about: '👤',
    projects: '📁',
    resume: '📋',
    contact: '📡',
    terminal: '💻'
  }
  return icons[windowType] || '📄'
}

const getWindowTitle = (windowType: string): string => {
  const titles: Record<string, string> = {
    about: 'PERSONNEL',
    projects: 'CASE FILES',
    resume: 'SERVICE RECORD',
    contact: 'SECURE COMM',
    terminal: 'TERMINAL'
  }
  return titles[windowType] || windowType.toUpperCase()
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getLocationAndWeather = async () => {
  try {
    // Get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          // Get location details using reverse geocoding
          await getLocationDetails(latitude, longitude)
          
          // Get weather data
          await getWeatherData(latitude, longitude)
        },
        (error) => {
          console.log('Location access denied:', error)
          // Fallback to IP-based location
          getLocationByIP()
        }
      )
    } else {
      // Fallback to IP-based location
      getLocationByIP()
    }
  } catch (error) {
    console.error('Error getting location and weather:', error)
    // Set fallback data
    setFallbackData()
  }
}

const getLocationDetails = async (lat: number, lon: number) => {
  try {
    // Using OpenStreetMap Nominatim for reverse geocoding (free, no API key needed)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
    )
    const data = await response.json()
    
    if (data && data.address) {
      locationData.suburb = data.address.suburb || data.address.neighbourhood || data.address.village || ''
      locationData.city = data.address.city || data.address.town || data.address.county || ''
      locationData.country = data.address.country || ''
    }
  } catch (error) {
    console.error('Error getting location details:', error)
  }
}

const getWeatherData = async (lat: number, lon: number) => {
  try {
    // Using OpenWeatherMap API (you can sign up for a free API key)
    // For demo purposes, using a mock weather service or you can replace with actual API
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`
    )
    const data = await response.json()
    
    if (data && data.current_weather) {
      weatherData.temperature = Math.round(data.current_weather.temperature)
      weatherData.unit = 'C'
      
      // Map weather codes to icons
      const weatherCode = data.current_weather.weathercode
      weatherData.icon = getWeatherIcon(weatherCode)
    }
  } catch (error) {
    console.error('Error getting weather data:', error)
    // Use fallback weather data
    weatherData.temperature = 22
    weatherData.icon = '🌤️'
    weatherData.unit = 'C'
  }
}

const getLocationByIP = async () => {
  try {
    // Using ipapi.co for IP-based location (free, no API key needed)
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    if (data) {
      locationData.suburb = data.region || ''
      locationData.city = data.city || ''
      locationData.country = data.country_name || ''
      
      // Get weather for this location
      if (data.latitude && data.longitude) {
        await getWeatherData(data.latitude, data.longitude)
      }
    }
  } catch (error) {
    console.error('Error getting IP location:', error)
    setFallbackData()
  }
}

const getWeatherIcon = (weatherCode: number): string => {
  // Weather code mapping for open-meteo API
  if (weatherCode === 0) return '☀️'
  if (weatherCode <= 3) return '🌤️'
  if (weatherCode <= 48) return '☁️'
  if (weatherCode <= 67) return '🌧️'
  if (weatherCode <= 77) return '🌨️'
  if (weatherCode <= 82) return '🌦️'
  if (weatherCode <= 99) return '⛈️'
  return '🌤️'
}

const setFallbackData = () => {
  locationData.suburb = 'Unknown'
  locationData.city = 'Location'
  weatherData.temperature = 22
  weatherData.icon = '🌤️'
  weatherData.unit = 'C'
}

let timeInterval: NodeJS.Timeout

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  
  // Get location and weather data
  getLocationAndWeather()
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-top: 2px solid var(--accent-cyan);
  display: flex;
  align-items: center;
  z-index: 100;
  box-shadow: 0 -2px 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(15px);
}

.taskbar-left {
  padding-left: 10px;
  min-width: 120px;
}

.start-button {
  background: linear-gradient(135deg, var(--accent-cyan), var(--bg-secondary));
  border: 1px solid var(--accent-cyan);
  color: var(--bg-primary);
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Orbitron', monospace;
  font-size: 0.8em;
  font-weight: bold;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.start-button:hover {
  background: linear-gradient(135deg, var(--accent-green), var(--bg-secondary));
  border-color: var(--accent-green);
  box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
  transform: translateY(-1px);
}

.start-button.active {
  background: linear-gradient(135deg, var(--accent-green), var(--bg-primary));
  border-color: var(--accent-green);
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
}

.start-icon {
  font-size: 1em;
}

.start-text {
  font-size: 0.75em;
}

.taskbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0 20px;
  overflow-x: auto;
}

.taskbar-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 3px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8em;
  transition: all 0.3s ease;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 120px;
  max-width: 150px;
}

.taskbar-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
  transform: translateY(-1px);
}

.window-icon {
  font-size: 0.9em;
}

.window-title {
  font-size: 0.75em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.taskbar-right {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-right: 15px;
  min-width: 300px;
  justify-content: flex-end;
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  font-size: 0.85em;
  padding: 4px 8px;
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid rgba(0, 255, 65, 0.3);
  border-radius: 3px;
}

.weather-icon {
  font-size: 1em;
}

.temperature {
  font-weight: bold;
  letter-spacing: 1px;
}

.location-info {
  font-family: 'Share Tech Mono', monospace;
  color: var(--text-secondary);
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 8px;
  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 3px;
}

.location-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.time-info {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 0.9em;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 4px 8px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.3);
}

.current-time {
  text-shadow: 0 0 5px var(--accent-cyan);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .taskbar-right {
    min-width: 250px;
  }
  
  .location-text {
    max-width: 100px;
  }
}

@media (max-width: 1000px) {
  .taskbar-right {
    min-width: 200px;
    gap: 10px;
  }
  
  .weather-info,
  .location-info,
  .time-info {
    font-size: 0.75em;
    padding: 3px 6px;
  }
  
  .location-text {
    max-width: 80px;
  }
}
</style>
</template>