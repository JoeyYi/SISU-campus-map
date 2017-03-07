
var printStart,printEnd;//全局变量 打印开始和结束定位

function pre(){//打印准备


	var div = document.getElementById("canvas");  //清空canvas中原来的所有子元素节点
	while(div.hasChildNodes()) {  div.removeChild(div.firstChild); }  

	var buildingIndex=document.getElementById("bui").value;
	var floorIndex=document.getElementById("flo").value;

	console.log("获得的buildingindex和floorindex为 ",buildingIndex,floorIndex);
	for(var i=0;i<Array.length;i++){ //定位打印开始和结束
		if(Array[i][0]==buildingIndex && Array[i][1]==floorIndex){
			printStart=i;
			break;
		}
	}

	for(i=printStart;i<Array.length;i++){
		if(Array[i][0]!=buildingIndex || Array[i][1]!=floorIndex){break;}
		printEnd=i;	
	}


	console.log("printStart,printEnd "+printStart,printEnd);

	var cvsheight=0,cvswidth=0;
	for (var i= printStart; i<=printEnd;i++){
		cvsheight=Math.max(cvsheight,Array[i][6]+Array[i][8]);
		cvswidth=Math.max(cvswidth,Array[i][5]+Array[i][7]);
	}

	var buildingMap = document.createElement("canvas"); 
	buildingMap.height= (cvsheight+10)*sc;
	buildingMap.width= (cvswidth+10)*sc;
	buildingMap.style="border:1px solid #c3c3c3 margin-top:80px;";
	console.log("margintop2",content-cvsheight*sc*0.5);
	buildingMap.style.marginTop=(content-cvsheight*sc*0.5)/2+"px";
	buildingMap.id="map";
	document.getElementById("canvas").appendChild(buildingMap); 
	console.log("canvas大小",cvsheight,cvswidth);
	if ((content-cvsheight*sc*0.5)/2>=20){
	//???????
	}

	printMap(Array,printStart,printEnd);
}



function orientation(){
	if (document.getElementById("turn").value=="跟随手机指向"){
		document.getElementById("turn").value="关闭跟随手机";
		console.log(document.getElementById("turn").value);
		if(window.DeviceOrientationEvent){
			window.addEventListener("deviceorientation",DeviceOrientationHandler,false);
			}else{
			alert("您的浏览器不支持DeviceOrientation");
			}

		}else{
			pre();
			document.getElementById("turn").value="跟随手机指向";
			window.removeEventListener("deviceorientation",DeviceOrientationHandler,false);
		}
	}


function DeviceOrientationHandler(event){
		var alpha = event.alpha;
		var deg="rotate("+alpha+"deg)";
		console.log("deg",deg);
		document.getElementById("canvas").style.webkitTransform=deg;

			}



function printMap(Array,printStart,printEnd){//绘制地图(数组)（楼，层）



	var c=document.getElementById("map");
	var ctx=c.getContext("2d");//获取对应的CanvasRenderingContext2D对象(画笔)
	
	ctx.fillStyle="white";
	ctx.fillRect(0,0,3000,3000);//画布填充白色

	printBackground(Array[printStart][0]);
	for(var i=printStart;i<=printEnd;i++){
		print(Array[i][2],Array[i][5]+5,Array[i][6]+5,Array[i][7],Array[i][8],Array[i][3],Array[i][4]);
	}
}


function printBackground(i){
	var c=document.getElementById("map");
	var ctx=c.getContext("2d");//获取对应的CanvasRenderingContext2D对象(画笔)
	ctx.scale(sc,sc);
	switch(i){
		case 1:
			
			break;
		case 2:
			
			break;
		case 3:
			
			break;
		case 4:
			
			break;
		case 5:
			
			break;
		case 6:
			
			break;
		case 7:

			ctx.beginPath();
			ctx.lineWidth="4";
			ctx.lineCap="round";
			ctx.lineJoin="round";
			ctx.strokeStyle="#424242";//深灰
			ctx.moveTo(5,5);
			ctx.lineTo(925,5);
			ctx.lineTo(925,35);
			ctx.moveTo(985,35);
			ctx.lineTo(985,5);
			ctx.lineTo(1205,5);
			ctx.lineTo(1205,1005);
			ctx.lineTo(1105,1005);
			ctx.lineTo(1105,975);
			ctx.moveTo(925,975);
			ctx.lineTo(925,1005);
			ctx.lineTo(5,1005);
			ctx.lineTo(5,605);
			ctx.lineTo(35,605);
			ctx.moveTo(35,405);
			ctx.lineTo(5,405);
			ctx.lineTo(5,5);
			ctx.stroke();

			ctx.beginPath();
			ctx.lineWidth="4";
			ctx.moveTo(205,205);
			ctx.lineTo(905,205);
			ctx.lineTo(905,355);
			ctx.lineTo(875,355);
			ctx.moveTo(875,555);
			ctx.lineTo(905,555);
			ctx.lineTo(905,705);
			ctx.lineTo(205,705);
			ctx.lineTo(205,205);
			ctx.stroke();

			break;
		case 8:
			
			break;
		case 9:
			
			break;
		case 10:
			
			break;
		case 11:
			
			break;
		default:
			console.log("出错啦错啦错啦");
			break;

	}
	
	ctx.scale(cs,cs);
}

function print(roomType,dx,dy,wd,ht,t1,t2){	//从数组绘制地图(房间类型,形状坐标,形状坐标,宽度,高度,文字1,文字2)
	
	
	
	
    printRoom(roomType,dx,dy,wd,ht);//(房间类型,形状坐标,形状坐标,宽度,高度)
	printText(t1,t2,dx,dy,wd,ht);//(文字1,文字2,形状坐标,形状坐标)
}

function printRoom(roomType,dx,dy,wd,ht)//绘制房间图(房间类型,形状坐标,形状坐标,宽度,高度)
{
var c=document.getElementById("map");
var ctx=c.getContext("2d");//获取对应的CanvasRenderingContext2D对象(画笔)
ctx.scale(sc,sc);


switch(roomType)//颜色选择:roomType
{
case 1:
  ctx.fillStyle="#f2de80";//一般教室：1=黄色
  break;
case 2:
  ctx.fillStyle="#BDC0BA";//楼梯：2=灰色
  break;
case 3:
  ctx.fillStyle="#A5DEE4";//茶水：3=蓝色
  break;
case 4:
  ctx.fillStyle="#F8C3CD";//厕所：4=红色
  break;
case 5:
  ctx.fillStyle="#f2de80";//其他（暂定）：5=黄色
  break;
default: alert("一定是哪里搞错了!!");
}

ctx.fillRect(dx,dy,wd,ht);//填充矩形

ctx.beginPath();//教室边框
ctx.lineWidth="4";
ctx.lineCap="round";
ctx.lineJoin="round";
ctx.strokeStyle="#424242";//深灰
ctx.moveTo(dx,dy+10);
ctx.lineTo(dx,dy);
ctx.lineTo(dx+10,dy);
ctx.moveTo(dx+wd-10,dy);
ctx.lineTo(dx+wd,dy);
ctx.lineTo(dx+wd,dy+10);
ctx.moveTo(dx+wd,dy+ht-10);
ctx.lineTo(dx+wd,dy+ht);
ctx.lineTo(dx+wd-10,dy+ht);
ctx.moveTo(dx+10,dy+ht);
ctx.lineTo(dx,dy+ht);
ctx.lineTo(dx,dy+ht-10);
ctx.stroke();


ctx.scale(cs,cs);
}

function printText(t1,t2,dx,dy,wd,ht)//绘制文字(文字1,文字2,形状坐标,形状坐标)
{
var c=document.getElementById("map");
var ctx=c.getContext("2d");//获取对应的CanvasRenderingContext2D对象(画笔)
ctx.scale(sc,sc);


ctx.font = "32px monospace";//设置字体样式
ctx.fillStyle = "#000000";//设置字体填充颜色
	if(t2=="0")
	{
        ctx.textAlign="center";
	ctx.fillText(t1, dx+wd*0.5,dy+(ht+22)*0.5);//只有一个号码：从坐标点开始绘制文字1
	}	
	else
	{
	ctx.textAlign="center";
	ctx.fillText(t1, dx+wd*0.5,dy+ht*0.45);//两个号码：从坐标点开始绘制文字1
	ctx.fillText(t2, dx+wd*0.5,dy+ht*0.45+30);//从坐标点开始绘制文字2
	}
	
	ctx.scale(cs,cs);
}	

function awRotate()//逆时针旋转
	{ 
	var height = 0;
	var width = 0;
	for(var i=printStart;i<=printEnd;i++)
	{
	height = Math.max(Array[i][6],height);
	width = Math.max(Array[i][5],width);
	}
	
	map=document.getElementById("map");  
	map.width=height+140;
	map.height=width+140;
	

	for(var i=printStart;i<=printEnd;i++)//变换数组
		{
		var t = Array[i][6];
		Array[i][6] = width-Array[i][5];
		Array[i][5]= t;
		t = Array[i][8];
		Array[i][8] = Array[i][7];
		Array[i][7] = t;
		}
	
	pre();//重新绘制地图

	}

function cwRotate()//顺时针旋转
	{ 
	var height = 0;
	var width = 0;
	for(var i=printStart;i<=printEnd;i++)
	{
	height = Math.max(Array[i][6],height);
	width = Math.max(Array[i][5],width);
	}
		
	map=document.getElementById("map");  
	map.width=height+140;
	map.height=width+140;
	

	for(var i=printStart;i<=printEnd;i++)//变换数组
		{
		var t = Array[i][5];
		Array[i][5] = height-Array[i][6];
		Array[i][6]= t;
		t = Array[i][8];
		Array[i][8] = Array[i][7];
		Array[i][7] = t;
		}
	
	pre();//重新绘制地图

	}

function selectFloor(){ //选择楼层信息（未审）

	var floors=[["1楼","2楼","3楼","4楼"],    //building 1
				["1楼","2楼","3楼","4楼"],    //building 2
				["1楼","2楼","3楼","4楼"],    //building 3
				["1楼","2楼","3楼","4楼"],    //building 4
				["1楼","2楼","3楼","4楼"],    //building 5
				["1楼","2楼","3楼","4楼"],    //building 6
				["1楼","2楼","3楼","4楼"],    //building 7
				["1楼","2楼","3楼","4楼"],    //building 8
				["1楼","2楼","3楼","4楼","5楼","6楼","7楼"],  //图文
				["1楼","2楼","3楼","4楼"],                    //师活
				["1楼","2楼"]                                //教堂
				];  
	var buildingIndex=document.getElementById("building").selectedIndex;//获取所选building
	document.getElementById("bui").value=buildingIndex;
    var div = document.getElementById("floor");  //清空floor中原来的所有子元素节点
    while(div.hasChildNodes()) {  div.removeChild(div.firstChild); }  
	
	
	for (var i=0; i<floors[buildingIndex-1].length;i++){//打印所有楼层的按钮
	var add = document.createElement("button");
	add.innerHTML=floors[buildingIndex-1][i];
	add.onclick=function(){document.getElementById("flo").value=this.innerHTML.substring(0,1);pre();};//使用 HTML DOM 来分配事件 和一般的设置属性有啥区别啊？？？
//或者在这里给输入框1赋值buildingindex
	document.getElementById("floor").appendChild(add); //加入floor节点

	}

}
	