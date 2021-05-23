<template>
	<view class="healthPunch">
		<image src="../../static/punch.jpg" mode=""></image>
		<u-icon class="icon" name="arrow-leftward" color="black" size="40" @click="backTo"></u-icon>
		<scroll-view scroll-y="true" class="scrollView">
			<view>
				<view class="form-item">
					<text class="form-label">当前位置</text>
					<view class="form-body">
						<input type="text" class="form-input" v-model="address" />
					</view>
				</view>
				<view class="form-item1">
					<text class="form-label">当前温度</text>
					<view class="form-item-tempRadio">
						<radio-group @change="tempChange">
							<label class="radio">
								<radio value="正常温度：36℃~37℃" checked="true" style="transform:scale(0.7)" />正常温度：36℃~37℃
							</label>
							<label class="radio">
								<radio value="低烧：37.3℃~38℃" style="transform:scale(0.7)" />低烧：37.3℃~38℃
							</label>
							<label class="radio">
								<radio value="高烧：38.1℃~40℃" style="transform:scale(0.7)" />高烧：38.1℃~40℃
							</label>
							<label class="radio">
								<radio value="40℃以上" style="transform:scale(0.7)" />40℃以上
							</label>
						</radio-group>
					</view>
				</view>
				<view class="punchBtn">
					<button type="default" class="punchBtn-item" @click="healthPunch">打卡</button>
				</view>
				<view class="login-toast">
					<u-toast ref="uToast" />
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';

	export default {
		data() {
			return {
				administrator: '',
				mobilephone: '',
				address: '',
				healthState: 0,
				tempNumber: 0,

				index: 0,
				stateLists: ['良好', '患病'],
			}
		},
		computed: mapState(['userInfo']),
		methods: {
			backTo() {
				uni.navigateTo({
					url:'../index/index'
				});
			},
			tempChange(e) {
				this.temperature = e.detail.value;
			},
			stateChange(e) {
				this.healthState = e.target.value;
				this.index = this.healthState;
			},
			showToast() {
				this.$refs.uToast.show({
					title: '打卡成功',
					type: 'success',
				})
			},
			healthPunch() {
				uni.request({
					url: 'http://localhost:8080/healthCode/add',
					method: 'POST',
					header: {'accessToken': localStorage.getItem("accessToken")},
					data: {
						city: this.address,
						temperature: this.temperature
					},
					success: (resp) => {
						// const respData = resp.data;
						// console.log(respData);
						this.showToast();
						setTimeout(function() {
							uni.navigateTo({
								url: '../../pages/index/index'
							});
						}, 1000);
					}
				});
			}

		}
	}
</script>

<style>
	page{
		min-height: 100%;
		background-color: #FFFFFF;
	}
	.icon{
		position: absolute;
		left: 22upx;
		top: 22upx;
	}

	.scrollView {
		width: 100%;
		background-color: white;
	}

	image {
		width: 100%;
		height: 310upx;
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

	.form-item1 {
		padding-left: 40upx;
		padding-top: 30upx;
		font-weight: 300;
		padding-bottom: 30upx;
		border-bottom: 1upx #e5e1e1 solid;
	}

	.form-item-tempRadio label {
		display: block;
		margin-right: 25upx;
		margin-top: 15upx;
	}

	.selector_item {
		width: 100%;
		height: 100upx;
		padding-left: 40upx;
		margin-top: 30upx;
		line-height: 100upx;
		font-size: 30upx;
		font-weight: 300;
		border-bottom: 1upx #e5e1e1 solid;
	}

	.selector-item-text {
		display: inline-block;
		padding-right: 50upx;
	}

	.selector_item picker {
		width: 200upx;
		display: inline-block;
	}

	.punchBtn-item {
		width: 250upx;
		height: 90upx;
		margin-top: 130upx;
		background-color: #3CB400;
		color: white;
		line-height: 90upx;
	}
</style>
