import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import globalComponents from './global-components'

import './assets/css/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
globalComponents(app)

app.mount('#app')
