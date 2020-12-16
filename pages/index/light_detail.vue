<template>
	<view>
		
		<view>
			当前状态
			{{light_status}}
		</view>
		<view>
			命令发送冷却cd: {{maxTime}}
		</view>
		<view id="light_pic">
			<image :src="light_src"></image>
		</view>
		<view>切换亮度</view>
		<view>
			<button type="primary" :disabled="btnAddDisable" @tap="switch_light('off')" id="btn_off">
				关灯
			</button>
			<button type="primary" :disabled="btnAddDisable" @tap="switch_light('bright')" id="btn_bright">
				开灯高亮度
			</button>
			<button type="primary" :disabled="btnAddDisable" @tap="switch_light('dim')" id="btn_dim">
				开灯低亮度
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				devid:'a3e7d01c-a537-47d2-ac28-9ba5881b201a',
				light_src: "",
				light_status:"",
				lightImg:"",
				btnAddDisable: false,
				maxTime:0,
			}
		},
		onLoad() {
			this.light_status = this.globalVal.current_room.light_status;
			this.renew_light_img();
		},
		onReady() {
		},
		methods: {
			switch_light(status) {
				this.light_status = status;
				this.renew_light_img();
				this.send_light_cmd(status);
			},
			renew_light_img(){
				switch (this.light_status) {
					case "off": 
						this.light_src = require("../../img/off.png");
						break;
					case "bright":
						this.light_src = require("../../img/on_bright.png");
						break;
					case "dim":
						this.light_src = require("../../img/on_dim.png");
						break;
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
				if(0 != this.maxTime){
					console.log("sendCmd busy");
					return;
				}
				// {"cmdstring":"{"L1":0,"L2":0}","cmdlen":15,"cmdcode":3}
				console.log(this.globalVal.cmd_code_tab);
				let cmdpara = {
					cmdstring: status, // bright | dim | off
					cmdlen: status.length,
					cmdcode:this.globalVal.cmd_code_tab[status], // 以cmdcode的值来唯一区别不同的操作，对应关系见cmd_code_tab
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
						this.maxTime = 5;
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
