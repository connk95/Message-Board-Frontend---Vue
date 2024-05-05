<template>
  <v-sheet
    v-if="!authState?.loggedInUser?.user"
    class="mx-auto"
    width="30vw"
    align="center"
    style="margin-top: 12vh"
  >
    <v-typography class="text-h5">Sign In</v-typography>
    <v-form ref="form" style="margin-top: 4vh">
      <v-text-field v-model="username" label="Username*" required variant="outlined"></v-text-field>
      <v-text-field
        v-model="password"
        label="Password*"
        required
        type="password"
        variant="outlined"
      ></v-text-field>
      <div class="d-flex flex-column">
        <v-btn
          class="mt-4"
          color="#23532c"
          block
          @click="validateLogin"
          style="text-transform: unset"
          >Sign In</v-btn
        >
      </div>
    </v-form>
  </v-sheet>
  <v-typography v-else class="text-h5"> You are already signed in </v-typography>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import type { AuthState } from '@/components/auth/auth.type'
import type { AuthStoreType } from '../components/auth/auth.store'

const authState = inject<AuthState>('authState')
const authStore = inject<AuthStoreType>('authStore')!
const router = useRouter()
let username = ref<string>('')
let password = ref<string>('')

const validateLogin = () => {
  authStore.actions.userLoginAction({ username: username.value, password: password.value })
  router.push('/home')
}
</script>
