<template>
  <v-app>
    <PageHeader />
    <v-main>
      <router-view />
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
