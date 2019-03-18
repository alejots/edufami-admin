import http from "@/services/httpService";
import Toastify from "toastify-js";

function initialState() {
  return {
    status: "",
    unit: {},
    unitLessons: []
  };
}

const state = initialState;

const getters = {
  unit: state => state.unit,
  unitLessons: state => state.unitLessons
};

const mutations = {
  setUnitStatus: (state, data) => {
    state.status = data;
  },
  setUnit: (state, data) => {
    state.unit = data;
  },
  setUnitLessons: (state, data) => {
    state.unitLessons = data;
  },
  addLesson: (state, data) => {
    state.unitLessons.push(data);
  },
  unitReset: state => {
    const s = initialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  }
};
const actions = {
  getUnit: ({ commit }, id) => {
    http.get(`Units/${id}`).then(({ data }) => {
      commit("setUnit", data);
    });
  },

  getLessonsbyUnit: ({ commit }, id) => {
    http.get(`Units/${id}/lessons`).then(({ data }) => {
      commit("setUnitLessons", data);
    });
  },

  postLessonbyUnit: ({ commit }, { unitId, data }) => {
    return new Promise(resolve => {
      http
        .post(`Units/${unitId}/lessons`, data)
        .then(({ data }) => {
          commit("addLesson", data);
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
