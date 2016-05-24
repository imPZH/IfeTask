window.onload = init;
function init(){
	var ranks = document.getElementById("ranks");
	var btn = document.getElementById("button1");
	EventUtil.addHandler(btn , "click",Controller.push_left);
	var btn = document.getElementById("button2");
	EventUtil.addHandler(btn , "click",Controller.push_right);
	var btn = document.getElementById("button3");
	EventUtil.addHandler(btn , "click",Controller.pop_left);
	var btn = document.getElementById("button4");
	EventUtil.addHandler(btn , "click",Controller.pop_right);
	EventUtil.addHandler(ranks,"click",Controller.deleteBox);
}
var View = {
	createBox : function(num){
		var newBox = document.createElement("div");
		newBox.setAttribute("class","box");
		newBox.style.height = num+"px";
		newBox.style.width = "20px";
		return newBox;
	}
}
var Model = {
	getNum : function(){
		var input = document.getElementsByName("input")[0].value;
		input = parseInt(input);
		if(this.isValid(input)){
			return input;
		}else{
			alert("输入的数据有误！")
			return false;
		}
	},
	isValid : function(input){
	if (typeof input != 'number') return false;
	var reg = /^[0-9]+$/;
	return reg.test(input)&&input>9&&input<101;
	}
}
var Controller = {
	push_left : function(){
	var num = Model.getNum();
	if (!num) return;
	var ranks = document.getElementById("ranks");
	var newBox = View.createBox(num);
	ranks.insertBefore(newBox,ranks.firstChild);											console.log("left-in");
	},
	push_right : function(){
	var num = Model.getNum();
	if (!num) return;	
	var ranks = document.getElementById("ranks");
	var newBox = View.createBox(num);
	ranks.appendChild(newBox);															console.log("right-in");
	},
	pop_left : function(){
	var ranks = document.getElementById("ranks");
	alert(ranks.children[0].innerHTML);
	ranks.removeChild(ranks.children[0]);
	},
	pop_right : function(){
	var ranks = document.getElementById("ranks");
	alert(ranks.children[ranks.children.length-1].innerHTML);
	ranks.removeChild(ranks.children[ranks.children.length-1]);
	},
	deleteBox : function(){
	var target = EventUtil.getTarget(event);
	if (target.getAttribute("class") =="box")
	target.parentNode.removeChild(target);
	},
	sortBox : function(){

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