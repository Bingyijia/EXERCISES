/*	type: javascript document
 *	author: gxq
 *	time: 20170105
*/

//	清空元素active样式 (对象)
function clearActive (aObj) {
	for (var i=0; i<aObj.length; i++) {
		aObj[i].className = '';
	}
};

//	getStyle 获取样式函数 (对象,属性)
function getStyle (obj,attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,0)[attr];	//	0为兼容firefox低版本
};

//	doMove 位移函数 (对象,属性,步幅,目标点,回调函数)
function doMove (obj,attr,deg,target,endFn) {
	var pos = parseInt(getStyle(obj,attr));
	deg = pos>target ? -deg : deg;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		pos += deg;
		if (pos>target&&deg>0 || pos<target&&deg<0) {
			pos = target;
		}
		obj.style[attr] = pos + 'px';
		if (pos==target) {
			clearInterval(obj.timer);
			endFn&&endFn();
		}
	},30);
};

//	doShake 抖动函数 (对象,属性,回调函数)
function doShake (obj,attr,endFn) {
	if (obj.shaked) {return;}	//	抖动没有停止前无法再次抖动
	obj.shaked = true;
	var pos = parseInt(getStyle(obj,attr));
	var num = -1;
	var doRange = [];	//	抖动范围
	for (var i=20; i>0; i-=2) {
		doRange.push(i,-i);
	}
	doRange.push(0);
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		num++;
		if (num>=doRange.length) {
			clearInterval(obj.timer);
			obj.shaked = false;	//	确保可以再次抖动
			endFn&&endFn();
		}else{
			obj.style[attr] = pos + doRange[num] + 'px';
		}
	},30);

};

//	changeOpacity 改变透明度函数 (对象,目标点,带符号的渐变度,回调函数)
function changeOpacity (obj,target,dir,endFn) {
	if (dir<0) {
		var trans = 100;
		clearInterval(obj.opa);
		obj.opa = setInterval(function(){
			trans += dir;
			if (trans<target) {
				trans = target;
			}
			obj.style.filter = 'alpha( opacity = ' + trans + ')';
			obj.style.opacity = trans/100;
			if (trans == target) {
				clearInterval(obj.opa);
				endFn&&endFn();
			}
		},30);
	}else {
		var trans = 0;
		clearInterval(obj.opa);
		obj.opa = setInterval(function(){
			trans += dir;
			if (trans>target) {
				trans = target;
			}
			obj.style.filter = 'alpha( opacity = ' + trans + ')';
			obj.style.opacity = trans/100;
			if (trans == target) {
				clearInterval(obj.opa);
				endFn&&endFn();
			}
		},30);
	}
}

