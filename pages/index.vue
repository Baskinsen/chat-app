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
      <p class="mt-10 text-slate-800 text-lg dark:text-slate-100">
        This is a Starter
      </p>
      <p>Welcome {{ user.first_name }} {{ user.last_name }}</p>
      <p>Status: {{ isConnected ? "connected" : "disconnected" }}</p>
      <p>Transport: {{ transport }}</p>
    </UCard>
  </UContainer>
</template>

<script setup>
import useAuthStore from "~/store/auth";
import { socket } from "~/components/socket";

definePageMeta({
  title: "Home",
  description: "Welcome to Nuxt UI Starter",
  scrollToTop: true,
});

const isConnected = ref(false);
const transport = ref("N/A");

if (socket.connected) {
  onConnect();
}

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;

  socket.io.engine.on("upgrade", (rawTransport) => {
    transport.value = rawTransport.name;
  });
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = "N/A";
}

socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);

onBeforeUnmount(() => {
  socket.off("connect", onConnect);
  socket.off("disconnect", onDisconnect);
});
const authStore = useAuthStore();
const user = authStore?.getUser !== null ? authStore?.getUser : null;
</script>
