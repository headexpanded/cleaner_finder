import { api } from 'boot/axios';
import { defineStore } from 'pinia';

import type { User } from 'src/types/User';

type State = {
  username: string | null;
  csrfFetched: boolean;
  roles: string[];
};

type Getters = {
  isAdmin: (state: State) => boolean;
  isAuthenticated: (state: State) => boolean;
};

type Actions = {
  init: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: {
    email: string;
    password: string;
    password_confirmation: string;
    username: string;
  }) => Promise<void>;
  fetchUser: () => Promise<User>;
  checkAuth: () => Promise<boolean>;
  checkTokenExpiration: () => void;
  clearState: () => void;
};

const defaultState: State = {
  username: null,
  csrfFetched: false,
  roles: [],
};

export const useAuthStore = defineStore<'auth', State, Getters, Actions>('auth', {
  state: () => ({ ...defaultState }),
  getters: {
    isAdmin: (state) => state.roles.includes('admin'),
    isAuthenticated: (state) => !!state.username,
  },
  actions: {
    async init() {
      if (!this.csrfFetched) {
        console.log('Fetching CSRF cookie...');
        await api.get('/sanctum/csrf-cookie');
        console.log('CSRF cookie fetched');
        this.csrfFetched = true;
      }
    },

    checkTokenExpiration() {
      // Check if the access token is expired
    },

    async fetchUser(): Promise<User> {
      const response = await api.get('/user', { withCredentials: true, withXSRFToken: true });
      if (!response.data.username) {
        throw new Error('Missing username in response');
      }

      // Extract roles from is_admin field
      const roles = response.data.is_admin ? ['admin'] : [];

      this.$patch({
        roles: roles,
        username: response.data.username,
      });
      console.log('Fetched user:', response.data);
      return response.data;
    },

    async login(username: string, password: string) {
      console.log('Logging in with username:', username);
      await this.init();

      try {
        // Use Fortify's login endpoint
        await api.post(
          '/login',
          { username, password },
          { withCredentials: true, withXSRFToken: true },
        );

        // Fortify login returns a redirect response, so we need to fetch the user data
        await this.fetchUser();
      } catch (err) {
        console.error('Login failed', err);
        throw err;
      }
    },

    async logout() {
      await api.post('/logout');
      this.clearState();
    },

    async register(payload: {
      email: string;
      password: string;
      password_confirmation: string;
      username: string;
    }) {
      await this.init();
      await api.post('/register', payload);
      this.username = payload.username;
      await this.fetchUser();
    },

    async checkAuth(): Promise<boolean> {
      try {
        await this.fetchUser();
        this.csrfFetched = true;
        return true;
      } catch {
        this.clearState();
        return false;
      }
    },

    clearState() {
      this.$patch({
        username: null,
        csrfFetched: false,
        roles: [],
      });
    },
  },
});
