<template>
  <v-row justify="center" direction="column" style="margin-top: 12vh">
    <v-col cols="8">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="black"
        style="margin-left: 2vw; margin-top: 2vh"
      ></v-progress-circular>
      <v-row v-else-if="singlePost">
        <v-card style="margin: 20px; width: 60vw" elevation="2" class="pb-2 pt-2">
          <v-card-title class="text-h6 pb-0">{{ singlePost.title }}</v-card-title>
          <v-card-text class="text-body-1 pb-0">{{ singlePost.text }}</v-card-text>
          <v-card-text class="text-body-2 pb-0 pt-1">
            posted at {{ singlePost.createdAt.slice(11, 16) }} on
            {{ singlePost.createdAt.slice(0, 10) }}
          </v-card-text>
          <v-card-text class="text-body-2 pt-0"> by {{ singlePost.user.username }} </v-card-text>
        </v-card>
        <v-typography v-if="commentNumber == 0" style="margin-bottom: 10px; margin-left: 20px"
          >Be the first to leave a comment!</v-typography
        >
        <v-typography v-else style="margin-bottom: 10px; margin-left: 20px"
          >Comments: {{ reversedComments.length }}</v-typography
        >
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
            posted at {{ comment.createdAt.slice(11, 16) }} on {{ comment.createdAt.slice(0, 10) }}
          </v-card-text>
          <v-card-text class="text-body-2 pt-0"> by {{ comment.user.username }} </v-card-text>
        </v-card>
        <v-text-field
          v-if="user"
          v-model="comment"
          label="Comment"
          style="width: 60vw; margin-left: 20px; margin-right: 20px; margin-top: 10px"
        ></v-text-field>
      </v-row>
      <v-alert v-else type="error">Post not found</v-alert>
    </v-col>
  </v-row>
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
    const commentNumber = computed(() => {
      return singlePost.value.comments.length
    })

    return {
      singlePost,
      loading,
      user,
      reversedComments,
      commentNumber
    }
  }
})
</script>
