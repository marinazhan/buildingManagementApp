//var httpUrl="http://121.40.174.117:8080/buildingManagement/";
var httpUrl="http://localhost:8083/buildingManagement/";


//建筑信息
const buildFloor = [
    {
        build: "北楼",
        roomNum: [7, 21, 23, 24, 14, 4]
    },
    {
        build: "南楼",
        roomNum: [8,14,17,17,13,15,10]
    },
    {
        build: "西楼",
        roomNum: [5,4]
    }
];

const viewController = (updateFlag,type,value,deviceName) =>{
    // console.log("haha");
    if(updateFlag){
        updateState(type,value,deviceName).then(function(){
            //控制硬件
            switch(type){
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
    switch(type){
        case 0: 
            if(value==0){//开关样式
                if($("#onOff.room_Admin_radio").hasClass("room_Admin_radio_select")){
                    $("#onOff.room_Admin_radio").removeClass("room_Admin_radio_select");
                }
                $("#onOffText").text("off");
            }
            else{
                if(!$("#onOff.room_Admin_radio").hasClass("room_Admin_radio_select")){
                    $("#onOff.room_Admin_radio").addClass("room_Admin_radio_select");
                }
                $("#onOffText").text("on");
            }
            break;
        case 1: //温度
            $("#temperature").val(value+"℃");
            break;
        case 2: 
            $("#speedSelect").val(value);
            break;
        case 3: 
            $("#windMood").val(value);
            break;
    }
}

const clickDisabled = () =>{
    if(!$("#onOff").hasClass("divDisabled")){
        $("#onOff").addClass("divDisabled");
    }
    if(!$(".temperButton").hasClass("divDisabled")){
        $(".temperButton").addClass("divDisabled")
    }
    if(!$("#speedSelect").prop("disabled")){
        $("#speedSelect").prop("disabled",true);
    }
    if(!$("#windMood").prop("disabled")){
        $("#windMood").prop("disabled",true);
    }
}

const updateState = (type,value,name) =>{
    // console.log("hehe");
//    console.log(value);
//    console.log(name);
    let speURL = "";
    switch(type){
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
    return new Promise(function(resolve,reject){
        $.ajax({
            type:"POST",
            url:speURL,
            data:{
                deviceId:name,
                paramValue:value
            },
            success:function(res){
                console.log(res);
                resolve(res);
            },
            error:function(err){
                reject(err);
            }
        });
    })
}

function IsPC() {
   var userAgentInfo = navigator.userAgent;
   var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
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
if(!iphoneState){
	if(!$("#nav>div").hasClass("phone")){
		$("#nav>div").addClass("phone");
	}
	else{
		$("#nav>div").removeClass("phone");
	}
	
}

const getjcData = () =>{
	return new Promise(function(resolve,reject){
		$.ajax({
			type:"POST",
			url:httpUrl+"selectJcAllDeviceInfos.do",
			dataType:"JSON",
			data:{},
			async:true,
			success:function(res){
				resolve(res);
			},
			error:function(err){
				reject(err);
			}
		})
	});
}

const getlsData = () =>{
	return new Promise(function(resolve,reject){
		$.ajax({
			type:"POST",
			url:httpUrl+"selectLsAllDeviceInfos.do",
			data:{},
			dataType:"JSON",
			async:true,
			success:function(res){
				resolve(res);
			},
			error:function(err){
				reject(err);
			}
		})
	});
}

const controlDevices = (devsn,count,type,data) =>{
	return new Promise(function(resolve,reject){
		$.ajax({
			type:"POST",
			url:httpUrl+"controlDevices.do",
			data:{
				count:count,
				type:type,
				data:data,
				devsn:devsn
			},
			success:function(res){
				console.log(res);
				resolve(res);
			},
			error:function(err,a,b){
				console.log(err);
				console.log(a);
				console.log(b);
				reject(err);
			}
		});
	});
}

getjcData().then(function(res){
	//删除表格中所有非default
	$("#jcData>table>tr:not(.default)").remove();
//	console.log(res);
	let jcHtml = "";
		
	for(let i=0;i<res.length;i++){
		if(i%2!=0){
			jcHtml += "<tr><td>"+res[i].build+"</td><td>"+res[i].floor+"楼</td><td>"+res[i].number+"</td>";
			jcHtml += "<td>"+res[i].controlNum+"</td><td>"+res[i].devNum+"</td><td>"+res[i].devType+"</td>";
			jcHtml += "<td>"+parseInt(res[i].windSpeed,16)+"</td>";
			jcHtml += "<td>"+parseInt(res[i].mood,16)+"</td>";
			jcHtml += "<td>"+parseInt(res[i].targetTemperCold,16)+"</td>";
			jcHtml += "<td>"+parseInt(res[i].targetTemperHeater,16)+"</td>";
			jcHtml += "<td>"+parseInt(res[i].trueTemper,16)+"</td></tr>";
		}
		else{
			jcHtml += "<tr class='notSingleTr'><td>"+res[i].build+"</td><td>"+res[i].floor+"楼</td><td>"+res[i].number+"</td>";
			jcHtml += "<td>"+res[i].controlNum+"</td><td>"+res[i].devNum+"</td><td>"+res[i].devType+"</td>";
			jcHtml += "<td>"+parseInt(res[i].windSpeed,16)+"</td>";
			jcHtml += "<td>"+parseInt(res[i].mood,16)+"</td>";
			jcHtml += "<td>"+parseInt(res[i].targetTemperCold,16)+"</td>";
			jcHtml += "<td>"+parseInt(res[i].targetTemperHeater,16)+"</td>";
			jcHtml += "<td>"+parseInt(res[i].trueTemper,16)+"</td></tr>";
		}
	}
	
	$("#jcData>table").append(jcHtml);
});

getlsData().then(function(res){
	//删除表格中所有非default
	$("#lsData>table>tr:not(.default)").remove();
//	console.log(res);
	
	let lsHtml = "";
	for(let i=0;i<res.length;i++){
		let onOffStatus = "";
		if(res[i].onOffStatus==1){
			onOffStatus="开机";
		}
		else{
			onOffStatus="关机";
		}
		if(i%2!=0){
			lsHtml += "<tr><td>"+res[i].build+"</td><td>"+res[i].floor+"楼</td><td>"+res[i].number+"</td>";
			lsHtml += "<td>"+res[i].controlNum+"</td><td>"+res[i].devNum+"</td><td>"+res[i].devType+"</td>";
			lsHtml += "<td>"+onOffStatus+"</td></tr>";
		}
		else{
			lsHtml += "<tr class='notSingleTr'><td>"+res[i].build+"</td><td>"+res[i].floor+"楼</td><td>"+res[i].number+"</td>";
			lsHtml += "<td>"+res[i].controlNum+"</td><td>"+res[i].devNum+"</td><td>"+res[i].devType+"</td>";
			lsHtml += "<td>"+onOffStatus+"</td></tr>";
		}
	}
	$("#lsData>table").append(lsHtml);
});

//导航栏点击 离散数据按钮
$("#tab-lsData").click(function(e){
	if(!$("#nav").hasClass("whiteBg")){
		$("#nav").addClass("whiteBg")
	}
	if(!$("body").hasClass("dataBg")){
		$("body").addClass("dataBg")
	}
	$("#nav>div>div").removeClass("active");
	$(".tab").removeClass("active");
	$(".underline").removeClass("active");
	$("#tab-lsData>.underline").addClass("active");
	
	$("#tab-lsData").addClass("active");
	$("#lsData").addClass("active");
	
	$("#control>table").hide();
});

//导航栏点击 寄存器数据按钮
$("#tab-jcqData").click(function(e){
	if(!$("#nav").hasClass("whiteBg")){
		$("#nav").addClass("whiteBg")
	}
	if(!$("body").hasClass("dataBg")){
		$("body").addClass("dataBg")
	}
	$("#nav>div>div").removeClass("active");
	$(".tab").removeClass("active");
	$(".underline").removeClass("active");
	$("#tab-jcqData>.underline").addClass("active");
	
	$("#tab-jcqData").addClass("active");
	$("#jcData").addClass("active");
	
	$("#control>table").hide();
});
//导航栏点击 反控设备按钮
$("#tab-control").click(function(e){
	if($("#nav").hasClass("whiteBg")){
		$("#nav").removeClass("whiteBg");
	}
	if($("body").hasClass("dataBg")){
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
$("#controlDevice").click(function(){
	let devsn = $("#controlNum").val();
	let count = $("#deviceNum").val();
	let type = $("#typeNum").val();
	let data = $("#dataNum").val();
	
	let reg = /^-?\d{1,}$/;
	let pattern = new RegExp(reg);
	
	if(pattern.test(devsn)&&pattern.test(count)&&pattern.test(type)&&pattern.test(data)){
		controlDevices(devsn,count,type,data).then(function(res){
			alert(res);
		});
	}
	else{
		if(!pattern.test(devsn)){
			alert("控制器编号只能为数字哦");
		}
		if(!pattern.test(count)){
			alert("设备编号只能为数字哦");
		}
		if(!pattern.test(type)){
			alert("类型只能为数字哦");
		}
		if(!pattern.test(data)){
			alert("数据只能为数字哦");
		}
	}
	
});
$("input").click(function() {
	console.log("hehe");
    $(this).siblings("div").children("span").addClass("active");
    $(this).parents("div").siblings("div").find("span").removeClass("active");
});
$("#onOff.room_Admin_radio").click(function () {
    let onOffStatu = 1;
//    console.log($("#onOff").hasClass("room_Admin_radio_select"));
    if($("#onOff").hasClass("room_Admin_radio_select")){
//        console.log("hasClassRoom");
        onOffStatu = 0;
    }
    if(onOffStatu==0){//开关样式
        if($("#onOff.room_Admin_radio").hasClass("room_Admin_radio_select")){
            $("#onOff.room_Admin_radio").removeClass("room_Admin_radio_select");
        }
        $("#onOffText").text("off");
    }
    else{
        if(!$("#onOff.room_Admin_radio").hasClass("room_Admin_radio_select")){
            $("#onOff.room_Admin_radio").addClass("room_Admin_radio_select");
        }
        $("#onOffText").text("on");
    }
    //viewController(true,0,onOffStatu,$("#onOff").attr("data-deviceName"));      
});
$(".num_box>div>span:nth-child(1)").click(function () {
    var c = $("#temperature").val();
    c.replace("℃", "");
    if (c == "") c = 0;
    c = parseInt(c) + 1;
    viewController(1,1,c,$("#onOff").attr("data-deviceName"));
});
//温度下调
$(".num_box>div>span:nth-child(2)").click(function () {
    var c = $("#temperature").val();
    c.replace("℃", "");
    if (c == "") {
        c = 0;
    }
    c = parseInt(c) - 1;
    viewController(1,1,c,$("#onOff").attr("data-deviceName"));
});
//风速切换
$("#speedSelect").change(function(e){
    // console.log("你切换我了");
    // console.log($("#speedSelect").val());
    if($("#speedSelect").val()!="none"){
        viewController(1,2,$("#speedSelect").val(),$("#onOff").attr("data-deviceName"));
    }
});
//模式切换
$("#windMood").change(function(e){
    if($("#windMood").val()!="none"){
        viewController(1,3,$("#windMood").val(),$("#onOff").attr("data-deviceName"));
    }
});
//漏洞且还