
// pinia store
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {

// Store
const store = useAuthStore();
const { token , showLoginModal } = storeToRefs(store);

if (!token.value && to.meta.authIsRequired) {
// showLoginModal.value += 1;
if (process.client){


    return navigateTo('/auth/login');
  

}
}
});