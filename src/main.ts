import App from './App.vue'
import router from './router'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)
const pinia = createPinia()

// 处理tailwind的reset样式和naive-ui中button等组件样式冲突
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.use(router)
app.use(pinia)
app.mount('#app')
