import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// 设置的全局访问的state对象
const state = {
    info: localStorage.getItem("info") == '' ? '' : JSON.parse(localStorage.getItem("info")),
};
const getters = {
    changeInfo() {
        return state.info;
    },
};
const mutations = {
    newInfo(state, data) {
        state.info = data;
    },
};
const actions = {
    getInfo(context, data) {
        context.commit('newInfo', data);
        localStorage.setItem('info', data == "" ? "" : JSON.stringify(data));
    },
};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;