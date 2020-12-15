<template>
	<view>
		
		<view>当前状态</view>
		<view id="light_pic">
			{{light_status}}
			<image :src="light_src"></image>
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
				light_src: require("../../img/on_bright.png"),
				// sdad: require("../../img"),
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
			// send_light_cmd(){
			// 	console.log("sendCmd");
			// 	if(36 != this.devid.length){
			// 		uni.showToast({
			// 			icon:'none',
			// 			title: '设备ID号错误,请先注册！'
			// 		});
			// 		return;
			// 	}
			// 	// if(0 != this.maxTime){
			// 	// 	console.log("sendCmd busy");
			// 	// 	return;
			// 	// }
			// 	//{"cmdstring":"{"L1":0,"L2":0}","cmdlen":15,"cmdcode":3}
			// 	// var cmdstr = "";
			// 	// var 
			// 	let cmdpara = {
			// 		cmdstring:this.cmdstr,
			// 		cmdlen:this.cmdstr.length,
			// 		cmdcode:this.cmdcode
			// 	}
			// 	let cmdstr = JSON.stringify(cmdpara);
			// 	console.log("cmdstr:"+cmdstr);
				
			// 	uni.request({
			// 		url: this.globalVal.default_url.devCmd,
			// 		method: 'POST',
			// 		data: {
			// 			deviceId:this.devid,
			// 			cmdInfo:cmdstr
			// 		},
			// 		success: res => {
			// 			console.log(res);
			// 			uni.showToast({//向云端服务发送命令下发请求
			// 				title: '命令下发成功!请检查设备端',
			// 				icon:"none",
			// 				duration:3000
			// 			});
			// 			this.btnAddDisable = true;
			// 			this.maxTime = 60;
			// 			this.countDownFun();
			// 		},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// },

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
