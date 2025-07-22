export type WindowType = 'about' | 'projects' | 'resume' | 'contact' | 'terminal'

export interface WindowPosition {
  x: number
  y: number
}

export interface WindowState {
  [key: string]: WindowPosition
}
