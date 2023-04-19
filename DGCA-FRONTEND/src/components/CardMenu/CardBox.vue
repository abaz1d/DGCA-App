<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="m-5 lg:m-20 lg:mx-48">
    <RouterLink to="menu">
      <div
        class="shadow-card flex rounded-xl bg-white hover:bg-gray-200 w-full cursor-pointer my-2 group border border-slate-300 hover:border-primary hover:scale-105 transition duration-500 ease-in-out"
      >
        <div class="w-10/12 lg:w-11/12">
          <div class="text-black flex-1 p-6 items-center">
            <a href="javascript:void(0);" aria-describedby="title">
              <h3 class="font-bold text-sm lg:text-base">
                PART 121/135 AOC CERTIFICATION AND SURVEILLANCE CHECKLIST
              </h3>
            </a>
          </div>
        </div>
        <div class="w-2/12 lg:w-1/12 flex border-l items-center justify-center text-primary">
          <ChevronRightIcon class="group-hover:scale-125" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>
