
window.onload=function(){
	alert("加载我了");
	let deviceId = getQueryVariable("deviceId");
	alert(deviceId);
	$("#airFactory").text(deviceId);
}

function getQueryVariable(variable){
	
   var query = window.location.search.substring(1);
   console.log(query);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
       var pair = vars[i].split("=");
       if(pair[0] == variable){
    	   return pair[1];
       }
   }
   return(false);
}