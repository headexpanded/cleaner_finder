<template>
  <q-dialog :model-value="props.modelValue" persistent>
    <q-card>
      <div class="q-pa-md" style="max-width: 400px">
        <q-card-section>
          <q-avatar size="56px" class="q-mb-md">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <q-form spellcheck="false" @submit.prevent="onSubmit">
            <q-card-actions align="right" class="row">
              <q-btn color="negative" label="Cancel" @click="closeDialog()" />
              <q-btn type="submit" color="positive" label="Logout" @click="onSubmit" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/auth-store';

const props = defineProps<{
  modelValue: boolean;
}>();
const onSubmit = async () => {
  try {
    await useAuthStore().logout();
    closeDialog();
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
const closeDialog = () => {
  emit('update:modelValue', false);
};
</script>

<style scoped lang="scss"></style>
