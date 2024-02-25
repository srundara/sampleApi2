import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Item from  '../views/Item.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        title:"Home"
      }
    },
    {
      path:'/item/:cid',
      name:'item',
      component:Item,
      meta:{
        title:"Menu"
      }
    }
    
  ]
})

router.beforeEach( (to , from , next) => {
  console.log("From" , from.meta.title)
  console.log("To" , to.meta.title)
  document.title = to.meta.title
  next();
})
export default router
