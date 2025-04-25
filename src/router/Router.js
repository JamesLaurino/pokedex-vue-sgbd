import { createRouter, createWebHistory } from 'vue-router';

import PokemonList from "../pages/PokemonList.vue";
import PokemonDetails from "../pages/PokemonDetails.vue";
import PokemonAdd from "../pages/PokemonAdd.vue";
import PokemonEdit from "../components/PokemonEdit.vue";

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
        component: PokemonAdd
    },
    {
        path: '/pokemon/:id/edit',
        component: PokemonEdit
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router