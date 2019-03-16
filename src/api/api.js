import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3030/api/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("user-token") || "";

export const apiCall = ({ url, method, ...args }) =>
  new Promise((resolve, reject) => {
    axios({
      method: method || "GET",
      url: url,
      data: args.data
    })
      .then(resp => {
        resolve(resp);
      })
      .catch(error => {
        if (error.name == "Error") {
          var tempErr = {
            // We use the same structure of the server error
            response: {
              data: {
                error: {
                  message:
                    "Network error. Please verify your Internet connection."
                }
              }
            }
          };
          reject(tempErr);
        } else {
          reject(error);
        }
      });
  });

export const fakeCall = ({ url }) =>
  new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: ""
    });
    instance({
      method: "GET",
      url: url
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error.response);
        reject(error);
      });
  });
