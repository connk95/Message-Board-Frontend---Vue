<template>
  <v-container
    fluid
    class="d-flex flex-row"
    style="height: 100%; background-color: #a5bf7c; margin: 0; padding: 0"
  >
    <v-img :src="currentImage" width="65vw"></v-img>
    <v-col cols="12" md="4" class="d-flex flex-column align-center justify-center">
      <v-container v-if="authState.loggedInUser?.access_token" class="my-2">
        <v-typography class="white--text" style="font-size: 20px; color: white">
          Join ChatBox today.
        </v-typography>
        <v-btn color="#23532c" href="/home" class="my-2" style="width: 240px"> Home </v-btn>
      </v-container>
      <v-container v-else class="d-flex flex-column align-center">
        <v-typography class="white--text" style="font-size: 20px; color: white">
          Join ChatBox today.
        </v-typography>
        <v-btn color="#23532c" href="/signup" class="my-2" style="width: 240px">
          Create Account
        </v-btn>
      </v-container>
      <v-container class="d-flex flex-column align-center">
        <v-typography class="white--text" style="font-size: 20px; color: white">
          Already have an account?
        </v-typography>
        <v-btn color="#23532c" href="/login" class="my-2" style="width: 240px"> Login </v-btn>
      </v-container>
      <v-container class="d-flex flex-column align-center">
        <v-typography class="white--text" style="font-size: 20px; color: white">
          Continue without signing in.
        </v-typography>
        <v-btn color="#23532c" href="/home" class="my-2" style="width: 240px"> Home </v-btn>
      </v-container>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import createAuthStore from '../components/auth/auth.store'

const images = [
  '../../custom_assets/Collab-pana.svg',
  '../../custom_assets/Group discussion-pana.svg',
  '../../custom_assets/Conversation-pana.svg',
  '../../custom_assets/People talking-pana.svg',
  '../../custom_assets/Solidarity-pana.svg'
]

export default defineComponent({
  setup() {
    const authState = createAuthStore().authState
    const currentImageIndex = ref(0)

    const currentImage = computed(() => images[currentImageIndex.value])

    const changeImage = () => {
      const randomNumber = Math.floor(Math.random() * images.length)
      currentImageIndex.value = randomNumber
    }

    onMounted(() => changeImage())

    return {
      authState,
      currentImage
    }
  }
})
</script>

<style scoped></style>
