import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// src/main.ts

// Existing imports (Vue/React/whatever you're using)

// Fetch title from backend and set <title>
fetch("https://portfolio-backend-hazel-pi.vercel.app/api/about")
  .then(res => res.json())
  .then(data => {
    if (data && data.title) {
      document.title = data.title + " | " + data.name; 
    }
  })
  .catch(err => console.error("Failed to fetch title:", err));

// Your existing app mounting code


createApp(App).mount('#app')

