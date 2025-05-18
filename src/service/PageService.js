export default class PageService {

    static getPage(id) {
        return fetch(`${import.meta.env.VITE_API_URL}/page/${id}`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static handleError(error){
        console.log(error);
    }
}