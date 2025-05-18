export default class UserService {

    static login(user) {
        return fetch(`${import.meta.env.VITE_API_URL}/client`, {
            method: 'POST',
            body: JSON.stringify(user.value),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static setToken(token) {
        localStorage.setItem('token',token)
    }

    static isEmpty(Object) {
        return Object.keys(data).length === 0;
    }
    static handleError(error){
        console.error(error);
    }
}