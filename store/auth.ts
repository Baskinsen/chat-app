import { defineStore } from "pinia";
import jwtDecode, { type JwtDecodeOptions } from "jwt-decode";

interface User {
  _id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false as boolean,
    token: useCookie("Authorization") || null,
  }),
  getters: {
    getUser: (state) => {
      if (state.token === null || "" || undefined) {
        return null;
      }
      console.log(state.token)
      state.user = jwtDecode(state.token as string) as User;
      return state.user;
    },
    getIsAuthenticated: (state) => {
      console.log(state.token)
      state.isAuthenticated = state.token === undefined || null || "" ? false: true
      return state.isAuthenticated;
    },
  },

  actions: {},
});

export default useAuthStore;
