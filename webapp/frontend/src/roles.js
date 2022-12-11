class Role {
    static isAuthorized(roles) {
      const user = JSON.parse(localStorage.getItem("user"));
      return (
        user &&
        user.roles &&
        user.roles.some((role) => roles.includes(role))
      );
    }
  }
  
  export default Role;
  