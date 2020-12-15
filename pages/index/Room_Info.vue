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
								<!-- 这东西怎么不跟这变啊操 -->
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
		
		<view class="topbox">
			<view>
				<view>设备号:</view>
				<view>{{devid}}</view>
			</view>
		</view>
		<view class="topbox2" @tap="viewLightDetail">
			<view>
				<view >光强:</view>
				<view >{{illumination}}</view>
			</view>
		</view>
		<view class="topbox">
			<view>
				<view>噪音:</view>
				<view>{{sound}}</view>
			</view>
		</view>
		<view class="topbox2">
			<view>
				<view>温度:</view>
				<view>{{termperature}}</view>
			</view>
		</view>
		<view class="topbox">
			<view>
				<view>湿度:</view>
				<view>{{humidity}}</view>
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
				devid:'43132880-90cb-45e7-b4f9-f3f0d1670a82',
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
	
	.topbox{
		background: #8A6DE9;
		padding: 15px;
		height: 40px;
		margin: 9px;
		
		border-radius: 15px;
	}
	
	.topbox2{
		background: #66AAFF;
		padding: 15px;
		height: 40px;
		margin: 9px;
		border-radius: 15px;
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
		background: #FFB400;
		color: #000000;
	}
	@import "./style/devinfo.css";
	@media ( min-width : 750px) {
		.top{color:#f00}
	}
</style>
