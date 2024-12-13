import { useToast } from "primevue/usetoast";

export default function toastMsg() {
  const nuxtApp = useNuxtApp();
  const getToast = () => nuxtApp.vueApp.config.globalProperties.$toast;

  const toast = getToast();

  const toastNotify = (msg, type, time) => {
    toast.add({ severity: `${type}`, summary: msg, life: time || 4000 });
  };

  return { toastNotify };
}
