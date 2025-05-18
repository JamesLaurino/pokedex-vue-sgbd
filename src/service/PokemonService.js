export default class PokemonService {

    static async fetchPokemons(isLoading, noMoreData, pokemonList, start, limit){
    if (isLoading.value || noMoreData.value) return

    isLoading.value = true
    try {
    const end = start.value + limit
    const dataApi = await fetch(`${import.meta.env.VITE_API_URL}/pokemons?_start=${start.value}&_end=${end}`)
    const response = await dataApi.json();

    if (response.length === 0) {
    noMoreData.value = true
} else {
    pokemonList.value.push(...response)
    start.value = end
}
} catch (error) {
    console.error('Erreur de chargement :', error)
} finally {
    isLoading.value = false
}
}

    static async fetchPokemonPagination(isLoading, noMoreData, pokemonList, start, end) {

        try {
            const dataApi = await fetch(`${import.meta.env.VITE_API_URL}/pokemons?_start=${start.value}&_end=${end.value}`)
            const response = await dataApi.json();

            if(response.length === 0) {
                noMoreData.value = true
            }
            else {
                noMoreData.value = false;
                pokemonList.value = [];
                pokemonList.value.push(...response)
            }

        } catch (error) {
            console.error('Erreur de chargement :', error)
        }
    }

    static getPokemonById(id) {
        return fetch(`${import.meta.env.VITE_API_URL}/pokemons/${id}`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static getPokemonAll() {
        return fetch(`${import.meta.env.VITE_API_URL}/pokemons`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static deletePokemonById(id) {

        return fetch(`${import.meta.env.VITE_API_URL}/pokemons/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static updatePokemon(pokemon) {
        return fetch(`${import.meta.env.VITE_API_URL}/pokemons/${pokemon.id}`, {
            method: 'PUT',
            body: JSON.stringify(pokemon),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static addPokemon(pokemon) {

        return fetch(`${import.meta.env.VITE_API_URL}/pokemons`, {
            method: 'POST',
            body: JSON.stringify(pokemon),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static searchPokemon(term) {

        return fetch(`${import.meta.env.VITE_API_URL}/pokemons/name?name_like=${term}`)
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
    }
}