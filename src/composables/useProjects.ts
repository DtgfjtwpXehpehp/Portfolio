import { ref } from 'vue';
import { Project, projectsApi } from '../services/api';

export function useProjects() {
  const projects = ref<Project[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await projectsApi.getAll();
      projects.value = response.data;
    } catch (e) {
      error.value = 'Failed to fetch projects';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const getProject = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await projectsApi.getById(id);
      return response.data;
    } catch (e) {
      error.value = 'Failed to fetch project';
      console.error(e);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    getProject
  };
}
