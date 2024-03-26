import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

// createApp(App).use(router).use(vuetify).mount('#app')

const app = createApp(App)

import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const vuetify = createVuetify({ components, directives })

loadFonts()

app.use(router)
app.use(vuetify)
app.mount('#app')
