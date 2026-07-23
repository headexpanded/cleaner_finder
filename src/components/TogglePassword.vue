<template>
  <q-icon
    class="cursor-pointer"
    :name="modelValue ? 'visibility' : 'visibility_off'"
    @click="toggle"
  />
</template>

<script setup lang="ts">
const modelValue = defineModel({
  type: Boolean,
  required: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const toggle = () => {
  emit('update:modelValue', !modelValue.value);
};
</script>

<style scoped lang="scss"></style>
