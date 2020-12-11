<template>
	<view class="uni-common-mt">
		<view class="logo-content">
			<image class="logo" src="/static/scan_icon.png" @tap="scanDev"></image>
		</view>
		
		<view class="uni-form-item uni-column">
			<view class="with-fun">
				<input class="uni-input inputText" placeholder="输入模组IMEI号" type="number" maxlength="15" @input="imeiInput"/>
			</view>
		</view>
		<!-- <view class="line"></view> -->
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					<!-- 类型 -->
				</view>
				<view class="uni-list-cell-db">
					<picker mode="selector" @change="bindPickerChange" :value="index" :range="room_type">
						<view class="uni-input">{{room_type[index]}}</view>
					</picker>
				</view>
			</view>
		</view>
		
		
		<!-- <view class="line"></view> -->
		<view class="uni-form-item uni-column">
			<view class="with-fun">
				<input class="uni-input inputText" placeholder="输入房间名" type="text" maxlength="15" @input="roomNameInput"/>
			</view>
		</view>
		
		<view class="line"></view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" :disabled="btnAddDisable" @tap="regDev">注册添加设备</button>
		</view>
		
		<view class="devIdText">
			设备ID号:<br>
			<text style="color: #0A98D5;">{{devid}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imei:"",/* 通过AT命令AT+CGSN=1获取 IMEI号并填入*/
				devid:'注册设备后服务器返回的设备id',/* 注册设备后服务器返回的设备id */
				devname:'',
				btnAddDisable:true,
				btnRenameDisable:true,
				btnInfoDisable:true,
				index: 0,
				room_type: ["请选择房间类型","客房","宴会厅","储藏室"],
				room_name: "",
			}
		},
		onLoad() {
			if(process.env.NODE_ENV === 'development'){
			    console.log('开发环境')
			}else{
			    console.log('生产环境')
			}
		},
		methods: {
			scanDev(){
				uni.scanCode({//启动摄像头扫描模组二维码获取IMEI号
					success: (res) => {
						var result;
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if(res.result.length>15){
							result = res.result.substring(0,15);
						}else{
							result = res.result;
						}
						console.log('result：' + result);
						this.imei = result;
						this.btnAddDisable = false;
					},
					fail: (err) => {
						console.log(err);
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: this.i18n.content_note.text_app_name+'需要使用您的相机，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				});
			},
			imeiInput(e){
				this.imei = e.target.value;
				if(15 == this.imei.length){
					this.btnAddDisable = false;
				}else{
					this.btnAddDisable = true;
				}
			},
			roomNameInput(e){
				this.room_name = e.target.value;
			},
			
			checkRoomValue() {
				if(this.index == 0) {
					uni.showToast({
						title: "请在选择房间类型后再注册！",
						icon: "none"
					});
					return false;
				}
				console.log(this.room_name);
				if(!this.room_name.length) {
					uni.showToast({
						title: "请输入房间名！",
						icon: "none"
					});
					return false;
				}
				return true;
			},
			regDev(){
				if(!this.checkRoomValue()) {
					console.log("reg fail! Invalid room value");
					return;
				}
				
				uni.showLoading({
					title: '注册中...',
					mask: false
				});
				var errcode = 1;
				var errmsg = "失败";
				uni.request({//向云端服务发送设备注册请求
					url: this.globalVal.default_url.devReg,
					method: 'POST',
					data: {
						imei: this.imei
					},
					success: res => {
						console.log(res);
						if(200 == res.statusCode){
							errcode = res.data.code;	// bugfix
							if(0 == errcode){
								errmsg = "注册成功";
								this.devid = res.data.deviceId;
								this.devname = res.data.deviceName;
								// 把注册后的device_info同步到全局
								var current_room = {
									room_type: this.index,
									room_name: this.room_name,
									device_id: res.data.deviceId,
									device_name: res.data.deviceName,
								}
								this.globalVal.guest_rooms.push(current_room);
								console.log("guest_rooms: " + this.globalVal.guest_rooms);
								this.btnInfoDisable = false;
							}else{
								errmsg = res.data.errmsg;
							}
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading();
						uni.showToast({
							title: errmsg,
							icon:"none",
							duration: 2500
						});
					}
				});
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		}
	}
</script>

<style>
	.logo-content {
		text-align: center;
		margin-top: 200upx;
		margin-bottom: 100upx;
	}
	
	.logo {
		height: 120upx;
		width: 120upx;
	}
	
	.line {
		width: 90%;
		height: 1px;
		margin-left: 30upx;
		margin-right: 30upx;
		background-color: #cccccc;
		margin-top: 1px;
	}
	
	.inputText {
		margin-left: 30upx;
	}
	.devIdText{
		margin-left: 30upx;
		margin-right: 30upx;
	}
</style>
