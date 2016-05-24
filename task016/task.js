/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 window.onload = init;
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input");
	var value = document.getElementById("aqi-value-input");
	if( isValidCity(city.value.trim())  &&  isValidAqi(value.value.trim()) ){
		aqiData[city.value.trim()] = parseInt(value.value.trim());
	}
}
function isValidCity(city){
	var reg =/^[\u4E00-\u9FA5\uF900-\uFA2D]*[a-z]*$/;
	if (!reg.test(city)){
		alert("城市名只能包含中文或英文！");
	}
	return reg.test(city);
}
function isValidAqi(aqi){
	var reg = /^\d+$/;
	if (!reg.test(aqi)){
		alert("空气质量必须是整数！");
	}
	return reg.test(aqi);
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

	var aqi_table = document.getElementById("aqi-table");
	if (aqi_table.tBodies.length !=0)
	{
		aqi_table.removeChild(aqi_table.tBodies[0]);
	}
	var tbody = document.createElement("tbody");
	var currrow = 1;
	aqi_table.appendChild(tbody);
	tbody.insertRow(0);
	tbody.rows[0].insertCell(0);
	tbody.rows[0].insertCell(1);
	tbody.rows[0].insertCell(2);
	tbody.rows[0].cells[0].appendChild(document.createTextNode("城市"));
	tbody.rows[0].cells[1].appendChild(document.createTextNode("空气质量"));
	tbody.rows[0].cells[2].appendChild(document.createTextNode("操作"));

	for( var city in aqiData ){
		tbody.insertRow(currrow);
		tbody.rows[currrow].insertCell(0);
		tbody.rows[currrow].insertCell(1);
		tbody.rows[currrow].insertCell(2);
		tbody.rows[currrow].cells[0].appendChild(document.createTextNode(city));
		tbody.rows[currrow].cells[1].appendChild(document.createTextNode(aqiData[city]));
		var a = document.createElement("a");
		a.innerHTML = "delete";
		a.href = "#";
		a.id = "del"+city.toString();
		tbody.rows[currrow].cells[2].appendChild(a);
		currrow++;
	}

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
 var whichdel = this.id;
 var city = whichdel.slice(3);
 delete aqiData[city] ;
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
renderAqiList();
  var handle = function(event){
  	if(event.target.nodeName.toLowerCase() == "a"){
  		delBtnHandle.call(event.target);
  	}
  }
  document.getElementById("add-btn").onclick = addBtnHandle;
  document.getElementById("aqi-table").addEventListener("click", handle);
}
