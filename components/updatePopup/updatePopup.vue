<template>
	<view class="updatePopup">
		<view class="img-box">
			<image src="../../static/update.jpg" mode=""></image>
			<u-icon class="exit_icon" name="arrow-up" color="gray" size="30" @click="backTo"></u-icon>
		</view>
		<view class="updatePopup-body">
			<view class="form-item">
				<text class="form-label">密码</text>
				<view class="form-body">
					<input type="text" class="form-input" v-model="password" />
				</view>
			</view>
			<view class="form-item">
				<text class="form-label">性别</text>
				<view class="form-item-sexRadio">
					<radio-group @change="sexChange">
						<label class="radio">
							<radio value="0" checked="true" style="transform:scale(0.7)" />男
						</label>
						<label class="radio">
							<radio value="1" style="transform:scale(0.7)" />女
						</label>
					</radio-group>
				</view>
			</view>
		</view>
		<button type="default" class="updateBtn" @click="updateInfo">修改信息</button>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';

	export default {
		name: "updatePopup",
		data() {
			return {
				showPop: true,
				password: '',
				sexValue: 0,
				userId: ''
			};
		},
		created(){
			this.userId = this.$store.state.adminId;
			console.log('this.userId'+this.userId)
		},
		computed: mapState(['userInfo']),
		methods: {
			backTo() {
				this.showPop = false;
				this.$emit('changeShow', this.showPop);
			},
			sexChange(e) {
				this.sexValue = e.detail.value;
			},
			updateInfo() {
				uni.request({
					url: 'http://localhost:8080/user/update',
					method: 'POST',
					header: {'accessToken': localStorage.getItem("accessToken")},
					data: {
						password: this.password,
						sex: this.sexValue
					},
					success: (resp) => {
						// const respData = resp.data;
						this.showPop = false;
						this.$emit('changeShow', this.showPop);
					}
				})
			}
		}
	}
</script>

<style>
	.updatePopup {
		width: 100%;
	}
	
	.updatePopup .img-box{
		width: 100%;
		text-align: center;
		border-bottom: 1upx #e5e1e1 solid;
		position: relative;
	}

	.updatePopup image {
		height: 320upx;
		position: relative;
	}

	.exit_icon {
		position: absolute;
		top: 18upx;
		left: 50%;
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

	.form-item-radio {
		height: 60upx;
	}

	.form-item-sexRadio label {
		margin-right: 25upx;
		margin-bottom: 25upx;
	}

	.updateBtn {
		width: 300upx;
		background-color: #3CB400;
		margin-top: 100upx;
		color: white;
	}
</style>
