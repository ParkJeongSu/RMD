<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  visible: Boolean,
  target: Object
});

console.log('abc');
/**
 *
 *
 */

</script>
<template>
  <v-dialog :model-value="visible" max-width="600px" @update:model-value="$emit('close')">
    <v-card>
      <v-card-title>
        Special Element Details
      </v-card-title>
      <v-card-text>
        <div v-if="target">
          <p><strong>ID:</strong> {{ target.id }}</p>
          <p><strong>Class:</strong> {{ target.className }}</p>
          <p><strong>Text:</strong> {{ target.textContent }}</p>
        </div>
        <div v-else>
          No element selected.
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
