<script setup lang="ts">
import TogglePassword from 'components/TogglePassword.vue';
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
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const showPassword = ref(false);
const register = async () => {
  try {
    await useAuthStore().register({
      username: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      isBusinessUser: false, // Set this to true if the user is a business user
    });
    closeDialog();
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
</script>

<template>
  <q-dialog :model-value="props.modelValue" @update:model-value="closeDialog()" persistent>
    <q-card class="$def-bg">
      <q-card-section class="text-h6 q-pb-md">Register</q-card-section>
      <q-card-section>
        <q-form
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          class="q-ma-md"
          spellcheck="false"
          @submit.prevent="register"
        >
          <q-card-section>
            <q-input v-model.trim="username" autofocus bottom-slots label="Username" required />
            <q-input v-model.trim="email" bottom-slots label="Email" type="email" required />
            <q-input
              v-model.trim="password"
              bottom-slots
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              required
            >
              <template v-slot:append>
                <TogglePassword v-model="showPassword" />
              </template>
            </q-input>
            <q-input
              v-model.trim="passwordConfirmation"
              label="Confirm Password"
              :type="showPassword ? 'text' : 'password'"
              required
            >
              <template v-slot:append>
                <TogglePassword v-model="showPassword" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" label="Cancel" @click="closeDialog" />
            <q-btn color="positive" label="Register" @click="register()" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.q-card {
  max-width: 500px;
  width: 100%;
}
</style>
