<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="flex mb-10 p-5 lg:px-48 bg-white">
    <RouterLink to="/" class="flex items-center cursor-pointer group float-left">
      <ArrowLeftIcon
        class="transition duration-500 ease-in-out group-hover:scale-150 float-left hover:text-primary"
      />
    </RouterLink>
    <div class="w-full flex items-center justify-center text-center mx-4">
      <a href="" class="text-base lg:text-xl font-extrabold" aria-describedby="title">
        PART 121/135 AOC CERTIFICATION AND SURVEILLANCE CHECKLIST</a
      >
    </div>
  </div>
  <div class="px-5 lg:px-48 rounded-lg text-sm lg:text-base">
    <RouterLink to="maintenance-facility">
      <div
        class="shadow-card flex rounded-xl bg-white hover:bg-gray-200 w-full cursor-pointer my-2 group border border-slate-300 hover:border-primary hover:scale-105 transition duration-500 ease-in-out"
      >
        <div class="w-10/12 lg:w-11/12">
          <div class="text-black flex-1 p-6 items-center">
            <a href="javascript:void(0);" aria-describedby="title">
              <h3 class="font-semibold">MAINTENANCE FACILITIES EVALUATION</h3>
            </a>
          </div>
        </div>
        <div class="w-2/12 lg:w-1/12 flex border-l items-center justify-center text-primary">
          <ChevronRightIcon class="group-hover:scale-125" />
        </div>
      </div>
    </RouterLink>
    <RouterLink to="maintenance-personnel">
      <div
        class="shadow-card flex rounded-xl bg-white hover:bg-gray-200 w-full cursor-pointer my-2 group border border-slate-300 hover:border-primary hover:scale-105 transition duration-500 ease-in-out"
      >
        <div class="w-10/12 lg:w-11/12">
          <div class="text-black flex-1 p-6 items-center">
            <a href="javascript:void(0);" aria-describedby="title">
              <h3 class="font-semibold">
                MAINTENANCE PERSONNEL TRAINING PROGRAM, QUALIFICATION AND RECORD
              </h3>
            </a>
          </div>
        </div>
        <div class="w-2/12 lg:w-1/12 flex border-l items-center justify-center text-primary">
          <ChevronRightIcon class="group-hover:scale-125" />
        </div>
      </div>
    </RouterLink>
    <RouterLink to="maintenance-publications">
      <div
        class="shadow-card flex rounded-xl bg-white hover:bg-gray-200 w-full cursor-pointer my-2 group border border-slate-300 hover:border-primary hover:scale-105 transition duration-500 ease-in-out"
      >
        <div class="w-10/12 lg:w-11/12">
          <div class="text-black flex-1 p-6 items-center">
            <a href="javascript:void(0);" aria-describedby="title">
              <h3 class="font-semibold">MAINTENANCE TECHNICAL PUBLICATIONS/LIBRARY INSPECTION</h3>
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
