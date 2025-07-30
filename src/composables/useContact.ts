import { ref } from 'vue';
import { contactApi, type ContactForm, type Contact } from '../services/api';

export function useContact() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);
  const contact = ref<Contact | null>(null);

  const fetchContact = async () => {
    loading.value = true;
    error.value = null;
    try {
      contact.value = await contactApi.get();
    } catch (e) {
      error.value = 'Failed to fetch contact';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const sendMessage = async (contactData: ContactForm) => {
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
    contact,
    fetchContact,
    sendMessage
  };
}
