<script setup>
import { createElement, Eye, EyeOff } from 'lucide'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref, watch } from 'vue'
import dom from '@left4code/tw-starter/dist/js/dom'
const Auth = useAuthStore()
const isLoading = ref(false)
const gagalLogin = ref(false)
const dataPopup = ref('')
const input_user = ref('')
const input_password = ref('')

const showPassword = () => {
  const password = document.querySelector('.js-password'),
    passwordLabel = document.querySelector('.js-password-label')

  if (password.type === 'password') {
    password.type = 'text'
    passwordLabel.replaceChild(createElement(EyeOff), passwordLabel.childNodes[0])
  } else {
    password.type = 'password'
    passwordLabel.replaceChild(createElement(Eye), passwordLabel.childNodes[0])
  }
  password.focus()
}

watch(isLoading, async (newValue) => {
  try {
    if (newValue === true) {
      setTimeout(() => onLogin(), 100)
    }
  } catch (error) {
    alert('Failed Login' + error)
  }
})

const onLogin = () => {
  const email_user = input_user.value
  const password = input_password.value
  if (email_user.length > 0 && password.length > 0) {
    Auth.login(email_user, password)
      .then((data) => {
        if (data.success == false) {
          dataPopup.value = data.data.message
          gagalLogin.value = true
          if (data.data.message == 'unregistered username/e-mail') {
            input_user.value = ''
            input_password.value = ''
            alert('unregistered username/e-mail')
          } else {
            input_password.value = ''
            alert('wrong password')
          }
        }
        isLoading.value = false
      })
      .catch((error) => {
        alert('Gagal Login ' + JSON.stringify(error))
        isLoading.value = false
      })
  } else {
    dataPopup.value = 'Email/Username dan Password tidak boleh kosong !'
    gagalLogin.value = true
    isLoading.value = false
  }
}
onMounted(() => {
  dom('body').removeClass('main').removeClass('error-page').addClass('login')
})
</script>
<template>
  <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-28 w-auto" src="@/assets/images/logo512.png" alt="Your Company" />
        <h1 class="mt-4 text-center text-xl font-bold tracking-tight text-gray-900 uppercase">
          Kantor Otoritas Bandara Wilayah V
        </h1>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email/ Username</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="input_user"
              class="relative block w-full rounded-t-md p-2 h-12 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Email/ Username"
            />
          </div>
          <div class="intro-x relative w-full">
            <div class="absolute inset-y-0 right-0 flex items-center px-2">
              <input
                class="hidden js-password-toggle"
                @click="showPassword()"
                id="toggle"
                type="checkbox"
              />
              <label
                class="bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                for="toggle"
              >
                <EyeIcon />
              </label>
            </div>
            <input
              @keyup.enter="isLoading = true"
              v-model="input_password"
              class="w-full p-2 h-12 rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 pr-16 js-password"
              id="password"
              type="password"
              autocomplete="off"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-primary hover:text-blue-500"
              aria-describedby="forget"
              >Forgot your password?</a
            >
          </div>
        </div>

        <div>
          <button
            v-if="isLoading"
            type="submit"
            class="group relative flex w-full justify-center rounded-md h-9 bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span class="absolute mx-auto text-center inset-y-0 flex items-center pl-3">
              <Loader-2Icon class="w-4 h-4 mr-2 animate-spin" />
              <p class="hidden xl:block ml-1">Loading ...</p>
            </span>
          </button>
          <button
            v-else
            @click="isLoading = true"
            type="submit"
            class="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockIcon class="h-5 w-5 text-blue-500 group-hover:text-indigo-400" />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
