import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust this port based on your backend configuration

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface About {
  id?: number;
  name: string;
  title: string;
  content: string;
  skills: string[];
  image_url?: string;
}

export interface Contact {
  id: number;
  email: string;
  phone?: string;
  linkedin_url?: string;
  github_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface Resume {
  url: string;
  content?: string;
}

export const projectsApi = {
  getAll: () => api.get<Project[]>('/projects'),
  getById: (id: number) => api.get<Project>(`/projects/${id}`),
};

export const aboutApi = {
  get: () => api.get<About>('/about'),
  update: (data: Partial<About>, image?: File) => {
    const formData = new FormData();
    
    // Add all the data fields to the form
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'skills' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    // Add the image if provided
    if (image) {
      formData.append('image', image);
    }

    return api.put<About>('/about', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};


export const contactApi = {
  get: () => api.get<Contact>('/contact').then(res => res.data),
  send: (data: ContactForm) => api.post('/contact', data),
};


export const resumeApi = {
  get: () => api.get<Resume>('/resume'),
};

export default api;
