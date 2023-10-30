import App from './App.vue'
import router from './router/index'
import directives from './directives/index'
import setupNaiveUI from './utils/naive-ui'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)
const pinia = createPinia()

directives.forEach(directive => {
  app.directive(directive.name, directive)
})

setupNaiveUI()

app.use(router)
app.use(pinia)
app.mount('#app')
