/**
 * 测试用
 */
window.onload = function(){
	
	var aliHttp = "http://localhost:8083/buildingManagement/";
	
	//console.log('测试获取数据');
//	function getExcel(meterType,timeType){
//		//console.log("请求url为： ",aliHttp+"gnrtExcl.do"+"?sheetStyleNm="+meterType+"&timeType="+timeType);
//		location.href=aliHttp+"gnrtExcl.do"+"?sheetStyleNm="+encodeURI(meterType)+"&timeType="+encodeURI(timeType);
//	}
	
	//getExcel("电","月");
	
//	$.ajax({
//        type: 'POST',
//        url: 'http://39.108.12.65:5713/DefaultAPI.asmx/GetData',
//        async:true,
//		 data: {
//		     LoginInfo: '{"Code":"admin","Token":"3G6NfyQ2+2li9whAkf6OkA=="}',
//		     ParamList: '{"MeterAddr":"'+stringArray[i]+'","ReadType":"1","FreezeDate":""}'
//		 },
//		 success: function (res) {
//		     //console.log('历史抄表数据res', res);
//			 const text = $(res).find('string').text();
//			 const data = JSON.parse(text);
//			 console.log('历史抄表数据data', data);
//		 },
//		 error: function (err) {
//		     console.log('err', err);
//		 }
//	});
//	$.ajax({
//        type: 'POST',
//        url: aliHttp+'getjcdata.do',
//        async:true,
//		data: {
//			data:"a",
//			devsn:"1"
//		},
//		dataType:'JSON',
//		 success: function (res) {
//		     //console.log('历史抄表数据res', res);
////			 const text = $(res).find('string').text();
////			 const data = JSON.parse(text);
//			 console.log(res);
//		 },
//		 error: function (err) {
//		     console.log('err', err);
//		 }
//	});
//	$.ajax({
//      type: 'POST',
//      url: aliHttp+'selectCurrentData.do',
//      async:true,
//		data: {},
//		dataType:'JSON',
//		 success: function (res) {
//			 console.log(res);
//		 },
//		 error: function (err) {
//		     console.log('err', err);
//		 }
//	});
}	
