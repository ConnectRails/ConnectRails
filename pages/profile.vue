<script setup>
definePageMeta({
  middleware: "auth",
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: "/signin",
  },
});

const { status, data, lastRefreshedAt, getSession, signIn, signOut } =
  useAuth();

import { ref } from "vue";

const email = ref(data.value.user.email);
const currentPassword = ref("");
const newPassword = ref("");
const firstName = ref(data.value.user.firstName);
const lastName = ref(data.value.user.lastName);

const handleUpdate = async () => {
  const message = apiRef({
    route: "/api/auth/update",
    method: "put",
    defaultValue: null,
  });
  message.value = await $fetch("/api/auth/update", {
    method: "PUT",
    body: {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: currentPassword.value,
      newPassword: newPassword.value,
    },
  });

  if (message.value.success) {
    await signOut({
      redirect: true,
      callbackUrl: "signin",
    });
  }
};
</script>
<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div v-if="status === 'loading'" class="flex justify-center">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
      />
    </div>
    <form @submit.prevent="handleUpdate">
      <div class="space-y-8">
        <div>
          <h2 class="text-base font-semibold text-gray-900">Profile</h2>
          <div class="mt-6 grid grid-cols-12 gap-8">
            <!-- Form Fields Column -->
            <div class="col-span-8">
              <!-- First Name -->
              <div class="mb-6">
                <label
                  for="first-name"
                  class="block text-sm font-medium text-gray-900"
                  >First name</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    v-model="firstName"
                    required
                  />
                </div>
              </div>

              <!-- Last Name -->
              <div class="mb-6">
                <label
                  for="last-name"
                  class="block text-sm font-medium text-gray-900"
                  >Last name</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autocomplete="family-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    v-model="lastName"
                    required
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="mb-6">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-900"
                  >Email address</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    v-model="email"
                    required
                  />
                </div>
              </div>

              <div class="mb-6">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-900"
                  >Current password</label
                >
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="password"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    v-model="currentPassword"
                    required
                  />
                </div>
              </div>

              <!-- Change Password -->
              <div class="mb-6">
                <label
                  for="newPassword"
                  class="block text-sm font-medium text-gray-900"
                  >Change password</label
                >
                <div class="mt-2">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autocomplete="new-password"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    v-model="newPassword"
                  />
                </div>
              </div>
            </div>

            <!-- Image Column -->
            <div class="col-span-4 flex items-start justify-center pt-8">
              <img class="w-300 h-auto" src="/e_1.png" alt="Profile image" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="button"
          class="content-center text-sm font-semibold text-gray-900"
          @click="useRouter().reload()"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="content-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
