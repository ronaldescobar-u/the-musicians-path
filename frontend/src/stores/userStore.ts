import { defineStore } from "pinia";
import User from "../types/User";

const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user;
    }
  }
});

export default useUserStore;
