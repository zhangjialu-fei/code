<template>
	<view class="myper">
		<view class="header">
			<u-icon class="icon" name="arrow-leftward" color="gray" size="40" @click="backTo"></u-icon>
			<view class="header-title">个人中心</view>
			<view class="header-top">
				<view class="avatar">
					<image src="../../static/profile.jpg"></image>
				</view>
				<view class="name">Mina Davidson</view>
			</view>
		</view>
		
		<view class="content">
			<view class="content-item" @click="showDrawer">
				<view class="content-item-left">
					<view class="icon-box" style="background-color: #E5AD8B;">
						<u-icon name="edit-pen" color="white" size="35"></u-icon>
					</view>
					<view class="title">修改信息</view>
				</view>
				<view class="right">
					<view class="arrow">
						<u-icon name="arrow-right" color="gray" size="27"></u-icon>
					</view>
				</view>
			</view>
			
			<view class="content-item" @click="openModel">
				<view class="content-item-left">
					<view class="icon-box" style="background-color: #61DAD5;">
						<u-icon name="setting" color="white" size="27"></u-icon>
					</view>
					<view class="title">退出登录</view>
				</view>
				<view class="right">
					<view class="arrow">
						<u-icon name="arrow-right" color="gray" size="27"></u-icon>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 修改信息弹出框 -->
		<u-popup v-model="show" mode="bottom" length="66%">
			<view class="popup-item">
				<updatePopup @changeShow="showChange"></updatePopup>
			</view>
		</u-popup>
		
		<!-- 是否退出登录 -->
		<u-modal v-model="isLogout" :content="content" :show-cancel-button="true" width="60%" @confirm="loginBack" @cancel="closeModel"></u-modal>
	</view>
</template>

<script>
	import updatePopup from '@/components/updatePopup/updatePopup.vue';
	
	import {
		mapState,
		mapMutations
	} from 'vuex';
	
	export default {
		components:{
			updatePopup
		},
		data() {
			return {
				show: false,
				isLogout: false,
				content: '是否退出登录？'
			}
		},
		created() {
			this.navTo();
		},
		computed: mapState(['hasLogin']),
		methods: {
			...mapMutations(['logout']),
			//返回至主页
			backTo(){
				uni.navigateTo({
					url:'../index/index'
				})
			},
			showDrawer() {
				console.log('true');
				this.show = true;
			},
			//修改信息成功后，给予父组件信号，关闭弹出框
			showChange(e){
				this.show = e;
			},
			//退出登录
			openModel(){
				this.isLogout = true;
			},
			loginBack(){
				this.logout();
				this.navTo();
				localStorage.removeItem('accessToken');
			},
			closeModel(){
				this.isLogout = false;
			},
			//考虑
			navTo(url) {
				if(!this.hasLogin) {
					uni.reLaunch({
						url:'../entiry/login'
					})
				}
			}
		}
	}
</script>

<style>
	.header{
		position: relative;
	}
	.header .icon{
		position: absolute;
		left: 22upx;
		top: 22upx;
	}
	.header .header-title{
		width: 100%;
		height: 130upx;
		font-size: 35upx;
		text-align: center;
		line-height: 130upx;
		background-color: white;
	}
	.header .header-top{
		width: 100%;
		height: 600upx;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 78px 0 42px 0;
		margin-top: -70px;
		border-radius: 0 0 2em 2em;
	}
	.header .header-top .avatar image{
		width: 220upx;
		height: 220upx;
		border-radius: 24px;
		background-color: #E5AD8B;
	}
	.header .header-top .name{
		margin-top: 40upx;
		font-size: 35upx;
		font-weight: 600;
	}
	.content{
		padding: 0 50upx;
	}
	.content-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 84px;
		margin-top: 18px;
		padding: 0 24px;
		background-color: #FFFFFF;
		border-radius: 12px;
	}
	.content-item .content-item-left{
		display: flex;
		align-items: center;
	}
	.content-item .content-item-left .icon-box{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 38px;
		height: 48px;
		border-radius: 12px;
		background-color: #FFC592;
	}
	.content-item .content-item-left .title{
		margin-left: 18px;
		font-size: 28upx;
		font-weight: 600;
		color: #292929;
	}
</style>
