<template>
  <v-container fluid class="d-flex flex-column align-center w-100">
    <v-row no-gutters class="align-center mt-4 w-100 mt-16" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-card elevation="2" class="pa-1 mb-2 mt-4 w-100">
          <v-card-title class="text-h6">Username</v-card-title>
          <v-card-text class="text-body-1">{{
            authState?.loggedInUser?.user.username
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="align-center mt-4 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-typography class="text-h6 ml-5">Posts</v-typography>
        <v-card
          v-for="post in authState?.loggedInUser?.user.posts?.slice().reverse()"
          :key="post._id"
          elevation="2"
          class="pa-1 pb-6 mb-2 w-100"
        >
          <router-link :to="`/posts/${post._id}`" style="text-decoration: none; color: inherit">
            <v-card-title class="text-h6 pb-0">{{ post.title }}</v-card-title>
            <v-card-text class="text-body-1 pb-0">{{ post.text }}</v-card-text>
            <v-card-text class="text-body-2 pb-0 pt-1">
              posted at {{ post.createdAt?.slice(11, 16) }} on {{ post.createdAt?.slice(0, 10) }}
            </v-card-text>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="align-center mt-4 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-typography class="text-h6 ml-5">Comments</v-typography>
        <v-card
          v-for="comment in authState?.loggedInUser?.user.comments?.slice().reverse()"
          :key="comment._id"
          elevation="2"
          class="pa-1 pb-6 mb-2 w-100"
        >
          <router-link
            :to="`/posts/${comment.postId}`"
            style="text-decoration: none; color: inherit"
          >
            <v-card-text class="text-body-1 pb-0">{{ comment.text }}</v-card-text>
            <v-card-text class="text-body-2 pb-0 pt-1">
              posted at {{ comment.createdAt?.slice(11, 16) }} on
              {{ comment.createdAt?.slice(0, 10) }}
            </v-card-text>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { AuthState } from '../components/auth/auth.type'

const authState = inject<AuthState>('authState')
</script>
