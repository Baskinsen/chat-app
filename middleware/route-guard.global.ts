import useAuthStore from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  try {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.getIsAuthenticated;

    if (
      !isAuthenticated &&
      !["/auth/login", "/auth/signup"].includes(to.path)
    ) {
      return navigateTo("/auth/login");
    }

    if (
      isAuthenticated &&
      ["/auth/login", "/auth/signup", "/verify-email"].includes(to.path)
    ) {
      return navigateTo("/");
    }
  } catch (error) {
    console.error("Error in route middleware:", error);

    return navigateTo("/error");
  }
  return;
});
