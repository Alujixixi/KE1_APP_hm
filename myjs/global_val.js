//http://127.0.0.1:8888, https://wifirelay.hanxe.com
const default_host = "https://wifirelay.hanxe.com/gateway/iotgateway/ke1extend/"; 

var default_url = {
	devReg : default_host+'devreg',
	devInfo : default_host+'devinfo',
	devCmd : default_host+'devcmd',
	devHistory : default_host+'devhistory'
};


 // 所有room都的信息都放在这里面，分成三类，每一类为一个数组
 // 数组中存放每一个房间的信息，
 // 每一个房间的结构为：
 var current_room = {
 	room_type: "guest_room",
 	room_name: "客房101",
 	device_id: "43132880-90cb-45e7-b4f9-f3f0d1670a82",  // 房间对应设备的设备id
 	device_name: "",  //设备名字，这个不知道有啥用
	light_status:"off", // off bright dim
	temperature_num:25,
};

var rooms = {
	guest_rooms: ["111","222","333"],
	banquet_halls: ["444","555"],
	storerooms: ["666","777"],
};

var index_2_room_type_tab = ["invalid", "guest_room", "banquet_hall", "storeroom"];

var cmd_code_tab = {
	"off" : 0,
	"bright" : 1,
	"dim" : 2,
	// "" : 0,
}

export default {
  default_url,
  rooms,
  current_room,
  index_2_room_type_tab,
  cmd_code_tab,
}