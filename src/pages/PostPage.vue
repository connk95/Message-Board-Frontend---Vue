<template>
  <v-container fluid class="d-flex flex-column align-center w-100 mb-10">
    <v-row no-gutters class="align-center mt-6 w-100" width="unset" style="max-width: 900px">
      <v-col cols="12" class="justify-center mt-16 w-100">
        <v-progress-circular
          v-if="postState?.loading"
          indeterminate
          color="black"
          style="margin-left: 2vw; margin-top: 2vh; width: 60vw"
        ></v-progress-circular>
        <v-card v-else-if="postState?.singlePost" elevation="2" class="pa-2 w-100">
          <v-card-title class="text-h6 pb-0">{{ postState.singlePost.title }}</v-card-title>
          <v-card-text class="text-body-1 pb-0">{{ postState.singlePost.text }}</v-card-text>
          <v-card-text class="text-body-2 pb-0 pt-1">
            posted at {{ postState.singlePost.createdAt?.slice(11, 16) }} on
            {{ postState.singlePost.createdAt?.slice(0, 10) }}
          </v-card-text>
          <v-card-text class="text-body-2 pt-0">
            by {{ postState.singlePost.user.username }}
          </v-card-text>
        </v-card>
        <v-typograpgy v-else type="error">Post not found</v-typograpgy>
      </v-col>
    </v-row>
    <v-row no-gutters class="align-center mt-4 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-typography v-if="postState?.singlePost?.comments?.length == 0"
          >Be the first to leave a comment!</v-typography
        >
        <v-typography v-else>Comments: {{ postState?.singlePost?.comments?.length }}</v-typography>
      </v-col>
    </v-row>
    <v-row no-gutters class="align-center mt-2 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-card
          v-for="comment in postState?.singlePost?.comments?.slice().reverse()"
          :key="comment._id"
          elevation="2"
          class="pb-2 pt-2 mt-1 mb-2"
        >
          <v-card-text class="text-body-1 pb-0">{{ comment.text }}</v-card-text>
          <v-card-text class="text-body-2 pb-0 pt-1">
            posted at {{ comment.createdAt?.slice(11, 16) }} on
            {{ comment.createdAt?.slice(0, 10) }}
          </v-card-text>
          <v-card-text class="text-body-2 pt-0"> by {{ comment.user.username }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="align-center mt-2 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-text-field
          v-if="authState?.loggedInUser"
          v-model="comment"
          label="Comment"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters class="align-center mt-2 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-btn
          @click="submitComment"
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
import { ref, onBeforeMount, inject } from 'vue'
import type { AuthState } from '@/components/auth/auth.type'
import type { PostState } from '@/components/post/post.type'
import { useRouter, useRoute } from 'vue-router'
import type { PostStoreType } from '../components/post/post.store'
import type { User } from '@/components/user/user.type'
import type { AuthStoreType } from '../components/auth/auth.store'

const authState = inject<AuthState>('authState')
const authStore = inject<AuthStoreType>('authStore')!
const postState = inject<PostState>('postState')
const postStore = inject<PostStoreType>('postStore')!
const route = useRoute()
const id = route.params.id as string

onBeforeMount(() => {
  authStore.actions.setLoggedInUserAction()
  postStore.actions.fetchSinglePostAction(id)
})

let comment = ref<string>('')

const submitComment = () => {
  if (comment.value && authState?.loggedInUser?.user) {
    postStore.actions
      .newCommentAction({
        text: comment.value,
        postId: id,
        user: authState?.loggedInUser?.user
      })
      .then(() => {
        comment.value = ''
        window.location.reload()
      })
      .catch((error: string) => {
        return error
      })
  }
}
</script>
