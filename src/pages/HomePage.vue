<template>
  <v-container fluid class="d-flex justify-center" style="margin: 0; padding: 0">
    <v-container>
      <v-row justify="center">
        <v-col cols="9">
          <v-container>
            <v-typography variant="h4" class="text-center"> All posts </v-typography>
            <v-btn v-if="auth.loggedInUser.access_token" @click="goToNewPostPage" color="#23532c">
              New Post
            </v-btn>
          </v-container>
        </v-col>
        <v-col cols="9">
          <v-progress-circular v-if="loading" indeterminate color="black"></v-progress-circular>
          <v-card
            v-else
            v-for="post in reversedPosts"
            :key="post._id"
            style="margin: 20px; width: 60vw"
          >
            <router-link :to="`/posts/${post._id}`">
              <v-card-title>{{ post.title }}</v-card-title>
              <v-card-text>{{ post.text }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-subheader>
                  posted at {{ post.createdAt.slice(11, 16) }} on
                  {{ post.createdAt.slice(0, 10) }} by
                  {{ post.user.username }}
                </v-subheader>
              </v-card-actions>
            </router-link>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import createPostStore from '../components/post/post.store'

export default {
  components: {},
  setup() {
    const store = createPostStore()
    const router = useRouter()

    onMounted(() => {
      store.actions.fetchPostsAction()
    })

    const goToNewPostPage = () => {
      router.push('/posts/new')
    }

    const reversedPosts = computed(() => {
      return Array.isArray(store.state.allPosts) ? store.state.allPosts.slice().reverse() : []
    })

    return {
      auth: { loggedInUser: { access_token: true } },
      loading: store.state.loading,
      reversedPosts,
      goToNewPostPage
    }
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
