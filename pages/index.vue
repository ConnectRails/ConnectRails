<template>
  <div class="bg-gradient-to-b from-gray-200 to-gray-400">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav
        class="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-20 w-auto" src="/logo.png" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="text-sm/6 font-semibold text-gray-800 hover:text-gray-600"
            >{{ item.name }}</a
          >
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <router-link
            to="/signin"
            class="text-sm/6 font-semibold text-gray-800 hover:text-gray-600"
            >Log in <span aria-hidden="true">&rarr;</span></router-link
          >
        </div>
      </nav>
      <Dialog
        class="lg:hidden"
        @close="mobileMenuOpen = false"
        :open="mobileMenuOpen"
      >
        <div class="fixed inset-0 z-50 bg-gray-800 bg-opacity-50" />
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 ring-gray-700"
        >
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="/logo.png" alt="" />
            </a>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-700"
              @click="mobileMenuOpen = false"
            >
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-300">
              <div class="space-y-2 py-6">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-800 hover:bg-gray-200"
                  >{{ item.name }}</a
                >
              </div>
              <div class="py-6">
                <router-link
                  to="/signin"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-800 hover:bg-gray-200"
                >
                  Log in
                </router-link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
          <h1
            class="text-5xl font-semibold tracking-tight text-gray-800 sm:text-7xl"
          >
            Want cheaper Amtrak tickets?
          </h1>
          <p class="mt-8 text-lg font-medium text-gray-600 sm:text-xl/8">
            We help match you with other passengers so you can always enjoy a
            group order discount!
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <!-- Book Now button now uses router-link for internal navigation -->
            <router-link
              to="/book"
              class="rounded-md bg-gray-700 px-5 py-3 text-lg font-semibold text-white shadow-lg hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
            >
              Book Now!
            </router-link>
            <a
              href="#"
              class="text-sm/6 font-semibold text-gray-800 hover:text-gray-600"
              >Learn more <span aria-hidden="true">→</span></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
