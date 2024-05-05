<template>
  <v-app-bar color="#23532c">
    <div class="d-flex align-center" style="margin-left: 2vw">
      <link />
      <router-link :to="'/home'" style="text-decoration: none; color: inherit">
        <v-btn variant="plain" style="opacity: 1">
          <v-app-bar-title>ChatBox</v-app-bar-title>
        </v-btn>
      </router-link>
      <v-icon color="white" icon="mdi-message" size="25"></v-icon>
    </div>
    <v-spacer></v-spacer>
    <div v-if="authStore.authState.loggedInUser" style="margin-right: 3vw">
      <v-typography class="mr-4"
        >Welcome {{ authStore.authState.loggedInUser?.user.username }}!</v-typography
      >
      <router-link :to="'/profile'" style="text-decoration: none; color: inherit">
        <v-btn style="text-transform: unset; margin-bottom: 3px" class="text-body-1">Profile</v-btn>
      </router-link>
      <v-btn
        style="text-transform: unset; margin-bottom: 3px"
        class="text-body-1"
        @click="userLogout"
        >Logout</v-btn
      >
    </div>
    <div v-else style="margin-right: 1vw">
      <router-link :to="'/login'" style="text-decoration: none; color: inherit">
        <v-btn style="text-transform: unset; margin-bottom: 3px" class="text-body-1">Login</v-btn>
      </router-link>
      <router-link :to="'/signup'" style="text-decoration: none; color: inherit">
        <v-btn style="text-transform: unset; margin-bottom: 3px" class="text-body-1"
          >Create Account</v-btn
        >
      </router-link>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import type { AuthState } from '@/components/auth/auth.type'
import type { AuthStoreType } from '../components/auth/auth.store'

const authState = inject<AuthState>('authState')
const authStore = inject<AuthStoreType>('authStore')!
const router = useRouter()

const userLogout = async () => {
  if (authState?.loggedInUser) {
    localStorage.removeItem('loggedInUser')
    router.push('/')

    await authStore.actions
      .userLogoutAction({
        username: authState.loggedInUser.user.username,
        password: authState.loggedInUser.user.password
      })
      .then(() => {
        window.location.reload()
      })
  }
}
</script>
