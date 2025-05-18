export default class UserService {

    static isUserConnected = false;

    static searchUserByEmail(user) {
        return fetch(`${import.meta.env.VITE_API_URL}/client`, {
            method: 'POST',
            body: JSON.stringify(user.value),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static isConnected() {
        localStorage.setItem('token','bearer1234')
        return UserService.isUserConnected
    }

    static isEmpty(Object) {
        return Object.keys(data).length === 0;
    }
    static handleError(error){
        console.error(error);
    }
}