<?php 
	header("Content-type: text/html; charset=utf-8");
	include_once "db.php";
	//单次处理直接查询请求
	if(isset( $_GET['num'] )){
		echo getRank( $_GET['num'] );
	}
	//处理带表单的查询请求
	if(isset( $_POST['hasData'] )){
		echo getData();
	}
	//获取排名函数
	function getRank( $num ){
		$arr=array('data'=>array());		
		$sql="SELECT `username`,`score` FROM `rb_rank` ORDER BY score desc LIMIT 0,$num"; //按照积分大小顺序获取用户信息
		$rst=mysql_query($sql);
		if($rst){//查询成功
			$arr['error_code']=0;
			while( $res=mysql_fetch_row($rst) ){
				array_push($arr['data'],array(
					'name'=>$res[0],
					'score'=>$res[1]
					)
				);
			}
		}
		else{//查询失败
			$arr['error_code']=-1;
		}
		return json_encode( $arr );
	}
	//获取带请求的数据
	function getData(){
		$arr=array();
		$uname=$_POST['name'];
		$tel=$_POST['tel'];
		$score=$_POST['score'];
		//先查询有木有相关的数据
		$sql="SELECT `score` FROM `rb_rank` WHERE `phone`='$tel' OR `username`='$uname'";
		$rst=mysql_query($sql);
		$res=mysql_fetch_row($rst);
		if($res[0]){
			if($res[0]>=$score){//如果原数据大于传来的数据,不做处理
				$arr['status']='bad';
				$arr['num']=$res[0];
			}
			else{//更新数据,返回update
				$sql="UPDATE `rb_rank` SET `score`=$score WHERE `username`='$uname' OR `phone`='$tel'";
				if(mysql_query($sql)){
					$arr['status']='update';
				}
			}
		}
		else{//插入新用户数据
			$sql="INSERT INTO `rb_rank` (`username`,`score`,`phone`) VALUES('$uname',$score,'$tel')";
			if(mysql_query($sql)){
				$arr['status']='insert';
			}
		}
		return json_encode($arr);
	}
 ?>