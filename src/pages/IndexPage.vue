<template>
  <q-page class="row items-center justify-evenly">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Find a Cleaner </q-toolbar-title>
        <div v-if="isAuthenticated">
          <q-avatar @click="showUserDialog()" class="q-mr-sm">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </div>
        <div v-else>
          <q-btn dense flat @click="showRegister()">Register</q-btn>
          <q-btn dense flat @click="showLogin()">Login</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Options </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>
    <post-code-component
      v-if="isAuthenticated"
      v-model="isPostCodeDialogOpen"
    ></post-code-component>
    <LoginDialog v-model="isLoginDialogOpen" />
    <RegisterCustomerDialog v-model="isRegisterCustomerDialogOpen" />
    <UserDialog v-model="isUserDialogOpen" />
  </q-page>
</template>

<script setup lang="ts">
import PostCodeComponent from 'components/PostCodeComponent.vue';
import { ref, computed } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import LoginDialog from 'components/LoginDialog.vue';
import RegisterCustomerDialog from 'components/RegisterCustomerDialog.vue';
import UserDialog from 'components/UserDialog.vue';
import { useAuthStore } from 'stores/auth-store';

const auth = useAuthStore();
const isAuthenticated = computed(() => auth.isAuthenticated);
const isPostCodeDialogOpen = ref(true);

const isLoginDialogOpen = ref(false);
const showLogin = () => {
  isLoginDialogOpen.value = true;
};

const isRegisterCustomerDialogOpen = ref(false);
const showRegister = () => {
  isRegisterCustomerDialogOpen.value = true;
};

const isUserDialogOpen = ref(false);
const showUserDialog = () => {
  isUserDialogOpen.value = true;
};

// const userDrawerOpen = ref(false);
// const openDrawer = () => {
//   userDrawerOpen.value = !userDrawerOpen.value;
//   console.log('Value of userDrawerOpen:', userDrawerOpen.value);
// };

const linksList: EssentialLinkProps[] = [
  {
    title: 'Account',
    caption: 'your details',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Register',
    caption: 'get cleaning gigs',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'rate cleaners',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
