<template>
	<view>
		
		<view>
			当前状态
			{{light_status}}
		</view>
		<view id="light_pic">
			<image :src="light_src"></image>
		</view>
		<view>切换亮度</view>
		<view>
			<button type="primary" @tap="choose_off" id="btn_off">
				关灯
			</button>
			<button type="primary" @tap="choose_bright" id="btn_bright">
				开灯高亮度
			</button>
			<button type="primary" @tap="choose_dim" id="btn_dim">
				开灯低亮度
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				devid:'4e83c49c-0a88-4b18-a781-9ebd9306a972',
				light_src: "",
				// sdad: require("../../img"),
				light_status:"",
				lightImg:"",
			}
		},
		onLoad() {
			this.light_status = this.globalVal.current_room.light_status;
			this.renew_light_img();
		},
		onReady() {
		},
		methods: {
			choose_off(){
				this.light_status = "off";
				this.renew_light_img();
			},
			choose_bright(){
				this.light_status = "bright";
				this.renew_light_img();
			},
			choose_dim(){
				this.light_status = "dim";
				this.renew_light_img();
			},
			renew_light_img(){
				if (this.light_status=="off"){
					this.light_src = require("../../img/off.png");
				}
				else if (this.light_status=="bright"){
					this.light_src = require("../../img/on_bright.png");
				}
				else if (this.light_status=="dim"){
					this.light_src = require("../../img/on_dim.png");
				}
			},
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
