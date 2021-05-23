<template>
	<view class="widelyService">
		<view class="healthPunch" @click="tohealthPunch">
			<view class="healthPunch_icon">
				<text class="icon1">&#xe62b;</text>
			</view>
			<text class="text">健康打卡</text>
		</view>
		<view class="movement" @click="toMovement">
			<view class="movement_icon">
				<text class="icon2">&#xe60e;</text>
			</view>
			<text class="text">行动轨迹</text>
		</view>
		<view class="message">
			<view class="message_icon">
				<text class="icon3">&#xe613;</text>
				<u-badge class="badgeIcon" type="error" :count="count" :show-zero="isShow" :absolute="isAbsolute" :offset="[0,0]" style="transform: scale(1.3);"></u-badge>
			</view>
			<text class="text">消息通知</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "widelyService",
		data() {
			return {
				isAbsolute: true,
				isShow: false,
				count: 1
			};
		},
		methods: {
			tohealthPunch() {
				uni.navigateTo({
					url: '../../pages/healthPunch/healthPunch'
				})
			},
			toMovement() {
				uni.navigateTo({
					url: '../../pages/baiduMap/baiduMap'
				})
			}
		}
	}
</script>

<style>
	.widelyService {
		width: 100%;
		height: 200upx;
		display: flex;
		justify-content: space-around;
		margin-right: 10upx;
		padding-top: 12upx;
	}

	.widelyService .healthPunch,
	.movement,
	.message{
		margin-bottom: 3upx;
		text-align: center;
		margin: 0 auto;
	}

	.widelyService .healthPunch_icon,
	.movement_icon,
	.message_icon {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		background-color: #fff8db;
	}

	.widelyService .movement_icon {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		background-color: #d8f5f0;
	}

	.widelyService .message_icon {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		background-color: #feeae9;
		position: relative;
	}

	.icon1 {
		display: block;
		color: orange;
		font-size: 40upx;
		padding-top: 39upx;
	}

	.icon2 {
		display: block;
		color: #02b589;
		font-size: 55upx;
		padding-top: 32upx;
	}

	.icon3 {
		display: block;
		color: #fe8e78;
		font-size: 55upx;
		padding-top: 32upx;
	}

	.text {
		display: block;
		padding-top: 15upx;
		color: #324893;
		font-weight: 200;
	}
	
	.badgeIcon {
		transform: scale(2);
	}
</style>
