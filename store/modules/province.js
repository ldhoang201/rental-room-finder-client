const HOST_URL = "https://vapi.vnappmob.com";

export const state = () => ({
  provinces: [],
  districts: [],
  wards: [],
});

export const mutations = {
  SET_PROVINCES(state, provinces) {
    state.provinces = provinces;
  },
  SET_DISTRICTS(state, districts) {
    state.districts = districts;
  },
  SET_WARDS(state, wards) {
    state.wards = wards;
  },
};

export const actions = {
  getProvinces({ commit }) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_URL}/api/province/`)
        .then((response) => response.json())
        .then((data) => {
          commit("SET_PROVINCES", data.results);
          resolve(data.results);
        })
        .catch((error) => {
          console.error("Error fetching provinces:", error);
          reject(error);
        });
    });
  },
  getDistricts({ commit }, provinceId) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_URL}/api/province/district/${provinceId}`)
        .then((response) => response.json())
        .then((data) => {
          commit("SET_DISTRICTS", data.results);
          resolve(data.results);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
          reject(error);
        });
    });
  },
  getWards({ commit }, districtId) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_URL}/api/province/ward/${districtId}`)
        .then((response) => response.json())
        .then((data) => {
          commit("SET_WARDS", data.results);
          resolve(data.results);
        })
        .catch((error) => {
          console.error("Error fetching wards:", error);
          reject(error);
        });
    });
  },
};
