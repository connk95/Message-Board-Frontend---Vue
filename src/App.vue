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
import { defineComponent } from 'vue'
import PageHeader from './pages/PageHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader
  }
})
</script>
