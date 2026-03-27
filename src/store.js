import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 定義一個新的 Vue Store
const store = new Vuex.Store({
  state() {
    return {
      test: 'vuex test',
      images: [],
    };
  },
  mutations: {
    setImages(state, images) {
      state.images = images; // 更新照片數據
    },

  },
  actions: {
    updateImages({commit}, images) {
      commit('setImages', images); // 通過 mutation 更新數據
    },
  },
  getters: {
    getImages(state) {
      return state.images; // 獲取圖片數據
    },
  },


});
export default store;
