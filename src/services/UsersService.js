export default {
  UserList: [
    { id: 1, name: "Niklas" },
    { id: 2, name: "Laura" },
    { id: 3, name: "Alina" },
    { id: 4, name: "Birgit" },
    { id: 5, name: "Lüdger" }
  ],

  addUser(userName) {
    let user = {
      id: this.UserList.length + 2,
      name: userName
    };

    this.UserList.push(user);
  },

  deleteUser(userId) {
    let list = this.UserList.filter(function(user) {
      return user.id != userId;
    });

    this.UserList = list;
  },

  getUsers() {
    return this.UserList;
  },

  /* Can be deleted after connection to server */
  getUserName(id) {
    let user = this.UserList.find(function(user) {
      return user.id == id;
    });

    if (user != undefined) {
      return user.name;
    }
  }
};
