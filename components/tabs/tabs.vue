<template>
	<view class="tabs" :style="{backgroundColor: backgroundColor}">
		<scroll-view class="tabs_scroll" scroll-x="true">
			<view class="tabs_scroll_box">
				<view class="tabs_scroll_item" :class="{active:activeClick===index}" v-for="(item,index) in tabLists"
					:key="index" @click="tabClick(index)">{{item}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "tabs",
		props: {
			tabs: {
				type: Array,
				default () {
					return [];
				}
			},
			backgroundColor: {
				type: String
			}
		},
		data() {
			return {
				activeClick: 0,
				tabLists: this.tabs,
			};
		},
		methods: {
			tabClick(index) {
				this.$emit('tabIndex', index)
				this.activeClick = index;
			}
		}
	}
</script>

<style>
	.tabs {
		border-bottom: 1upx #e8f0fb solid;
		box-sizing: border-box;
		width: 100%;
	}

	.tabs_scroll_box {
		height: 95upx;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-around;
		font-weight: 700;
		font-size: 30upx;
	}

	.active {
		color: #007AFF;
		border-bottom: 1upx #749ff5 solid;
	}
</style>
