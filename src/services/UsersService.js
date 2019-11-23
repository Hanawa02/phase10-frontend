export default {
  cachedUserList: [],

  addUser(userName) {
    let user = {
      id: this.cachedUserList.length + 2,
      name: userName
    };

    // * will push the created user returned by the server to the "cached" list
    this.cachedUserList.push(user);
  },

  deleteUser(userId) {
    // * just call the delete from server and keep the removing from the "cached" list like it is

    let list = this.cachedUserList.filter(function(user) {
      return user.id != userId;
    });

    this.cachedUserList = list;
  },

  updateUsersList() {
    // set the internal list to the content from server.

    this.cachedUserList.push({ id: 1, name: "Niklas" });
    this.cachedUserList.push({ id: 2, name: "Laura" });
    this.cachedUserList.push({ id: 3, name: "Alina" });
    this.cachedUserList.push({ id: 4, name: "Birgit" });
    this.cachedUserList.push({ id: 5, name: "Ludger" });
  },

  updateUsersListIfEmpty() {
    if (
      this.cachedUserList == undefined ||
      this.cachedUserList == null ||
      this.cachedUserList.length == 0
    )
      this.updateUsersList();
  },

  getUsers() {
    this.updateUsersListIfEmpty();

    return this.cachedUserList;
  },

  getUser(id) {
    this.updateUsersListIfEmpty();

    let user = this.cachedUserList.find(function(user) {
      return user.id == id;
    });

    return user;
  },

  /* Can be deleted after connection to server */
  getUserName(id) {
    let user = this.getUser(id);

    if (user != undefined) {
      return user.name;
    }
  }
};
