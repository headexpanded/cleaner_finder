<template>
  <q-dialog :model-value="props.modelValue" @update:model-value="closeDialog()" persistent>
    <q-card class="$def-bg">
      <q-card-section class="text-h6 q-pb-md">Login</q-card-section>
      <q-card-section>
        <q-form
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          class="q-ma-md"
          spellcheck="false"
          @submit.prevent="login"
        >
          <q-card-section>
            <q-input
              v-model.trim="username"
              autofocus
              bottom-slots
              label="Username"
              type="text"
              required
            />
            <q-input
              v-model.trim="password"
              bottom-slots
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              required
            >
              <!-- <template v-slot:append>
                <TogglePassword v-model="showPassword" />
              </template> -->
            </q-input>

            <q-card-actions align="right" class="row">
              <q-btn color="negative" label="Cancel" @click="closeDialog" />
              <q-btn type="submit" color="positive" label="Login" @click="login" />
            </q-card-actions>
          </q-card-section>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// import TogglePassword from 'components/TogglePassword.vue';
import { useAuthStore } from 'stores/auth-store';
import { ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const closeDialog = () => {
  emit('update:modelValue', false);
};

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const login = async () => {
  try {
    await useAuthStore().login(username.value, password.value);
    closeDialog();
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<style scoped lang="scss">
.q-card {
  max-width: 500px;
  width: 100%;
}
</style>
