<template>
  <v-app>
    <PageHeader />
    <v-main class="d-flex align center justify-center" style="margin-top: 2vh; margin-bottom: 6vh">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import PageHeader from './pages/PageHeader.vue'
import createAuthStore from './components/auth/auth.store'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader
  },
  setup() {
    const authStore = createAuthStore()

    onBeforeMount(() => {
      authStore.actions.setLoggedInUserAction()
    })

    return {}
  }
})
</script>
