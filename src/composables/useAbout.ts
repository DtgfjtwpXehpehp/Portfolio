import { ref } from 'vue';
import { About, aboutApi } from '../services/api';

export function useAbout() {
  const about = ref<About | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAbout = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await aboutApi.get();
      const data = response.data;
      
      // Parse skills from JSON string if needed
      if (typeof data.skills === 'string') {
        try {
          data.skills = JSON.parse(data.skills);
        } catch (e) {
          console.warn('Failed to parse skills JSON:', e);
          data.skills = [];
        }
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
  }}