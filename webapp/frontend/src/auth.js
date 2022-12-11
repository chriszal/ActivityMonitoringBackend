import jwt from "jsonwebtoken";

class Auth {
  static login(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  static logout() {
    localStorage.removeItem("user");
  }

  static getToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.token : null;
  }

  static getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  static getUsername() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.username : null;
  }

  static getUserId() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.id : null;
  }

  static isAuthenticated() {
    const token = this.getToken();
    return token ? jwt.verify(token, "secret") : false;
  }
}

export default Auth;
