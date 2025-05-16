import {createRouter, createWebHistory} from 'vue-router';

import PokemonList from "../pages/PokemonList.vue";
import PokemonDetails from "../pages/PokemonDetails.vue";
import PokemonAdd from "../pages/PokemonAdd.vue";
import PokemonEdit from "../components/PokemonEdit.vue";
import LoginUser from "../pages/LoginUser.vue";
import NotFound from "../pages/NotFound.vue";


const routes = [
    {
        path: '/',
        component: () => import('../pages/PokemonList.vue')
    },
    {
        path: '/pokemons',
        component: () => import('../pages/PokemonList.vue')
    },
    {
        path: '/pokemon/:id/show',
        component: () => import('../pages/PokemonDetails.vue')
    },
    {
        path: '/pokemon/add',
        component: () => import('../pages/PokemonAdd.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/pokemon/:id/edit',
        component: () => import('../components/PokemonEdit.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/pokemon/admin',
        component : () => import("../pages/AdminPage.vue"),
        meta: {requiresAuth: false}
    },
    {
        path: '/login',
        component: () => import('../pages/LoginUser.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        next('/login');
    } else {
        next();
    }
});

export default router