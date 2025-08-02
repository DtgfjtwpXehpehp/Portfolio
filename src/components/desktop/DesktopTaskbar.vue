<template>
  <div class="taskbar">
    <div class="taskbar-left">
      <div class="weather-info" v-if="weatherData.location">
        <span class="weather-icon">{{ weatherData.icon }}</span>
        <span class="temperature">{{ weatherData.temp }}°{{ weatherData.unit }}</span>
        <span class="weather-desc">{{ weatherData.description }}</span>
      </div>
      <div class="location-info" v-if="locationData.suburb && locationData.city">
        <span class="location-text">{{ locationData.suburb }}, {{ locationData.city }}</span>
      </div>
      <div class="time-info">
        <span class="current-time">{{ currentTime }}</span>
      </div>
    </div>
    
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
    
    <div class="taskbar-right">
      <button class="start-button" @click="$emit('toggle-command-center')" :class="{ active: commandCenterOpen }">
        <span class="start-icon">⚡</span>
        <span class="start-text">START</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  minimizedWindows: Record<string, boolean>
  commandCenterOpen?: boolean
}>()

defineEmits<{
  'restore-window': [windowType: string]
  'toggle-command-center': []
}>()

const currentTime = ref('')
const weatherData = ref({
  temp: 0,
  unit: 'C',
  description: '',
  icon: '🌤️',
  location: ''
})

const locationData = ref({
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
  return icons[windowType] || '🪟'
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

const getWeatherIcon = (weatherCode: string, isDay: boolean): string => {
  const weatherIcons: Record<string, { day: string, night: string }> = {
    '01': { day: '☀️', night: '🌙' }, // clear sky
    '02': { day: '⛅', night: '☁️' }, // few clouds
    '03': { day: '☁️', night: '☁️' }, // scattered clouds
    '04': { day: '☁️', night: '☁️' }, // broken clouds
    '09': { day: '🌦️', night: '🌧️' }, // shower rain
    '10': { day: '🌦️', night: '🌧️' }, // rain
    '11': { day: '⛈️', night: '⛈️' }, // thunderstorm
    '13': { day: '❄️', night: '❄️' }, // snow
    '50': { day: '🌫️', night: '🌫️' }  // mist
  }
  
  const iconSet = weatherIcons[weatherCode] || { day: '🌤️', night: '🌤️' }
  return isDay ? iconSet.day : iconSet.night
}

const fetchLocationAndWeather = async () => {
  try {
    // Get user's current position
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      })
    })

    const { latitude, longitude } = position.coords

    // Fetch location details using reverse geocoding
    const locationResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=demo` // Using demo key for now
    )
    
    if (locationResponse.ok) {
      const locationResult = await locationResponse.json()
      if (locationResult.length > 0) {
        const location = locationResult[0]
        locationData.value = {
          suburb: location.name || '',
          city: location.state || location.name || '',
          country: location.country || ''
        }
      }
    }

    // Fetch weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=demo&units=metric` // Using demo key for now
    )
    
    if (weatherResponse.ok) {
      const weatherResult = await weatherResponse.json()
      const isDay = weatherResult.dt > weatherResult.sys.sunrise && weatherResult.dt < weatherResult.sys.sunset
      
      weatherData.value = {
        temp: Math.round(weatherResult.main.temp),
        unit: 'C',
        description: weatherResult.weather[0].description,
        icon: getWeatherIcon(weatherResult.weather[0].icon.slice(0, 2), isDay),
        location: weatherResult.name
      }
    }
  } catch (error) {
    console.log('Location/Weather fetch failed, using fallback data')
    // Fallback data when geolocation or API fails
    locationData.value = {
      suburb: 'Unknown',
      city: 'Location',
      country: 'Earth'
    }
    weatherData.value = {
      temp: 22,
      unit: 'C',
      description: 'partly cloudy',
      icon: '⛅',
      location: 'Local Area'
    }
  }
}

let timeInterval: NodeJS.Timeout

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  fetchLocationAndWeather()
  
  // Update weather every 10 minutes
  setInterval(fetchLocationAndWeather, 600000)
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
  justify-content: space-between;
  padding: 0 20px;
  z-index: 100;
  box-shadow: 0 -2px 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(15px);
}

.taskbar-left {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.taskbar-center {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex: 2;
  max-width: 600px;
  overflow-x: auto;
}

.taskbar-right {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}

/* Weather Info */
.weather-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-cyan);
  font-size: 0.85em;
  padding: 4px 8px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 3px;
}

.weather-icon {
  font-size: 1.1em;
}

.temperature {
  font-weight: bold;
  color: var(--accent-green);
}

.weather-desc {
  text-transform: capitalize;
  color: var(--text-secondary);
  font-size: 0.9em;
}

/* Location Info */
.location-info {
  font-family: 'Share Tech Mono', monospace;
  color: var(--text-primary);
  font-size: 0.85em;
}

.location-text {
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Time Info */
.time-info {
  font-family: 'Share Tech Mono', monospace;
  color: var(--accent-green);
  font-size: 0.9em;
  font-weight: bold;
  letter-spacing: 1px;
}

.current-time {
  text-shadow: 0 0 5px var(--accent-green);
}

/* Taskbar Buttons (Minimized Windows) */
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
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  transform: translateY(-1px);
}

.window-icon {
  font-size: 1em;
}

.window-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Start Button */
.start-button {
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-green));
  border: 2px solid var(--accent-cyan);
  color: var(--bg-primary);
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Orbitron', monospace;
  font-size: 0.85em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.start-button:hover {
  background: linear-gradient(135deg, var(--accent-green), var(--accent-cyan));
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
  transform: translateY(-2px);
}

.start-button.active {
  background: linear-gradient(135deg, var(--accent-green), var(--danger-red));
  border-color: var(--danger-red);
  box-shadow: 0 0 15px rgba(255, 0, 64, 0.5);
}

.start-icon {
  font-size: 1.1em;
  animation: pulse 2s infinite;
}

.start-text {
  font-size: 0.9em;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .taskbar {
    padding: 0 15px;
  }
  
  .taskbar-left {
    gap: 10px;
  }
  
  .weather-desc {
    display: none;
  }
}

@media (max-width: 900px) {
  .location-info {
    display: none;
  }
  
  .taskbar-btn {
    min-width: 100px;
    padding: 4px 8px;
  }
  
  .window-title {
    font-size: 0.75em;
  }
}
</style>