import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/HomeView.vue'
import Authentification from '../views/AuthRegView.vue'
import DropDocuments from '../views/DropDocuments.vue'
import LoansDashboard from '../views/LoansDashboard.vue'
import DocumentValidation from '../views/DocumentValidation.vue'
import LoanApplication from "@/views/LoanApplication.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import MessageView from "@/views/MessageView.vue";


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
    ,
    {
        path: '/documentValidation/:id',
        name : 'DocumentValidation',
        component: DocumentValidation
    }
    ,
    {
        path: '/loanApplication',
        name : 'LoanApplication',
        component: LoanApplication
    }
    ,
    {
        path: '/profile',
        name : 'Profilepage',
        component: ProfilePage
    }
    ,
    {
        path: '/messages',
        name : 'MessageView',
        component: MessageView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
