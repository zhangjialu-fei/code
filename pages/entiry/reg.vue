<template>
	<view class="s-page-wrapper is-100vh">
		<view class="is-33vh has-mgt-10">
			<view class="is-flex is-column is-justify-center  is-align-center is-height-100">
				<image src="../../static/img/common/logo.jpg" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="registercontent">
			<view class="has-mglr-10 ">
				<view class=" has-mgtb-10 " style="margin-top: 55upx;">
					<input type="number" v-model="phone" maxlength="11" placeholder="请输入手机号" class="is-input1 " />
				</view>

				<view class=" has-radius has-mgtb-10">
					<input placeholder="请输入登录密码" v-model="password" :password="true" class="is-input1" />

				</view>
				<view class=" registerbtn has-radius has-mgtb-20" @click="handleRegister">
					<button>注 册</button>
				</view>
			</view>
		</view>
		<view class="is-20vh has-mgt-80" style="margin-top: 30upx;">
			<navigator url="#" class=" has-radius is-center is-grey " hover-class="">
				<text>注册即表示同意</text><text class="is-blue" style="color: #2B85E4;">《用户协议》</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: ''
			};
		},
		methods: {
			handleRegister() {
				//密码不能为空以及手机号验证
				if(this.password != '' && (/^1[34578]\d{9}$/.test(this.phone))){
					uni.request({
						url: 'http://localhost:8080/user/addUser',
						method: 'POST',
						data: {
							phone: this.phone,
							password: this.password
						},
						success: (resp) => {
							const respData = resp.data;
							if (respData.code == 200) {
								localStorage.setItem('accessToken',respData.data.accessToken);
								setTimeout(function() {
									uni.navigateTo({
										url: '../../pages/basicMatterForm/basicMatterForm?enterId='+respData.data,
									});
								}, 1000);
							} else {
								this.$refs.uToast.show({
									title: '注册失败',
									type: 'error',
								})
							}
						}
					})
				} else {
					this.$refs.uToast.show({
						title: '用户名或密码不符合条件',
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

	.registercontent {
		width: 85%;
		margin: 0 auto;
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

	.iconfont {
		position: absolute;
		font-size: 40rpx;
		right: 12%;
		z-index: 999;
		width: 105rpx;
		text-align: center;
		color: #353535;
		margin-top: -11%;
		background: #fff;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.registerbtn button {
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
</style>
