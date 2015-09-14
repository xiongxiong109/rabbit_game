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
	earth.x=canvas.width*0.25+earth.w*earth.scaleX/2;
	earth.y=canvas.height*0.02+earth.h*earth.scaleY/2;
	startPage.addChild(earth);

	//创建兔子和月球
	var moon=new createjs.Bitmap('img/start/moon.png');
	moon.w=1282;
	moon.h=1523;
	moon.scaleX=fixImgStyle(moon.w,moon.h,1.5,1.5).sx;
	moon.scaleY=fixImgStyle(moon.w,moon.h,1.5,1.5).sy;
	moon.x=-canvas.width*0.25;
	moon.y=canvas.height*0.4;
	startPage.addChild(moon);

	//创建开始按钮
	var startBtn=new createjs.Bitmap('img/start/start_btn.png');
	startBtn.w=220;
	startBtn.h=91;
	startBtn.scaleX=fixImgStyle(startBtn.w,startBtn.h,0.28,0.13).sx;
	startBtn.scaleY=fixImgStyle(startBtn.w,startBtn.h,0.28,0.13).sy;
	startBtn.x=canvas.width*0.36;
	startBtn.y=canvas.height*0.64;
	startBtn.visible=false;//按钮初始隐藏
	startPage.addChild(startBtn);

	//创建规则按钮
	var ruleBtn=new createjs.Bitmap('img/start/rule_btn.png');
	ruleBtn.w=220;
	ruleBtn.h=91;
	ruleBtn.scaleX=fixImgStyle(ruleBtn.w,ruleBtn.h,0.28,0.13).sx;
	ruleBtn.scaleY=fixImgStyle(ruleBtn.w,ruleBtn.h,0.28,0.13).sy;
	ruleBtn.x=canvas.width*0.36;
	ruleBtn.y=canvas.height*0.74;
	ruleBtn.visible=false;
	startPage.addChild(ruleBtn);

	//创建排名按钮
	var rnkBtn=new createjs.Bitmap('img/start/rank_btn.png');
	rnkBtn.w=220;
	rnkBtn.h=91;
	rnkBtn.scaleX=fixImgStyle(rnkBtn.w,rnkBtn.h,0.28,0.13).sx;
	rnkBtn.scaleY=fixImgStyle(rnkBtn.w,rnkBtn.h,0.28,0.13).sy;
	rnkBtn.x=canvas.width*0.36;
	rnkBtn.y=canvas.height*0.84;
	rnkBtn.visible=false;
	startPage.addChild(rnkBtn);

	stage.addChild(startPage);
	
	//动画交互
	//背景
	createjs.Tween.get(bgRect)
	.to({
		alpha:1
	},400);
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
		y:canvas.height*0.4
	},1000,createjs.Ease.backOut)
	.call(function(){
		startBtn.visible=true;
		ruleBtn.visible=true;
		rnkBtn.visible=true;
	});

	//开始按钮
	startBtn.alpha=0;
	ruleBtn.alpha=0;
	rnkBtn.alpha=0;

	createjs.Tween.get(startBtn)
	.wait(2000)
	.to({
		alpha:1
	},800)
	.call(function(){
		
		//点击按钮开始游戏
		startBtn.addEventListener('click',gameStart);
	});

	createjs.Tween.get(ruleBtn)
	.wait(2200)
	.to({
		alpha:1
	},800)
	.call(function(){
		//点击按钮查看规则
		ruleBtn.addEventListener('click',showRules);
	});
	createjs.Tween.get(rnkBtn)
	.wait(2400)
	.to({
		alpha:1
	},800)
	.call(function(){
		//点击按钮查看排名
		rnkBtn.addEventListener('click',showRanks);
	});
}

//游戏开始
function gameStart(){
	console.log('gameStart');
}

// showRules();
//游戏规则
function showRules(){
	var bg=new createjs.Shape();
	bg.graphics.beginFill("#315b98").drawRect(0,0,canvas.width,canvas.height);
	rulePage.addChild(bg);

	var title=new createjs.Bitmap("img/rule/rule_title.png");
	title.w=217;
	title.h=51;
	title.scaleX=fixImgStyle(title.w,title.h,0.24,0.05).sx;
	title.scaleY=fixImgStyle(title.w,title.h,0.24,0.05).sy;
	title.x=canvas.width*0.38;
	title.y=canvas.height*0.04;
	rulePage.addChild(title);

	var content=new createjs.Bitmap("img/rule/rule_content.png");
	content.w=622;
	content.h=628;
	content.scaleX=fixImgStyle(content.w,content.h,0.68,0.73).sx;
	content.scaleY=fixImgStyle(content.w,content.h,0.68,0.73).sy;
	content.x=canvas.width*0.16;
	content.y=canvas.height*0.1;
	rulePage.addChild(content);

	var backBtn=new createjs.Bitmap("img/back_btn.png");
	backBtn.w=306;
	backBtn.h=127;
	backBtn.scaleX=fixImgStyle(backBtn.w,backBtn.h,0.34,0.14).sx;
	backBtn.scaleY=fixImgStyle(backBtn.w,backBtn.h,0.34,0.14).sy;
	backBtn.x=canvas.width*0.33;
	backBtn.y=canvas.height*0.71;
	rulePage.addChild(backBtn);

	stage.addChild(rulePage);

	//动画交互
	rulePage.x=canvas.width;
	createjs.Tween.get(rulePage)
	.to({
		x:0
	},800,createjs.Ease.bounceOut);

	backBtn.on('click',function(){
		createjs.Tween.get(rulePage)
		.to({
			x:canvas.width
		},400,createjs.Ease.backIn)
		.call(function(){
			stage.removeChild(rulePage);
		});
	})
}

// showRanks();
//查看排名
function showRanks(){
	var bg=new createjs.Shape();
	bg.graphics.beginFill("#315b98").drawRect(0,0,canvas.width,canvas.height);
	rankPage.addChild(bg);
	//标题
	var title=new createjs.Bitmap("img/rank/rank_title.png");
	title.w=315;
	title.h=37;
	title.scaleX=fixImgStyle(title.w,title.h,0.38,0.05).sx;
	title.scaleY=fixImgStyle(title.w,title.h,0.38,0.05).sy;
	title.x=canvas.width*0.05;
	title.y=canvas.height*0.02;
	rankPage.addChild(title);
	//抬头
	var th=new createjs.Bitmap("img/rank/text.png");
	th.w=638;
	th.h=41;
	th.scaleX=fixImgStyle(th.w,th.h,0.72,0.05).sx;
	th.scaleY=fixImgStyle(th.w,th.h,0.72,0.05).sy;
	th.x=canvas.width*0.14;
	th.y=canvas.height*0.08;
	rankPage.addChild(th);

	//返回按钮
	var backBtn=new createjs.Bitmap("img/back_btn.png");
	backBtn.w=306;
	backBtn.h=127;
	backBtn.scaleX=fixImgStyle(backBtn.w,backBtn.h,0.34,0.14).sx;
	backBtn.scaleY=fixImgStyle(backBtn.w,backBtn.h,0.34,0.14).sy;
	backBtn.x=canvas.width*0.33;
	backBtn.y=canvas.height*0.8;
	rankPage.addChild(backBtn);

	//添加数据
	var data=[
		{
			name:"小小酱油熊小小酱油熊",
			score:21,
			rank:1
		},
		{
			name:"熊熊109",
			score:18,
			rank:2
		},
		{
			name:"xiong",
			score:15,
			rank:3
		},
		{
			name:"xiongxiong",
			score:15,
			rank:3
		}
	];
	var len=data.length>10 ? 10 : data.length;
	for(var i=0;i<len;i++){
		var row=new createjs.Container();

		var name=new createjs.Text(data[i].name,"1.2rem Arial","#f6c285");
		name.x=canvas.width*0.22;
		name.textAlign="center";
		//过长的名字做截断处理
		if(name.getMeasuredWidth()>=canvas.width*0.4){
			name.text=data[i].name=data[i].name.substr(0,5)+"...";
		}

		var score=new createjs.Text(data[i].score,"1.2rem Arial","#f6c285");
		score.x=canvas.width*0.5;

		var rank=new createjs.Text(data[i].rank,"1.2rem Arial","#f6c285");
		rank.x=canvas.width*0.8;

		row.addChild(name); 
		row.addChild(score); 
		row.addChild(rank);
		row.y=canvas.height*(0.15+i*0.06);
		rankPage.addChild(row);
	}
	stage.addChild(rankPage);

	//动画交互
	rankPage.y=-canvas.height;
	createjs.Tween.get(rankPage)
	.to({
		y:0
	},800,createjs.Ease.bounceOut);
	backBtn.on('click',function(){
		createjs.Tween.get(rankPage)
		.to({
			y:-canvas.height
		},400,createjs.Ease.backIn)
		.call(function(){
			stage.removeChild(rankPage);
		});
	});
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