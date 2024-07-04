import useAuthStore from "~/store/auth"

export default defineNuxtRouteMiddleware((to, from)=> {
    const authStore = useAuthStore()
    if(authStore.getIsAuthenticated === false){
        return navigateTo('/auth/login')
    }
    if(to.path === '/auth/login' || to.path === '/auth/signup' || to.path === 'verify-email') {
        return  navigateTo('/')
    }
    return navigateTo(to.fullPath)
})