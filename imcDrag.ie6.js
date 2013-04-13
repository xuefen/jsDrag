//针对IE6的js
$("select:visible").addClass("iniShow"); //ie6下面默认显示的select
	 
//检查四个点级成的两条线是否交叉(point直线1的起始位置，len直线1的长度；bPoint直线2的起始位置，bLen直线2的长度)
function inLine(point,bPoint,len,bLen){
	return (function(between){ 
		       return between(point +len,bPoint ,bLen)|| between(point ,bPoint ,bLen);
		   })(function(check,low,range){//检查点是否在某一条直线内部
			   return check>low && check<(low+range);
		   });
}
function toggleSelect(current){
	$("select.iniShow").each(function(){
		var offset = $(this).offset();
		var width  = $(this).width();
		var height = $(this).height();
		
		var boxOffset = $(current.el).offset();
		var boxwidth  = $(current.el).width();
		var boxheight = $(current.el).height();
		
		//如果 select与current.el 有重叠
		if( inLine(offset.top,boxOffset.top,height,boxheight) && inLine(offset.left,boxOffset.left,width,boxwidth))
			$(this).css("visibility","hidden");
		else
			$(this).css("visibility","visible");
	});
}