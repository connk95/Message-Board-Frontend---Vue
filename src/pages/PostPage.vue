<template>
  <v-container>
    <v-row class="align-center mt-14">
      <v-col cols="8">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="black"
          style="margin-left: 2vw; margin-top: 2vh; width: 60vw"
        ></v-progress-circular>
        <v-card v-else-if="singlePost" style="width: 60vw" elevation="2" class="pa-2 w-60">
          <v-card-title class="text-h6 pb-0">{{ singlePost.title }}</v-card-title>
          <v-card-text class="text-body-1 pb-0">{{ singlePost.text }}</v-card-text>
          <v-card-text class="text-body-2 pb-0 pt-1">
            posted at {{ singlePost.createdAt.slice(11, 16) }} on
            {{ singlePost.createdAt.slice(0, 10) }}
          </v-card-text>
          <v-card-text class="text-body-2 pt-0"> by {{ singlePost.user.username }} </v-card-text>
        </v-card>
        <v-typograpgy v-else type="error">Post not found</v-typograpgy>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-typography v-if="comments.length == 0" style="margin-bottom: 10px; margin-left: 20px"
          >Be the first to leave a comment!</v-typography
        >
        <v-typography v-else style="margin-bottom: 10px; margin-left: 20px"
          >Comments: {{ reversedComments.length }}</v-typography
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          v-for="comment in reversedComments"
          :key="comment._id"
          style="margin-left: 20px; margin-right: 20px; margin-top: 10px; width: 60vw"
          elevation="2"
          class="pb-2 pt-2"
        >
          <v-card-title class="text-h6 pb-0">{{ comment.title }}</v-card-title>
          <v-card-text class="text-body-1 pb-0">{{ comment.text }}</v-card-text>
          <v-card-text class="text-body-2 pb-0 pt-1">
            posted at {{ comment.createdAt.slice(11, 16) }} on
            {{ comment.createdAt.slice(0, 10) }}
          </v-card-text>
          <v-card-text class="text-body-2 pt-0"> by {{ comment.user.username }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-if="user"
          v-model="comment"
          label="Comment"
          style="width: 60vw; margin-left: 20px; margin-right: 20px; margin-top: 10px"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          color="#23532c"
          style="width: 6rem; margin-bottom: 2vh; text-transform: unset"
          class="text-body-1"
          >Submit</v-btn
        >
        <v-btn
          color="#23532c"
          style="width: 6rem; margin-bottom: 2vh; text-transform: unset"
          class="text-body-1"
          >Back</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import createPostStore from '../components/post/post.store'
import createAuthStore from '../components/auth/auth.store'

export default defineComponent({
  components: {},
  setup() {
    const postStore = createPostStore()
    const authStore = createAuthStore()
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id

    onBeforeMount(() => {
      authStore.actions.setLoggedInUserAction()
    })

    onMounted(() => {
      postStore.actions.fetchSinglePostAction(id)
    })

    const user = computed(() => authStore.authState.loggedInUser)
    const singlePost = computed(() => postStore.postState.singlePost)
    const loading = computed(() => postStore.postState.loading)
    const reversedComments = computed(() => {
      return Array.isArray(singlePost.value.comments)
        ? singlePost.value.comments.slice().reverse()
        : []
    })
    const comments = computed(() => {
      return singlePost.value.comments
    })

    return {
      singlePost,
      loading,
      user,
      reversedComments,
      comments
    }
  }
})
</script>
