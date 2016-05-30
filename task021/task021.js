var data = [];
var hobby = [];
window.onload = init;
function taginit(){
	var evt = window.event;
	if(evt.which ==13){
		var element = this.value;
		if(!isExist(data,element)){
			addTag(data,element);
			renderData("tag1_display",data);
		}
		this.value = "";
		return;
	}
	var input = this.value;
	if( isExist(["\r", " ", ","],input.slice(-1)) ){
		var element = parseinput(input)[0];
	}
	if(element != undefined){
		if(!isExist(data,element)){
			addTag(data,element);
			renderData("tag1_display",data);
		}
		this.value = "";
	}
}
function hobbyHandler(){
	var input = document.getElementsByName("input")[0].value;
	var inputs = parseinput(input);
	if(inputs.length){
		for(var element in inputs){
			if(inputs[element] != undefined){
				if(!isExist(hobby,inputs[element])){
					addTag(hobby,inputs[element]);
					renderData("hobby_display",hobby);
				}
			}//end if
		}//end for
	}
}
function init(){
	var ul = document.getElementById("tag1_display");
	var input1 = document.getElementById("tag_input");
	var button = document.getElementById("ok");
	EventUtil.addHandler(input1,"keyup",taginit);
	EventUtil.addHandler(ul,"click",deleteBox);
	EventUtil.addHandler(button,"click",hobbyHandler);
}
function deleteBox(){
	var target = EventUtil.getTarget(event);
	try{
	if (target.getAttribute("class").indexOf("box") != -1)
	target.parentNode.removeChild(target);
	var index = data.indexOf(target.innerHTML);
	data.splice(index,1);
	}catch(e){
	}
}
function parseinput(input){
	var result = [input];
	var separator = [","  ,  "，" , "\r" , "\t", "\n"," "];
	var flag = [];
	for (var i = 0, len = separator.length; i < len ; i++){
		if(input.indexOf(separator[i]) != -1){
			flag.push(separator[i]);
		}
	}
	var temp=[];
	for(var i = 0, lenOfFlag = flag.length; i < lenOfFlag ; i++){
		temp.length = 0;
		for(var j = 0 ,lenOfResu = result.length; j < lenOfResu ; j++){
			addToAnthorArray(temp,result[j].split(flag[i]));		
		}
		result = temp.slice(0);	
	}
	return result;
}
function renderData(ulId,data){
	var ul = document.getElementById(ulId);
	rmvchilds(ul);
	for (var item in data){

		var newBox = document.createElement("li");
		newBox.innerHTML= data[item];
		newBox.setAttribute("class","box");
		ul.appendChild(newBox);
	}
	for (var i =0,len = ul.children.length; i< len ; i++){
		(function(i){	
			var li = ul.children[i];
			var text = li.innerHTML;
			EventUtil.addHandler(li,"mouseout",function(){this.innerHTML=text});
			EventUtil.addHandler(li,"mouseover",function(){this.innerHTML="Delete  "+text});
		})(i);
	}
}
function rmvchilds(parent){
	for(var i=0,len = parent.children.length;i < len; i++){
		parent.removeChild(parent.firstChild);
	}
}
function addToAnthorArray(a,b){
	for (var i in b){
		if(b[i]){
		a.push(b[i]);
		}
	}
}
function isExist(data,element){
	if(data.length){
		return data.some(function(item, index,array){
								return (item==element);
		})
	}else{
		return false;
	}
}
function addTag(data,element){
	if(data.length<10){
		data.push(element);
	}else{
		data.shift();
		data.push(element);
	}
}
var EventUtil = {
	addHandler: function(element, type, handler){
		if (element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type, handler);
		}else{
			element["on"+type] = handler;
		}
	},
	removeHandler:function(element, type, handler){
		if (element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if (element.detachEvent){
			element.detachEvent("on"+type, handler);
		}else{
			element["on"+type] = null;
		}
	},
	getTarget : function(event){
		return event.target;
	}
}
