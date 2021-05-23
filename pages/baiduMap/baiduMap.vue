<template>
	<view class="baiduMap">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'../../static/index.html'
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
