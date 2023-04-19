import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ErrorPage from '@/views/404.vue'
import Login from '@/views/Login.vue'
import MaintenanceFacilities from '@/views/MaintenanceFacilities/MainBox.vue'
import DetailMFA from '@/views/MaintenanceFacilities/DetailBox.vue'
import printMFA from '@/views/MaintenanceFacilities/pdfFile.vue'
import MaintenancePersonnel from '@/views/MaintenancePersonnel/MainBox.vue'
import DetailMPE from '@/views/MaintenancePersonnel/DetailBox.vue'
import printMPE from '@/views/MaintenancePersonnel/pdfFile.vue'
import MaintenancePublications from '@/views/MaintenancePublications/MainBox.vue'
import DetailMPU from '@/views/MaintenancePublications/DetailBox.vue'
import printMPU from '@/views/MaintenancePublications/pdfFile.vue'
import MainMenu from '@/views/Menu/MainBox.vue'
import UsersMenu from '@/views/Users/MainBox.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MainMenu
  },
  {
    path: '/maintenance-facility',
    name: 'maintenance-facility',
    component: MaintenanceFacilities
  },
  {
    path: '/maintenance-facility/:id',
    name: 'detail-maintenance-facility',
    component: DetailMFA
  },
  {
    path: '/print-maintenance-facility/:id',
    name: 'print-maintenance-facility',
    component: printMFA
  },
  {
    path: '/maintenance-personnel',
    name: 'maintenance-personnel',
    component: MaintenancePersonnel
  },
  {
    path: '/maintenance-personnel/:id',
    name: 'detail-maintenance-personnel',
    component: DetailMPE
  },
  {
    path: '/print-maintenance-personnel/:id',
    name: 'print-maintenance-personnel',
    component: printMPE
  },
  {
    path: '/maintenance-publications',
    name: 'maintenance-publications',
    component: MaintenancePublications
  },
  {
    path: '/maintenance-publications/:id',
    name: 'detail-maintenance-publications',
    component: DetailMPU
  },
  {
    path: '/print-maintenance-publications/:id',
    name: 'print-maintenance-publications',
    component: printMPU
  },
  {
    path: '/users',
    name: 'users',
    component: UsersMenu
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/error-page',
    name: 'error-page',
    component: ErrorPage
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath
    return next({ path: '/login' })
  }
  next()
})

export default router
