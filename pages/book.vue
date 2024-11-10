<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <div class="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
      <!-- Departure Date Picker -->
      <div class="flex-1">
        <label
          class="min-height-28 font-serif block text-lg font-medium text-gray-700 mb-2"
        >
          Departure
        </label>
        <div class="flex space-x-2">
          <select
            v-model="departure.month"
            @change="handleDepartureChange('month', departure.month)"
            class="flex-1 p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Departure month"
            required
          >
            <option disabled value="">Month</option>
            <option
              v-for="(month, index) in months"
              :key="month"
              :value="index + 1"
            >
              {{ month }}
            </option>
          </select>
          <select
            v-model="departure.day"
            @change="handleDepartureChange('day', departure.day)"
            class="flex-1 p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Departure day"
            required
          >
            <option disabled value="">Day</option>
            <option v-for="day in days" :key="day" :value="day">
              {{ day }}
            </option>
          </select>
          <select
            v-model="departure.year"
            @change="handleDepartureChange('year', departure.year)"
            class="flex-1 p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Departure year"
            required
          >
            <option disabled value="">Year</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <p class="mt-2 text-sm text-gray-600">
          {{ getFormattedDate(departure) }}
        </p>

        <!-- Departure Destination Input -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Departure Destination</label
          >
          <input
            v-model="departureDestination"
            minlength="3"
            maxlength="3"
            class="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-center uppercase text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="XYZ"
            aria-label="Enter departure destination"
            required
          />
        </div>
      </div>
      <!-- Arrival Date Picker -->
      <div class="flex-1">
        <label
          class="min-height-28 font-serif block text-lg font-medium text-gray-700 mb-2"
        >
          Arrival
        </label>
        <div class="flex space-x-2">
          <select
            v-model="arrival.month"
            @change="handleArrivalChange('month', arrival.month)"
            class="flex-1 p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Arrival month"
            required
          >
            <option disabled value="">Month</option>
            <option
              v-for="(month, index) in months"
              :key="month"
              :value="index + 1"
            >
              {{ month }}
            </option>
          </select>
          <select
            v-model="arrival.day"
            @change="handleArrivalChange('day', arrival.day)"
            class="flex-1 p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Arrival day"
            required
          >
            <option disabled value="">Day</option>
            <option v-for="day in days" :key="day" :value="day">
              {{ day }}
            </option>
          </select>
          <select
            v-model="arrival.year"
            @change="handleArrivalChange('year', arrival.year)"
            class="flex-1 p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Arrival year"
            required
          >
            <option disabled value="">Year</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <p class="mt-2 text-sm text-gray-600">
          {{ getFormattedDate(arrival) }}
        </p>

        <!-- Arrival Destination Input -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Arrival Destination</label
          >
          <input
            v-model="arrivalDestination"
            minlength="3"
            maxlength="3"
            class="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-center uppercase text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ABC"
            aria-label="Enter arrival destination"
            required
          />
        </div>
      </div>
    </div>
    <!-- Submit Button -->
    <div class="mt-6">
      <button
        @click="handleSubmit"
        class="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: "/signin",
  },
});

import { ref } from "vue";

const today = new Date();

const handleDepartureChange = (field, value) => {
  departure.value[field] = value;
  if (departure.value.day && departure.value.month && departure.value.year) {
    if (!isFutureOrToday(departure.value)) {
      alert("Departure date cannot be in the past.");
      departure.value[field] = "";
    } else if (!isValidDepartureDate()) {
      alert("Departure date must be before the arrival date.");
      departure.value[field] = "";
    }
  }
};

const handleArrivalChange = (field, value) => {
  arrival.value[field] = value;
  if (arrival.value.day && arrival.value.month && arrival.value.year) {
    if (!isFutureOrToday(arrival.value)) {
      alert("Arrival date cannot be in the past.");
      arrival.value[field] = "";
    } else if (!isValidArrivalDate()) {
      alert("Arrival date must be after the departure date.");
      arrival.value[field] = "";
    }
  }
};

const isFutureOrToday = (date) => {
  if (!date.day || !date.month || !date.year) return true;
  const selectedDate = new Date(
    parseInt(date.year),
    parseInt(date.month) - 1,
    parseInt(date.day),
  );
  return selectedDate >= today;
};

const isValidDepartureDate = () => {
  if (!arrival.value.day || !arrival.value.month || !arrival.value.year)
    return true;
  const departureDate = new Date(
    parseInt(departure.value.year),
    parseInt(departure.value.month) - 1,
    parseInt(departure.value.day),
  );
  const arrivalDate = new Date(
    parseInt(arrival.value.year),
    parseInt(arrival.value.month) - 1,
    parseInt(arrival.value.day),
  );
  return departureDate <= arrivalDate;
};

const isValidArrivalDate = () => {
  if (!departure.value.day || !departure.value.month || !departure.value.year)
    return true;
  const departureDate = new Date(
    parseInt(departure.value.year),
    parseInt(departure.value.month) - 1,
    parseInt(departure.value.day),
  );
  const arrivalDate = new Date(
    parseInt(arrival.value.year),
    parseInt(arrival.value.month) - 1,
    parseInt(arrival.value.day),
  );
  return departureDate <= arrivalDate;
};

const arrival = ref({
  day: "",
  month: "",
  year: "",
});

const departure = ref({
  day: "",
  month: "",
  year: "",
});

const arrivalDestination = ref("");
const departureDestination = ref("");

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 101 }, (_, i) =>
  (currentYear + i).toString(),
);

const getFormattedDate = (date) => {
  return date.day && date.month && date.year
    ? `${months[parseInt(date.month) - 1]} ${date.day}, ${date.year}`
    : "";
};

const handleSubmit = async () => {
  // Check if all required fields are filled
  if (
    !arrival.value.day ||
    !arrival.value.month ||
    !arrival.value.year ||
    !departure.value.day ||
    !departure.value.month ||
    !departure.value.year ||
    !arrivalDestination.value ||
    !departureDestination.value
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  const arrivalDate = new Date(
    parseInt(arrival.value.year),
    parseInt(arrival.value.month) - 1,
    parseInt(arrival.value.day),
  )
    .toISOString()
    .split(".")[0];
  const departureDate = new Date(
    parseInt(departure.value.year),
    parseInt(departure.value.month) - 1,
    parseInt(departure.value.day),
  )
    .toISOString()
    .split(".")[0];

  console.log("Departure Date:", departureDate);
  console.log("Arrival Date:", arrivalDate);
  console.log("Departure Destination:", departureDestination.value);
  console.log("Arrival Destination:", arrivalDestination.value);

  const message = apiRef({
    route: "/api/schedule",
    method: "get",
    defaultValue: null,
  });
  message.value = await $fetch("/api/schedule", {
    method: "GET",
    query: {
      origin: departureDestination.value,
      destination: arrivalDestination.value,
      startDate: departureDate,
      endDate: arrivalDate,
    },
  });
  console.log(message.value);
};
</script>

<style>
body {
  background: linear-gradient(to bottom right, #e0e0e0, #f0f0f0);
  font-family: Arial, sans-serif;
}

/* Smooth shadow effect on the main container */
.shadow-md {
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
}

.backdrop-filter {
  backdrop-filter: blur(10px);
}
</style>
