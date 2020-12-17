<template>
	<view class="devinfo">
		<view class="topbox device-box">
			<view>
				<view>设备号:</view>
				<view>{{devid}}</view>
			</view>
		</view>
		<view class="uni-card find-device">
			开始寻找设备
			<switch class="right-switch" @change="switch_change"></switch>
		</view>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				devid:'a3e7d01c-a537-47d2-ac28-9ba5881b201a',
			}
		},
		methods: {
			switch_change(e) {
				var cmdcode = 4;
				if(!e.target.value) {
					cmdcode = 5; 
				}
				console.log(e.target.value);
				this.sendCmd(cmdcode);
			},
			sendCmd(cmdcode){
				console.log("sendCmd");
				if(36 != this.devid.length){
					uni.showToast({
						icon:'none',
						title: '设备ID号错误,请先注册！'
					});
					return;
				}
				//{"cmdstring":"{"L1":0,"L2":0}","cmdlen":15,"cmdcode":3}
				var cmd = "noise";
				let cmdpara = {
					cmdstring: cmd,
					cmdlen: cmd.length,
					cmdcode: cmdcode
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
					},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
	
</script>

<style>
	.topbox {
		position: relative;
		background: #d3e8e9;
		padding: 15px;
		height: 40px;
		margin: 9px;
		
		border-radius: 15px;
	}
	
	.device-box {
		background-color: #767676;
		color: #FFFFFF;
	}
	
	.find-device {
		height: 70upx;
	}
	
	.right-switch {
		position: absolute;
		right: 10%;
		/* top: 30%; */
		font-size: 20upx;
		height: 30%;
	}
	
	@import "./style/devinfo.css";
	
</style>
	