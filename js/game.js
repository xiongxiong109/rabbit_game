var stage=new createjs.Stage('canvas');
canvas.width=canvas.parentNode.offsetWidth;
canvas.height=canvas.parentNode.offsetHeight;

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener('tick',stage);
//游戏界面
var startPage=new createjs.Container();
var rankPage=new createjs.Container();
var overPage=new createjs.Container();
var rulePage=new createjs.Container();
var mainPage=new createjs.Container();
bootStrap();
//游戏启动界面
function bootStrap(){
	//创建渐变色
	var bg=new createjs.Graphics.Fill();
	bg.linearGradient(['#010617','#040133'],[0,0.5],0,0,0,canvas.height);//这个只是创建了一个线性渐变的填充
	var bgRect=new createjs.Shape();
	bgRect.graphics.beginFill(bg.style).drawRect(0,0,canvas.width,canvas.height);
	startPage.addChild(bgRect);
	bgRect.alpha=0;

	//随机创建n个一闪一闪亮晶晶的小星星
	createStars(30);

	//创建地球
	var earth=new createjs.Bitmap('img/start/earth.png');
	earth.w=357;
	earth.h=356;
	earth.scaleX=fixImgStyle(earth.w,earth.h,0.5,0.5).sx;
	earth.scaleY=fixImgStyle(earth.w,earth.h,0.5,0.5).sy;
	earth.regX=earth.w/2;
	earth.regY=earth.h/2;
	earth.x=canvas.width*0.25+earth.regX/2;
	earth.y=canvas.height*0.02+earth.regY/2;
	startPage.addChild(earth);

	//创建兔子和月球
	var moon=new createjs.Bitmap('img/start/moon.png');
	moon.w=1282;
	moon.h=1523;
	moon.scaleX=fixImgStyle(moon.w,moon.h,1.5,1.5).sx;
	moon.scaleY=fixImgStyle(moon.w,moon.h,1.5,1.5).sy;
	moon.x=-canvas.width*0.25;
	moon.y=canvas.height*0.5;
	startPage.addChild(moon);

	//创建按钮
	var startBtn=new createjs.Bitmap('img/start/start_btn.png');
	startBtn.w=220;
	startBtn.h=91;
	startBtn.scaleX=fixImgStyle(startBtn.w,startBtn.h,0.28,0.13).sx;
	startBtn.scaleY=fixImgStyle(startBtn.w,startBtn.h,0.28,0.13).sy;
	startBtn.x=canvas.width*0.36;
	startBtn.y=canvas.height*0.8;
	startBtn.visible=false;//按钮初始隐藏
	startPage.addChild(startBtn);

	//动画交互
	//背景
	createjs.Tween.get(bgRect)
	.to({
		alpha:1
	},400);
	stage.addChild(startPage);
	//地球
	earth.scaleX=0;
	earth.scaleY=0;
	createjs.Tween.get(earth)
	.wait(500)
	.to({
		scaleX:fixImgStyle(earth.w,earth.h,0.5,0.5).sx,
		scaleY:fixImgStyle(earth.w,earth.h,0.5,0.5).sy
	},800,createjs.Ease.backOut);
	var rotateTween=createjs.Tween.get(earth)
	.to({
		rotation:360
	},5000);
	rotateTween.loop=true;

	//月亮
	moon.y=canvas.height;
	createjs.Tween.get(moon)
	.wait(1000)
	.to({
		y:canvas.height*0.5
	},1000,createjs.Ease.backOut)
	.call(function(){
		startBtn.visible=true;
	});

	//开始按钮
	startBtn.alpha=0;
	createjs.Tween.get(startBtn)
	.wait(2000)
	.to({
		alpha:1
	},800)
	.call(function(){
		//点击按钮开始游戏
		startBtn.addEventListener('click',gameStart);
	});
}

//游戏开始
function gameStart(){
	console.log('gameStart');
}

//创建星星函数
function createStars(n){
	for(var i=0;i<n;i++){
		var star=new createjs.Shape();
		star
		.graphics
		.beginFill("#fff")
		.drawCircle(
			Math.random()*canvas.width,
			Math.random()*canvas.height/1.5,
			Math.random()*2+1
		);
		star.alpha=Math.random()*0.5+0.5;
		var tweens=createjs.Tween.get(star).
		to({
			alpha:1
		},600,createjs.Ease.sineOut)
		.to({
			alpha:Math.random()*0.5+0.2
		},600,createjs.Ease.sineOut);
		tweens.loop=true;
		startPage.addChild(star);
	}
};

/*修正canvas中图片比例
* @w:图片的实际宽度
* @h:图片的实际高度
* @rw:图片的缩放比例
* @rh:图片的缩放比例
* @return:返回图片的正确的scaleX和scaleY
*/
function fixImgStyle(w,h,rw,rh){
	return {
		sx:canvas.width/w*rw,
		sy:canvas.width/h*rh
	};
}