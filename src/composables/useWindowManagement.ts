import { ref, reactive } from 'vue'
import { WindowType, WindowTypeString, WindowPosition, WindowState } from '../types/windows'
import { useSoundEffects } from './useSoundEffects'

export function useWindowManagement() {
  const { playSound } = useSoundEffects()
  
  const minimizedWindows = reactive<Record<WindowTypeString, boolean>>({
    about: false,
    projects: false,
    resume: false,
    contact: false,
    terminal: false
  })
  
  const activeWindows = reactive<Record<WindowTypeString, boolean>>({
    about: false,
    projects: false,
    resume: false,
    contact: false,
    terminal: false
  })
  
  const maximizedWindows = reactive<Record<WindowTypeString, boolean>>({
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
  
  // Helper function to convert enum to string
  const getWindowKey = (windowType: WindowType | WindowTypeString): WindowTypeString => {
    return typeof windowType === 'string' ? windowType : windowType.valueOf() as WindowTypeString
  }
  
  const openWindow = (windowType: WindowType | WindowTypeString) => {
    const key = getWindowKey(windowType)
    activeWindows[key] = true
    minimizedWindows[key] = false
    playSound('click')
  }
  
  const closeWindow = (windowType: WindowType | WindowTypeString) => {
    const key = getWindowKey(windowType)
    activeWindows[key] = false
    maximizedWindows[key] = false
    playSound('click')
  }
  
  const minimizeWindow = (windowType: WindowType | WindowTypeString) => {
    const key = getWindowKey(windowType)
    activeWindows[key] = false
    minimizedWindows[key] = true
    maximizedWindows[key] = false
    playSound('click')
  }
  
  const restoreWindow = (windowType: WindowType | WindowTypeString) => {
    const key = getWindowKey(windowType)
    activeWindows[key] = true
    minimizedWindows[key] = false
    playSound('click')
  }
  
  const maximizeWindow = (windowType: WindowType | WindowTypeString) => {
    const key = getWindowKey(windowType)
    maximizedWindows[key] = !maximizedWindows[key]
    playSound('click')
  }
  
  const updateWindowPosition = (windowType: WindowType | WindowTypeString, position: WindowPosition) => {
    const key = getWindowKey(windowType)
    windowPositions[key] = position
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