export default class UserService {

    static isUserConnected = false;

    static searchUserByEmail(term) {

        return fetch(`http://localhost:3001/client?name=${term}`)
            .then(response => response.json())
            .catch(error => this.handleError(error));

    }

    static isConnected(userInput, user) {
        if(user == null || userInput == null) {
            return UserService.isUserConnected = false;
        }

        UserService.isUserConnected = user.name === userInput.name && user.password === userInput.password;

        if(UserService.isUserConnected === true) {
            localStorage.setItem('token','bearer1234')
        }

        return UserService.isUserConnected
    }

    static isEmpty(Object) {
        return Object.keys(data).length === 0;
    }
    static handleError(error){
        console.error(error);
    }
}