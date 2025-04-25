export default class PokemonService {

    static getPokemons() {
        return fetch('http://localhost:3001/pokemons')
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static isEmpty(Object) {
        return Object.keys(data).length === 0;
    }
    static handleError(error){
        console.error(error);
    }
}