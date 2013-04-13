/**
 * jQuery对DOM的拖动
 * 当options存在时，只对option参数中的对应的元素拖动有效，否则对整个div有效
 */
(function($){
	var classTag = "imcDrag";
	var isIE6 = ($.browser.msie && $.browser.version==6.0);  //IE6
	if(isIE6) $('<script type="text/javascript" src="imcDrag.ie6.js"> </script>').appendTo("head");
	$.fn.imcDrag = function(options,startFunc,endFunc){
		this.each(function() {
			$(this).addClass(classTag);
			(options==undefined?$(this):$(this).find(options)).each(function(){
				$(this).mousedown(function(e){
					$.imcDrag.start(e,startFunc,endFunc);
				});
			});
		});
		return this;
	};
	$.imcDrag = {
			start: function(eve,startFunc,endFunc) {
		        if(typeof startFunc== "function")
		          startFunc();
				var pdrag=eve.target;
				if(!$(pdrag).hasClass(classTag)){
					pdrag=$(pdrag).parents('.'+classTag);
					if(pdrag.length==0) return;
					pdrag=pdrag.get(0);
				}
				$.imcDrag.current = { 
						el: pdrag,
						oleft: parseInt(pdrag.style.left) || 0,
						otop: parseInt(pdrag.style.top) || 0,
						ox: eve.pageX || eve.screenX,
						oy: eve.pageY || eve.screenY,
						width:$(pdrag).width(),
						height:$(pdrag).height()
				};
				if($.imcDrag.current.el!=undefined)  $.imcDrag.current.el.style.cursor="move";
				$(document).mouseup(function(e){return $.imcDrag.stop(e,endFunc);});
				$(document).mousemove(function(e){return $.imcDrag.drag(e);});
				
				if (eve.stopPropagation) eve.stopPropagation();
				if (eve.preventDefault) eve.preventDefault();
				return false;
			},
			drag : function(eve) {
				if (!eve)  eve = window.event;
				var current = $.imcDrag.current;
				var left = current.oleft + (eve.pageX || eve.screenX) - current.ox;
				var top = current.otop + (eve.pageY || eve.screenY) - current.oy;
				//left = left>($(window).width()-$.imcDrag.current.width)?($(window).width()-$.imcDrag.current.width):left;
				left = left>0?left:0;
				//top = top>($(window).height()-$.imcDrag.current.height)?($(window).height()-$.imcDrag.current.height):top;
				top = top>0?top:0;
				
				current.el.style.left = left + 'px';
				current.el.style.top = top + 'px';
				if(isIE6) toggleSelect(current); //针对IE6的select在弹出层的上面
                
				if (eve.stopPropagation) eve.stopPropagation();
				if (eve.preventDefault) eve.preventDefault();
				return false;
			},
			stop: function(eve,endFunc) {
				$(document).unbind('mousemove');
				$(document).unbind('mouseup');
				if (eve.stopPropagation) eve.stopPropagation();
				if (eve.preventDefault) eve.preventDefault();
				
				var current = $.imcDrag.current;
				if(current && current.el) current.el.style.cursor="pointer";
				$.imcDrag.current = {};
				if((typeof endFunc).toLowerCase()== "function")
				  endFunc();
				return false;
			}
	};
})(jQuery);
