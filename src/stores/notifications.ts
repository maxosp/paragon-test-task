import { ref } from "vue";
import { defineStore } from "pinia";

const NOTIFICATION_TIMEOUT = 2000;

export const useNotificationStore = defineStore("notification", () => {
  const show = ref(false);
  const message = ref("");
  const timeout = ref(NOTIFICATION_TIMEOUT);

  const displayMessage = (newMessage: string, callback?: () => void) => {
    message.value = newMessage;
    show.value = true;

    setTimeout(() => {
      callback?.();
      show.value = false;
    }, NOTIFICATION_TIMEOUT);
  };

  return {
    show,
    message,
    timeout,
    displayMessage,
  };
});
