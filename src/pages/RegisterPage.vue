<template>
  <q-page>
    <register-customer-dialog v-model="isRegisterCustomerDialogOpen" />
  </q-page>
</template>

<script setup lang="ts">
import RegisterCustomerDialog from 'components/RegisterCustomerDialog.vue';
import { ref } from 'vue';

const isRegisterCustomerDialogOpen = ref(true);
</script>

<style scoped lang="scss"></style>
