<template>
  <!-- <svg-icon type="mdi" :path="path"></svg-icon> -->
  <v-sheet class="mx-auto" width="30vw" align="center" style="margin-top: 12vh">
    <v-typography class="text-h5">Sign Up</v-typography>
    <v-form ref="form" style="margin-top: 4vh">
      <v-text-field v-model="username" label="Username*" required></v-text-field>
      <v-text-field v-model="email" label="Email Address*" required type="email"></v-text-field>
      <v-text-field v-model="password" label="Password*" required type="password"></v-text-field>
      <div class="d-flex flex-column">
        <v-btn
          class="mt-4"
          color="#23532c"
          block
          @click="validateLogin"
          style="text-transform: unset"
          >Sign Up</v-btn
        >
      </div>
    </v-form>
  </v-sheet>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onUpdated, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import createAuthStore from '../components/auth/auth.store'

export default defineComponent({
  components: {},
  setup() {
    const authStore = createAuthStore()
    const router = useRouter()
    const username = ref('')
    const email = ref('')
    const password = ref('')

    const validateSignup = () => {
      authStore.actions.createUserAction({
        username: username.value,
        email: email.value,
        password: password.value
      })
      router.push('/home')
    }

    return {
      username,
      email,
      password,
      validateSignup
    }
  }
})
</script>
