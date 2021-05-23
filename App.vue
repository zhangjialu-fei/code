<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	
	export default {
		computed:{
			...mapState(['hasLogin'])
		},
		methods:{
			...mapMutations(['login']),
		},
		onLaunch() {
			console.log('App Launch')
			let userInfo = uni.getStorageInfoSync('userInfo') || '';
			if(userInfo.mobilenumber) {
				uni.getStorage({
					key:'userInfo',
					success:(res)=>{
						this.login(res.data);
					}
				})
			};
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";

	body {
		background-color: #eaf0ff;
	}

	@font-face {
	  font-family: 'iconfont';  /* project id 1617293 */
	  src: url('https://at.alicdn.com/t/font_1617293_fw3svi7jhjk.eot');
	  src: url('https://at.alicdn.com/t/font_1617293_fw3svi7jhjk.eot?#iefix') format('embedded-opentype'),
	  url('https://at.alicdn.com/t/font_1617293_fw3svi7jhjk.woff2') format('woff2'),
	  url('https://at.alicdn.com/t/font_1617293_fw3svi7jhjk.woff') format('woff'),
	  url('https://at.alicdn.com/t/font_1617293_fw3svi7jhjk.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_1617293_fw3svi7jhjk.svg#iconfont') format('svg');
	}
</style>
