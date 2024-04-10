<template>
  <v-container fluid class="d-flex flex-column align-center w-100">
    <v-row no-gutters class="align-center mt-6 w-100" width="unset" style="max-width: 900px">
      <v-col cols="12" class="justify-center mt-16 w-100">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="black"
          style="margin-left: 2vw; margin-top: 2vh; width: 60vw"
        ></v-progress-circular>
        <v-card v-else-if="singlePost" elevation="2" class="pa-2 w-100">
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
    <v-row no-gutters class="align-center mt-4 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-typography v-if="reversedComments.length == 0"
          >Be the first to leave a comment!</v-typography
        >
        <v-typography v-else>Comments: {{ reversedComments.length }}</v-typography>
      </v-col>
    </v-row>
    <v-row no-gutters class="align-center mt-2 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
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
    <v-row no-gutters class="align-center mt-2 w-100" style="max-width: 900px">
      <v-col cols="12" class="justify-center w-100">
        <v-text-field v-if="user" v-model="comment" label="Comment"></v-text-field>
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
        <v-btn
          @click="goBack"
          color="#23532c"
          style="width: 6rem; text-transform: unset"
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
      postStore.actions.fetchSinglePostAction(id)
    })

    const goBack = () => {
      router.push('/home')
    }

    const submitComment = () => {
      location.reload()
    }

    const user = computed(() => authStore.authState.loggedInUser)
    const singlePost = computed(() => postStore.postState.singlePost)
    const loading = computed(() => postStore.postState.loading)
    const reversedComments = computed(() => {
      if (singlePost.value && Array.isArray(singlePost.value.comments)) {
        return singlePost.value.comments.slice().reverse()
      } else {
        return []
      }
    })

    return {
      singlePost,
      loading,
      user,
      reversedComments,
      goBack,
      submitComment
    }
  }
})
</script>
