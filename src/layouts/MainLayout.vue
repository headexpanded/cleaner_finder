<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Find a Cleaner </q-toolbar-title>
        <q-btn v-if="!isAuthenticated" dense flat @click="showRegister()">Register</q-btn>
        <div @click="openDrawer">
          <q-avatar v-if="isAuthenticated">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <q-btn v-else dense flat @click="showLogin()">Login</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Options </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <LoginDialog v-model="isLoginDialogOpen" />
  <RegisterDialog v-model="isRegisterDialogOpen" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useAuthStore } from 'stores/auth-store';
import LoginDialog from 'components/LoginDialog.vue';
import RegisterDialog from 'components/RegisterDialog.vue';

const auth = useAuthStore();

const isAuthenticated = computed(() => auth.isAuthenticated);
const userDrawerOpen = ref(false);
const openDrawer = () => {
  userDrawerOpen.value = !userDrawerOpen.value;
  console.log('Value of userDrawerOpen:', userDrawerOpen.value);
};

const isLoginDialogOpen = ref(false);
const showLogin = () => {
  isLoginDialogOpen.value = true;
};

const isRegisterDialogOpen = ref(false);
const showRegister = () => {
  isRegisterDialogOpen.value = true;
};

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
