// useResume.ts
import { ref } from 'vue';
import { Document, documentApi } from '../services/api';

export function useResume() {
  const document = ref<Document | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchDocument = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await documentApi.get();
      if (Array.isArray(response.data) && response.data.length > 0) {
        document.value = response.data[0]; // Grab the first document
      } else {
        error.value = 'No resume found';
      }
    } catch (e) {
      error.value = 'Failed to fetch resume';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    document,
    loading,
    error,
    fetchDocument,
  };
}
