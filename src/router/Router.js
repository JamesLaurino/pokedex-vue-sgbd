import { createRouter, createWebHistory } from 'vue-router';

import PokemonList from "../components/PokemonList.vue";
import PokemonDetails from "../pages/PokemonDetails.vue";

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router