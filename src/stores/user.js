import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const userSession = "userSession"
  const UserIssavedInLocalStorage = localStorage.getItem(userSession);

  const setUser = (myuser) => {
    user.value = myuser
    localStorage.setItem(userSession, JSON.stringify(myuser));
  }

  const removeUser = () => {
    user.value = {}
  }

  onMounted(() => {
    if(UserIssavedInLocalStorage) {
      user.value = JSON.parse(UserIssavedInLocalStorage);
    }
  })

  return {
    user,
    setUser,
    removeUser
  }
});
