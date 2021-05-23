<template>
	<view class="content">
		<mainFunctions @toScan="toTempop"></mainFunctions>
		<view class="expand_application">
			<tabs :tabs="tabLists" :backgroundColor="bgColor" @tabIndex="tabIndex"></tabs>
			<widelyService v-if="activeIndex===0" :basicInformation="basicInfo"></widelyService>
			<information v-if="activeIndex===1"></information>
		</view>
		<button type="default" @click="dingwei">定位</button>
		
		<!-- update temp -->
		<view class="temPop">
			<u-popup v-model="show" mode="bottom">
				<view class="temPop-body">
					<view class="img-box">
						<image src="../../static/temp.jpg" mode=""></image>
						<u-icon class="exit_icon" name="arrow-up" color="gray" size="30" @click="backTo"></u-icon>
					</view>
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
									<radio value="绿码" checked="true" style="transform:scale(0.7)" />正常温度：36℃~37℃
								</label>
								<label class="radio">
									<radio value="绿码" style="transform:scale(0.7)" />低烧：37.3℃~38℃
								</label>
								<label class="radio">
									<radio value="黄码" style="transform:scale(0.7)" />高烧：38.1℃~40℃
								</label>
								<label class="radio">
									<radio value="黄码" style="transform:scale(0.7)" />40℃以上
								</label>
							</radio-group>
						</view>
					</view>
					<button type="default" class="fillBtn" @click="scanCode">确定</button>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import mainFunctions from '@/components/mainFunctions/mainFunctions.vue'
	import tabs from '@/components/tabs/tabs.vue';
	import widelyService from '@/components/widelyService/widelyService.vue'
	import information from '@/components/information/information.vue'
	
	import {
		mapState
	} from 'vuex';

	export default {
		components: {
			mainFunctions,
			tabs,
			widelyService,
			information
		},
		data() {
			return {
				tabLists: ['常用服务', '最新资讯'],
				bgColor: '#f4f7ff',
				activeIndex: 0,
				show: false,
				mobile: '',
				address: '',
				idEnter: '',
				basicInfo:{
					numberMobile: '',
					nameUser:''
				}
			}
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
		    this.idEnter = option.userId; //打印出上个页面传递的参数。
			// console.log("option.userId"+option.userId);
			this.basicInfo.numberMobile = option.mobileNumber;
			this.basicInfo.nameUser = option.userName
		},
		// created(){
		// 	if(!this.hasLogin) {
		// 		uni.reLaunch({
		// 			url:'../entiry/login'
		// 		})
		// 	}
		// },
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			dingwei(){
				uni.getLocation({
				    type: 'wgs84',
					geocode : true,
				    success: function (res) {
						console.log("11");
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						var point = new plus.maps.Point(res.longitude, res.latitude);
						plus.maps.Map.reverseGeocode(
						    point,
						    {},
						    function(event) {
						        var address = event.address; // 转换后的地理位置
						        var point = event.coord; // 转换后的坐标信息
						        var coordType = event.coordType; // 转换后的坐标系类型
						        console.log(address, 'address');        
						    },
						    function(e) {}
						);
					}
				});
			},
			tabIndex(index) {
				this.activeIndex = index;
			},
			tempChange(e) {
				this.temperature = e.detail.value;
			},
			toTempop() {
				this.show = true
			},
			backTo() {
				this.show = false
			},
			scanCode() {
				uni.request({
					url: 'http://localhost:8080/healthCode/add',
					method: 'POST',
					header: {'accessToken': localStorage.getItem("accessToken")},
					data: {
						city: this.address,
						type: this.temperature
					},
					success: (resp) => {
						const respData = resp.data;
						console.log(respData);
					}
				})
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log(res.result);
						void plus.runtime.openWeb(res.result);
					}
				});
			},
		}
	}
</script>

<style scoped>
	.content {
		background: url(../../static/background.jpg);
		width: 100%;
		height: 100%;
		position: fixed;
		background-repeat: no-repeat;
		background-position: 0px 0px;
		background-size: 100% 40%;
		font-family: 'iconfont';
	}

	.expand_application {
		width: 100%;
		position: fixed;
		left: 0;
		top: 76%;
		background-color: #f4f7ff;
		border-radius: 30upx;
	}
	.temPop-body .img-box{
		width: 100%;
		text-align: center;
		border-bottom: 1upx #e5e1e1 solid;
		position: relative;
	}
	
	.exit_icon {
		position: absolute;
		top: 18upx;
		left: 50%;
	}

	.temPop-body image {
		height: 400upx;
		position: relative;
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
	}

	.form-label {
		display: inline-block;
		font-size: 30upx;
		margin-bottom: 20upx;
		font-weight: 300;
	}

	.form-item-tempRadio label {
		display: block;
		margin-right: 25upx;
		margin-top: 15upx;
	}

	.fillBtn {
		width: 300upx;
		background-color: #3CB400;
		margin-top: 50upx;
		color: white;
		margin-bottom: 40upx;
	}
	
</style>
