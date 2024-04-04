<template>
  <v-app-bar color="#23532c">
    <div class="d-flex align-center" style="margin-left: 2vw">
      <link />
      <v-btn variant="plain" style="opacity: 1" @click="redirectHome">
        <v-app-bar-title>ChatBox</v-app-bar-title>
      </v-btn>
      <v-icon color="white" icon="mdi-message" size="25"></v-icon>
    </div>
    <v-spacer></v-spacer>
    <div v-if="authStore.authState.loggedInUser" style="margin-right: 3vw">
      <v-typography>Welcome {{ authStore.authState.loggedInUser?.user.username }}!</v-typography>
      <v-icon :icon="`mdiSvg:${mdiAccount}`"></v-icon>
      <v-btn
        style="text-transform: unset; margin-bottom: 3px"
        class="text-body-1"
        @click="userLogout"
        >Logout</v-btn
      >
    </div>
    <div v-else style="margin-right: 1vw">
      <v-btn
        style="text-transform: unset; margin-bottom: 3px"
        class="text-body-1"
        @click="goToLoginPage"
        >Login</v-btn
      >
      <v-btn
        style="text-transform: unset; margin-bottom: 3px"
        class="text-body-1"
        @click="goToSignUpPage"
        >Create Account</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import createAuthStore from '../components/auth/auth.store'
import { onBeforeMount } from 'vue'

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

    const redirectHome = () => {
      router.push('/home')
    }

    onBeforeMount(() => {
      authStore.actions.setLoggedInUserAction()
    })

    const userLogout = () => {
      if (authStore.authState.loggedInUser)
        authStore.actions.userLogoutAction({
          username: authStore.authState.loggedInUser.user.username,
          password: authStore.authState.loggedInUser.user.password
        })
      router.push('/')
    }

    return {
      authStore,
      goToLoginPage,
      goToSignUpPage,
      redirectHome,
      userLogout
    }
  }
})
</script>

<style scoped></style>
