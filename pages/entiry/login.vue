<template>
	<view class="s-page-wrapper is-100vh">
		<view class="is-33vh has-mgt-10">
			<view class="is-flex is-column is-justify-center  is-align-center is-height-100">
				<image src="../../static/img/common/logo.jpg" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="content">
			<view class="has-mglr-10 ">
				<view class=" has-mgtb-10 "  style="margin-top: 55upx;">
					<input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号" class="is-input1 " data-val="phone" />
				</view>
				<view class=" has-radius has-mgtb-10">
					<input v-model="password" placeholder="请输入登录密码" class="is-input1" data-val="password"/>
				</view>

				<view class=" loginbtn has-radius has-mgtb-20">
					<button :loading="loginLoad.loading" @tap="handleLogin"> {{ loginLoad.loading ? "登录中...":"登 录"}} </button>
				</view>
			</view>
		</view>
		
		<view class="login-toast">
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	
	export default {
		data() {
			return {
				loginLoad: {
					loading: false,
				},
				phone:"",
				password:""

			};
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods:{
			//引入vuex中的login方法
			...mapMutations(['login']),
			defaultHandlerLogin:function(){
				this.loginLoad.loading = true;
				setTimeout((e=>{
					this.loginLoad.loading = false;
				}),1500);
				console.log(JSON.stringify(this.loginLoad)); 
			},
			// BindInput:function(e){
			// 	var dataval = e.currentTarget.dataset.val;
			// 	this.login[dataval] = e.detail.value; 
			// 	console.log('input'+dataval);
			// },
			handleLogin() {
				if(this.password != '' && (/^1[34578]\d{9}$/.test(this.phone))){
					uni.request({
						url: "http://localhost:8080/auth/oauth/token",
						method: "POST",
						data: {
							username: this.phone,
							password: this.password
						},
						success: (resp) => {
							const respData = resp.data;
							if (respData.code == 200) {
								localStorage.setItem('accessToken',respData.data.accessToken);
								// localStorage.setItem('name',respData.data.user.name);
								this.login(respData);
								uni.navigateTo({
									url: "../../pages/index/index?userId="+respData.data.user.userId+"&mobileNumber="+respData.data.user.username+"&userName="+respData.data.user.username
								});
							} else {
								this.$refs.uToast.show({
									title: '登录失败',
									type: 'error',
								});
							}
						}
					})
				} else {
					this.$refs.uToast.show({
						title: '手机号或密码错误',
						type: 'error',
					})
				}
			}
		}
	}
</script>

<style>
	page {
		text-align: center;
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.content {
		width: 85%;
		margin: 0 auto;
	}

	.loginbtn button {
		margin-top: 20rpx;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		background: #f35;
		opacity: 0.8;
		margin-top: 30upx;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}

	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		margin-top: 200upx;
	}

	.is-input1 {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding: 12rpx;
		color: #353535;
		font-size: 32rpx;
		box-sizing: border-box;
		appearance: none;
		border: 2rpx solid #e5e5e5;
		box-shadow: none;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
		margin-top: 25upx;
	}
</style>
