export const state = () => ({
  userTemp: null,
  user: null,
  genedOTP: null,
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
    localStorage.setItem("accessToken", user.access_token);
    localStorage.setItem("refreshToken", user.refresh_token);
  },
  SET_EMPTY_USER(state) {
    state.user = null;
  },
  SET_USER_TEMP(state, userTemp) {
    state.userTemp = userTemp;
  },
  SET_GENED_OTP(state, genedOTP) {
    state.genedOTP = genedOTP;
  },
};

export const actions = {
  login({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/api/v1/auth/login", { email, password })
        .then((response) => {
          if (response.data.user) commit("SET_USER", response.data.user);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },

  signUp({ commit }, { userData, userOTP, genedOTP }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/api/v1/auth/signup", { userData, userOTP, genedOTP })
        .then((response) => {
          if (response.data.newUser) commit("SET_USER", response.data.newUser);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },

  logout({ commit }) {
    return new Promise((resolve) => {
      localStorage.clear();
      commit("SET_EMPTY_USER");
      resolve();
    });
  },

  async sendOTP({ commit }, email) {
    return new Promise((resolve, reject) => {
      console.log(email);
      this.$axios
        .post("/api/v1/auth/send-otp", { email })
        .then((response) => {
          commit("SET_GENED_OTP", response.data.genedOTP);
          resolve(response.data.genedOTP);
        })
        .catch((error) => {
          console.log(error);
          reject(error.response.data);
        });
    });
  },

  refreshAccessToken({ commit }, refreshToken) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/api/v1/auth/refreshAccessToken", { refreshToken })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
};
