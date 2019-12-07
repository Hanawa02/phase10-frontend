import axios from "axios";

export default {
  baseUrl: "http://192.168.178.101:3000",

  cachedUserList: [],

  async addUser(userName) {
    let response = await axios.post(`${this.baseUrl}/users`, {
      name: userName
    });

    this.cachedUserList.push(response.data);
  },

  async deleteUser(userId) {
    await axios.delete(`${this.baseUrl}/users/${userId}`);

    let list = this.cachedUserList.filter(function(user) {
      return user.id != userId;
    });

    this.cachedUserList = list;
  },

  async updateUsersList() {
    let response = await axios.get(`${this.baseUrl}/users`);

    this.cachedUserList = response.data;
  },

  async updateUsersListIfEmpty() {
    if (
      this.cachedUserList == undefined ||
      this.cachedUserList == null ||
      this.cachedUserList.length == 0
    )
      await this.updateUsersList();
  },

  async getUsers() {
    await this.updateUsersListIfEmpty();

    return this.cachedUserList;
  },

  async getUser(id) {
    await this.updateUsersListIfEmpty();

    let user = this.cachedUserList.find(function(user) {
      return user.id == id;
    });

    return user;
  }
};
