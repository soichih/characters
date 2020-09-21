import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App.vue'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })

import List from './components/List.vue'
import View from './components/View.vue'
import Edit from './components/Edit.vue'

const router = new VueRouter({
    routes: [
        { path: '/list', component: List },
        { path: '/view/:id', component: View },
        { path: '/edit/:id', component: Edit },
        { path: '/create', component: Edit },
        { path: '*', redirect: '/list' },
    ]
})

new Vue({
    el: '#app',
    router,
    render: h => h(App),
    data() {
        return {
            api: "http://localhost:3000/api",
            jwt: null, //set to a jwt if logged in
        }
    },
});
