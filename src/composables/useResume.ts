import { ref } from 'vue';
import { Resume, resumeApi } from '../services/api';

export function useResume() {
  const resume = ref<Resume | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchResume = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await resumeApi.get();
      resume.value = response.data;
    } catch (e) {
      error.value = 'Failed to fetch resume';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    resume,
    loading,
    error,
    fetchResume
  };
}
