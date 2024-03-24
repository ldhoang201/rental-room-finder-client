export const state = () => ({
  geolocation: {},
  post: {},
});

export const mutations = {
  SET_GEOLOCATION(state, data) {
    state.geolocation = data;
  },
  SET_POST(state, post) {
    state.post = post;
  },
};

export const actions = {
  fetchPostById({ commit }, postId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/api/v1/posts/${postId}`)
        .then((response) => {
          commit("SET_POST", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(`Error fetching post with id ${postId}:`, error);
          reject(error);
        });
    });
  },

  getGeolocation({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const url = new URL("https://rsapi.goong.io/geocode");
      url.searchParams.append("api_key", payload.apiKey);
      url.searchParams.append("address", payload.address);

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit("SET_GEOLOCATION", data.results[0].geometry);
          resolve(data.results[0].geometry);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          reject(error);
        });
    });
  },
};
