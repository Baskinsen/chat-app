

<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="bg-white p-4 rounded-lg shadow-lg"
      v-show="response?.value?.success"
    >
      <p class="text-xl text-blue-700 text-center">
        {{ response?.value?.message }}
      </p>
      <NuxtLink  to="/auth/login">
        <button class="bg-blue-700 text-white px-4 py-2 mt-4 rounded-lg">
          Login
        </button>
        </NuxtLink>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
<script setup>
const route = useRoute();
const router = useRouter();
const token = route.query.emailToken;
let response = ref(null);



definePageMeta({
  title: "Verify Email",

  middleware: ['route-guard']
})

onBeforeMount(async () => {
  if (!token) {
    router.push("/");
  }

  //   interface headers {
  //     [key: string]: string;
  //   }
  try {
    const { data, error } = await useFetch(
      '/api/auth/verify',
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailToken: token }),
      }
    );
      response.value = data;
    if (!error?.value === null || undefined) {
      response.value = error
    }
  } catch (error) {
    console.log(error);
  }
});
console.log(response?.value)
</script>
