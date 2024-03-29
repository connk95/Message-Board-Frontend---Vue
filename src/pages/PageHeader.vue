<template>
  <v-app-bar color="#23532c">
    <div class="d-flex align-center" style="padding-left: 2vw">
      <v-app-bar-title>ChatBox</v-app-bar-title>
      <v-icon color="white" icon="mdi-message" size="25"></v-icon>
    </div>
    <v-spacer></v-spacer>
    <div v-if="authStore.authState.loggedInUser">
      <v-typography>Welcome {{ authStore.authState.loggedInUser.username }}!</v-typography>
    </div>
    <div v-else>
      <v-btn style="text-transform: unset" class="text-body-1" @click="goToLoginPage">Login</v-btn>
      <v-btn style="text-transform: unset" class="text-body-1" @click="goToSignUpPage"
        >Create Account</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import createAuthStore from '../components/auth/auth.store'

export default defineComponent({
  setup() {
    const authStore = createAuthStore()
    const router = useRouter()

    const goToLoginPage = () => {
      router.push('/login')
    }

    const goToSignUpPage = () => {
      router.push('/signup')
    }

    watch(
      () => authStore.authState.loggedInUser,
      () => {
        forceUpdate.value++
      }
    )

    const forceUpdate = ref(0)

    return {
      authStore,
      goToLoginPage,
      goToSignUpPage
    }
  }
})
</script>

<style scoped></style>
