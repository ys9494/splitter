import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultView from '../views/ResultView.vue'
import AddGatheringView from '../views/AddGatheringView.vue'
import AddPeopleView from '../views/AddPeopleView.vue'
import AddItemView from '../views/AddItemView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/result',
      name: 'result',
      component: ResultView
    },

    {
      path: '/gathering/:id/add',
      name: 'add-item',
      component: AddItemView
    },
    {
      path: '/add/people',
      name: 'add-people',
      component: AddPeopleView
    },
    {
      path: '/add/gathering',
      name: 'add-gathering',
      component: AddGatheringView
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

export default router
