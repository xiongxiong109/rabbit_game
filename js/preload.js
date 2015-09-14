var queue=new createjs.LoadQueue();
var loadPage=new createjs.Container();
createjs.Ticker.setFPS(8);
stage.addChild(loadPage);
//loading动画
var loadRabber=new createjs.Sprite(rabbitSheet,'load');
loadRabber.w=298;
loadRabber.h=312;
loadRabber.scaleX=fixImgStyle(loadRabber.w,loadRabber.h,0.5,0.5).sx;
loadRabber.scaleY=fixImgStyle(loadRabber.w,loadRabber.h,0.5,0.5).sy;
loadRabber.x=canvas.width*0.25;
loadRabber.y=canvas.height*0.25;
loadPage.addChild(loadRabber);

//loading进度条
var barOuter=new createjs.Shape();
barOuter.graphics.beginFill("#ddd").drawRect(canvas.width*0.25,canvas.height*0.8,canvas.width*0.5,canvas.height*0.02);
loadPage.addChild(barOuter);

var barInner=new createjs.Shape();
loadPage.addChild(barInner);

queue.on('complete',handleComplete,this);
queue.on('progress',handleProgress,this);
queue.installPlugin(createjs.Sound);
var manifest=[
	{
		id:'ground',
		src:'img/main/ground.png'
	},
	{
		id:'luobo',
		src:'img/main/luobo.png'
	},
	{
		id:'BGM',
		src:'audio/music.mp3'
	}
];
queue.loadManifest(manifest);

function handleProgress(e){
	var pro=Math.floor( (e.progress / e.total)*100 );
	barInner.set({
		graphics:new createjs.Graphics().beginFill("#A760CA").drawRect(canvas.width*0.25,canvas.height*0.8,canvas.width*0.5*pro/100,canvas.height*0.02)
	});
}

function handleComplete(e){
	createjs.Sound.registerSound("audio/music.mp3","BGM");
	createjs.Sound.on('fileload',soundPlay,this);
	function soundPlay(){
		var BGM=createjs.Sound.play('BGM');
		BGM.volume=0.6;
		BGM.loop=1;
	}
	createjs.Ticker.setFPS(30);
	createjs.Tween.get(loadRabber)
	.to({
		y:-canvas.height
	},600,createjs.Ease.backIn)
	.call(function(){
		createjs.Tween.get(loadPage)
		.to({
			alpha:0
		},400)
		.call(function(){
			stage.removeChild(loadPage);
			bootStrap();
		});
	});

}