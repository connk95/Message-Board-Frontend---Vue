<template>
  <Container
    component="main"
    maxWidth="false"
    :style="{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      alignContent: 'center',
      flexWrap: 'wrap',
      width: '100vw',
      height: '100vh',
      background: '#a5bf7c',
      margin: '0',
      padding: '0'
    }"
  >
    <Box component="img" :src="currentImage" :style="{ width: '70vw' }"></Box>
    <Box style="display: flex; flex-direction: column">
      <template v-if="authState.loggedInUser?.access_token">
        <Button variant="contained" href="/home" :style="{ width: '240px', mt: '2' }">
          Home
        </Button>
      </template>
      <template v-else>
        <Typography :style="{ color: 'white', fontSize: '20px' }"> Join ChatBox today. </Typography>
        <Button
          variant="contained"
          href="/signup"
          name="signup"
          :style="{ width: '240px', mt: '2' }"
        >
          Create Account
        </Button>
        <Typography :style="{ color: 'white', mt: '2', fontSize: '20px' }">
          Already have an account?
        </Typography>
        <Button variant="contained" href="/login" name="login" :style="{ width: '240px', mt: '2' }">
          Login
        </Button>
        <Typography :style="{ color: 'white', mt: '2', fontSize: '20px' }">
          Continue without signing in.
        </Typography>
        <Button variant="contained" href="/home" name="home" :style="{ width: '240px', mt: '2' }">
          Home
        </Button>
      </template>
    </Box>
  </Container>
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
    const authState = createAuthStore()
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
