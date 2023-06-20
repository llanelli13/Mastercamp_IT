import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/HomeView.vue'
import Authentification from '../views/AuthRegView.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/authentification/:type',
        name : 'Authentification',
        component: Authentification
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
