window.onload = init;
function push_left(){
	var input = document.getElementsByName("input")[0].value;
	input = parseInt(input);
	if(isValid(input)){
		var ranks = document.getElementById("ranks");
		var newBox = document.createElement("div");
		newBox.innerHTML=  input;
		newBox.setAttribute("class","box");
		ranks.insertBefore(newBox,ranks.firstChild);console.log("left-in");
	}
}
function push_right(){
	var input = document.getElementsByName("input")[0].value;
	input = parseInt(input);
	if(isValid(input)){
		var ranks = document.getElementById("ranks");
		var newBox = document.createElement("div");
		newBox.innerHTML=  input;
		newBox.setAttribute("class","box");
		ranks.appendChild(newBox);
	}
}
function pop_left(){
	var ranks = document.getElementById("ranks");
	alert(ranks.children[0].innerHTML);
	ranks.removeChild(ranks.children[0]);
}
function pop_right(){
	var ranks = document.getElementById("ranks");
	alert(ranks.children[ranks.children.length-1].innerHTML);
	ranks.removeChild(ranks.children[ranks.children.length-1]);
}
function deleteBox(){
	var target = EventUtil.getTarget(event);
	console.log(this);
	if (target.getAttribute("class") =="box")
	target.parentNode.removeChild(target);
}
function isValid(input){
	if (typeof input != 'number') return false;
	var reg = /^[0-9]+$/;
	return reg.test(input);
}
function init(){
	var ranks = document.getElementById("ranks");
	EventUtil.addHandler(ranks,"click",deleteBox);
	// EventUtil.addHandler(ranks,"click",function(event){         //事件代理
	// 		deleteBox(event);
	// });
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