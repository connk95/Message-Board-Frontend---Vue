<template>
  <v-row justify="center">
    <v-col cols="8">
      <!-- <v-col cols="1"> -->
      <v-row style="margin-left: 1.5vw">
        <v-typography style="margin-bottom: 2vh" class="text-h4"> All posts </v-typography>
      </v-row>
      <v-row style="margin-left: 1.5vw">
        <v-btn
          v-if="auth.loggedInUser.access_token"
          @click="goToNewPostPage"
          color="#23532c"
          style="margin-bottom: 2vh; text-transform: unset"
          class="text-body-1"
        >
          New Post
        </v-btn>
      </v-row>
      <!-- </v-col> -->
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="black"
        style="margin-left: 2vw; margin-top: 2vh"
      ></v-progress-circular>
      <v-card
        v-else
        v-for="post in reversedPosts"
        :key="post._id"
        style="margin: 20px; width: 60vw"
        elevation="2"
        class="pb-2 pt-2"
      >
        <router-link :to="`/posts/${post._id}`" style="text-decoration: none; color: inherit">
          <v-card-title class="text-h6 pb-0">{{ post.title }}</v-card-title>
          <v-card-text class="text-body-1 pb-0">{{ post.text }}</v-card-text>
          <v-card-text class="text-body-2 pb-0 pt-1">
            posted at {{ post.createdAt.slice(11, 16) }} on {{ post.createdAt.slice(0, 10) }}
          </v-card-text>
          <v-card-text class="text-body-2 pt-0"> by {{ post.user.username }} </v-card-text>
        </router-link>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import createPostStore from '../components/post/post.store'

export default {
  components: {},
  setup() {
    const postStore = createPostStore()
    const router = useRouter()

    onMounted(() => {
      postStore.actions.fetchPostsAction()
    })

    const goToNewPostPage = () => {
      router.push('/posts/new')
    }

    const reversedPosts = computed(() => {
      return Array.isArray(postStore.postState.allPosts)
        ? postStore.postState.allPosts.slice().reverse()
        : []
    })
    const loading = computed(() => postStore.postState.loading)

    return {
      auth: { loggedInUser: { access_token: true } },
      loading,
      reversedPosts,
      goToNewPostPage
    }
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
