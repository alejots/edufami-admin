import http from "@/services/httpService";
// import Toastify from "toastify-js";

function initialState() {
  return {
    status: "",
    option: {}
  };
}

const state = initialState;

const getters = {
  option: state => state.option
};

const mutations = {
  setOptionStatus: (state, data) => {
    state.status = data;
  },
  setOption: (state, data) => {
    state.option = data;
  },
  optionReset: state => {
    const s = initialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  }
};
const actions = {
  getOption: ({ commit }, id) => {
    http.get(`Options/${id}`).then(({ data }) => {
      commit("setOption", data);
    });
  },

  postOption: ({ commit }, data) => {
    return new Promise(resolve => {
      http
        .post(`Options`, data)
        .then(({ data }) => {
          commit("addOptionToStep", data, { root: true });
          resolve();
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
