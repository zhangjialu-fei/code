<template>
	<view class="information">
		<scroll-view scroll-y="true" class="information_scroll">
			<view class="text" v-for="(item,index) in textLists" :key="index">
				{{item}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "information",
		data() {
			return {
				textLists: []
			};
		},
		created : function() {
			this.getMessages();
		},
		methods:{
			getMessages() {
				uni.request({
					url: 'http://localhost:8080/message/all',
					method: 'POST',
					header: {'accessToken': localStorage.getItem('accessToken')},
					success: (resp) => {
						const respData = resp.data;
						if (respData.code == 200) {
							this.textLists=respData.data;
						}
					}
				})
			}
			
		}
	}
</script>

<style>
	.information_scroll {
		width: 100%;
		height: 180upx;
		overflow: hidden;
		margin-bottom: 10upx;
	}
	.text {
		height: 80upx;
		padding-left: 20upx;
		line-height: 75upx;
		border-bottom: 2upx #e8f0fb solid;
		font-size: 30upx;
	}
</style>
