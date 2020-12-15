<template>
	<view>
		
		<view>当前状态</view>
		<view>切换亮度</view>
		<button type="primary">
			高级
		</button>
		<button type="primary">
			中级
		</button>
		<button type="primary">
			低级
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				devid:'4e83c49c-0a88-4b18-a781-9ebd9306a972',
				cWidth: '',
				cHeight: '',
				cWidth2: '', //横屏图表
				cHeight2: '', //横屏图表
				pixelRatio: 1,
				
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.cWidth2 = uni.upx2px(700);
			this.cHeight2 = uni.upx2px(1100);
		},
		onReady() {
		},
		methods: {
			   

		}
	}
</script>

<style>
	
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

</style>
