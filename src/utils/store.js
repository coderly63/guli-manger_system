const User = {
  saveUser(user) {
    window.localStorage.setItem("user", JSON.stringify(user));
  },

  getUser() {
    return JSON.parse(window.localStorage.getItem("user"));
  },

  deleteUser() {
    window.localStorage.removeItem("user");
  },
};

export default User;
