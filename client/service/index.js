import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
    getJson: Vue.resource('/api/get/json'),
    postJson: Vue.resource('/api/post/json')
};