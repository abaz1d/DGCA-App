<script setup>
import NavBox from '@/components/BottomNav/NavBox.vue'
</script>

<template>
  <RouterView />
  <NavBox
    v-if="
      $route.name !== 'login' &&
      $route.name !== 'print-maintenance-facility' &&
      $route.name !== 'print-maintenance-personnel' &&
      $route.name !== 'print-maintenance-publications'
    "
  />
</template>
