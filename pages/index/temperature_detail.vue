<template>
	<view>
		
		<view>
			当前温度
			{{temperature_num}}
			供暖已{{temperature_status}}
		</view>
		<view>
			命令发送冷却cd: {{maxTime}}
		</view>
	<!-- 	<view id="light_pic">
			<image :src="light_src"></image>
		</view> -->
		<view>
			<button type="primary" :disabled="btnAddDisable" @tap="switch_tem('off')" id="btn_off">
				关闭供暖
			</button>
			<button type="primary" :disabled="btnAddDisable" @tap="switch_tem('on')" id="btn_bright">
				打开供暖
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				devid:'4e83c49c-0a88-4b18-a781-9ebd9306a972',
				temperature_num:0,
				temperature_status:"on",
				btnAddDisable: false,
				maxTime:0,
			}
		},
		onLoad() {
			this.temperature_num = this.globalVal.current_room.temperature_num;
			this.renew_temperature_status();
		},
		onReady() {
		},
		methods: {
			switch_tem(status) {
				this.temperature_status = status;
				this.renew_temperature_status();
				this.send_light_cmd(status);
			},
			renew_temperature_status(){
				switch (this.temperature_num) {
					default:
						break;
				}
			},
			send_light_cmd(status){
				console.log("sendCmd: " + status);
				if(36 != this.devid.length){
					uni.showToast({
						icon:'none',
						title: '设备ID号错误,请先注册！'
					});
					return;
				}
				// if(0 != this.maxTime){
				// 	console.log("sendCmd busy");
				// 	return;
				// }
				// {"cmdstring":"{"L1":0,"L2":0}","cmdlen":15,"cmdcode":3}
				let cmdpara = {
					cmdstring: status, // bright | dim | off
					cmdlen: status.length,
					cmdcode:this.globalVal.cmd_code_tab.switch_light,
				}
				let cmdstr = JSON.stringify(cmdpara);
				console.log("cmdstr:"+cmdstr);
				
				uni.request({
					url: this.globalVal.default_url.devCmd,
					method: 'POST',
					data: {
						deviceId:this.devid,
						cmdInfo:cmdstr
					},
					success: res => {
						console.log(res);
						uni.showToast({//向云端服务发送命令下发请求
							title: '命令下发成功!请检查设备端',
							icon:"none",
							duration:3000
						});
						this.btnAddDisable = true;
						this.maxTime = 10;
						this.countDownFun();
					},
					fail: () => {},
					complete: () => {}
				});
			},
			countDownFun(){
				console.log("countDown start...");
				this.cntDown = setInterval(()=>{
					if(0 == this.maxTime){
						this.btnInfo = "命令下发"
						clearInterval(this.interval);
						this.interval = null;
						this.btnAddDisable = false;
						return;
					}else{
						this.maxTime--;
						this.btnInfo = this.maxTime+"秒";
					}
					//console.log(this.btnInfo);
				},1000);
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
	
	#light_pic {
		text-align: center;
	}

</style>
