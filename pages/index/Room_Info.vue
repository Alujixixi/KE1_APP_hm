<template>
	<view class="devinfo">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					请选择房间
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" :range="room_range" @change="room_change" :value="room_index" @columnchange="colchange">
						<view class="uni-flex uni-row">
							<view id="room-selector" style="padding: 0 20upx !important">
								{{room_range[0][room_index[0]]}}&nbsp&nbsp&nbsp&nbsp&nbsp{{room_range[1][room_index[1]]}}
							</view>
						</view>
					</picker>
				</view>
				<view class="small-botton-cell">
					<button class="small-botton"   @tap="getInfo">确认</button>
				</view>
				<view class="small-botton-cell">
					<button class="small-botton"   @tap="getInfo">刷新房间</button>
				</view>
			</view>
		</view>
		
		<view class="topbox device-box">
			<view>
				<view>设备号:</view>
				<view>{{devid}}</view>
			</view>
		</view>
		<view class="topbox temp-box" @tap="viewTemperatureDetail">
			<view class="box-text">温度:  {{termperature}}</view>
		</view>
		<view class="topbox light-box uni-flex uni-row" @tap="viewLightDetail">
			<view class="box-text">光强:  {{illumination}}</view>
			<view class="right-ctl">
				<view class="right-ctl-txt">灯光控制→</view>
			</view>
		</view>
		<view class="topbox noise-box">
			<view class="box-text">噪音:  {{sound}}</view>
		</view>
		<view class="topbox humid-box">
			<view class="box-text">湿度:   {{humidity}}</view>
			<view class="right-ctl" style="color: #FFFFFF;">
				加湿器开关：<switch />
			</view>
			
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button class="flush-button"   @tap="getInfo">刷新数据</button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				room_range: [["请选择","客房","宴会厅","储藏室"],["待选择"]],
				room_index: [0,0],
				devid:'a3e7d01c-a537-47d2-ac28-9ba5881b201a',
				devinfo:null,
				userinfo:null,
				illumination:666,//光照
				sound:233,//噪音
				LED:true,
				signal:4,//信号强度
				termperature:25,
				humidity:30,
			}
		},
		onLoad:function(e){
			this.getInfo();
		},
		methods: {
			room_change(e) {
				if(this.room_index[0] !== e.target.value[0]) {
					this.room_index[0] = e.target.value[0];
					var room_type = this.globalVal.index_2_room_type_tab[this.room_index[0]] + "s";
					this.room_range[1] = this.globalVal.rooms[room_type];
					if(this.room_range[1].length === 0) 
						this.room_range[1].unshift("暂无房间");
					var text = this.room_range[0][this.room_index[0]] + "&nbsp&nbsp&nbsp&nbsp&nbsp" + this.room_range[1][this.room_index[1]]
					document.getElementById("room-selector").innerHTML = text;
				}
			},
			colchange(e){
				console.log(e);
				if(e.target.column==0) {
					this.room_index[0] = e.target.value;
					var room_type = this.globalVal.index_2_room_type_tab[this.room_index[0]] + "s";
					this.room_range[1] = this.globalVal.rooms[room_type];
					if(this.room_range[1].length === 0) 
						this.room_range[1].unshift("暂无房间");
					var text = this.room_range[0][this.room_index[0]] + "&nbsp&nbsp&nbsp&nbsp&nbsp" + this.room_range[1][this.room_index[1]]
					document.getElementById("room-selector").innerHTML = text;
				}
			},			
			getInfo(){
				uni.showLoading({
					title: '数据加载中...',
					mask: false
				});
				uni.request({
					url: this.globalVal.default_url.devInfo,
					method: 'POST',
					data: {
						deviceId:this.devid
					},
					success: res => {
						console.log(res);
						if(200 == res.statusCode){
							this.devinfo = JSON.stringify(res.data);
							if(undefined == res.data.error_code){
								this.userinfo = res.data.services[0].data.infostring;
								let val = JSON.parse(this.userinfo);
								this.termperature = val.T;
								this.humidity = val.H;
								this.sound = val.V;
								this.illumination = val.L
								console.log("温度: "+val.T+"C"+" 湿度: "+val.H+"%"+" 噪音: "+val.V+"%"+" 光强: "+val.L+"%");
							}
							
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			viewLightDetail(){
				uni.navigateTo({
					url: 'light_detail',
					// ?list="+encodeURIComponent(JSON.stringify(this.room_range[0][this.room_index]))+ '&allprice=' +this.getAllPrice
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			viewTemperatureDetail(){
				uni.navigateTo({
					url: 'temperature_detail',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>
	#room-selector {
		color: #0c4cd5;
		font-weight: bold;
	}
	.top{
		color:#fff;
		height:30px;
		text-align: center;
	}
	.devinfo{
		background:#FFFFFF;
		color:#000000;
		height: 100%;
	}
	
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
	
	.light-box {
		background-color: #f0ffb9;
	}
	
	.noise-box {
		
	}
	
	.temp-box {
		background: #fe5e58;
	}
	
	.humid-box {
		background: #0A98D5;
	}
	
	.box-text {
		position:absolute;
		top: 20%;
		font-size: 40upx;
	}
	
	.right-ctl {
		position: absolute;
		right: 10%;
		top: 30%;
		font-size: 20upx;
		height: 30%;
	}
	.right-ctl-txt {
		color: #717e7d;
	}
	.content{
		height: calc(100% - 10px);
	}
	.uni-tab{
		height: calc(100% - 210px); 
	}
	.small-botton-cell {
		width: auto;
		margin: 0 2upx;
	}
	.small-botton{
		font-size: 20rpx;
		padding: 0 10upx;
		margin: 10upx;
	}
	.flush-button {
		margin-top: 30upx;
	    margin-left: 0;
	    margin-right: 0;
		margin-bottom: 10px;
		background: #767676;
		color: #ffffff;
	}
	@import "./style/devinfo.css";
	@media ( min-width : 750px) {
		.top{color:#f00}
	}
</style>
