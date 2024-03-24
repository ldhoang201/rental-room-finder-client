export const state = () => ({
  posts: [],
  postTypes: [],
  roomTypes: [],
  latestPosts: [],
  amenities: [],
});

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_POST_TYPES(state, postTypes) {
    state.postTypes = postTypes;
  },
  SET_ROOM_TYPES(state, roomTypes) {
    state.roomTypes = roomTypes;
  },
  SET_AMENITIES(state, amenities) {
    state.amenities = amenities;
  },
  SET_LATEST_POSTS(state, posts) {
    state.latestPosts = posts;
  },
};

export const actions = {
  fetchRoomTypes({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/api/v1/room/type/all")
        .then((response) => {
          commit("SET_ROOM_TYPES", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error("Error fetching post types:", error);
          reject(error);
        });
    });
  },

  fetchAmenities({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/api/v1/amenities/type/all")
        .then((response) => {
          commit("SET_AMENITIES", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error("Error fetching amenities:", error);
          reject(error);
        });
    });
  },

  fetchPostTypes({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/api/v1/posts/type/all")
        .then((response) => {
          commit("SET_POST_TYPES", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error("Error fetching post types:", error);
          reject(error);
        });
    });
  },

  fetchAllPosts({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/api/v1/posts")
        .then((response) => {
          commit("SET_POSTS", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          reject(error);
        });
    });
  },

  fetchLatestPosts({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/api/v1/posts/criteria/latest")
        .then((response) => {
          commit("SET_LATEST_POSTS", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          reject(error);
        });
    });
  },

  createPost({ commit }, postData) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/api/v1/posts", postData)
        .then((response) => resolve(response.data))
        .catch((error) => {
          console.error("Error creating post:", error);
          reject(error);
        });
    });
  },

  updatePost({ commit }, { postId, updatedData }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/api/v1/posts/${postId}`, updatedData)
        .then((response) => resolve(response.data))
        .catch((error) => {
          console.error(`Error updating post with id ${postId}:`, error);
          reject(error);
        });
    });
  },

  fetchPostsByUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/api/v1/posts/by-user/${userId}`)
        .then((response) => resolve(response.data))
        .catch((error) => {
          console.error(
            `Error fetching posts by user with id ${userId}:`,
            error
          );
          reject(error);
        });
    });
  },

  filterPostsByCriteria({ commit }, criteria) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/api/v1/posts/filter-by-criteria", criteria)
        .then((response) => resolve(response.data))
        .catch((error) => {
          console.error("Error filtering posts by criteria:", error);
          reject(error);
        });
    });
  },
};
