<template>
  <div class="relative">
    <!-- Date Selection Inputs -->
    <div class="flex space-x-4 mt-4">
      <!-- Departure Date -->
      <div class="relative flex flex-col items-start">
        <label class="block font-semibold text-gray-800 mb-1">Departure Date</label>
        <input
          type="text"
          :value="formattedDate"
          readonly
          @click="isOpen = !isOpen"
          class="w-48 py-2 px-3 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
          placeholder="Select a date"
        />
        <button
          type="button"
          @click="isOpen = !isOpen"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </button>
      </div>

      <!-- Return Date -->
      <div class="relative flex flex-col items-start">
        <label class="block font-semibold text-gray-800 mb-1">Return Date</label>
        <input
          type="text"
          :value="formattedDate"
          readonly
          @click="isOpen = !isOpen"
          class="w-48 py-2 px-3 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
          placeholder="Select a date"
        />
        <button
          type="button"
          @click="isOpen = !isOpen"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </button>
      </div>
    </div>

    <!-- Calendar Dropdown -->
    <div v-if="isOpen" class="absolute top-24 w-80 right-0 flex flex-col bg-white border shadow-lg rounded-xl overflow-hidden z-50">
      <!-- Calendar Content -->
       <!-- Calendar -->
      <div class="p-3 space-y-0.5">
        <!-- Month/Year Selection -->
        <div class="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
          <!-- Previous Button -->
          <div class="col-span-1">
            <button
              type="button"
              class="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
              @click="previousMonth"
              :disabled="isNavigationDisabled"
            >
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          </div>

          <!-- Month/Year Selectors -->
          <div class="col-span-3 flex justify-center items-center gap-x-1">
            <select
              v-model="displayMonth"
              class="cursor-pointer text-sm font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <option v-for="(month, index) in months" :key="index" :value="index">
                {{ month }}
              </option>
            </select>

            <span class="text-gray-800">/</span>

            <select
              v-model="displayYear"
              class="cursor-pointer text-sm font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <!-- Next Button -->
          <div class="col-span-1 flex justify-end">
            <button
              type="button"
              class="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
              @click="nextMonth"
              :disabled="isNavigationDisabled"
            >
              <svg class="shrink-0 size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <!-- Weekdays -->
        <div class="flex pb-1.5">
          <span
            v-for="day in weekDays"
            :key="day"
            class="m-px w-10 block text-center text-sm text-gray-500"
          >
            {{ day }}
          </span>
        </div>

        <!-- Calendar Grid -->
        <div v-for="week in calendarDays" :key="week[0].date" class="flex">
          <div
            v-for="day in week"
            :key="day.date"
            :class="[
              'relative',
              day.isCurrentMonth ? '' : 'opacity-50'
            ]"
          >
            <button
              type="button"
              @click="selectDate(day)"
              :disabled="!day.isCurrentMonth"
              :class="[
                'm-px size-10 flex justify-center items-center border border-transparent text-sm rounded-full',
                day.isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-800 hover:bg-gray-100',
                day.isToday ? 'font-semibold' : '',
                'disabled:opacity-50 disabled:pointer-events-none focus:outline-none'
              ]"
            >
              {{ day.dayNumber }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="py-3 px-4 flex items-center justify-end gap-x-2 border-t border-gray-200">
        <button
          type="button"
          @click="cancel"
          class="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="apply"
          class="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue', 'cancel', 'apply']);

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

const isOpen = ref(false);
const selectedDate = ref(props.modelValue[0]?.getTime() || null);
const displayMonth = ref(new Date().getMonth());
const displayYear = ref(new Date().getFullYear());

const isNavigationDisabled = computed(() => false);

const formattedDate = computed(() => {
  if (!selectedDate.value) return '';
  const date = new Date(selectedDate.value);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const calendarDays = computed(() => {
  const firstDay = new Date(displayYear.value, displayMonth.value, 1);
  const lastDay = new Date(displayYear.value, displayMonth.value + 1, 0);
  
  let date = new Date(firstDay);
  date.setDate(date.getDate() - (date.getDay() || 7) + 1);
  
  const weeks = [];
  while (date <= lastDay || weeks.length < 6) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(date);
      week.push({
        date: currentDate,
        dayNumber: currentDate.getDate(),
        isCurrentMonth: currentDate.getMonth() === displayMonth.value,
        isToday: isSameDay(currentDate, new Date()),
        isSelected: selectedDate.value === currentDate.getTime()
      });
      date.setDate(date.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
});

function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}

function selectDate(day) {
  const timestamp = day.date.getTime();
  selectedDate.value = selectedDate.value === timestamp ? null : timestamp;
}

function previousMonth() {
  if (displayMonth.value === 0) {
    displayMonth.value = 11;
    displayYear.value--;
  } else {
    displayMonth.value--;
  }
}

function nextMonth() {
  if (displayMonth.value === 11) {
    displayMonth.value = 0;
    displayYear.value++;
  } else {
    displayMonth.value++;
  }
}

function cancel() {
  selectedDate.value = null;
  isOpen.value = false;
  emit('cancel');
}

function apply() {
  const dateArray = selectedDate.value ? [new Date(selectedDate.value)] : [];
  isOpen.value = false;
  emit('update:modelValue', dateArray);
  emit('apply', dateArray);
}
</script>