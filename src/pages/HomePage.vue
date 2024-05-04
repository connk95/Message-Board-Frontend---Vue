<template>
  <v-container fluid class="d-flex flex-column align-center w-100">
    <v-row no-gutters class="align-center mt-6 w-100" width="unset" style="max-width: 900px">
      <v-col cols="12" class="justify-center mt-16 w-100">
        <v-typography class="text-h4"> All posts </v-typography>
      </v-col>
    </v-row>
    <v-row no-gutters class="align-center mt-4 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100 mb-2">
        <router-link :to="'/posts/new'" style="text-decoration: none; color: inherit">
          <v-btn
            v-if="authState?.loggedInUser?.user"
            color="#23532c"
            style="width: 6rem; text-transform: unset"
            class="text-body-1"
          >
            New Post
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-row no-gutters class="align-center mt-4 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-progress-circular
          v-if="postState?.loading"
          indeterminate
          color="black"
        ></v-progress-circular>
        <v-card
          v-else
          v-for="post in postState?.allPosts.slice().reverse()"
          :key="post._id"
          elevation="2"
          class="pa-2 mb-2 w-100"
        >
          <router-link :to="`/posts/${post._id}`" style="text-decoration: none; color: inherit">
            <v-card-title class="text-h6 pb-0">{{ post.title }}</v-card-title>
            <v-card-text class="text-body-1 pb-0">{{ post.text }}</v-card-text>
            <v-card-text class="text-body-2 pb-0 pt-1">
              posted at {{ post.createdAt?.slice(11, 16) }} on {{ post.createdAt?.slice(0, 10) }}
            </v-card-text>
            <v-card-text class="text-body-2 pt-0"> by {{ post.user.username }} </v-card-text>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, inject } from 'vue'
import { useRouter } from 'vue-router'
// import createPostStore from '../components/post/post.store'
// import createAuthStore from '../components/auth/auth.store'
import type { PostState } from '@/components/post/post.type'
import type { AuthState } from '@/components/auth/auth.type'
import type { PostStoreType } from '../components/post/post.store'
import type { AuthStoreType } from '../components/auth/auth.store'

const authState = inject<AuthState>('authState')
const authStore = inject<AuthStoreType>('authStore')!
const postState = inject<PostState>('postState')
const postStore = inject<PostStoreType>('postStore')!

onMounted(() => {
  postStore.actions.fetchPostsAction()
})
</script>

<style scoped></style>
