import {createRouter, createWebHistory} from 'vue-router';

import PokemonList from "../pages/PokemonList.vue";
import PokemonDetails from "../pages/PokemonDetails.vue";
import PokemonAdd from "../pages/PokemonAdd.vue";
import PokemonEdit from "../components/PokemonEdit.vue";
import LoginUser from "../pages/LoginUser.vue";


const routes = [
    {
        path: '/',
        component: PokemonList
    },
    {
        path: '/pokemons',
        component: PokemonList
    },
    {
        path: '/pokemon/:id/show',
        component: PokemonDetails
    },
    {
        path: '/pokemon/add',
        component: PokemonAdd,
        meta: { requiresAuth: true }
    },
    {
        path: '/pokemon/:id/edit',
        component: PokemonEdit,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        component: LoginUser
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