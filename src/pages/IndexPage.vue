<template>
  <q-page class="row items-center justify-evenly">
    <post-code-component v-model="isPostCodeDialogOpen"></post-code-component>
  </q-page>
</template>

<script setup lang="ts">
import PostCodeComponent from 'components/PostCodeComponent.vue';
import { ref } from 'vue';

const isPostCodeDialogOpen = ref(true);
</script>
