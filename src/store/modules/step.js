import http from "@/services/httpService";
import Toastify from "toastify-js";

function initialState() {
  return {
    status: "",
    step: {},
    stepOptions: []
  };
}

const state = initialState;

const getters = {
  step: state => state.step,
  stepOptions: state => state.stepOptions
};

const mutations = {
  setStepStatus: (state, data) => {
    state.status = data;
  },
  setStep: (state, data) => {
    state.step = data;
  },
  setStepOptions: (state, data) => {
    state.stepOptions = data;
  },
  addStep: (state, data) => {
    console.log(state);
    state.stepOptions.push(data);
  },
  stepReset: state => {
    const s = initialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  }
};
const actions = {
  getStep: ({ commit }, id) => {
    http.get(`Steps/${id}`).then(({ data }) => {
      commit("setStep", data);
    });
  },

  postStep: ({ commit }, data) => {
    return new Promise(resolve => {
      http
        .post(`Steps`, data)
        .then(({ data }) => {
          commit("addStepToLesson", data, { root: true });
          resolve();
        })
        .catch(error => {
          console.log(error);
        });
    });
  },

  getOptionsbyStep: ({ commit }, id) => {
    http.get(`Steps/${id}/options`).then(({ data }) => {
      commit("setStepOptions", data);
    });
  },

  postOptionbyStep: ({ commit }, { stepId, data }) => {
    return new Promise(resolve => {
      http
        .post(`Steps/${stepId}/options`, data)
        .then(({ data }) => {
          commit("addStep", data);
          resolve();
        })
        .catch(error => {
          Toastify({
            text: `${error.name}: ${error.message}`,
            duration: 10000,
            backgroundColor: "linear-gradient(to right, #FF0010, #ff0000)"
          }).showToast();
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
