/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './views/App'
import Home from './views/Home'
import Portfolio from './views/Portfolio'
import Aboutme from './views/Aboutme'

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/portfolio',
            name: 'portfolio',
            component: Portfolio,
        },
         {
            path: '/aboutme',
            name: 'aboutme',
            component: Aboutme,
        },
    ],
});

// window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example-component', require('./components/ExampleComponent.vue'));
// Vue.component('navbar', require('./components/Navbar.vue'));
// Vue.component('test-com', require('./components/TestComponent.vue'));

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});