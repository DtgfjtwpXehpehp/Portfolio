<template>
  <header class="mobile-header">
    <div class="header-left">
      <div class="logo glitch">AGENT PORTFOLIO</div>
    </div>
    
    <div class="header-center">
      <div class="weather-info">
        <span class="weather-icon">{{ weatherData.icon }}</span>
        <span class="temperature">{{ weatherData.temperature }}°{{ weatherData.unit }}</span>
      </div>
      <div class="time">{{ currentTime }}</div>
    </div>
    
    <div class="header-right">
      <button class="sound-toggle" @click="$emit('toggle-sound')">
        {{ soundEnabled ? '🔊' : '🔇' }}
      </button>
      <button class="hamburger-btn" @click="$emit('toggle-menu')" :class="{ active: false }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

defineProps<{
  soundEnabled: boolean
}>()

defineEmits<{
  'toggle-sound': []
  'toggle-menu': []
}>()

const currentTime = ref('')

const weatherData = reactive({
  icon: '🌤️',
  temperature: null as number | null,
  unit: 'C',
  condition: ''
})

const locationData = reactive({
  city: '',
  country: '',
  latitude: 0,
  longitude: 0
})

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString([], { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })
}

const getLocationAndWeather = async () => {
  try {
    // Get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          locationData.latitude = latitude
          locationData.longitude = longitude
          
          // Get location details and weather
          await Promise.all([
            getLocationDetails(latitude, longitude),
            getWeatherData(latitude, longitude)
          ])
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
      locationData.city = data.address.city || data.address.town || data.address.village || data.address.county || 'Unknown'
      locationData.country = data.address.country || 'Unknown'
    }
  } catch (error) {
    console.error('Error getting location details:', error)
    locationData.city = 'Unknown'
    locationData.country = 'Location'
  }
}

const getWeatherData = async (lat: number, lon: number) => {
  try {
    // Using Open-Meteo API (free, no API key needed)
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
      locationData.city = data.city || 'Unknown'
      locationData.country = data.country_name || 'Unknown'
      
      // Get weather for this location
      if (data.latitude && data.longitude) {
        locationData.latitude = data.latitude
        locationData.longitude = data.longitude
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
  locationData.city = 'Unknown'
  locationData.country = 'Location'
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
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-bottom: 2px solid var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(15px);
}

.header-left .logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.1em;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-center {
  text-align: center;
  font-size: 0.8em;
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 2px;
}

.location, .time {
  font-size: 0.75em;
  color: var(--text-secondary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sound-toggle {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--text-primary);
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1em;
  transition: all 0.3s ease;
}

.sound-toggle:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
}

.hamburger-btn span {
  display: block;
  height: 3px;
  width: 100%;
  background: var(--accent-cyan);
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
}

.hamburger-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}
</style>