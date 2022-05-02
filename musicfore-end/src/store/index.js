import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/user";
import configure from "@/store/configure";
import song from "@/store/song";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    song,
    user,
    configure
  }
})
