export const state = () => ({
  currentUser: null,
  users: [],
  balance: 0,
});

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
  SET_BALANCE(state, balance) {
    state.balance = balance;
  },
};

export const actions = {
  fetchAllUsers({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/api/v1/users")
        .then((response) => {
          commit("SET_USERS", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  fetchUserById({ commit }, userId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/api/v1/users/${userId}`)
        .then((response) => {
          commit("SET_CURRENT_USER", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  updateUser({ commit }, userData) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/api/v1/users/${userData.user_id}`, userData)
        .then(() => resolve())
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  updateUserPassword({ commit }, userData) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/api/v1/users/${userData.user_id}/password`, userData)
        .then(() => resolve())
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  saveUser({ commit }, userData) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/api/v1/users`, userData)
        .then((response) => resolve(response.data.userId))
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  deleteUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/api/v1/users/${userId}`)
        .then(() => resolve())
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  fetchUserBalance({ commit }, userId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/api/v1/users/${userId}/balance`)
        .then((response) => {
          commit("SET_BALANCE", response.data.balance);
          resolve(response.data.balance);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
};
