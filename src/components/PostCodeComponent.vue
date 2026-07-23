<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form>
      <q-input
        v-model="postCode"
        label="post code"
        lazy-rules
        :rules="postCodeRules"
        outlined
        rounded
      >
        <template v-slot:after>
          <q-btn label="Search" type="submit" color="primary" @click="onSubmit" />
        </template>
      </q-input>
    </q-form>
    <div v-if="postCode">
      <p>Post code entered: {{ postCode }}</p>
    </div>
    <div>
      <p>Test response: {{ testResponse }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from 'boot/axios';
import { ref } from 'vue';

const postCode = ref('');
const postCodeRules = [
  (val?: string | null) => {
    if (!val || val.trim().length === 0) return 'Enter a post code';
    return /^\d{4}$/.test(val) || 'Enter a valid post code';
  },
];
const testResponse = ref('');

const onSubmit = () => {
  api
    .get('/test')
    .then((response) => {
      // Success!
      console.log('Data:', response.data);
      testResponse.value = response.data.message;
    })
    .catch((error) => {
      // Handle error here
      console.error(error);
    })
    .finally(() => {
      // Stop loading spinners, etc.
    });
};
</script>

<style scoped></style>
