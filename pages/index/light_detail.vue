<template>
	<view>
		<view id="bg_top">
			<view id="light_pic">
				<image :src="light_src"></image>
			</view>
			<view id="current_text">
				当前状态
				{{light_status}}
			</view>
		</view>
		<view id="bg_bottom">
			<view id="order_cd">
				命令发送冷却cd: {{maxTime}}
			</view>
			<view class="uni-flex uni-row">
				<button  class="cmd-button button-one-line" :class="{'button-active': off_active}" :disabled="btnAddDisable" @tap="switch_light('off')">
					关灯
				</button>
				<button id="btn_bright" class="cmd-button" :class="{'button-active': bright_active}" :disabled="btnAddDisable" @tap="switch_light('bright')">
					开灯<br>
					高亮度
				</button>
				<button id="btn_dim" class="cmd-button" :class="{'button-active': dim_active}" :disabled="btnAddDisable" @tap="switch_light('dim')">
					开灯<br>
					低亮度
				</button>
				<button class="cmd-button button-one-line" :class="{'button-active': curtain_active}" :disabled="btnAddDisable"  id="btn_curtain" @tap="switch_light('curtain')">
					窗帘
				</button>
			</view>
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
				off_active: true,
				bright_active: false,
				dim_active: false,
				curtain_active: false,
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
				switch(status) {
					case "off":
						this.off_active = true;
						this.bright_active = false;
						this.dim_active = false;
						break;
					case "bright":
						this.off_active = false;
						this.bright_active = true;
						this.dim_active = false;
						break;
					case "dim":
						this.off_active = false;
						this.bright_active = false;
						this.dim_active = true;
						break;
					case "curtain":
						this.curtain_active = !this.curtain_active;
						break;
					default: break;
				}
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
						console.log(this.light_status);
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
						clearInterval(this.interval);
						this.interval = null;
						this.btnAddDisable = false;
						return;
					}else{
						this.maxTime--;
					}
					//console.log(this.btnInfo);
				},1000);
			}

		}
	}
</script>

<style>
	page {
		background: #ffffff;
		width: 750upx;
		overflow-x: hidden;
	}
	
	#light_pic {
		top:auto;
		height:250px;
	}
	
	image {
		width: 150px;
		height: 150px;
		top:100px
	}
	
	#current_text {
		
		margin-top:150px
	}
	
	.cmd-button {
		width:80px;
		height:80px;
		margin-top: 15px;
		border: solid 1upx #AAAAAA;
		border-radius: 100upx;
		font-size: 14px;
		background: #FFFFFF;
	}
	
	.button-active {
		color: #ffffff;
		background: #0C4CD5;
	}
	
	.button-one-line {
		font-size: 35upx;
		padding: 35rpx;
	}
	
	#btn_off {
		line-height: 100upx;
		color: #ffffff;
	}
	
	#order_cd {
		margin-top: 5px;
	}
	#bg_top {
		height: 450px;
		background-color: #82c5ff;
		text-align: center;
	}
	#bg_bottom {
		bottom: 0;
	}

</style>
