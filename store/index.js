import Vue from 'vue'
import Vuex from 'vuex'
import VueXAlong from 'vuex-along'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {}
	},
	mutations: {
		login(state, userData) {
			state.hasLogin = true;
			console.log("userData"+userData);
			state.userInfo.adminNumber = userData.data.user.phone;
			state.userInfo.adminName = userData.data.user.name;
			state.userInfo.adminId = userData.data.user.userId;
			state.userInfo.adminPermission = userData.data.enterPermission;
			// uni.setStorage({ //将用户信息保存在本地  
			// 	key: 'userInfo',
			// 	data: JSON.stringify(userData)
			// })
		},
		logout(state) { //退出登录  
			state.hasLogin = false;
			state.userInfo = {}
			// uni.removeStorage({
			// 	key: 'userInfo'
			// })
		}
	},
	actions: {},
	plugins: [VueXAlong({
	    name: 'state',     //存放在localStroage或者sessionStroage 中的名字
	    local: false,      //是否存放在local中  false 不存放 如果存放按照下面session的配置配
	    session: { list: [], isFilter: true } //如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
	  })]
})
export default store
