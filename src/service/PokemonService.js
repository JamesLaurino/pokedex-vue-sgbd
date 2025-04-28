export default class PokemonService {

    static getPokemons() {
        return fetch('http://localhost:3001/pokemons')
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static getPokemonById(id) {
        return fetch(`http://localhost:3001/pokemons/${id}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => this.handleError(error));
    }

    static addPokemon(pokemon) {

        return fetch(`http://localhost:3001/pokemons`, {
            method: 'POST',
            body: JSON.stringify(pokemon),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static searchPokemon(term) {

        return fetch(`http://localhost:3001/pokemons?name_like=${term}`)
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
        console.error(error);
    }
}