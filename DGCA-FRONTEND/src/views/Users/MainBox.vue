<script setup>
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import UserItem from './UserItem.vue'

const User = useUserStore()
const Auth = useAuthStore()
const isAdd = ref(false)
const isOut = ref(false)
const isLoading = ref(true)
const email_user = ref('')
const username = ref('')
const role = ref('role')
const user = ref('')
const password = ref('')
const addUser = () => {
  User.addItem(username.value, email_user.value, role.value, password.value)
    .then(() => {
      username.value = ''
      email_user.value = ''
      role.value = 'role'
      password.value = ''
      isAdd.value = false
    })
    .catch((error) => {
      alert('ERROR SAVE USER' + error)
    })
}
onMounted(async () => {
  try {
    user.value = Auth.items
    await User.readItem()

    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    alert('ERROR MOUNTED MAINBOX' + error)
  }
})
</script>
<template>
  <div class="flex mb-5 lg:mb-10 p-5 lg:px-48 bg-white">
    <div
      v-if="user.role == 'admin'"
      @click="isAdd = true"
      class="flex items-center text-white bg-primary rounded-md p-2 cursor-pointer group float-right transition duration-500 ease-in-out group-hover:scale-150 hover:bg-blue-800"
    >
      <PlusIcon class="lg:mr-2" />
      <span class="hidden lg:inline mr-2">Add</span>
    </div>
    <div class="w-full flex items-center justify-center text-center mx-4">
      <a href="" aria-describedby="title" class="text-base lg:text-xl font-black"> USERS MENU </a>
    </div>
    <div
      @click="isOut = true"
      class="flex items-center text-white bg-danger rounded-md p-2 cursor-pointer group float-right transition duration-500 ease-in-out group-hover:scale-150 hover:bg-red-800"
    >
      <span class="hidden lg:inline">LogOut</span>
      <LogOutIcon class="lg:ml-2" />
    </div>
  </div>
  <div class="px-5 lg:px-48 rounded-lg text-sm lg:text-basel pb-[20vh]">
    <div class="shadow-card p-5 flex bg-white group hover:border-primary w-full overflow-x-scroll">
      <table class="w-full text-base text-left text-gray-500">
        <thead class="text-base font-bold text-gray-800 uppercase bg-blue-200 sticky top-0 z-10">
          <tr>
            <th
              scope="col"
              class="text-center uppercase border w-96 cursor-pointer hover:bg-blue-300"
            >
              ID
            </th>
            <th
              scope="col"
              class="text-center uppercase border w-96 cursor-pointer hover:bg-blue-300"
            >
              Email
            </th>
            <th
              scope="col"
              class="text-center uppercase border w-96 cursor-pointer hover:bg-blue-300"
            >
              Username
            </th>
            <th
              scope="col"
              class="text-center uppercase border w-96 cursor-pointer hover:bg-blue-300"
            >
              Role
            </th>
            <th
              scope="col"
              class="text-center uppercase border w-96 cursor-pointer hover:bg-blue-300"
            >
              Password
            </th>
            <th scope="col" class="text-center uppercase border w-96">Actions</th>
          </tr>
        </thead>
        <tbody class="overflow-y-scroll" v-show="!isLoading">
          <UserItem
            v-for="(user, index) in User.items.filter((items) => {
              return user.role !== 'admin' ? items.id_user == user.userid : items
            })"
            :key="index"
            :user="user"
          />
        </tbody>
        <tbody v-show="isLoading">
          <div
            class="fixed intleft-2 right-0 top-0 bottom-0 w-full h-[100vh] z-50 overflow-hidden bg-gray-500 opacity-75 flex flex-col items-center justify-center"
          >
            <Loader2Icon class="motion-safe:animate-spin stroke-[5px] text-white h-12 w-12 mb-4" />
            <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
            <p class="w-full text-center text-white">
              This may take a few seconds, please don't close this page.
            </p>
          </div>
        </tbody>
      </table>
    </div>
  </div>
  <Modal :show="isOut" @hidden="isOut = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <LogOutIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-black text-xl mt-2">Are you sure you want to exit ?</div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="isOut = false"
          class="border-2 border-secondary p-2 rounded-md w-24 mr-5"
        >
          Cancel
        </button>
        <button
          type="button"
          class="border bg-danger text-white p-2 rounded-md border-danger w-24"
          @click=";(isOut = false), Auth.logout()"
        >
          Logout
        </button>
      </div>
    </ModalBody>
  </Modal>
  <Modal :show="isAdd" @hidden="isAdd = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <form class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-4">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-1 lg:mb-2"
                for="grid-last-name"
              >
                Email
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="email"
                v-model="email_user"
                placeholder="Email"
              />
            </div>
            <div class="w-full md:w-1/2 px-3 mb-4">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-1 lg:mb-2"
                for="grid-last-name"
              >
                Username
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                v-model="username"
                placeholder="Username"
              />
            </div>
            <div class="w-full md:w-1/2 px-3 mb-4">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-1 lg:mb-2"
                for="grid-last-name"
              >
                Role
              </label>
              <select
                v-model="role"
                class="appearance-none block w-full bg-gray-200 text-gray-700 text-center border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              >
                <option value="role" disabled>&gt;-- Select Role &lt;--</option>
                <option value="admin">Admin</option>
                <option value="guest">Guest</option>
              </select>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-4">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-1 lg:mb-2"
                for="grid-last-name"
              >
                Password
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                v-model="password"
                placeholder="******************"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="isAdd = false"
          class="border-2 border-secondary p-2 rounded-md w-24 mr-5"
        >
          Cancel
        </button>
        <button
          type="button"
          class="border bg-primary text-white p-2 rounded-md border-primary w-24"
          @click="addUser"
        >
          Save
        </button>
      </div>
    </ModalBody>
  </Modal>
</template>
