export function useSoundEffects() {
  const playSound = (type: 'beep' | 'click' | 'systemReady') => {
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)()
      let frequency: number
      let duration: number

      switch(type) {
        case 'beep':
          frequency = 800
          duration = 100
          break
        case 'click':
          frequency = 1200
          duration = 50
          break
        case 'systemReady':
          frequency = 600
          duration = 200
          break
        default:
          return
      }

      const oscillator = context.createOscillator()
      const gainNode = context.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(context.destination)

      oscillator.frequency.setValueAtTime(frequency, context.currentTime)
      oscillator.type = 'square'

      gainNode.gain.setValueAtTime(0.1, context.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration / 1000)

      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + duration / 1000)
    } catch (error) {
      // Silently fail if Web Audio API is not supported
    }
  }

  return {
    playSound
  }
}