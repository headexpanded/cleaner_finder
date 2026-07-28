<template>
  <q-page class="row items-center justify-evenly">
    <post-code-component
      v-if="isAuthenticated"
      v-model="isPostCodeDialogOpen"
    ></post-code-component>
  </q-page>
</template>

<script setup lang="ts">
import PostCodeComponent from 'components/PostCodeComponent.vue';
import { ref, computed } from 'vue';
import { useAuthStore } from 'stores/auth-store';

const auth = useAuthStore();
const isAuthenticated = computed(() => auth.isAuthenticated);

// const isBusinessUser = ref(false); // Default to false, meaning the user is a customer. Change this based on your logic.
// const isCustomerUser = ref(false); // Default to true, meaning the user is a customer. Change this based on your logic.

const isPostCodeDialogOpen = ref(true);

// const registerBusinessPage = ref(false);
// const showRegisterBusinessPage = () => {
//   if (isBusinessUser.value) {
//     registerBusinessPage.value = true;
//   }
// };

// const userDrawerOpen = ref(false);
// const openDrawer = () => {
//   userDrawerOpen.value = !userDrawerOpen.value;
//   console.log('Value of userDrawerOpen:', userDrawerOpen.value);
// };
</script>
