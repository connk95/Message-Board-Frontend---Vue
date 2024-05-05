import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import createAuthStore from './components/auth/auth.store'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import type { AuthState } from './components/auth/auth.type'
import type { PostState } from './components/post/post.type'
import createPostStore from './components/post/post.store'

const app = createApp(App)

const authStore = createAuthStore()
const authState: AuthState = authStore.authState
authStore.actions.setLoggedInUserAction()

const postStore = createPostStore()
const postState: PostState = postStore.postState

console.log('authState', authState)
console.log('authStore', authStore)

const vuetify = createVuetify({ components, directives })

loadFonts()

app.use(router)
app.use(vuetify)
app.provide('authState', authState)
app.provide('authStore', authStore)
app.provide('postState', postState)
app.provide('postStore', postStore)
app.mount('#app')
