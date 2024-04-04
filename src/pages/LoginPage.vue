<template>
  <!-- <svg-icon type="mdi" :path="path"></svg-icon> -->
  <v-sheet class="mx-auto" width="30vw" align="center" style="margin-top: 12vh">
    <v-typography class="text-h5">Sign In</v-typography>
    <v-form ref="form" style="margin-top: 4vh">
      <v-text-field v-model="username" label="Username*" required></v-text-field>
      <v-text-field v-model="password" label="Password*" required type="password"></v-text-field>
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
</template>

<script>
import { defineComponent, ref, computed, onMounted, onUpdated, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import createAuthStore from '../components/auth/auth.store'
// import SvgIcon from '@jamescoyle/vue-icon'
// import { mdiShieldLockOutline } from '@mdi/js'

export default defineComponent({
  components: {},
  setup() {
    const authStore = createAuthStore()
    const router = useRouter()
    const username = ref('')
    const password = ref('')

    const validateLogin = () => {
      authStore.actions.userLoginAction({ username: username.value, password: password.value })
      router.push('/home')
    }

    // onUpdated(() => {
    //   authStore.actions.setLoggedInUserAction()
    // })

    return {
      username,
      password,
      validateLogin
    }
  }
})
</script>
