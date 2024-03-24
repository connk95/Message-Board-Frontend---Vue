<template>
  <v-app-bar :elevation="2" color="#23532c">
    <template v-slot:prepend>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    </template>
    <v-container class="d-flex align-center justify-between">
      <div class="d-flex align-center">
        <v-app-bar-title>ChatBox</v-app-bar-title>
        <div class="spacer"></div>
      </div>
      <v-icon color="white" icon="mdi-message-text" size="25"></v-icon>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import createAuthStore from '../components/auth/auth.store'

export default defineComponent({
  setup() {
    const authState = createAuthStore().authState

    return {
      authState
    }
  }
})
</script>

<style scoped></style>
