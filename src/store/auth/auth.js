import axios from "../../plugins/axios";
import { useCookies } from "vue3-cookies";

export default {
  namespaced: true,
  state: {
    needLogin: true,
    needAdmin: true,
    name: null
  },
  mutations: {
    needLogin(state, data) {
      state.needLogin = data;
    },
    needAdmin(state, data) {
      state.needAdmin = data;
    },
    name(state, data) {
      state.name = data;
    }
  },
  getters: {
    needLogin(state) {
      return state.needLogin;
    },
    needAdmin(state) {
      return state.needAdmin;
    },
    name(state) {
      return state.name;
    },
  },
  actions: {
    async signup({ commit }, params) {
      try {
        const rs = await axios.post("http://localhost/api/register", params);

        return rs.data.msg;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    async user({ commit }) {
      try{
        const rs = await axios.get("http://localhost/api/user");
        return rs.data;
      } catch {
        throw err;
      }
    },
    async updateUser({ commit }, userdata) {
      try {
        const rs = await axios.post(
          "http://localhost/api/updateuser",
          userdata
        );
        return rs.data.msg;
      } catch (error) {
        console.error(error);
      }
    },
    async login({ commit }, params) {
      try {
        const rs = await axios.post("http://localhost/api/login", params);
        console.log('rs', rs.data.user.authority);
        if (rs.data) {
          const access = rs.data.access_token;
          const refresh = rs.data.refresh_token;
          const { cookies } = useCookies();
          cookies.set("accessToken", access, { expires: 1 });
          cookies.set("refreshToken", refresh, { expires: 7 });
          commit("name", rs.data.user.name)
          commit("needLogin", false);
          if (rs.data.user.authority === 'admin') {
            commit('needAdmin', false)
          }
        }
        return rs.data.msg;
      } catch (err) {
        throw err;
      }
    },
    async verifyToken({ commit }) {
      try {
        const rs = await axios.post("http://localhost/api/auth");

        if (rs.data.ok) {
          return true;
        } else {
          console.error("토큰인증실패");
          alert(rs.data.result);
          commit("needLogin", true);
          commit("needAdmin", true)
          return false;
        }
      } catch (err) {
        console.error("에러", err);
        if (err.response && err.response.status === 401) {
          // Unauthorized error: JWT token is invalid or expired
          alert("Your session has expired. Please log in again.");
          commit("needLogin", true);
          commit("needAdmin", true);
        } else if (err.response && err.response.status === 500) {
          // Internal server error
          alert("Internal server error. Please try again later.");
        } else {
          alert("Failed to verify token. Please try again later.");
        }
        throw err;
      }
    },

    async logout({ commit }) {
      try {
        const { cookies } = useCookies();
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        console.log("쿠키삭제완료");
        commit("needLogin", true);
        commit("needAdmin", true);
        return true;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};
