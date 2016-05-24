/**
 * @author Pengzhihui
 * @version  1.0
 */
window.onload = init;

var aqiSourceData = {						//数据源
	"北京": randomBuildData(500),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"西安": randomBuildData(500),
	"福州": randomBuildData(100),
	"厦门": randomBuildData(100),
	"沈阳": randomBuildData(500)
}
var chartData = [];                                             //用于渲染图表的数据
var pageState = {						//页面状态
	nowSelectCity : "city",
	nowGraTime : "day"
}

/**
 * @param  {[number]} 种子用于生成随机数
 * @return {[object]}
 * 		形如{
			    "2016-01-01": 10,
			    "2016-01-02": 10,
			    "2016-01-03": 10,
			    "2016-01-04": 10
			  }
 */
function randomBuildData(seed){
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr ="";
	for (var i=1; i<92; i++){
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random()*seed);
		dat.setDate(dat.getDate()+1);
	}
	return returnData;
}
/**
 * @param  {[object]} Date对象
 * @return {[String]} 日期字符串如"2016-01-01"
 */
function getDateStr(Date){
	var year = Date.getFullYear();
	var month = Date.getMonth()+1;
	var day = Date.getDate();
	var returnstr = "";
	returnstr += year;
	returnstr += (month<10) ?  "-"+0+month : "-"+month;
	returnstr += (day<10) ? "-"+0+day : "-"+day;
	return returnstr;
}
/**
 * 渲染图表
 * 这是一个VIEW！！
 */
function renderChart(){  
	var canvas = document.getElementById("aqi-chart");
	var rectwidth =0;			//柱形图每个数据的宽度。
	if(canvas.getContext){    			
		switch(pageState.nowGraTime){
		case 'day': 
		rectwidth = 8;
		break;
		case 'week':
		rectwidth = 20;
		break;
		case 'month':
		rectwidth = 50;
		}
		drawRect(rectwidth,chartData);
	}
}
/**
 * @param  {Number} 柱形图的每个数据柱形的宽度
 * @param  {array | object} 生成柱形图的数据集
 * @return {none}
 */
function drawRect(width,data){
	var canvas = document.getElementById("aqi-chart");
	var can_width = canvas.width;
	var can_height = canvas.height;
	var ctx = canvas.getContext("2d");
	var i = 0;
	ctx.clearRect(0,0,can_width,can_height);console.log("clear"); //清空画板
	for (var d in data){
		var height = data[d];
		switch(true){
			case height>400 : 
			ctx.fillStyle ="black";
			break;
			case height>300 : 
			ctx.fillStyle ="purple";
			break;
			case height>200: 
			ctx.fillStyle ="red";
			break;
			case height>100:
			ctx.fillStyle ="blue";
			break;
			default: 
			ctx.fillStyle ="green";
		}
		ctx.fillRect((width+1)*i++,can_height-height,width,height);   
		/**
		 * fillRect( x , y , w , h)
		 * 画布的左上角是原点。
		 * (x ,y) 是矩形的左上角顶点的坐标。每画一个矩形，就要把x向右增加一个矩形的宽度。 width+1 是为了矩形间有一点间隙。
		 */
	}

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var gra = document.getElementsByName("gra-time");
	for (var i=0;i<gra.length;i++){
		gra[i].addEventListener("click",graTimeChange,false);
	}
}


/**
 * 		根据数据集中的城市选项更新页面中的下拉列表
 */
function initCitySelector(){
	//设置下拉列表的选项
	var selector = document.getElementById("city-select");
	var i = 1;
	for (var city in aqiSourceData){
		selector.options[i++] = new Option(city);
	}
	selector.addEventListener("change",citySelectChange,false);	//给select设置时间，当选项发生变化时调用函数citySelectChange
}


/**
 * 		将初始数据aqiSourceData中的数据转换成可用的格式并存入aqiData。
 * 		根据 pageState 来设置aqiData中的内容。
 *
 * 		pageState{
 * 			nowGraTime;
 * 			nowSelectedCity;
 * 		}
 */	
function initAqiChartData() {
  	chartData = [];
  	var city = pageState.nowSelectCity;
  	switch(pageState.nowGraTime){
  		case "day":        //直接把数据放过去。
  			for(var d in aqiSourceData[city]){
  				chartData.push(aqiSourceData[city][d]);
  			}
  		break;
  		case "week":    
  			var item =0;							//一个星期内的数据总和
  			var counter = 0;						//计数有多少天的数据加入了item
  			for (var d in aqiSourceData[city]){            //遍历每一个数据
  				item += aqiSourceData[city][d];
  				counter++;  
  				if ( new Date(d).getDay() == 6){     //当这个数据是该星期的最后一天，则把该星期的平均数放入chartData，然后开始计数下一个星期。
  					chartData.push(Math.ceil(item/counter));
  					item = 0;
  					counter = 0;
  				}
  			}
  		break;
  		case "month":
  			var monthflag= [0,0,0,0,0,0,0,0,0,0,0,0];    //标记每个月有多少天的数据被算入
  			var temp=0;			//存放当月数据总和
  			var currmonth = 0;	   //当前正在处理的月份
  			for(var d in aqiSourceData[city]){
    				var  m =  new Date(d).getMonth();
  				if(m != currmonth){                     //判断是否已经到了下一个月的数据了。是则把temp的数据算出平均数存入chartData。
  					chartData.push(Math.ceil(temp/monthflag[currmonth]));
  					currmonth = m;			//把当前处理月份标志切换到下一个月。
  					temp=0;					//清空
  				}
  				monthflag[m]++;
  				temp+=aqiSourceData[city][d];
  			}
  			chartData.push(Math.ceil(temp/monthflag[currmonth]));  
  			/**
  			 * 因为上面的循环要处理到下一个月的数据时，才会将本月数据存入chartData，而最后一个月的数据等不到m！=currmonth   。
  			 * 所以要手动把最后一个月的数据存入。
  			 */
  																			
  	}
}
/**
 * 这是一个controller!!
 */
function graTimeChange() {
	if (this.value == pageState.nowGraTime)  return ;  // 确定是否选项发生了变化 
	  pageState.nowGraTime = this.value; // 设置对应数据
	  if(pageState.nowSelectCity == 'city') return ;  //还没选择城市，所以不用设置数据和渲染
	  initAqiChartData();
	  renderChart();  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  	pageState.nowSelectCity = this.value;    // 设置对应数据
  	initAqiChartData();
 	 renderChart(); // 调用图表渲染函数
}


/**
 * 初始化函数
 */
function init() {
	initGraTimeForm();
	initCitySelector();
	initAqiChartData();
}
