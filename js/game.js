var stage=new createjs.Stage('canvas');
canvas.width=canvas.parentNode.offsetWidth;
canvas.height=canvas.parentNode.offsetHeight;
//开启触摸
createjs.Touch.enable(stage);

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener('tick',stage);

//积分和生命
var score=0;
var life=5;

//游戏界面
var startPage=new createjs.Container();
var rankPage=new createjs.Container();
var overPage=new createjs.Container();
var rulePage=new createjs.Container();
var mainPage=new createjs.Container();

//兔子雪碧图
var rabbitData={
	images:["img/main/rabbit_sprite.png"],
	frames:{width:298,height:312},
	animations:{
		stand:1,
		eat:[0,1,'stand'],
		loop:[0,1]
	}
}
var rabbitSheet=new createjs.SpriteSheet(rabbitData);

// bootStrap();
//游戏启动界面
function bootStrap(){
	createjs.Ticker.setFPS(30);
	startPage=new createjs.Container();
	rankPage=new createjs.Container();
	overPage=new createjs.Container();
	rulePage=new createjs.Container();
	mainPage=new createjs.Container();
	score=0;
	life=5;
	//创建渐变色
	var bg=new createjs.Graphics.Fill();
	bg.linearGradient(['#010617','#040133'],[0,0.5],0,0,0,canvas.height);//这个只是创建了一个线性渐变的填充
	var bgRect=new createjs.Shape();
	bgRect.graphics.beginFill(bg.style).drawRect(0,0,canvas.width,canvas.height);
	startPage.addChild(bgRect);
	bgRect.alpha=0;

	//随机创建n个一闪一闪亮晶晶的小星星
	createStars(40);

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
		startBtn.addEventListener('click',function(){
			startBtn.visible=false;
			ruleBtn.visible=false;
			rnkBtn.visible=false;

			createjs.Tween.get(earth)
			.to({
				y:-canvas.height
			},400,createjs.Ease.backIn);

			createjs.Tween.get(moon)
			.wait(200)
			.to({
				y:canvas.height
			},400,createjs.Ease.backIn)
			.call(function(){
				createjs.Tween.get(startPage)
				.to({
					alpha:0
				},400)
				.call(function(){
					gameStart();
				});
			});
		});
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

// gameStart();
//游戏开始
function gameStart(){
	//背景
	var bg=new createjs.Shape();
	bg.graphics.beginFill("#315b98").drawRect(0,0,canvas.width,canvas.height);
	mainPage.addChild(bg);

	//萝卜
	var luobo=new createjs.Bitmap("img/main/luobo.png");
	luobo.w=676;
	luobo.h=1476;
	luobo.scaleX=fixImgStyle(luobo.w,luobo.h,0.76,1.7).sx;
	luobo.scaleY=fixImgStyle(luobo.w,luobo.h,0.76,1.7).sy;
	luobo.x=canvas.width*0.2;
	luobo.y=canvas.height*0.02;
	mainPage.addChild(luobo);

	//地面
	var ground=new createjs.Bitmap("img/main/ground.png");
	ground.w=1649;
	ground.h=918;
	ground.scaleX=fixImgStyle(ground.w,ground.h,1.5,1.1).sx;
	ground.scaleY=fixImgStyle(ground.w,ground.h,1.5,1.1).sy;
	ground.x=-canvas.width*0.25;
	ground.y=canvas.height*0.8;
	mainPage.addChild(ground);

	//兔子
	var rab=new createjs.Sprite(rabbitSheet,"stand");
	rab.w=298;
	rab.h=312;
	rab.scaleX=fixImgStyle(rab.w,rab.h,0.4,0.42).sx;
	rab.scaleY=fixImgStyle(rab.w,rab.h,0.4,0.42).sy;
	rab.regX=rab.w/2;
	rab.regY=rab.h/2;
	rab.x=rab.regX*rab.scaleX;
	rab.y=canvas.height-rab.regY*rab.scaleY;
	rab.realW=rab.w*rab.scaleX;
	rab.realH=rab.h*rab.scaleY;
	mainPage.addChild(rab);

	var scoreText=new createjs.Text("积分:"+score,"1.5rem Arial","#e3b773");
	var lifeText=new createjs.Text("生命:"+life,"1.5rem Arial","#e3b773");
	scoreText.x=canvas.width*0.02;
	scoreText.y=canvas.height*0.01;
	lifeText.x=canvas.width-lifeText.getMeasuredWidth()-canvas.width*0.02;
	lifeText.y=canvas.height*0.01;
	mainPage.addChild(scoreText);
	mainPage.addChild(lifeText);

	//进场动画
	mainPage.alpha=0;
	luobo.y=-canvas.height;
	createjs.Tween.get(mainPage)
	.to({
		alpha:1
	},400)
	.call(function(){
		createjs.Tween.get(luobo)
		.to({
			y:canvas.height*0.02
		},600,createjs.Ease.elasticOut)
	});
	//游戏说明
	var master=new createjs.Container();
	var mask=new createjs.Shape();
	mask.graphics.beginFill("#000").drawRect(0,0,canvas.width,canvas.height);
	mask.alpha=0.5;
	master.addChild(mask);
	var str1="拖拽小兔在底部移动";
	var str2="吃到的月饼越多,奖励越高哦!";
	var tips1=new createjs.Text(str1,"1rem Arial","#fff");
	var tips2=new createjs.Text(str2,"1rem Arial","#fff");
	tips1.x=(canvas.width-tips1.getMeasuredWidth())/2;
	tips1.y=canvas.height*0.4;
	tips2.x=(canvas.width-tips2.getMeasuredWidth())/2;
	tips2.y=canvas.height*0.5;
	master.addChild(tips1);
	master.addChild(tips2);
	mainPage.addChild(master);

	//掉落数据
	var items=[//掉落物品的属性
		{
			name:"bomb",
			src:"img/main/bomb.png",
			score:0,//吃到以后得分
			damage:1,//吃到以后的伤害
			drop:0//掉落以后的伤害
		},
		{
			name:"cookie",
			src:"img/main/cookie.png",
			score:5,
			damage:0,
			drop:1
		}
	];
	var itemWrap=new createjs.Container();
	//游戏开始事件
	master.alpha=0;
	createjs.Tween.get(master)
	.to({
		alpha:1
	},500)
	.wait(1500)
	.to({
		alpha:0
	},500)
	.call(function(){
		//创建物体
		mainPage.addChild(itemWrap);
		createjs.Ticker.addEventListener('tick',renderItem);
	});
	//拖拽事件
	var disX;
	rab.on('mousedown',function(e){
		disX=e.stageX-rab.x;
		stage.on('pressmove',function(e){
			var L=e.stageX+disX;
			if(L<=rab.regX*rab.scaleX){
				L=rab.regX*rab.scaleX;
			}
			else if(L>=canvas.width-rab.regX*rab.scaleX){
				L=canvas.width-rab.regX*rab.scaleX;
			}
			rab.x=L;
			//视差滚动
			createjs.Tween.get(luobo)
			.to({
				x:canvas.width*0.2-L*0.05
			},200);
			createjs.Tween.get(ground)
			.to({
				x:L*0.08-canvas.width*0.25
			});
		});
		stage.on('pressup',function(e){
			stage.off('pressmove');
			stage.off('pressup');
		});
	});

	stage.addChild(mainPage);

	/*
	*随机渲染掉落物品
	*@rand:表示掉落炸弹的概率0-1
	*@total:同时存在的最大item数
	*/
	function renderItem(){
		var rand=0.2;
		var total=5;
		var random=Math.random();
		if(itemWrap.children.length<total){
			var cnt=0;
			var item;
			cnt= random>rand ? 1 : 0; //1出月饼,0出炸弹
			item=new createjs.Bitmap(items[cnt].src);
			item.damage=items[cnt].damage;
			item.score=items[cnt].score;
			item.drop=items[cnt].drop;
			item.w=74;
			item.h=74;
			item.regX=item.w/2;
			item.regY=item.h/2;
			item.scaleX=fixImgStyle(item.w,item.h,0.1,0.1).sx;
			item.scaleY=fixImgStyle(item.w,item.h,0.1,0.1).sy;
			item.realW=item.w*item.scaleX;
			item.realH=item.h*item.scaleY;
			item.x=Math.random()*(canvas.width-item.realW*2)+item.realW;
			item.y=-item.h*item.scaleY-Math.random()*250-180;
			itemWrap.addChild(item);
		}
		for(var i=0;i<itemWrap.children.length;i++){
			var box=itemWrap.getChildAt(i);
			box.y+=8;
			box.rotation+=10;
			if(box.y>=canvas.height){//掉落
				itemWrap.removeChild(box);
				life-=box.drop;
			}
			if( 
				box.y+box.realH>=rab.y && 
				box.y<=rab.y+box.realH && 
				box.x+box.realW>=rab.x &&
				box.x<=rab.x+rab.realW
				){//碰撞检测
				rab.gotoAndPlay('eat');
				life-=box.damage;
				score+=box.score;
				itemWrap.removeChild(box);
			}
		}
		if(life<=0){
			life=0;
			mainPage.removeChild(itemWrap);
			createjs.Ticker.removeEventListener('tick',renderItem);
			stage.removeChild(mainPage);
			gameOver();
		}
		lifeText.text="生命:"+life;
		scoreText.text="积分:"+score;
	}
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

		var name=new createjs.Text(data[i].name,"0.8rem Arial","#f6c285");
		name.x=canvas.width*0.22;
		name.textAlign="center";

		var score=new createjs.Text(data[i].score,"0.8rem Arial","#f6c285");
		score.x=canvas.width*0.5;

		var rank=new createjs.Text(data[i].rank,"0.8rem Arial","#f6c285");
		rank.x=canvas.width*0.8;
		if(canvas.width>=768){
			name.font="2rem Arial";
			score.font="2rem Arial";
			rank.font="2rem Arial";
		}
		//过长的名字做截断处理
		if(name.getMeasuredWidth()>=canvas.width*0.4){
			name.text=data[i].name=data[i].name.substr(0,5)+"...";
		}

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

// gameOver();
//游戏结束
function gameOver(){

	var bg=new createjs.Shape();
	bg.graphics.beginFill("#315b98").drawRect(0,0,canvas.width,canvas.height);
	overPage.addChild(bg);

	var t1=new createjs.Bitmap("img/over/text1.png");
	t1.w=755;
	t1.h=87;
	t1.scaleX=fixImgStyle(t1.w,t1.h,0.84,0.1).sx;
	t1.scaleY=fixImgStyle(t1.w,t1.h,0.84,0.1).sy;
	t1.x=canvas.width*0.08;
	t1.y=canvas.height*0.12;
	if(score<=50){
		var t2=new createjs.Bitmap("img/over/text3.png");
		t2.w=637;
		t2.h=102;
	}
	else{
		var t2=new createjs.Bitmap("img/over/text2.png");
		t2.w=611;
		t2.h=105;
	}
	t2.scaleX=fixImgStyle(t2.w,t2.h,0.7,0.1).sx;
	t2.scaleY=fixImgStyle(t2.w,t2.h,0.7,0.1).sy;
	t2.x=canvas.width*0.15;
	t2.y=canvas.height*0.22;
	overPage.addChild(t1);
	overPage.addChild(t2);
	var scoreNumber=new createjs.Text(score,"1.4rem Arial","#f6c285");
	scoreNumber.textAlign="center";
	if(canvas.width>=768){//调整字体大小
		scoreNumber.font="3.4rem Arial";
	}
	scoreNumber.x=canvas.width*0.72;
	scoreNumber.y=canvas.height*0.13;
	overPage.addChild(scoreNumber);
	var btn={};
	btn.w=220;
	btn.h=91;
	btn.sx=fixImgStyle(btn.w,btn.h,0.34,0.13).sx;
	btn.sy=fixImgStyle(btn.w,btn.h,0.34,0.13).sy;

	var rankBtn=new createjs.Bitmap("img/over/rank_btn.png");
	rankBtn.scaleX=btn.sx;
	rankBtn.scaleY=btn.sy;
	rankBtn.x=canvas.width*0.33;
	rankBtn.y=canvas.height*0.48;
	overPage.addChild(rankBtn);

	var agnBtn=new createjs.Bitmap("img/over/again_btn.png");
	agnBtn.scaleX=btn.sx;
	agnBtn.scaleY=btn.sy;
	agnBtn.x=canvas.width*0.33;
	agnBtn.y=canvas.height*0.58;
	overPage.addChild(agnBtn);

	var sarBtn=new createjs.Bitmap("img/over/share_btn.png");
	sarBtn.scaleX=btn.sx;
	sarBtn.scaleY=btn.sy;
	sarBtn.x=canvas.width*0.33;
	sarBtn.y=canvas.height*0.68;
	overPage.addChild(sarBtn);

	//查看排名
	rankBtn.on('click',function(){
		showRanks();
	});
	//再战一次
	agnBtn.on('click',function(){
		createjs.Tween.get(overPage)
		.to({
			x:canvas.width
		},600,createjs.Ease.bounceOut)
		.call(function(){
			stage.removeChild(overPage);
			bootStrap();
		});
	});
	//PK好友
	sarBtn.on('click',function(){

		rankBtn.visible=false;
		agnBtn.visible=false;
		sarBtn.visible=false;

		var overLayer=new createjs.Container();
		var bg=new createjs.Shape();
		bg.graphics.beginFill("#000").drawRect(0,0,canvas.width,canvas.height);
		bg.alpha=0.6;
		overLayer.addChild(bg);

		var shareText=new createjs.Bitmap("img/share_text.png");
		shareText.w=480;
		shareText.h=353;
		shareText.scaleX=fixImgStyle(shareText.w,shareText.h,0.76,0.55).sx;
		shareText.scaleY=fixImgStyle(shareText.w,shareText.h,0.76,0.55).sy;
		shareText.x=canvas.width*0.12;
		shareText.y=canvas.height*0.02;
		overLayer.addChild(shareText);
		overLayer.alpha=0;
		overPage.addChild(overLayer);
		createjs.Tween.get(overLayer)
		.to({
			alpha:1
		},400)
		.wait(1500)
		.to({
			alpha:0
		},400)
		.call(function(){
			rankBtn.visible=true;
			agnBtn.visible=true;
			sarBtn.visible=true;
		});
	});

	stage.addChild(overPage);
	//动画交互
	overPage.y=canvas.height;
	createjs.Tween.get(overPage)
	.to({
		y:0
	},400,createjs.Ease.backOut);
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