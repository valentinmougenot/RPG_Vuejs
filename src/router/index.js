import Vue from 'vue'
import VueRouter from 'vue-router'
import TownsView from '../views/TownsView.vue'
import PersosView from "../views/PersosView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/towns',
        name: 'towns',
        components: {
            central: TownsView,
        }
    },
    {
        path: '/persos',
        name: 'persos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            central: PersosView,
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
