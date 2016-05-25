window.onload = init;
function push_left(){
	var input = document.getElementsByName("input")[0].value;
	input = parseinput(input);
	for (var item in input){
		var ranks = document.getElementById("ranks");
		var newBox = document.createElement("div");
		newBox.innerHTML=  input[item];
		newBox.setAttribute("class","box");
		ranks.insertBefore(newBox,ranks.firstChild);console.log("left-in");
	}
}
function push_right(){
	var input = document.getElementsByName("input")[0].value;
	input = parseinput(input);
	for (var item in input){
		var ranks = document.getElementById("ranks");
		var newBox = document.createElement("div");
		newBox.innerHTML=  input[item];
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
	try{
	if (target.getAttribute("class").indexOf("box") != -1)
	target.parentNode.removeChild(target);
	}catch(e){

	}
}
function isValid(input){
	if (typeof input != 'number') return false;
	var reg = /^[0-9]+$/;
	return reg.test(input);
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
			addToAnthor(temp,result[j].split(flag[i]));		
		}
		result = temp.slice(0);	
	}
	return result;
}
function searchElement(input){
	deleteActive();
	var ranks = document.getElementById("ranks");
	for (var child in ranks.children){
		if(typeof ranks.children[child] == "number") break;
		if(ranks.children[child].innerHTML.indexOf(input)!=-1){
			var oldclass = ranks.children[child].getAttribute("class");
			ranks.children[child].setAttribute("class",oldclass+" active");
			console.log("active!");
		}
	}
}
function deleteActive(){
	var ranks = document.getElementById("ranks");
	for (var child in ranks.children){
		if(typeof ranks.children[child] == "number") break;
		if (ranks.children[child].getAttribute("class").indexOf("active") != -1){
			var temp = ranks.children[child].getAttribute("class").split(" ");
			var newclass="";
			for (var i =0 ,len = temp.length; i < len ; i++){
				if(temp[i] != "active"){
					newclass  = newclass+" "+temp[i];
				}
				else{
					console.log("delete Active!");
				}
			}
			ranks.children[child].setAttribute("class",newclass);
		}
	}
}
function init(){
	var ranks = document.getElementById("ranks");
	var input_search = document.getElementById("search");
	var btn_search= document.getElementById("btn-search");
	EventUtil.addHandler(ranks,"click",deleteBox);
	EventUtil.addHandler(btn_search, "click",function(){searchElement(input_search.value)})
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
function addToAnthor(a,b){
	for (var i in b){
		if(b[i]){
		a.push(b[i]);
		}
	}
}