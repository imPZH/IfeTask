window.onload = init;
var time= -1;
function init(){
	var root = document.getElementById("root");
	var wrapper = document.getElementsByClassName("wrapper")[0];
     var botton0 = document.getElementsByClassName("button")[0];
   	botton0.onclick =  (function buttonHandler(root){
							 return function(){before(root);
							 						time= -1;}
							})(wrapper);
	var botton1= document.getElementsByClassName("button")[1];
   	botton1.onclick =  (function buttonHandler(root){
							 return function(){middle(root);
							 						time= -1;}
							})(wrapper);

	var botton2 = document.getElementsByClassName("button")[2];
   	botton2.onclick =  (function buttonHandler(root){
							 return function(){after(root);
							 						time= -1;}
							})(wrapper);
}
function middle(root){
	var point=0;
	var childrens = root.childNodes;
	var len = childrens.length;
	if(len){
		while(childrens[point].nodeType != "1"){
			point++;
		}
		middle(childrens[point]);
	}
	setTimeout(  (function(root){
						return function(){
							animation(root);}
					})(root)
		,800*++time);
	if(len){
		point++;
		while(childrens[point].nodeType != "1"){
			point++;
		}
		middle(childrens[point]);
	}
}
function after(root){
	var childrens = root.childNodes;
	var len = childrens.length;
	for(var point=0; point<len;point++){
		if(childrens[point].nodeType == "1"){
			after(childrens[point]);
		}
	}
	setTimeout(  (function(root){
						return function(){
							animation(root);}
					})(root)
		,800*++time);
}
function before(root){
	setTimeout(  (function(root){
						return function(){
							animation(root);}
					})(root)
		,800*++time);
	var childrens = root.childNodes;
	var len = childrens.length;
	for(var point=0; point<len;point++){
		if(childrens[point].nodeType == "1"){
			before(childrens[point]);
		}
	}
}
function animation(element){
	var delay = 0;
	setTimeout(  (function(element){
						return function(){changeColor(element);
											} ; 
					})(element)
		,1000*delay);
	setTimeout(  (function(element){
						return function(){changeBack(element);
											} ; /* 因为要调用这个函数就要给参数，
																			如果给参数就会导致函数被调用，
																			所以要用闭包。这样就可以给参数而不调用*/

					})(element)
		,1000*(delay+0.8));
}
function changeColor(element){
	element.style.backgroundColor = "red";
}
function changeBack(element){
	element.style.backgroundColor = "white";
}
