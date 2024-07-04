<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Welcome to Nuxt UI Starter</h1>
          <ColorScheme
            ><USelect
              v-model="$colorMode.preference"
              :options="['system', 'light', 'dark']"
          /></ColorScheme>
        </div>
      </template>
      <UButton
        icon="i-heroicons-book-open"
        to="https://ui.nuxt.com"
        target="_blank"
        >Open Nuxt UI Documentation</UButton
      >
      <p class="mt-10 text-slate-800 text-lg">This is a Starter</p>
      <p>Welcome {{ user.first_name }} {{ user.last_name }}</p>
    </UCard>
  </UContainer>
</template>

<script setup>
import useAuthStore from "~/store/auth"

  definePageMeta({
    title: "Home",
    description: "Welcome to Nuxt UI Starter",

    scrollToTop: true
  
  })
  const authStore = useAuthStore()
  console.log(authStore.getUser)
  const user = authStore.getUser
  console.log(user)

</script>