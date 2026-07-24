<template>
  <q-dialog :model-value="props.modelValue" persistent>
    <q-card>
      <div class="q-pa-md" style="max-width: 400px">
        <q-card-section>
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
        </q-card-section>
        <div v-if="postCode">
          <p>Post code entered: {{ postCode }}</p>
        </div>
        <div>
          <p>Test response: {{ testResponse }}</p>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { api } from 'boot/axios';
import { ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const postCode = ref('');
const postCodeRules = [
  (val?: string | null) => {
    if (!val || val.trim().length === 0) return 'Enter a post code';
    return /^\d{4}$/.test(val) || 'Enter a valid post code';
  },
];
const testResponse = ref('');
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const closeDialog = () => {
  emit('update:modelValue', false);
};

const onSubmit = () => {
  api
    .get('/test')
    .then((response) => {
      // Success!
      console.log('Data:', response.data);
      testResponse.value = response.data.message;
      closeDialog();
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

<style scoped lang="scss">
.q-card {
  max-width: 500px;
  width: 100%;
}
</style>
