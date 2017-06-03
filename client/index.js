import Vue from 'vue';
import url from './index.css';
new Vue({
    el:'#app',
    template:'<div>{{msg}}<img :src="img"></div>',
    data:{
        msg:'liupan23',
        img:'/static/img/QQ20170319-0.jpg'
    }
});