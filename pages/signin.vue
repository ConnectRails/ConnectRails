<script setup>
definePageMeta({
  middleware: "auth",
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/" },
});

import { ref } from "vue";

const email = ref("");
const password = ref("");

async function handleLogin() {
  try {
    await signIn("credentials", {
      email: email.value,
      password: password.value,
      redirect: true,
      callbackUrl: "/",
    });
  } catch (e) {
    console.error("Login error:", e);
  }
}

const { signIn } = useAuth();
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">
        Login
      </h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
            placeholder="Enter your email"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-2"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-gray-700 text-white font-semibold py-2 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Login
        </button>
      </form>

      <div class="text-center mt-4">
        <p class="text-sm text-gray-600">
          Don’t have an account?
          <router-link
            to="/signup"
            class="text-gray-800 font-medium hover:underline"
            >Sign up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
