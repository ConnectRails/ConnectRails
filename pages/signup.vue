<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");

const handleSignUp = async () => {
  const message = apiRef({
    route: "/api/auth/register",
    method: "post",
    defaultValue: null,
  });
  message.value = await $fetch("/api/auth/register", {
    method: "POST",
    body: {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    },
  });

  if (message.value.success) {
    await navigateTo("/signin");
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">
        Sign-Up
      </h2>

      <form @submit.prevent="handleSignUp">
        <div class="mb-4">
          <label for="firstName" class="block text-gray-700 font-medium mb-2"
            >First Name</label
          >
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
            placeholder="First Name"
          />
        </div>

        <div class="mb-4">
          <label for="lastName" class="block text-gray-700 font-medium mb-2"
            >Last Name</label
          >
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
            placeholder="Last Name"
          />
        </div>

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
          Already have an account?
          <router-link
            to="/signin"
            class="text-gray-800 font-medium hover:underline"
            >Sign In
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
