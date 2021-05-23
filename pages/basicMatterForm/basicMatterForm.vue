<template>
	<view class="basicMatterForm">
		<view class="basicMatterForm_step">
			<u-steps :list="numLists" mode="number" :current="currentIndex" active-color="#3CB400"></u-steps>
		</view>
		<view class="form_content">
			<registry @stepNext="stepClick" @stepPrevious="pervStepClick" :activeIndex="currentIndex" :mobNumber="mobile" :adminId="userId"></registry>
		</view>
	</view>
</template>

<script>
	import registry from '@/components/registry/registry.vue'

	export default {
		components: {
			registry
		},
		data() {
			return {
				numLists: [{
					name: '基本信息'
				}, {
					name: '接触情况'
				}, {
					name: '健康状况'
				}],
				index: 0,
				currentIndex: 0,
				sexs: [{
					name: "男"
				}, {
					name: "女"
				}],
				grouplist: {
					name: '',
					sexIndex: 0
				},
				mobile: '',
				userId: ''
			};
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		console.log(option)
		    this.mobile = option.mobileNumber; //打印出上个页面传递的参数。
			this.userId = option.enterId;
		},
		methods: {
			stepClick() {
				if ((this.currentIndex++) >= 2) this.currentIndex == 0;
			},
			pervStepClick(){
				if (!(this.currentIndex--)) this.currentIndex == 0;
			}
		}
	}
</script>

<style>
	.basicMatterForm_step {
		background-color: white;
		padding-top: 30upx;
		padding-bottom: 60upx;
	}

	.form_content {
		height: 1070upx;
		background-color: white;
	}
</style>
