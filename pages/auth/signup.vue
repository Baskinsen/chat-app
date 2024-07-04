<template>
  <div class="flex w-full h-screen items-center flex-col m-auto">
    <div
      class="relative m-auto shadow-md flex flex-col gap-10 px-10 py-10 bg-gray-200"
    >
      <h1 class="text-center text-xl font-semibold">Create an Account</h1>
      <form
        class="flex flex-col gap-5 max-w-[500px]"
        @submit.prevent="handleSubmit()"
      >
        <section class="flex flex-col gap-[10px]">
          <label for="email" class="text-lg">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="credentials.email"
            required
            class="w-full rounded-md px-5 py-3"
            placeholder="johndoe12"
          />
        </section>
        <section class="flex flex-col gap-[10px]">
          <div class="flex justify-between">
            <label for="username" class="text-lg">Username</label>
          </div>
          <input
            type="text"
            id="username"
            name="username"
            v-model="credentials.username"
            required
            class="w-full rounded-md px-5 py-3"
            placeholder="********"
          />
        </section>
        <section class="flex flex-col gap-[10px]">
          <div class="flex justify-between">
            <label for="firstname" class="text-lg">First Name</label>
          </div>
          <input
            type="text"
            id="firstname"
            name="firstname"
            v-model="credentials.first_name"
            required
            class="w-full rounded-md px-5 py-3"
            placeholder="********"
          />
        </section>
        <section class="flex flex-col gap-[10px]">
          <div class="flex justify-between">
            <label for="lastname" class="text-lg">Last Name</label>
          </div>
          <input
            type="text"
            id="lastname"
            name="lastname"
            v-model="credentials.last_name"
            required
            class="w-full rounded-md px-5 py-3"
            placeholder="********"
          />
        </section>
        <section class="flex flex-col gap-[10px]">
          <div class="flex justify-between">
            <label for="password" class="text-lg">Password</label>
            <a href="/auth/forgot-password" class="text-[#60A5FA] my-auto"
              >Forgot Password?</a
            >
          </div>

          <input
            type="password"
            id="password"
            name="password"
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
          <a href="/auth/login" class="my-auto text-[#60A5FA]"
            >Have an Account? Sign In</a
          >
        </section>
      </form>
    </div>
  </div>
  <!-- <UNotifications /> -->
</template>

<script setup >

definePageMeta({
  title: "Sign Up",
  // middleware: ['route-guard']
})
const toast = useToast();

// interface credentials {
//   username: string;
//   password: string;
//   email: string;
//   first_name: string;
//   last_name: string;
// }

// interface request {
//   method: string;
//   body: {
//     username: string;
//     password: string;
//     email: string;
//     first_name: string;
//     last_name: string;
//   };
// }

const credentials = ref({
  username: "",
  password: "",
  email: "",
  first_name: "",
  last_name: "",
});

const handleSubmit = async () => {
  try {
    const { data } = useFetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(credentials.value),
    });
    console.log(data)
    // toast.add({
    //   id: "sign_up",
    //   title: data.statusText,
    //   description: data.statusMessage,
    //   icon: "i-flat-color-icons:checkmark",
    //   timeout: 2000,
    //   color: "green",
    // })
  } catch (err) {
    console.log(err);
    // toast.add({
    //   id: "sign_up",
    //   title: err.statusText,
    //   description: err.message,
    //   icon: "i-flat-color-icons:high-priority",
    //   timeout: 2000,
    //   color: "red",
    // });
  }
};
</script>

<style></style>
