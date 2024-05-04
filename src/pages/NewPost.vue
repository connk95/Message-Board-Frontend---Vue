<template>
  <v-container
    v-if="authState?.loggedInUser"
    fluid
    class="d-flex flex-column align-center w-100 mb-10 mt-10"
  >
    <v-row no-gutters class="align-center mt-10 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-text-field v-model="title" label="Title"></v-text-field>
      </v-col>
      <v-col cols="12" class="justify-center w-100">
        <v-textarea v-model="post" label="Post"></v-textarea>
      </v-col>
    </v-row>
    <v-row no-gutters class="align-center mt-2 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-btn
          @click="submitPost"
          color="#23532c"
          style="width: 6rem; text-transform: unset"
          class="text-body-1 mr-4"
          >Submit</v-btn
        >
        <router-link :to="'/home'" style="text-decoration: none; color: inherit">
          <v-btn color="#23532c" style="width: 6rem; text-transform: unset" class="text-body-1"
            >Back</v-btn
          >
        </router-link>
      </v-col>
    </v-row>
    <v-row v-if="postState?.error" class="align-center mt-2 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-typography>{{ postState.error }}</v-typography>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import type { AuthState } from '@/components/auth/auth.type'
import type { PostState } from '@/components/post/post.type'
import type { PostStoreType } from '../components/post/post.store'
import type { AuthStoreType } from '../components/auth/auth.store'

const authState = inject<AuthState>('authState')
const authStore = inject<AuthStoreType>('authStore')!
const postState = inject<PostState>('postState')
const postStore = inject<PostStoreType>('postStore')!

let title = ref<string>('')
let post = ref<string>('')

const submitPost = () => {
  if (post.value && title.value && authState?.loggedInUser?.user) {
    postStore.actions
      .createPostAction({
        title: title.value,
        text: post.value,
        user: authState?.loggedInUser?.user
      })
      .then(() => {
        title.value = ''
        post.value = ''
        window.location.reload()
      })
      .catch((error: string) => {
        return error
      })
  }
}
</script>
