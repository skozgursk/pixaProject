// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    users: [],
    error: false,
    errorMessage: '',
    drawer: false,
    targetUser: null,
    authUser: {
      id: 1
    }
  }),
  getters: {
    messagedUsers: (state) => state.users,
    currentUser: (state) => state.authUser,
    snackbarError: (state) => state.error,
    snackbarErrorMessage: (state) => state.errorMessage,
    userDetail: (state) => state.targetUser,
    userDrawer: (state) => state.drawer,
  },
  actions: {
    async getChatMessages(id) {
      try {
        if (id) {
          const messages = await (await fetch('api/mesajlar.json')).json();
          if (messages.find(v => v.id === id)) {
            const targetId = messages.find(v => v.id === id).users.find(v => v !== this.authUser.id);
            this.targetUser = this.users.find(v => v.id === targetId);
            return messages.find(v => v.id === id).messages;
          } else {
            return [];
          }

        }
        return [];
      } catch (e) {
        console.error(e);
        throw new Error("Something went wrong on message load");
      }
    },
    async changeTargetUserStatus(status) {
      this.drawer = status;
    },
    async getAuthUser() {
      try {
        this.authUser = await (await fetch('api/me.json')).json();
        return true;
      } catch (e) {
        throw new Error("Something went wrong on users load");
      }
    },
    async getMessagedUsers() {
      try {
        this.users = await (await fetch('api/users.json')).json();
        return true;
      } catch (e) {
        throw new Error("Something went wrong on users load");
      }
    },
    async toastError(message) {
      this.errorMessage = message;
      this.error = true;
      setTimeout(() => {
        this.errorMessage = "";
        this.error = false;
      }, 5000);
    },
    async addTestData(items) {
      Object.keys(items).forEach(v => {
        this[v] = items[v];
      })
    }
  }
})
