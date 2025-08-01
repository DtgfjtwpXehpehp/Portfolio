import { ref, reactive } from 'vue'
import type { WindowType, WindowPosition, WindowState } from '../types/windows'
import { useSoundEffects } from './useSoundEffects'

export function useWindowManagement() {
  const { playSound } = useSoundEffects()

  const minimizedWindows = reactive<Record<WindowType, boolean>>({
    about: false,
    projects: false,
    resume: false,
    contact: false,
    terminal: false
  })

  const activeWindows = reactive<Record<WindowType, boolean>>({
    about: false,
    projects: false,
    resume: false,
    contact: false,
    terminal: false
  })

  const maximizedWindows = reactive<Record<WindowType, boolean>>({
    about: false,
    projects: false,
    resume: false,
    contact: false,
    terminal: false
  })

  const windowPositions = reactive<WindowState>({
    about: { x: 100, y: 100 },
    projects: { x: 150, y: 150 },
    resume: { x: 200, y: 200 },
    contact: { x: 250, y: 250 },
    terminal: { x: 300, y: 300 }
  })

  const isDangling = ref(false)

  const openWindow = (windowType: WindowType) => {
    activeWindows[windowType] = true
    minimizedWindows[windowType] = false
    playSound('click')
  }

  const closeWindow = (windowType: WindowType) => {
    activeWindows[windowType] = false
    maximizedWindows[windowType] = false
    playSound('click')
  }

  const minimizeWindow = (windowType: WindowType) => {
    activeWindows[windowType] = false
    minimizedWindows[windowType] = true
    maximizedWindows[windowType] = false
    playSound('click')
  }

  const restoreWindow = (windowType: WindowType) => {
    activeWindows[windowType] = true
    minimizedWindows[windowType] = false
    playSound('click')
  }

  const maximizeWindow = (windowType: WindowType) => {
    maximizedWindows[windowType] = !maximizedWindows[windowType]
    playSound('click')
  }

  const updateWindowPosition = (windowType: WindowType, position: WindowPosition) => {
    windowPositions[windowType] = position
  }

  const triggerDangle = () => {
    isDangling.value = true
    playSound('click')
    setTimeout(() => {
      isDangling.value = false
    }, 1000)
  }

  return {
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
  }
}
