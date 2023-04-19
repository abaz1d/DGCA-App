<script>
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const User = useUserStore()
    const Auth = useAuthStore()
    return { User, Auth }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      isDelete: false,
      id: this.user.id_user,
      email: this.user.email_user,
      username: this.user.username,
      role: this.user.role,
      password: '',
      me: ''
    }
  },
  methods: {
    async updateUser() {
      try {
        const data = await this.User.updateItem({
          id_user: this.id,
          email_user: this.email,
          username: this.username,
          role: this.role,
          pasword: this.password
        })
        if (data.success) {
          this.isEdit = false
        } else {
          alert(`${data.data.message}`)
        }
      } catch (error) {
        alert(error)
      }
    },
    deleteUser(id) {
      this.isDelete = false
      setTimeout(() => {
        this.User.removeItem(id)
      }, 300)
    }
  },
  mounted() {
    this.me = this.Auth.items
  }
}
</script>

<template>
  <tr :class="user.id_user == me.userid ? 'text-green-500' : 'text-black'">
    <td class="text-center border-x border-b font-medium border-[#cbd5e9] px-2">
      {{ user.id_user }}
    </td>
    <td v-if="!isEdit" class="text-center border-r border-b font-medium border-[#cbd5e9] px-2">
      {{ user.email_user }}
    </td>
    <td v-else class="text-center border-r border-b font-medium border-[#cbd5e9] px-2">
      <input
        type="text"
        class="relative block w-40 lg:w-full mx-auto rounded-md border-0 m-1 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        v-model="email"
      />
    </td>
    <td v-if="!isEdit" class="text-center border-r border-b font-medium border-[#cbd5e9] px-2">
      {{ user.username }}
    </td>
    <td v-else class="text-center border-r border-b font-medium border-[#cbd5e9] px-2">
      <input
        type="text"
        class="relative block w-40 lg:w-full mx-auto rounded-md border-0 m-1 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        v-model="username"
      />
    </td>
    <td v-if="!isEdit" class="text-center border-r border-b font-medium border-[#cbd5e9] px-2">
      {{ user.role }}
    </td>
    <td v-else class="text-center border-r border-b font-medium border-[#cbd5e9] px-2">
      <select
        :disabled="me.role !== 'admin'"
        v-model="role"
        class="relative block w-40 lg:w-full mx-auto rounded-md border-0 m-1 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        required
      >
        <option value="role" disabled>&gt;-- Select Role &lt;--</option>
        <option value="admin">Admin</option>
        <option value="guest">Guest</option>
      </select>
    </td>
    <td v-if="!isEdit" class="text-center border-r border-b font-medium border-[#cbd5e9] px-2">
      ******
    </td>
    <td v-else class="text-center border-r border-b font-medium border-[#cbd5e9] px-2">
      <input
        type="text"
        class="relative block w-40 lg:w-full mx-auto rounded-md border-0 m-1 mb-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        v-model="password"
      />
      <small class="text-black">*enter your new password to change it!</small>
    </td>
    <td class="min-w-max border-r border-b font-medium border-[#cbd5e9] p-2 w-44">
      <div class="flex justify-center" v-if="!isEdit">
        <a
          @click="isEdit = true"
          class="flex items-center mr-4 hover:text-blue-700 text-sky-600"
          href="javascript:;"
        >
          <CheckSquareIcon class="w-3 h-3 mr-1" /> Edit
        </a>
        <button
          v-if="me.role == 'admin'"
          @click="isDelete = true"
          class="flex items-center hover:text-red-800 text-danger"
        >
          <Trash2Icon class="w-3 h-3 mr-1" /> Delete
        </button>
      </div>
      <div class="flex justify-center" v-else>
        <a
          @click="updateUser"
          class="flex items-center mr-4 hover:text-blue-700 text-sky-600"
          href="javascript:;"
        >
          <CheckSquareIcon class="w-3 h-3 mr-1" /> Save
        </a>
        <a
          @click="isEdit = false"
          class="flex items-center hover:text-yellow-500 text-warning"
          href="javascript:;"
        >
          <Trash2Icon class="w-3 h-3 mr-1" /> Cancel
        </a>
      </div>
    </td>
  </tr>
  <Modal :show="isDelete" @hidden="isDelete = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <TrashIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-black text-xl mt-2">Are you sure to remove {{ user.username }} ?</div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="isDelete = false"
          class="border-2 border-secondary p-2 rounded-md w-24 mr-5"
        >
          Cancel
        </button>
        <button
          type="button"
          class="border bg-danger text-white p-2 rounded-md border-danger w-24"
          @click="deleteUser(user.id_user)"
        >
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
</template>
