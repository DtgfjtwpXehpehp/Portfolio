
// src/types/windows.ts
export enum WindowType {
  ABOUT = 'about',
  PROJECTS = 'projects', 
  RESUME = 'resume',
  CONTACT = 'contact',
  TERMINAL = 'terminal'
}

export type WindowTypeString = 'about' | 'projects' | 'resume' | 'contact' | 'terminal';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowState {
  [key: string]: WindowPosition;
  about: WindowPosition;
  projects: WindowPosition;
  resume: WindowPosition;
  contact: WindowPosition;
  terminal: WindowPosition;
}