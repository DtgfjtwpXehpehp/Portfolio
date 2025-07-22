import { ref } from 'vue';
import { contactApi, socialApi, type SocialContact, type ContactForm } from '../services/api';

export function useContact() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);
  const contacts = ref<SocialContact[]>([]);

  const fetchContacts = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      contacts.value = await socialApi.getAll();
    } catch (e) {
      error.value = 'Failed to fetch contacts';
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
    contacts,
    fetchContacts,
    sendMessage
  };
}
