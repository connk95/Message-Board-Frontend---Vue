<template>
  <v-app-bar color="#23532c">
    <div class="d-flex align-center" style="padding-left: 2vw">
      <v-app-bar-title>ChatBox</v-app-bar-title>
      <v-icon color="white" icon="mdi-message" size="25"></v-icon>
    </div>
    <v-spacer></v-spacer>
    <v-btn style="text-transform: unset" class="text-body-1" @click="goToLoginPage">Login</v-btn>
    <v-btn style="text-transform: unset" class="text-body-1" @click="goToSignUpPage"
      >Create Account</v-btn
    >
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import createAuthStore from '../components/auth/auth.store'

export default defineComponent({
  setup() {
    const authStore = createAuthStore().authState
    const router = useRouter()

    const goToLoginPage = () => {
      router.push('/posts/login')
    }

    const goToSignUpPage = () => {
      router.push('/posts/signup')
    }

    return {
      authStore,
      goToLoginPage,
      goToSignUpPage
    }
  }
})
</script>

<style scoped></style>
