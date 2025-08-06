<template>
  <BaseWindow
    :active="active"
    :maximized="maximized"
    :position="position"
    title="SERVICE RECORD"
    @close="$emit('close')"
    @minimize="$emit('minimize')"
    @maximize="$emit('maximize')"
    @move="$emit('move', $event)"
  >
    <iframe
      v-if="document?.file_url"
      :src="document?.file_url"
      width="100%"
      height="600px"
    ></iframe>
    <div v-else>Loading resume...</div>
  </BaseWindow>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BaseWindow from './BaseWindow.vue';
import { useResume } from '../composables/useResume';

const { document, fetchDocument } = useResume();

defineProps<{
  active: boolean;
  maximized?: boolean;
  position: { x: number; y: number };
}>();

defineEmits<{
  close: [];
  minimize: [];
  maximize: [];
  move: [position: { x: number; y: number }];
}>();

onMounted(async () => {
  await fetchDocument();
});
</script>


<style scoped>
.resume-content h3 {
  color: var(--accent-cyan);
  font-family: 'Orbitron', monospace;
  margin-bottom: 15px;
}

.resume-content h4 {
  color: var(--accent-green);
  margin: 20px 0 10px 0;
}

.skills-list {
  list-style: none;
  padding: 0;
}

.mission-entry {
  margin-bottom: 15px;
}

.mission-entry strong {
  color: var(--accent-cyan);
}
</style>