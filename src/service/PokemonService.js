import {useInfiniteQuery, useQuery} from "@tanstack/vue-query";
import {ref, watch} from "vue";

export default class PokemonService {

    static PAGE_LIMIT = 6;

    static async fetchPokemons({ pageParam = 0 }) {
        const start = pageParam;
        const end = start + PokemonService.PAGE_LIMIT;
        const url = `${import.meta.env.VITE_API_URL}/pokemons?_start=${start}&_end=${end}`;

        const res = await fetch(url);
        const data = await res.json();

        return { data: data, nextStart: end, isLastPage: data.length === 0 };
    }

    static useInfinitePokemons() {
        return useInfiniteQuery({
            queryKey: ['pokemons'],
            queryFn: ({ pageParam }) =>
                PokemonService.fetchPokemons({ pageParam }),
            getNextPageParam: (lastPage) => {
                if (lastPage.isLastPage) return undefined;
                return lastPage.nextStart;
            },
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
        });
    }

    static getPokemonById(id) {
        return fetch(`${import.meta.env.VITE_API_URL}/pokemons/${id}`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static useGetPokemonById(id) {
        return useQuery({
            queryKey: ['pokemon', id],
            queryFn: () => PokemonService.getPokemonById(id),
            staleTime: 5 * 60 * 1000, // cache "frais" pendant 5 minutes
            cacheTime: 30 * 60 * 1000, // garde les données en cache pendant 30 minutes
            enabled: !!id, // n'exécute la requête que si id est défini
        })
    }

    static updatePokemon(pokemon) {
        return fetch(`${import.meta.env.VITE_API_URL}/pokemons/${pokemon.id}`, {
            method: 'PUT',
            body: JSON.stringify(pokemon),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static addPokemon(pokemon) {

        return fetch(`${import.meta.env.VITE_API_URL}/pokemons`, {
            method: 'POST',
            body: JSON.stringify(pokemon),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static searchPokemon(term) {
        return fetch(`${import.meta.env.VITE_API_URL}/pokemons?name_like=${term}`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static typesPokemon() {
        return  [
            "Feu",
            "Eau",
            "Plante",
            "Poison",
            "Insecte",
            "Normal",
            "Vol",
            "Electrik",
            "Fée"
        ]
    }

    static isEmpty(Object) {
        return Object.keys(data).length === 0;
    }
    static handleError(error){
        console.log(error);
        throw error;
    }
}