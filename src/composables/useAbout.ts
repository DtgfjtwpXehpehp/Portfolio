import { ref } from 'vue';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:3000/api/about');
      
      // Ensure skills is always an array
      const data = response.data;
      if (data.skills && typeof data.skills === 'string') {
        // Parse JSON string if skills come as a string
        try {
          data.skills = JSON.parse(data.skills);
        } catch {
          // If parsing fails, split by comma
          data.skills = data.skills.split(',').map((skill: string) => skill.trim());
        }
      }
      
      // Ensure skills is an array even if it's empty
      if (!Array.isArray(data.skills)) {
        data.skills = [];
      }

      about.value = data;
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