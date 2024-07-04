import { defineStore } from "pinia"
import jwtDecode, { type JwtDecodeOptions } from "jwt-decode";
import { get } from "mongoose";


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
    token: useCookie("Authorization") || null
  }),
  getters: {
    getUser: (state) => {
      state.user = jwtDecode(state.token as string) as User;
      return state.user;
    },
    getIsAuthenticated: (state) => {
      state.isAuthenticated = state.token !== null || "" ? true : false;
      return state.isAuthenticated;
    }
  },

  actions: {
    
  }
});


export default useAuthStore;