<template>
  <q-checkbox v-model="isChecked" label="Check me" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isChecked = ref(false);
</script>

<style scoped></style>
