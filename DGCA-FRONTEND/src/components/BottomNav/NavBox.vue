<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full h-[85px] bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600"
  >
    <p class="text-center text-sm border-b opacity-70 text-slate-600">
      Created by: Indah Khairunnisa
    </p>
    <div class="grid h-[90%] max-w-lg grid-cols-2 mx-auto font-medium">
      <RouterLink
        to="/"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <HomeIcon
          class="w-6 h-6 mb-1 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          :class="$route.name != 'users' ? 'text-blue-500' : 'text-gray-500'"
        />
        <span
          class="text-sm dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          :class="$route.name != 'users' ? 'text-blue-500' : 'text-gray-500'"
          >Home</span
        >
      </RouterLink>
      <RouterLink
        to="/users"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <UserIcon
          class="w-6 h-6 mb-1 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          :class="$route.name == 'users' ? 'text-blue-500' : 'text-gray-500'"
        />
        <span
          class="text-sm dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          :class="$route.name == 'users' ? 'text-blue-500' : 'text-gray-500'"
          >Profile</span
        >
      </RouterLink>
    </div>
  </div>
</template>
