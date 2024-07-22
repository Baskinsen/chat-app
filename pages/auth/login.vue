<template>
  <div class="flex w-full h-screen items-center flex-col m-auto">
    <div class="m-auto shadow-md flex flex-col gap-10 px-10 py-10 bg-gray-200">
      <h1 class="text-center text-xl font-semibold">Sign In</h1>
      <form
        class="flex flex-col gap-10 max-w-[500px]"
        @submit.prevent="handleSubmit()"
      >
        <section class="flex flex-col gap-5">
          <label for="username" class="text-lg">Username</label>
          <input
            type="text"
            id="username"
            v-model="credentials.username"
            required
            class="w-full rounded-md px-5 py-3"
            placeholder="johndoe12"
          />
        </section>
        <section class="flex flex-col gap-5">
          <div class="flex justify-between">
            <label for="password" class="text-lg">Password</label>
            <a href="/auth/forgot-password" class="text-[#60A5FA] my-auto"
              >Forgot Password?</a
            >
          </div>

          <input
            type="password"
            id="password"
            v-model="credentials.password"
            required
            class="w-full rounded-md px-5 py-3"
            placeholder="********"
          />
        </section>
        <section class="flex gap-20 justify-between">
          <button
            class="bg-green-300 px-10 py-3 rounded-md text-[#fafafa]"
            type="submit"
          >
            Sign In
          </button>
          <a href="/auth/signup" class="my-auto text-[#60A5FA]"
            >Dont Have an Account? Sign Up</a
          >
        </section>
      </form>
    </div>
  </div>
  <UNotifications />
</template>

<script setup lang="ts">
import useAuthStore from "~/store/auth";

useHead({
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login to your account",
    },
  ],
});
definePageMeta({
  // middleware: ['route-guard']
});
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
// interface credentials {
//     username: string;
//     password: string;
// }

const credentials = ref({
  username: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    const response: any = await $fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials.value),
    });
    console.log(response);
    authStore.isAuthenticated = true;
    toast.add({
      id: "login",
      title: response.statusText,
      description: response.statusMessage,
      icon: "i-heroicons-check-circle",
      color: "primary",
      timeout: 1500,
      callback: () => {
        window.location.reload()
        router.push("/");
      },
    });
  } catch (err: any) {
    console.log(err);
    toast.add({
      id: "login",
      title: "Failed",
      description: err.statusMessage,
      icon: " i-heroicons-information-circle-solid",
      color: "rose",
      timeout: 1500,
    });
  }
};
</script>

<style></style>
