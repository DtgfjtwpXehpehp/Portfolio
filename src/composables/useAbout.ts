import { ref } from 'vue';

export interface About {
  id?: number;
  name: string;
  title: string;
  content: string;
  skills: string[];
  image_url?: string;
}

export function useAbout() {
  const about = ref<About | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAbout = async () => {
    loading.value = true;
    error.value = null;
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data for the spy portfolio
      about.value = {
        id: 1,
        name: 'Agent [REDACTED]',
        title: 'Full-Stack Developer',
        content: 'Highly skilled operative specializing in digital infrastructure and web-based intelligence systems. Expertise in creating secure, scalable applications for mission-critical operations. Proven track record in cybersecurity protocols and data encryption methodologies.',
        skills: ['JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Cybersecurity'],
        image_url: undefined
      };
    } catch (e) {
      error.value = 'Failed to fetch about information';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    about,
    loading,
    error,
    fetchAbout
  };
}