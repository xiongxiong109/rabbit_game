<?php 
	mysql_connect('localhost','root','') or die ('数据库连接失败');
	mysql_select_db('rabbit_rank') or die ('数据库选择失败');
	mysql_query('set names utf8');
 ?>