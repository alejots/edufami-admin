import http from "@/services/httpService";
import Toastify from "toastify-js";

function initialState() {
  return {
    status: "",
    lesson: {},
    lessonSteps: []
  };
}

const state = initialState;

const getters = {
  lesson: state => state.lesson,
  lessonSteps: state => state.lessonSteps
};

const mutations = {
  setLessonStatus: (state, data) => {
    state.status = data;
  },
  setLesson: (state, data) => {
    state.lesson = data;
  },
  setLessonSteps: (state, data) => {
    state.lessonSteps = data;
  },
  addStepToLesson: (state, data) => {
    state.lessonSteps.push(data);
  },
  lessonReset: state => {
    const s = initialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  }
};
const actions = {
  getLesson: ({ commit }, id) => {
    http.get(`Lessons/${id}`).then(({ data }) => {
      commit("setLesson", data);
    });
  },

  getStepsbyLesson: ({ commit }, id) => {
    http.get(`Lessons/${id}/steps`).then(({ data }) => {
      commit("setLessonSteps", data);
    });
  },

  postStepbyLesson: ({ commit }, { lessonId, data }) => {
    return new Promise(resolve => {
      http
        .post(`Lessons/${lessonId}/steps`, data)
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
