//http://127.0.0.1:8888, https://wifirelay.hanxe.com
const default_host = "https://wifirelay.hanxe.com/gateway/iotgateway/ke1extend/"; 

var default_url = {
	devReg : default_host+'devreg',
	devInfo : default_host+'devinfo',
	devCmd : default_host+'devcmd',
	devHistory : default_host+'devhistory'
}

var guest_rooms = []

var device_info = {
	devid : "",
	devname : "",
	roomType: "",
	roomName: "",
}

export default {
  guest_rooms,
  default_url,
  device_info,
}