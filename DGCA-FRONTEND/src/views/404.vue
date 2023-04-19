<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div id="error">
    <div class="fof">
      <h1 class="font-bold">404</h1>
      <p class="mb-6">The page you are looking for was not found</p>
      <br />
      <RouterLink
        to="/"
        class="border p-2 pr-5 pb-3 border-white bg-primary px-3 items-center text-white hover:border-primary hover:bg-white hover:text-primary rounded-xl font-bold"
      >
        <ArrowLeftIcon class="inline mr-2" /> Kembali
      </RouterLink>
    </div>
  </div>
</template>
<style scoped>
* {
  transition: all 0.6s;
}

html {
  height: 100%;
}

body {
  font-family: 'Lato', sans-serif;
  color: #888;
  margin: 0;
}

#error {
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.fof {
  display: table-cell;
  vertical-align: middle;
}

.fof h1 {
  font-size: 150px;
  display: inline-block;
  padding-right: 12px;
  animation: type 0.5s alternate infinite;
}

@keyframes type {
  from {
    box-shadow: inset -3px 0px 0px #888;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>
