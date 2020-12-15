<template>
	<view>
		
		<view>当前状态</view>
		<view>
			{{light_status}}
			<image src="lightImg"></image>
		</view>
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
				light_status:"",
				lightImg:"",
			}
		},
		onLoad() {
			this.light_status = this.globalVal.current_room.light_status;
			this.choose_light();
		},
		onReady() {
		},
		methods: {
			choose_light(){
				console.log(this.light_status);
				if (this.light_status=="off"){
					this.lightImg = "D:/HBuilderX/repo/KE1_APP_hm/img/off.png";
				}
				else if (this.light_status=="bright"){
					this.lightImg = "../../img/on_bright.png";
				}
				else if (this.light_status=="dim"){
					this.lightImg = "../../img/on_dim.png";
				}
			}

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
