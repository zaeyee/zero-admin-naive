import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import setupNaiveUI from './utils/naive-ui'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)
const pinia = createPinia()

setupNaiveUI()

app.use(router)
app.use(pinia)
app.use(naive)
app.mount('#app')
