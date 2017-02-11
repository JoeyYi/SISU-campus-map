
var printStart,printEnd;//全局变量 打印开始和结束定位

function pre(){//打印准备

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
buildingMap.height= cvsheight;
buildingMap.width= cvswidth;
buildingMap.style="border:1px solid #c3c3c3;";
buildingMap.id="map";
document.getElementById("canvas").appendChild(buildingMap); 
console.log("canvas大小",cvsheight,cvswidth);



printMap(Array,printStart,printEnd);
}


function printMap(Array,printStart,printEnd){//绘制地图(数组)（楼，层）



	var c=document.getElementById("map");
	var ctx=c.getContext("2d");//获取对应的CanvasRenderingContext2D对象(画笔)
	
	ctx.fillStyle="white";
	ctx.fillRect(0,0,3000,3000);//画布填充白色

for(var i=printStart;i<=printEnd;i++){
print(Array[i][2],Array[i][5],Array[i][6],Array[i][7],Array[i][8],Array[i][3],Array[i][4]);
}
}

function print(roomType,dx,dy,wd,ht,t1,t2){	//从数组绘制地图(房间类型,形状坐标,形状坐标,宽度,高度,文字1,文字2)
	
	printRoom(roomType,dx,dy,wd,ht);//(房间类型,形状坐标,形状坐标,宽度,高度)
	printText(t1,t2,dx,dy);//(文字1,文字2,形状坐标,形状坐标)
}

function printRoom(roomType,dx,dy,wd,ht)//绘制房间图(房间类型,形状坐标,形状坐标,宽度,高度)
{
var c=document.getElementById("map");
var ctx=c.getContext("2d");//获取对应的CanvasRenderingContext2D对象(画笔)

switch(roomType)//颜色选择:roomType
{
case 1:
  ctx.fillStyle="#BFEFFF";//一般教室：1=淡蓝色
  break;
case 2:
  ctx.fillStyle="#FFEC8B";//楼梯：2=黄色
  break;
case 3:
  ctx.fillStyle="#00C5CD";//茶水：3=蓝色
  break;
case 4:
  ctx.fillStyle="#EEAEEE";//厕所：4=紫色
  break;
case 5:
  ctx.fillStyle="#CCCCCC";//其他（暂定）：5=蓝色
  break;
default: alert("一定是哪里搞错了!!");
}

ctx.fillRect(dx,dy,wd,ht);//填充矩形
ctx.strokeStyle="#5CACEE";
ctx.strokeRect(dx,dy,wd,ht);//填充边框矩形
}

function printText(t1,t2,dx,dy)//绘制文字(文字1,文字2,形状坐标,形状坐标)
{
var c=document.getElementById("map");
var ctx=c.getContext("2d");//获取对应的CanvasRenderingContext2D对象(画笔)

ctx.font = "30px Arial";//设置字体样式
ctx.fillStyle = "black";//设置字体填充颜色
	if(t2=="0")
	{
        ctx.textAlign="center";
	ctx.fillText(t1, dx+50,dy+60);//只有一个号码：从坐标点开始绘制文字1
	}	
	else
	{
	ctx.textAlign="center";
	ctx.fillText(t1, dx+50,dy+40);//两个号码：从坐标点开始绘制文字1
	ctx.fillText(t2, dx+50,dy+80);//从坐标点开始绘制文字2
	}
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
	