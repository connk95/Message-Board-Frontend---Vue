import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import PostPage from '../pages/PostPage.vue'
import UserPage from '../pages/UserPage.vue'
import SplashPage from '../pages/SplashPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import NewPost from '../pages/NewPost.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: SplashPage },
  { path: '/home', component: HomePage },
  { path: '/posts/:id', component: PostPage },
  { path: '/posts/new', component: NewPost },
  { path: '/signup', component: SignUpPage },
  { path: '/login', component: LoginPage },
  { path: '/profile', component: UserPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
