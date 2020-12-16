<template>
	<view>
		<view id="bg_top">
			<view id="bignum_box">
					<text id="bignum">
						{{temperature_num}}
					</text>
			</view>
			<text id="small_c">℃</text>
			<view id="dev_status">
				供暖状态<br>{{temperature_status}}
			</view>
			<view id="outside_status">
				室外温度<br>{{temperature_outside}}&nbsp℃
			</view>
		</view>

		<view id="bg_bottom">
			<view class="uni-flex uni-row">
				<button type="warn" :disabled="btnAddDisable" @tap="switch_tem('off')" id="btn_off" class="dev_btn">
					关闭<br>供暖
				</button>
				<button type="primary" :disabled="btnAddDisable" @tap="switch_tem('on')" id="btn_bright" class="dev_btn">
					打开<br>供暖
				</button>
			</view>
			<view id="order_cd">
				命令发送冷却cd: {{maxTime}}
			</view>
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
				temperature_outside:6,
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
				if(0 != this.maxTime){
					console.log("sendCmd busy");
					return;
				}
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
	
	#bg_top {
		height: 460px;
		background-color: #82c5ff;
		background-color: linear-gradient(to bottom right, #82c5ff, #5277ec);
		text-align: center;
		position: relative;
	}
	#bignum {
		border-radius: 50%;
		border: solid #e8e7ff73;
		padding:160rpx;
		color: #e8e7ff;
		font-size: 160rpx;
	}
	#bignum_box {
		padding-top: 300rpx;
	}
	#small_c {
		color: #e8e7ff;
	}
	#dev_status {
		bottom: 50rpx;
		position: absolute;
		left:100rpx;
		color: #3a425f;
		font-weight: 700;
		font-size: 30rpx;
	}
	#outside_status {
		bottom: 50rpx;
		position: absolute;
		right:100rpx;
		color: #3a425f;
		font-weight: 700;
		font-size: 30rpx;
	}
	#bg_bottom {
		margin-top: 50rpx;
		text-align: center;
	}
	#order_cd{
		text-align: center;
		margin-top: 20rpx;
	}
	.dev_btn {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		font-size: 30rpx;
	}
</style>
