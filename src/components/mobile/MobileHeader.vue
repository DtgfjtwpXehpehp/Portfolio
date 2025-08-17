<template>
  <header class="mobile-header">
    <div class="header-left">
      <div class="logo glitch"> <a href="#" style="text-decoration: none;">{{ about?.name }}</a></div>
    </div>
    
    <div class="header-center">
      <div class="weather-info">
        <span class="weather-icon">{{ weatherData.icon }}</span>
        <span class="temperature">{{ weatherData.temperature }}°{{ weatherData.unit }}</span>
      </div>
      <div class="location">{{ locationData.city }}, {{ locationData.country }}</div>
      <div class="time">{{ currentTime }}</div>
    </div>
    
    <div class="header-right">
      <div class="checkbox-wrapper-35">
        <input 
          :checked="soundEnabled" 
          @change="toggleSound" 
          name="mobile-sound-switch" 
          id="mobile-sound-switch" 
          type="checkbox" 
          class="switch"
        >
        <label for="mobile-sound-switch">
          <span class="switch-x-text">AUDIO</span>
          <span class="switch-x-toggletext">
            <span class="switch-x-unchecked"><span class="switch-x-hiddenlabel">Unchecked:</span>OFF</span>
            <span class="switch-x-checked"><span class="switch-x-hiddenlabel">Checked:</span>ON</span>
          </span>
        </label>
      </div>
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
import { useAbout } from '../../composables/useAbout';
import { useSoundEffects } from '../../composables/useSoundEffects';

const { about, fetchAbout } = useAbout()
const { soundEnabled, setSoundEnabled, playSound } = useSoundEffects()

defineEmits<{
  'toggle-menu': []
}>()

const toggleSound = () => {
  setSoundEnabled(!soundEnabled.value)
  playSound('click')
}

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

onMounted( async() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  
  // Get location and weather data
  await getLocationAndWeather()
  await fetchAbout()
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

/* Mobile Switch Toggle Styles - Compact Version */
.checkbox-wrapper-35 .switch {
  display: none;
}

.checkbox-wrapper-35 .switch + label {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: var(--text-primary);
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-family: 'Share Tech Mono', monospace;
  font-size: 16px;
  line-height: 20px;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-wrapper-35 .switch + label::before,
.checkbox-wrapper-35 .switch + label::after {
  content: '';
  display: block;
}

.checkbox-wrapper-35 .switch + label::before {
  background-color: rgba(0, 255, 255, 0.3);
  border: 1px solid var(--accent-cyan);
  border-radius: 500px;
  height: 20px;
  margin-right: 0;
  -webkit-transition: background-color 0.125s ease-out;
  transition: background-color 0.125s ease-out;
  width: 35px;
}

.checkbox-wrapper-35 .switch + label::after {
  background-color: var(--accent-cyan);
  border-radius: 18px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  height: 18px;
  left: 1px;
  position: absolute;
  top: 1px;
  -webkit-transition: -webkit-transform 0.125s ease-out;
  transition: -webkit-transform 0.125s ease-out;
  transition: transform 0.125s ease-out;
  transition: transform 0.125s ease-out, -webkit-transform 0.125s ease-out;
  width: 18px;
}

.checkbox-wrapper-35 .switch + label .switch-x-toggletext {
  display: block;
  font-weight: bold;
  height: 20px;
  overflow: hidden;
  position: relative;
  width: 35px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-wrapper-35 .switch + label .switch-x-unchecked,
.checkbox-wrapper-35 .switch + label .switch-x-checked {
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  -webkit-transition: opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
  transition: opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
  transition: transform 0.125s ease-out, opacity 0.125s ease-out;
  transition: transform 0.125s ease-out, opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
}

.checkbox-wrapper-35 .switch + label .switch-x-unchecked {
  opacity: 1;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

.checkbox-wrapper-35 .switch + label .switch-x-checked {
  opacity: 0;
  -webkit-transform: translateY(-50%) translate3d(0, 100%, 0);
  transform: translateY(-50%) translate3d(0, 100%, 0);
}

.checkbox-wrapper-35 .switch + label .switch-x-hiddenlabel {
  position: absolute;
  visibility: hidden;
}

.checkbox-wrapper-35 .switch:checked + label::before {
  background-color: var(--accent-green);
  border-color: var(--accent-green);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.checkbox-wrapper-35 .switch:checked + label::after {
  -webkit-transform: translate3d(15px, 0, 0);
  transform: translate3d(15px, 0, 0);
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
}

.checkbox-wrapper-35 .switch:checked + label .switch-x-unchecked {
  opacity: 0;
  -webkit-transform: translateY(-50%) translate3d(0, -100%, 0);
  transform: translateY(-50%) translate3d(0, -100%, 0);
}

.checkbox-wrapper-35 .switch:checked + label .switch-x-checked {
  opacity: 1;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

/* Hover effects */
.checkbox-wrapper-35 .switch + label:hover::before {
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
}

.checkbox-wrapper-35 .switch:checked + label:hover::before {
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
}
</style>