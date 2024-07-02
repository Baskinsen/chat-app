import { defineStore } from "pinia";

interface User {
  username: string;
  email: string;
  password: string;
}
interface Token {
  accessToken: string;
  refreshToken: string;
}
interface IsAuthenticated {
  isAuthenticated: boolean;
}

const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as Token | null,
    isAuthenticated: false as IsAuthenticated | false,
  }),
  getters: {},
});


export default useAuthStore;