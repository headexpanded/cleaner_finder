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
              <q-btn type="submit" color="positive" label="Submit" @click="onSubmit" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();
const onSubmit = () => {
  console.log('Submit btn clicked');
};
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
const closeDialog = () => {
  emit('update:modelValue', false);
};
</script>

<style scoped lang="scss"></style>
