<template>
	<view class="main">
		<view class="scanCode" @click="fillTemp">
			<view class="scanCode_icon">
				<text class="icon">&#xe639;</text>
			</view>
			<text class="text">扫一扫</text>
		</view>
		<view class="healthCode">
			<view class="healthCode_icon">
				<text class="icon">&#xe8c8;</text>
			</view>
			<text class="text">我的健康码</text>
		</view>
		<view class="person" @tap="toMyper">
			<view class="person_icon">
				<text class="icon">&#xe635;</text>
			</view>
			<text class="text">个人中心</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "mainFunctions",
		data() {
			return {

			};
		},
		methods:{
			toMyper(){
				uni.navigateTo({
					url:'../../pages/myper/myper'
				})
			},
			fillTemp(){
				this.$emit('toScan');
			}
		}
	}
</script>

<style>
	.main {
		width: 100%;
		height: 250upx;
		display: flex;
		justify-content: space-around;
		position: fixed;
		left: 0;
		bottom: 30%;
		margin-left: 10upx;
		margin-right: 10upx;
	}
	.main .scanCode,
	.healthCode,
	.person {
		margin-bottom: 3upx;
		text-align: center;
	}

	.main .scanCode_icon,
	.healthCode_icon,
	.person_icon {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		background-color: #cbd7ff;
	}

	.icon {
		display: block;
		color: white;
		font-size: 50upx;
		padding-top: 50upx;
	}

	.text {
		display: block;
		padding-top: 15upx;
		color: #324893;
		font-weight: 200;
	}
</style>
