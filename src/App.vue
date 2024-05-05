<template>
  <v-app>
    <v-main fluid class="d-flex flex-column align-center" style="padding: 0; margin: 0">
      <PageHeader />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from './pages/PageHeader.vue'
import createAuthStore from './components/auth/auth.store'
import { onUpdated } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader
  },
  setup() {
    const authStore = createAuthStore()

    onUpdated(() => {
      authStore.actions.setLoggedInUserAction()
    })

    return {}
  }
})
</script>
