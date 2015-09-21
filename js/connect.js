/*
*与后台的通信js
*/
var data=[];
getRanks();

/*
*表单相关
*/
var clickEvent="ontouchstart" in document.documentElement ? "tap" : "click";
var reTel=/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
var jsonData={};
$("#smtBtn").on(clickEvent,function(){
	jsonData.name=$("#username").val();
	jsonData.tel=$("#tel").val();
	jsonData.score=score;
	if( $.trim(jsonData.name)=="" || $.trim(jsonData.tel)=="" ){
		alert('昵称与电话不能留空哦!');
		return false;
	}
	else if( !reTel.test( $.trim(jsonData.tel) ) ){
		alert('请填写正确的手机号码');
		return false;
	}
	else {
		/*ajax*/
		$(".form-wrap").animate({
			'top':'-100%'
		},400,function(){
			$(".form-wrap").hide().css('top','0').removeClass('rotateIn');
			getRanks(jsonData);
		});

	}

});

/*
*更新排名数据的函数
*/
function getRanks(json){
	data=[];
	json= json || {};
	if(json.name){//有请求数据,处理方式为,将用户信息传给后台后,获取最新排名,然后更新数据
		json.hasData=true;
		$.post('rank.php',json,function(ajaxData){
			console.log(ajaxData);
			//如果返回的status='update',表示用户数据已存在,并且已刷新
			//status='bad',表示用户数据已存在,并且当前数据并非最高纪录,不做处理
			//status='insert',表示已经插入了新的用户数据,并参与排名。
		});
	}
	else{//没有请求数据,直接拉取数据库中的现有排名
		$.getJSON('rank.php',{num:10},function(ajaxData){
			if(ajaxData.error_code==0){//数据传递成功
				for(var i=0;i<ajaxData.data.length;i++){
					data.push({
						name:ajaxData.data[i].name,
						score:ajaxData.data[i].score,
						rank:i+1
					});
				}
				updateData();
			}
		});
	}
}