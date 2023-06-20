import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/HomeView.vue'
import Authentification from '../views/AuthRegView.vue'
import DropDocuments from '../views/DropDocuments.vue'
import LoansDashboard from '../views/LoansDashboard.vue'


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
    ,
    {
        path: '/dropDocuments',
        name : 'DropDocuments',
        component: DropDocuments
    }
    ,
    {
        path: '/loansDashboard',
        name : 'LoansDashboard',
        component: LoansDashboard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
