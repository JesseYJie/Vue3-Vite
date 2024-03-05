import { createApp } from 'vue'
import router from './router'
import './styles/index.scss'
import App from './App.vue'

import Store from './store'

// 清除项目中的console
if (import.meta.env.VITE_ENV !== 'development') {
  console.log = function () {}
}

const app = createApp(App)

app.use(router).use(Store).mount('#app')
