<script setup>
import moment from 'moment'
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useMPUStore } from '@/stores/mpu'
import { useAuthStore } from '@/stores/auth'

const MPU = useMPUStore()
const Auth = useAuthStore()
const user = ref('')
const router = useRouter()
const search_data = ref('')
const search_type = ref('id_mpu')
const page_number = ref(1)
const total_pages = ref(0)
const row_per_page = ref(50)
const isLoading = ref(true)

const maintenance_facilities = ref({})
const deleteConfirmationModal = ref(false)

const addGet = async () => {
  try {
    if (user.value.role == 'admin') {
      isLoading.value = true
      const data = await MPU.addGet()
      router.push(`maintenance-publications/${data.id_mpu}?isAdd=true`)
    }
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    alert('ERROR ADDGET' + error)
  }
}
const deleteGet = async (e) => {
  if (user.value.role == 'admin') {
    maintenance_facilities.value = e
    deleteConfirmationModal.value = true
  }
}
const deletePost = (id_mpu) => {
  if (user.value.role == 'admin') {
    MPU.removeItem(id_mpu).then(() => {
      deleteConfirmationModal.value = false
    })
  }
}

const firstPage = () => {
  page_number.value = 1
}
const previousPage = () => {
  let page_no = parseInt(page_number.value)
  if (page_no > 1) {
    page_number.value = page_no - 1
  }
}
const nextPage = () => {
  if (page_number.value == '') {
    page_number.value = 1
  }
  let page_no = parseInt(page_number.value)
  if (page_no < total_pages.value) {
    page_number.value = page_no + 1
  }
}
const lastPage = async () => {
  page_number.value = total_pages.value
}

watch(page_number, async (e) => {
  try {
    isLoading.value = true
    await MPU.readItem(search_type.value, search_data.value, e, row_per_page.value)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    alert('FAIL CHANGE PAGE' + error)
  }
})
watch(row_per_page, async (e) => {
  try {
    isLoading.value = true
    if (page_number.value > total_pages.value || page_number.value == '') {
      page_number.value = 1
    }
    const data = await MPU.readItem(search_type.value, search_data.value, page_number.value, e)
    total_pages.value = data
    if (page_number.value > total_pages.value) {
      page_number.value = 1
    }
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    alert('FAIL CHANGE ROW/ PAGE' + error)
  }
})
watch(search_data, async (e) => {
  try {
    isLoading.value = true
    const data = await MPU.readItem(search_type.value, e, page_number.value, row_per_page.value)
    total_pages.value = data
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    alert('FAIL SEARCH DATA' + error)
  }
})
watch(search_type, async (e) => {
  try {
    isLoading.value = true
    const data = await MPU.readItem(e, search_data.value, page_number.value, row_per_page.value)
    total_pages.value = data
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    alert('FAIL SEARCH TYPE' + error)
  }
})

onMounted(async () => {
  try {
    user.value = Auth.items
    const data = await MPU.readItem(
      search_type.value,
      search_data.value,
      page_number.value,
      row_per_page.value
    )
    total_pages.value = data
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    alert('ERROR MOUNTED MAINBOX' + error)
  }
})
</script>
<template>
  <div class="flex mb-5 lg:mb-10 p-5 lg:px-48 bg-white">
    <RouterLink to="/menu" class="flex items-center cursor-pointer group float-left">
      <ArrowLeftIcon
        class="transition duration-500 ease-in-out group-hover:scale-150 float-left hover:text-primary"
      />
    </RouterLink>
    <div class="w-full flex items-center justify-center text-center mx-4">
      <a href="" aria-describedby="title" class="text-base lg:text-xl font-black">
        MAINTENANCE TECHNICAL PUBLICATIONS/LIBRARY INSPECTION
      </a>
    </div>
  </div>
  <div class="px-5 lg:px-48 rounded-lg text-sm lg:text-base pb-[20vh]">
    <div
      class="mx-auto text-gray-600 mb-5 sticky top-0 bg-white z-40 border-2 border-[#d0d3d4] rounded-lg drop-shadow-lg"
    >
      <div class="w-full">
        <div class="grid grid-cols-12">
          <div
            class="flex col-span-12 lg:col-span-6 items-center justify-center lg:pl-5 pl-2 pr-2 pt-2 pb-1"
          >
            <div
              class="-mt-1 mr-2 border rounded-md flex justify-center bg-gray-100 text-gray-800 hover:text-primary hover:bg-gray-200 text-sm cursor-pointer"
            >
              <button
                class="flex items-center mr-3 p-[6px] text-sky-600"
                v-if="user.role == 'admin'"
                @click="addGet"
              >
                <PlusIcon class="w-4 h-4 mr-1" /> Add
              </button>
            </div>
            <div class="items-center justify-center w-full flex h-10">
              <select
                name="row_per_page"
                v-model="row_per_page"
                class="bg-gray-50 border border-gray-300 text-gray-900 pl-1 mr-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block -mt-1 w-[70px] h-9"
              >
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>

              <div class="relative flex items-stretch w-full" id="search-input-group">
                <input
                  type="text"
                  class="block appearance-none border-y border-l rounded-l-lg w-full mb-1 bg-white text-gray-800 border-gray-300 px-2 text-sm leading-normal h-9"
                  v-model="search_data"
                  :placeholder="'Search by ' + search_type"
                  name="search-data"
                />
                <div class="input-group-append">
                  <button
                    v-if="search_data !== ''"
                    class="inline align-middle text-center select-none border-y border-[#d0d3d4] w-10 font-normal whitespace-no-wrap no-underline h-9 mx-auto px-2 leading-tight text-sm"
                    id="clear-btn"
                    @click="search_data = ''"
                  >
                    <DeleteIcon class="w-5 h-5 stroke-2 text-danger mx-auto my-[5px]" />
                  </button>
                </div>
                <div class="input-group-append">
                  <select
                    name="search_type"
                    v-model="search_type"
                    class="inline align-middle text-center select-none border w-14 font-normal whitespace-no-wrap rounded-r-lg no-underline h-9 mx-auto px-0 leading-tight text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 btn-light-bordered"
                  >
                    <option value="id_mpu">ID</option>
                    <option value="company_name">Company Name</option>
                    <option value="certificate_number">Certificate Number</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex col-span-12 lg:col-span-6 items-center justify-center pr-2 lg:pr-5 pl-2 pt-2 pb-1"
          >
            <div id="pagination" class="">
              <div class="inline-flex align-middle leading-tight text-sm">
                <div class="relative inline-flex align-middle py-1 leading-tight text-sm">
                  <a
                    href="javascript:void(0);"
                    class="inline-block align-middle text-center rounded-l-lg select-none border font-normal whitespace-no-wrap h-9 -mt-1 py-1 px-3 leading-normal no-underline bg-gray-100 text-gray-800 hover:bg-gray-200 btn-light-bordered"
                    id="first-page"
                    title="first page"
                    @click="firstPage()"
                  >
                    <SkipBackIcon class="w-4 h-4 mx-auto my-[5px]"
                  /></a>
                  <a
                    href="javascript:void(0);"
                    class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap h-9 -mt-1 py-1 px-3 leading-normal no-underline bg-gray-100 text-gray-800 hover:bg-gray-200 btn-light-bordered"
                    id="previous-page"
                    title="previous page"
                    @click="previousPage()"
                    ><RewindIcon class="w-4 h-4 mx-auto my-[5px]"
                  /></a>
                </div>
                <div class="flex items-stretch w-full">
                  <input
                    type="number"
                    aria-labelledby="pagination"
                    class="block appearance-none w-full mb-1 px-2 bg-white text-gray-800 border-y border-r border-gray-400 text-sm leading-normal"
                    v-model="page_number"
                  />
                  <input
                    type="number"
                    aria-labelledby="pagination"
                    class="block appearance-none w-full px-2 mb-1 bg-gray-200 text-gray-800 border-y border-gray-400 text-sm leading-normal"
                    v-model="total_pages"
                    disabled
                  />
                </div>
                <div class="relative inline-flex align-middle py-1 leading-tight text-sm">
                  <a
                    href="javascript:void(0);"
                    class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap h-9 -mt-1 py-1 px-3 leading-normal no-underline bg-gray-100 text-gray-800 hover:bg-gray-200 btn-light-bordered"
                    id="next-page"
                    title="next page"
                    @click="nextPage()"
                    ><FastForwardIcon class="w-4 h-4 mx-auto my-[5px]"
                  /></a>
                  <a
                    href="javascript:void(0);"
                    class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap h-9 -mt-1 rounded-r-lg py-1 px-3 leading-normal no-underline bg-gray-100 text-gray-800 hover:bg-gray-200 btn-light-bordered"
                    id="last-page"
                    title="last page"
                    @click="lastPage()"
                    ><SkipForwardIcon class="w-4 h-4 mx-auto my-[5px]"
                  /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="item in MPU.items"
      :key="item.id_mpu"
      :item="item"
      class="shadow-card flex bg-white hover:bg-gray-200 w-full group border border-slate-300 hover:border-primary hover:scale-105 transition duration-500 ease-in-out"
    >
      <div class="w-10/12 lg:w-11/12">
        <div class="grid grid-cols-12 text-black px-6 py-2 items-center">
          <div class="col-span-12 lg:col-span-8">
            <span class="text-sm">ID: {{ item.id_mpu }}</span>
            <h3 class="font-semibold">Company Name: {{ item.company_name }}</h3>
            <h6 class="opacity-75 text-sm my-1">
              Certificate Number: {{ item.certificate_number }}
            </h6>
            <div class="flex items-center justify-start">
              <CalendarDaysIcon class="mr-2" />
              <span class="inline">{{ moment(item.date_time).format('DD MMM YYYY HH:mm') }}</span>
            </div>
          </div>
          <div
            v-if="user.role == 'admin'"
            class="col-span-12 lg:col-span-4 items-center lg:justify-end justify-start flex font-medium p-1"
          >
            <div class="flex justify-center">
              <RouterLink
                :to="`maintenance-publications/${item.id_mpu}?isEdit=true`"
                class="flex items-center mr-3 p-2 rounded-md border border-white hover:border-success hover:bg-white hover:text-green-700 text-success"
              >
                <CheckSquareIcon class="w-3 h-3 mr-1" /> Edit
              </RouterLink>
              <a
                class="flex items-center p-2 rounded-md border border-white hover:border-danger hover:bg-white hover:text-red-800 text-danger"
                href="javascript:;"
                @click="deleteGet(item)"
              >
                <Trash2Icon class="w-3 h-3 mr-1" /> Delete
              </a>
            </div>
          </div>
        </div>
      </div>
      <RouterLink
        :to="`maintenance-publications/${item.id_mpu}`"
        class="w-2/12 lg:w-1/12 flex border-l items-center justify-center hover:bg-gray-400 text-primary cursor-pointer"
      >
        <ChevronRightIcon class="group-hover:scale-150" />
      </RouterLink>
    </div>
    <div
      v-show="isLoading"
      wire:loading
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
    >
      <Loader2Icon class="motion-safe:animate-spin stroke-[5px] text-white h-12 w-12 mb-4" />
      <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
      <p class="w-full text-center text-white">
        This may take a few seconds, please don't close this page.
      </p>
    </div>
  </div>
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <Trash2Icon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-lg mt-5">
          Are you sure to remove
          <b> {{ maintenance_facilities.company_name }} </b> with ID
          <b> {{ maintenance_facilities.id_mpu }}</b> ?
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="deleteConfirmationModal = false"
          class="border-2 border-secondary p-2 rounded-md w-24 mr-5"
        >
          Cancel
        </button>
        <button
          type="button"
          class="border bg-danger text-white p-2 rounded-md border-danger w-24"
          @click="deletePost(maintenance_facilities.id_mpu)"
        >
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->
</template>
