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
	EventUtil.addHandler(ranks,"click",function(event){
		var target = EventUtil.getTarget(event);
		if(target.getAttribute("class") == "box" ){
		var indexstr = target.id.slice(3);
		var index = parseInt(indexstr) -1;
		Model.myBoxs.splice(index,1);
		View.displayBoxs(Model.myBoxs);
		}
	});
	buildData();
}
var View = {
	createBox : function(num){
		var newBox = document.createElement("div");
		newBox.setAttribute("id","box"+(++Model.boxCounter));
		newBox.setAttribute("class","box");
		newBox.style.height = num+"px";
		newBox.style.width = "10px";
		return newBox;
	},
	displayBoxs : function(boxs){
		var ranks = document.getElementById("ranks");
		for (var i =0,len = ranks.children.length; i< len; i++){
			ranks.removeChild(ranks.children[0]);
		}
		Model.boxCounter = 0;
		for(var i =0, len = boxs.length; i < len; i++ ){
			var currbox = this.createBox(boxs[i]);
			ranks.appendChild(currbox);
		}
	}
}
var Model = {
	boxCounter : 0,
	myBoxs :new Array(),
	getNum : function(){
		var input = document.getElementsByName("input")[0].value;
		input = parseInt(input);
		if(this.isValid(input)){
			if(this.boxCounter>59) return false;
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
	Model.myBoxs.unshift(num);
	View.displayBoxs(Model.myBoxs);
	},
	push_right : function(){
	var num = Model.getNum();
	if (!num) return;	
	Model.myBoxs.push(num);
	View.displayBoxs(Model.myBoxs);	
	},
	pop_left : function(){
	alert(Model.myBoxs.shift());
	View.displayBoxs(Model.myBoxs);	
	},
	pop_right : function(){
	alert(Model.myBoxs.pop());
	View.displayBoxs(Model.myBoxs);	
	},
	deleteBox : function(){
	var target = EventUtil.getTarget(event);
	if (target.getAttribute("class") =="box")
	target.parentNode.removeChild(target);
	},
	sortBox : function(){
		var k=0;
		for(var i= 0, len = Model.myBoxs.length; i < len; i++){
			for(var j = len; j>i; j-- ){
					k++;
					(function(j,k){
						return setTimeout(
							function(){
								if(Model.myBoxs[j-1] < Model.myBoxs[j]){
								var temp = Model.myBoxs[j];
								Model.myBoxs[j] = Model.myBoxs[j-1];
								Model.myBoxs[j-1] = temp;}
								View.displayBoxs(Model.myBoxs);
						},
						50*k);
					})(j,k);
				}
			}
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
function buildData(){
	for(var i = 0;i<30;i++){
	Model.myBoxs.push(Math.ceil(Math.random()*90+10));
	}
	View.displayBoxs(Model.myBoxs);
}
