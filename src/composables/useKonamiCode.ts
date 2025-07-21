import { ref } from 'vue'

export function useKonamiCode() {
  const konamiCode = ref<number[]>([])
  const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // Up Up Down Down Left Right Left Right B A

  const initKonamiCode = () => {
    const handleKeydown = (e: KeyboardEvent) => {
      konamiCode.value.push(e.keyCode)
      if (konamiCode.value.length > konami.length) {
        konamiCode.value.shift()
      }
      
      if (konamiCode.value.toString() === konami.toString()) {
        activateEasterEgg()
        konamiCode.value = []
      }
    }

    document.addEventListener('keydown', handleKeydown)
    
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }

  const activateEasterEgg = () => {
    // Color shift effect
    document.body.style.filter = 'hue-rotate(180deg)'
    setTimeout(() => {
      document.body.style.filter = 'none'
    }, 3000)
    
    // Show secret message
    const secret = document.createElement('div')
    secret.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--window-bg);
      border: 2px solid var(--danger-red);
      padding: 20px;
      color: var(--danger-red);
      font-family: 'Orbitron', monospace;
      z-index: 9999;
      text-align: center;
      border-radius: 5px;
      backdrop-filter: blur(15px);
    `
    secret.innerHTML = `
      <h3>🕵️ SECRET UNLOCKED 🕵️</h3>
      <p>You found the hidden easter egg!</p>
      <p>Agent, you have excellent attention to detail.</p>
    `
    
    document.body.appendChild(secret)
    setTimeout(() => {
      if (document.body.contains(secret)) {
        document.body.removeChild(secret)
      }
    }, 4000)
  }

  return {
    initKonamiCode
  }
}