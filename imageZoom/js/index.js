/**
 * @author Bingyijia
 * @date 20161202
 * @fileoverview 本文主要用于实现类似淘宝的主图放大功能
 */

window.onload = function () {
	var oImg = document.getElementById('img');
	var oImgCover = document.getElementById('img_cover');
	var oImgZoom = document.getElementById('img_zoom');
	var oImgBig = document.getElementById('img_big');

	// 鼠标经过放大框显示，放大图片
	oImg.onmouseover = function () {
		oImgCover.style.display = oImgZoom.style.display = 'block';

		//
		oImgCover.style.width = oImg.offsetWidth * oImgZoom.offsetWidth / oImgBig.offsetWidth + 'px';
		oImgCover.style.height = oImg.offsetHeight * oImgZoom.offsetHeight / oImgBig.offsetHeight + 'px';
	}

	// 鼠标移动，放大的图片作出相应的位置改变
	oImg.onmousemove = function (e) {
		var oEvent = e || event;
		var oPos = getOffset(oImg);
		var posX_px = oEvent.clientX - oPos.left - oImgCover.offsetWidth / 2;
		var posY_px = oEvent.clientY - oPos.top - oImgCover.offsetHeight / 2;

		if (posX_px < 0) {
			posX_px = 0;
		}

		if (posX_px > oImg.offsetWidth - oImgCover.offsetWidth) {
			posX_px = oImg.offsetWidth - oImgCover.offsetWidth
		}

		if (posY_px < 0) {
			posY_px = 0
		}

		if (posY_px > oImg.offsetHeight - oImgCover.offsetHeight) {
			posY_px = oImg.offsetHeight - oImgCover.offsetHeight;
		}

		// 为cover层设置定位
		oImgCover.style.left = posX_px + 'px';
		oImgCover.style.top = posY_px + 'px';

		// 为放大图片设置定位	pos-big /oImg.offsetWidth = pos / oImg.offsetWidth 
		oImgBig.style.left = - posX_px / oImg.offsetWidth * oImgBig.offsetWidth + 'px';
		oImgBig.style.top = - posY_px / oImg.offsetHeight * oImgBig.offsetHeight + 'px';
	}

	// 鼠标移出放大框消失
	oImg.onmouseout = function () {
		oImgCover.style.display = oImgZoom.style.display = 'none';
	}

	//	getOffset 获取元素到文档的左边距与上边距 （对象）
	function getOffset(obj) {
		var pos = {'left':0,'top':0};
		while (obj) {
			pos.left += obj.offsetLeft;
			pos.top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return pos;
	}
};