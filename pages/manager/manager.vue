<template>
	<view class="manager">
		<image src="../../static/manager.jpg" mode=""></image>
		<text class="exit_icon" @click="exitPop">&#xe609;</text>
		<view class="manager-body">
			<view class="scancodeStatistics manager-item">
				<view class="scancodeStatistics_icon">
					<text class="icon1">&#xe69f;</text>
				</view>
				<text class="text">扫码统计</text>
			</view>
			<view class="journal manager-item">
				<view class="journal_icon">
					<text class="icon2">&#xe619;</text>
				</view>
				<text class="text">管理日志</text>
			</view>
			<view class="permission manager-item" @click="toPermission">
				<view class="permission_icon">
					<text class="icon3">&#xe63f;</text>
				</view>
				<text class="text">权限管理</text>
			</view>
		</view>
		
		<!-- //permission -->
		<u-popup v-model="isShow" mode="bottom" border-radius="14">
			<view class="permissionPopup">
				<u-alert-tips type="success" :description="description" class="alertTip" :show-icon="true"></u-alert-tips>
				<view class="form-item">
					<text class="form-label">电话号</text>
					<view class="form-body">
						<input type="text" class="form-input" v-model="numberMobile" />
					</view>
				</view>
				<view class="form-item">
					<text class="form-label">权限管理</text>
					<view class="form-item-permRadio">
						<radio-group @change="permChange">
							<label class="radio">
								<radio value="0" checked="true" style="transform:scale(0.7)" />普通用户
							</label>
							<label class="radio">
								<radio value="1" style="transform:scale(0.7)" />管理者
							</label>
						</radio-group>
					</view>
				</view>
				<button type="default" class="updateBtn" @click="updateInfo">修改</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';

	export default {
		data() {
			return {
				isShow: false,
				description: '管理者可通过输入手机号管理用户权限哦~~',
				numberMobile: '',
				permValue: 0
			}
		},
		computed: mapState(['userInfo']),
		methods: {
			exitPop() {
				uni.navigateBack();
			},
			toPermission() {
				this.isShow = true;
			},
			permChange(e) {
				this.permValue = e.detail.value;
			},
			updateInfo() {
				uni.request({
					url: 'http://localhost:8083/update',
					method: 'POST',
					data: {
						enterMobilenumber: this.numberMobile,
						enterPermission: this.permValue
					},
					success: (resp) => {
						const respData = resp.data;
						console.log(respData);
						this.isShow = false;
					}
				})
			}
		}
	}
</script>

<style>
	.manager {
		font-family: 'iconfont';
		width: 100%;
	}

	.manager image {
		width: 100%;
		height: 400upx;
	}
	
	.exit_icon {
		font-size: 30upx;
		color: #007AFF;
		display: block;
		position: absolute;
		top: 20upx;
		left: 20upx;
	}

	.manager-body {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.manager-item {
		width: 32.8%;
		margin: 0 auto;
		height: 240upx;
		background-color: white;
		margin-top: 4upx;
		text-align: center;
	}

	.icon1 {
		display: block;
		color: orange;
		font-size: 55upx;
		padding-top: 55upx;
	}

	.icon2 {
		display: block;
		color: #02b589;
		font-size: 55upx;
		padding-top: 55upx;
	}

	.icon3 {
		display: block;
		color: #fe8e78;
		font-size: 55upx;
		padding-top: 55upx;
	}

	.text {
		display: block;
		padding-top: 15upx;
		color: #324893;
		font-weight: 200;
	}
	
	.form-item {
		padding-left: 40upx;
		padding-top: 30upx;
		font-weight: 300;
	}
	
	.form-label {
		display: inline-block;
		font-size: 30upx;
		margin-bottom: 20upx;
		font-weight: 300;
	}
	
	.form-input {
		width: 75%;
		height: 65upx;
		border: 1upx #e5e1e1 solid;
		padding-left: 10upx;
	}
	
	.form-item-permRadio label {
		margin-right: 25upx;
		margin-bottom: 25upx;
	}
	
	.updateBtn {
		width: 300upx;
		background-color: #3CB400;
		margin-top: 100upx;
		color: white;
		margin-bottom: 80upx;
	}
</style>
