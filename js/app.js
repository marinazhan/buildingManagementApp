var httpUrl = "http://121.40.174.117:8080/buildingManagement2/";
// var httpUrl="http://192.168.1.117:8083/buildingManagement/";
// var httpUrl="http://localhost:8083/buildingManagement/";


//建筑信息
const buildFloor = [
	{
		build: "北楼",
		roomNum: [7, 21, 23, 24, 14, 4]
	},
	{
		build: "南楼",
		roomNum: [8, 14, 17, 17, 13, 15, 10]
	},
	{
		build: "西楼",
		roomNum: [5, 4]
	}
];

const viewController = (updateFlag, type, value, deviceName) => {
	// console.log("haha");
	if (updateFlag) {
		updateState(type, value, deviceName).then(function () {
			//控制硬件
			switch (type) {
				case 0: //控制空调开关
					break;
				case 1: //控制空调温度
					break;
				case 2: //控制空调温度
					break;
				case 3: //控制空调模式
					break;
			}
		});
	}
	switch (type) {
		case 0:
			if (value == 0) {//开关样式
				if ($("#onOff.room_Admin_radio").hasClass("room_Admin_radio_select")) {
					$("#onOff.room_Admin_radio").removeClass("room_Admin_radio_select");
				}
				$("#onOffText").text("off");
			}
			else {
				if (!$("#onOff.room_Admin_radio").hasClass("room_Admin_radio_select")) {
					$("#onOff.room_Admin_radio").addClass("room_Admin_radio_select");
				}
				$("#onOffText").text("on");
			}
			break;
		case 1: //温度
			$("#temperature").val(value + "℃");
			break;
		case 2:
			$("#speedSelect").val(value);
			break;
		case 3:
			$("#windMood").val(value);
			break;
	}
}

const clickDisabled = () => {
	if (!$("#onOff").hasClass("divDisabled")) {
		$("#onOff").addClass("divDisabled");
	}
	if (!$(".temperButton").hasClass("divDisabled")) {
		$(".temperButton").addClass("divDisabled")
	}
	if (!$("#speedSelect").prop("disabled")) {
		$("#speedSelect").prop("disabled", true);
	}
	if (!$("#windMood").prop("disabled")) {
		$("#windMood").prop("disabled", true);
	}
	if (!$("#temperType").prop("disabled")) {
		$("#temperType").prop("disabled", true);
	}
}

//页面元素可点击
const clickAbled = () => {
	if ($("#onOff").hasClass("divDisabled")) {
		$("#onOff").removeClass("divDisabled");
	}
	if ($(".temperButton").hasClass("divDisabled")) {
		$(".temperButton").removeClass("divDisabled")
	}
	if ($("#speedSelect").prop("disabled")) {
		$("#speedSelect").prop("disabled", false);
	}
	if ($("#windMood").prop("disabled")) {
		$("#windMood").prop("disabled", false);
	}
	if ($("#temperType").prop("disabled")) {
		$("#temperType").prop("disabled", false);
	}
}

//页面元素可点击 on
const clickOnAbled = () => {
	if ($("#onOff").hasClass("divDisabled")) {
		$("#onOff").removeClass("divDisabled");
	}
}

const updateState = (type, value, name) => {
	// console.log("hehe");
	//    console.log(value);
	//    console.log(name);
	let speURL = "";
	switch (type) {
		case 0: //开关
			speURL = httpUrl + "updateSwitch.do";
			break;
		case 1://空调温度
			speURL = httpUrl + "updateTemperature.do";
			break;
		case 2://空调风速
			speURL = httpUrl + "updateFlowSpeed.do";
			break;
		case 3://空调模式
			speURL = httpUrl + "updateWindMood.do";
			break;
	}
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: "POST",
			url: speURL,
			data: {
				deviceId: name,
				paramValue: value
			},
			success: function (res) {
				console.log(res);
				resolve(res);
			},
			error: function (err) {
				reject(err);
			}
		});
	})
}

function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

var iphoneState = IsPC();
//console.log(iphoneState);
if (!iphoneState) {
	if (!$("#nav>div").hasClass("phone")) {
		$("#nav>div").addClass("phone");
	}
	else {
		$("#nav>div").removeClass("phone");
	}

}

const getjcData = () => {
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: "POST",
			url: httpUrl + "selectJcAllDeviceInfos.do",
			dataType: "JSON",
			data: {},
			async: true,
			success: function (res) {
				console.log(1112222);
				resolve(res);
			},
			error: function (err) {
				reject(err);
			}
		})
	});
}

const getlsData = () => {
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: "POST",
			url: httpUrl + "selectLsAllDeviceInfos.do",
			data: {},
			dataType: "JSON",
			async: true,
			success: function (res) {
				resolve(res);
			},
			error: function (err) {
				reject(err);
			}
		})
	});
}

const controlDevices = (devsn, count, type, data) => {
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: "POST",
			url: httpUrl + "controlDevices.do",
			data: {
				count: count,
				type: type,
				data: data,
				devsn: devsn
			},
			success: function (res) {
				console.log(res);
				resolve(res);
			},
			error: function (err, a, b) {
				console.log(err);
				console.log(a);
				console.log(b);
				reject(err);
			}
		});
	});
}

function isSelectDevs(control_Num, dev_Num) {
	let boolean = false;
	if (tempSelectModel == 'single') {

		if (control_Num == current_controlNum && dev_Num == current_devNum) {
			return "<tr class='selectDev'>";
		}
	}
	else if (tempSelectModel == 'double') {

		for (const devs of current_floor_devs) {
			let { controlNum, devNum } = devs;

			if (control_Num == controlNum && dev_Num == devNum) {
				return "<tr class='selectDev'>";
			}
		}

	}
	return boolean;
}

function getjcDataThen(res) {
	//删除表格中所有非default
	$("#jcData>table>tr:not(.default)").remove();
	let jcHtml = `<tr class="default">
					<td>楼栋</td>
					<td>楼层</td>
					<td>房间编号</td>
					<td>控制器号</td>
					<td>设备号</td>
					<td>设备类型</td>
					<td>风速</td>
					<td >模式</td>
					<td>制冷温度</td>
					<td >制热温度</td>
					<td>实际温度</td>
				</tr>`;
	for (let i = 0; i < res.length; i++) {

		let controlNum = res[i].controlNum;
		let devNum = res[i].devNum;

		if (i % 2 != 0) {
			let bool = isSelectDevs(controlNum, devNum);
			if (bool) {
				jcHtml += bool;
			} else {
				jcHtml += "<tr>";
			}
		} else {
			let bool = isSelectDevs(controlNum, devNum);
			if (bool) {
				jcHtml += bool;
			} else {
				jcHtml += "<tr class='notSingleTr'>";
			}
		}

		jcHtml += "<td>" + res[i].build + "</td><td>" + res[i].floor + "楼</td><td>" + res[i].number + "</td>";
		jcHtml += "<td>" + res[i].controlNum + "</td><td>" + res[i].devNum + "</td><td>" + res[i].devType + "</td>";

		let windSpeed = parseInt(res[i].windSpeed, 16);
		if (windSpeed == 0) {
			jcHtml += "<td>自动风</td>";
		} else if (windSpeed > 0 && windSpeed < 8) {
			jcHtml += `<td>${windSpeed}档风</td>`;
		} else if (windSpeed == 9) {
			jcHtml += `<td>低风</td>`;
		} else if (windSpeed == 10) {
			jcHtml += `<td>中风</td>`;
		} else if (windSpeed == 11) {
			jcHtml += `<td>高风</td>`;
		} else if (windSpeed == 12) {
			jcHtml += `<td>12</td>`;
		}

		let mood = parseInt(res[i].mood, 16);

		if (mood == 0) {
			jcHtml += "<td>0</td>";
		} else if (mood == 1) {
			jcHtml += "<td>送风模式</td>";
		} else if (mood == 2) {
			jcHtml += "<td>制冷模式</td>";
		} else if (mood == 3) {
			jcHtml += "<td>制热模式</td>";
		} else if (mood == 4) {
			jcHtml += "<td>自动模式</td>";
		} else if (mood == 5) {
			jcHtml += "<td>除湿模式</td>";
		}

		jcHtml += "<td>" + parseInt(res[i].targetTemperCold, 16) + "</td>";
		jcHtml += "<td>" + parseInt(res[i].targetTemperHeater, 16) + "</td>";
		jcHtml += "<td>" + parseInt(res[i].trueTemper, 16) + "</td></tr>";
	}

	$("#jcData>table").html(jcHtml);
};
getjcData().then(getjcDataThen);

function getlsDataThen(res) {//删除表格中所有非default
	$("#lsData>table>tr:not(.default)").remove();
	//	console.log(res);

	let lsHtml = `<tr class="default">
					<th>楼栋</th>
					<th>楼层</th>
					<th>房间编号</th>
					<th>控制器号</th>
					<th>设备号</th>
					<th>设备类型</th>
					<th>开关状态</th>
				</tr>`;
	for (let i = 0; i < res.length; i++) {
		let onOffStatus = "";
		if (res[i].onOffStatus == 1) {
			onOffStatus = "开机";
		}
		else {
			onOffStatus = "关机";
		}

		let controlNum = res[i].controlNum;
		let devNum = res[i].devNum;

		if (i % 2 != 0) {
			let bool = isSelectDevs(controlNum, devNum);
			if (bool) {
				lsHtml += bool;
			} else {
				lsHtml += "<tr>";
			}
		} else {
			let bool = isSelectDevs(controlNum, devNum);
			if (bool) {
				lsHtml += bool;
			} else {
				lsHtml += "<tr class='notSingleTr'>";
			}
		}

		lsHtml += "<td>" + res[i].build + "</td><td>" + res[i].floor + "楼</td><td>" + res[i].number + "</td>";
		lsHtml += "<td>" + res[i].controlNum + "</td><td>" + res[i].devNum + "</td><td>" + res[i].devType + "</td>";
		lsHtml += "<td>" + onOffStatus + "</td></tr>";
	}
	$("#lsData>table").html(lsHtml);
};
getlsData().then(getlsDataThen);

//导航栏点击 离散数据按钮
$("#tab-lsData").click(function (e) {
	if (!$("#nav").hasClass("whiteBg")) {
		$("#nav").addClass("whiteBg")
	}
	if (!$("body").hasClass("dataBg")) {
		$("body").addClass("dataBg")
	}
	$("#nav>div>div").removeClass("active");
	$(".tab").removeClass("active");
	$(".underline").removeClass("active");
	$("#tab-lsData>.underline").addClass("active");

	$("#tab-lsData").addClass("active");
	$("#lsData").addClass("active");

	$("#control>table").hide();

	getlsData().then(getlsDataThen);
});

//导航栏点击 寄存器数据按钮
$("#tab-jcqData").click(function (e) {
	if (!$("#nav").hasClass("whiteBg")) {
		$("#nav").addClass("whiteBg")
	}
	if (!$("body").hasClass("dataBg")) {
		$("body").addClass("dataBg")
	}
	$("#nav>div>div").removeClass("active");
	$(".tab").removeClass("active");
	$(".underline").removeClass("active");
	$("#tab-jcqData>.underline").addClass("active");

	$("#tab-jcqData").addClass("active");
	$("#jcData").addClass("active");

	$("#control>table").hide();

	getjcData().then(getjcDataThen);
});
//导航栏点击 反控设备按钮
$("#tab-control").click(function (e) {
	if ($("#nav").hasClass("whiteBg")) {
		$("#nav").removeClass("whiteBg");
	}
	if ($("body").hasClass("dataBg")) {
		$("body").removeClass("dataBg")
	}
	$("#nav>div>div").removeClass("active");
	$(".tab").removeClass("active");
	$(".underline").removeClass("active");
	$("#tab-control>.underline").addClass("active");

	$("#tab-control").addClass("active");
	$("#control").addClass("active");

	$("#control>table").show();
});

//表单验证
$("#controlDevice").click(function () {
	let devsn = $("#controlNum").val();
	let count = $("#deviceNum").val();
	let type = $("#typeNum").val();
	let data = $("#dataNum").val();

	let reg = /^-?\d{1,}$/;
	let pattern = new RegExp(reg);

	if (pattern.test(devsn) && pattern.test(count) && pattern.test(type) && pattern.test(data)) {
		controlDevices(devsn, count, type, data).then(function (res) {
			alert(res);
		});
	}
	else {
		if (!pattern.test(devsn)) {
			alert("控制器编号只能为数字哦");
		}
		if (!pattern.test(count)) {
			alert("设备编号只能为数字哦");
		}
		if (!pattern.test(type)) {
			alert("类型只能为数字哦");
		}
		if (!pattern.test(data)) {
			alert("数据只能为数字哦");
		}
	}

});

let tempSelectModel = 'single'; // 当前层
$("input").click(function () {
	console.log("hehe");
	$(this).siblings("div").children("span").addClass("active");
	$(this).parents("div").siblings("div").find("span").removeClass("active");
	let model = $(this).parent().attr('class');

	if (tempSelectModel == model) return;
	tempSelectModel = model;
	$('.selectDiv .floor').html('<option disabled selected>选择楼层</option>');
	$('.selectDiv .room').html('<option disabled selected>选择房间</option>');
	$('.selectDiv .air').html('<option disabled selected>选择空调</option>');
	$('.selectDiv .building').val(['选择楼', '选择楼']);
	if (model == 'double') {
		$('.selectDiv .room').hide();
		$('.selectDiv .air').hide();
	} else {
		$('.selectDiv .room').show();
		$('.selectDiv .air').show();
	}
	clickDisabled();
	restoreState();
});

$("#onOff.room_Admin_radio").click(function () {
	let onOffStatu = 1;
	//    console.log($("#onOff").hasClass("room_Admin_radio_select"));
	if ($("#onOff").hasClass("room_Admin_radio_select")) {
		//        console.log("hasClassRoom");
		onOffStatu = 0;
	}

	updateDevsnState(1, onOffStatu, function () {
		if (onOffStatu == 0) {//开关样式
			if ($("#onOff.room_Admin_radio").hasClass("room_Admin_radio_select")) {
				$("#onOff.room_Admin_radio").removeClass("room_Admin_radio_select");
			}
			$("#onOffText").text("off");

			restoreState();
		}
		else {
			if (!$("#onOff.room_Admin_radio").hasClass("room_Admin_radio_select")) {
				$("#onOff.room_Admin_radio").addClass("room_Admin_radio_select");
			}
			$("#onOffText").text("on");

			setDevsnState();

			clickAbled();
		}
	})
	//viewController(true,0,onOffStatu,$("#onOff").attr("data-deviceName"));      
});
$(".num_box>div>span:nth-child(1)").click(function () {
	var c = $("#temperature").val();
	c.replace("℃", "");
	if (c == "") c = 0;
	c = parseInt(c) + 1;
	// viewController(1,1,c,$("#onOff").attr("data-deviceName"));
	updateDevsnState(current_mood_num, c, function () {
		$("#temperature").val(c + "℃");
	});
});

let current_mood_num;
//温度下调
$(".num_box>div>span:nth-child(2)").click(function () {
	var c = $("#temperature").val();
	c.replace("℃", "");
	if (c == "") {
		c = 0;
	}
	c = parseInt(c) - 1;
	updateDevsnState(current_mood_num, c, function () {
		$("#temperature").val(c + "℃");
	});
	// viewController(1,1,c,$("#onOff").attr("data-deviceName"));
});
//风速切换
$("#speedSelect").change(function (e) {
	// console.log("你切换我了");
	// console.log($("#speedSelect").val());
	if ($("#speedSelect").val() != "none") {
		// viewController(1,2,$("#speedSelect").val(),$("#onOff").attr("data-deviceName"));
		updateDevsnState(3, $("#speedSelect").val(), function () {
			$('#airWindSpeed').html($('#speedSelect option:selected').text());
		});
	}
});
//模式切换
$("#windMood").change(function (e) {
	if ($("#windMood").val() != "none") {
		// viewController(1,3,$("#windMood").val(),$("#onOff").attr("data-deviceName"));
		updateDevsnState(2, $("#windMood").val(), function () {
			let mood = $("#windMood").val();
			$('#airMoodText').html($('#windMood option:selected').text());

			if (['2', '4', '5'].includes(mood)) {
				current_mood_num = 4;
			} else if (mood == '3') {
				current_mood_num = 5;
			} else if (mood == '1') {
				$('#temperType').css('display', 'block');
			}

		});
	}
});

//温度制冷制热切换
$("#temperType").change(function (e) {
	if ($("#temperType").val() != "none") {
		if (mood == '1') {
			current_mood_num = 4;
		} else if (mood == '2') {
			current_mood_num = 5;
		}
	}
});
//漏洞且还




// $('#tab-control').click();

let single_model_data = {
	build: '',
	floor: '',
	number: ''
};

let current_floor_array; // 当前层房间数组数据
let current_controlNum,
	current_devNum,
	current_state;
let current_floor_devs;


$('.selectDiv .building').on('change', function () {
	const building = $(this).children('option:selected').val();
	single_model_data.build = building;
	for (const obj of buildFloor) {
		if (obj.build == building) {
			current_floor_array = obj.roomNum;
			let len = obj.roomNum.length;
			let dom = '<option disabled selected>选择楼层</option>';
			for (let i = 1; i <= len; i++) {
				dom += '<option>' + i + '</option>';
			}
			$('.selectDiv .floor').html(dom);
			$('.selectDiv .room').html('<option disabled selected>选择房间</option>');
			$('.selectDiv .air').html('<option disabled selected>选择空调</option>');
			break;
		};
	};
	clickDisabled();
	restoreState();
})

$('.selectDiv .floor').on('change', function () {

	const index = $(this).children('option:selected').val();
	single_model_data.floor = index;

	const room_num = current_floor_array[index - 1];

	let dom = '<option disabled selected>选择房间</option>';
	for (let i = 1; i <= room_num; i++) {
		if (i < 10) {
			dom += `<option>${index}0${i}</option>`;
		} else {
			dom += `<option>${index}${i}</option>`;
		}
	};

	if (tempSelectModel == 'single') {
		$('.selectDiv .room').html(dom);
		$('.selectDiv .air').html('<option disabled selected>选择空调</option>');
		clickDisabled();
		restoreState();
	} else {
		console.log(single_model_data);
		
		$.ajax({
			type: 'POST',
			url: httpUrl + 'selectjcqIdMore.do',
			async: true,
			data: single_model_data,
			dataType: 'JSON',
			success: function (res) {
				console.log(res);
				clickOnAbled();
				current_floor_devs = res;
				// getAllselectAirInfo(res);
			},
			error: function (err) {
				console.log('err', err);
			}
		});
	}


})

$('.selectDiv .room').on('change', function () {
	const roomNum = $(this).children('option:selected').val();
	single_model_data.number = roomNum;

	$.ajax({
		type: 'POST',
		url: httpUrl + 'selectjcqId.do',
		async: true,
		data: single_model_data,
		dataType: 'JSON',
		success: function (res) {
			let dom = '<option disabled selected>选择空调</option>';
			let hasAir = false;
			for (const air_data of res) {
				if (!hasAir) hasAir = true;
				dom += `<option>${air_data.id}</option>`;
			}
			if (!hasAir) dom = '<option disabled selected>无</option>';
			$('.selectDiv .air').html(dom);

			clickDisabled();
			restoreState();
		},
		error: function (err) {
			console.log(err);
		},
	})

});

$('.selectDiv .air').on('change', function () {
	const airId = $(this).children('option:selected').val();

	$.ajax({
		type: 'POST',
		url: httpUrl + 'selectAirInfo.do',
		async: true,
		data: {
			airId
		},
		dataType: 'JSON',
		success: function (res) {
			// console.log(res[0]);

			let {
				controlNum,
				mood,
				onOffStatus,
				targetTemperCold,
				targetTemperHeater,
				trueTemper,
				devNum,
				windSpeed } = res[0];

			current_controlNum = controlNum;
			current_devNum = devNum;

			console.log(current_controlNum, current_devNum);


			mood = parseInt(mood, 16);
			onOffStatus = parseInt(onOffStatus, 16);
			targetTemperCold = parseInt(targetTemperCold, 16);
			targetTemperHeater = parseInt(targetTemperHeater, 16);
			trueTemper = parseInt(trueTemper, 16);
			windSpeed = parseInt(windSpeed, 16);

			current_state = {
				mood,
				targetTemperCold,
				targetTemperHeater,
				trueTemper,
				windSpeed
			};

			// console.log(
			// 	'模式', mood,
			// 	'开关状态', onOffStatus,
			// 	'制冷温度', targetTemperCold,
			// 	'制热温度', targetTemperHeater,
			// 	'真实温度', trueTemper,
			// 	'风速', windSpeed);

			if (onOffStatus == 1) { // 空调打开状态
				// 开关状态
				if (!$("#onOff.room_Admin_radio").hasClass("room_Admin_radio_select")) {
					$("#onOff.room_Admin_radio").addClass("room_Admin_radio_select");
				}
				$("#onOffText").text("on");

				setDevsnState();
				clickAbled();

			} else if (onOffStatus == 0) { // 空调是关闭状态 不进行任何处理
				restoreState();
				clickOnAbled();
			}

		},
		error: function (err) {
			console.log('err', err);
		}
	});

});

//反控设备
function updateDevsnState(type, data, callback, devsn = current_controlNum, count = current_devNum) {
	console.log(type, data);

	if (tempSelectModel == 'single') {
		$.ajax({
			type: 'POST',
			url: httpUrl + 'controlDevices.do',
			async: true,
			data: {
				devsn,//控制器号
				count,//设备号
				type,//类型
				data//data
			},
			dataType: 'JSON',
			success: function (res) {
				console.log(res);
				callback();
			},
			error: function (err) {
				console.log('err', err);
				alert('反控设备失败');
			}
		});
	} else {
		// 

		for (const devs of current_floor_devs) {

			let {
				controlNum: devsn,
				devNum: count
			} = devs;

			$.ajax({
				type: 'POST',
				url: httpUrl + 'controlDevices.do',
				async: true,
				data: {
					devsn,//控制器号
					count,//设备号
					type,//类型
					data//data
				},
				dataType: 'JSON',
				success: function (res) {
					console.log(res);
					// callback();
				},
				error: function (err) {
					console.log('err', err);
					alert('反控设备失败');
				}
			});

			callback();

		};


	}


};

// 重置状态
function restoreState() {
	if ($("#onOff.room_Admin_radio").hasClass("room_Admin_radio_select")) {
		$("#onOff.room_Admin_radio").removeClass("room_Admin_radio_select");
	}
	$("#onOffText").text("off");

	// 空调模式
	$('#windMood').val('none');
	$('#airMoodText').html('');

	// 设置风速
	$('#speedSelect').val('none');
	$('#airWindSpeed').html('');

	// 设置温度
	$('#currentTemperature').html('0℃');
	$('#temperature').val('0℃');
}

// 赋值状态
function setDevsnState() {

	let {
		mood,
		targetTemperCold,
		targetTemperHeater,
		trueTemper,
		windSpeed } = current_state;

	console.log(mood,
		targetTemperCold,
		targetTemperHeater,
		trueTemper,
		windSpeed);

	// 空调模式
	$('#windMood').val(mood);
	if (mood == 0) $('#windMood').val(4);
	$('#airMoodText').html($('#windMood option:selected').text());
	if (mood == 1) $('#temperType').css('display', 'block');

	// 设置风速
	if (windSpeed >= 1 && windSpeed <= 7) {
		$('#speedSelect').val(7);
	} else if (windSpeed == 9) {
		$('#speedSelect').val(windSpeed);
	} else if (windSpeed == 10) {
		$('#speedSelect').val(windSpeed);
	} else if (windSpeed == 11) {
		$('#speedSelect').val(windSpeed);
	} else if (windSpeed == 0) {
		$('#speedSelect').val(windSpeed);
	}
	$('#airWindSpeed').html($('#speedSelect option:selected').text());

	// 设置温度
	$('#currentTemperature').html(trueTemper + '℃');
	if ([2, 4, 5].includes(mood)) {
		$('#temperature').val(targetTemperCold + '℃');
		current_mood_num = 4;
	} else if (mood == 3) {
		$('#temperature').val(targetTemperHeater + '℃');
		current_mood_num = 5;
	} else {
		$('#temperature').val('17℃');
	}
}

