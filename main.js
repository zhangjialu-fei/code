import Vue from 'vue'
import App from './App'

//vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store


//组件库
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,store
})
app.$mount()
