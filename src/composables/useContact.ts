import { ref } from 'vue';
import { Contact, contactApi } from '../services/api';

export function useContact() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);

  const sendMessage = async (contactData: Contact) => {
    loading.value = true;
    error.value = null;
    success.value = false;
    
    try {
      await contactApi.send(contactData);
      success.value = true;
    } catch (e) {
      error.value = 'Failed to send message';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    success,
    sendMessage
  };
}
