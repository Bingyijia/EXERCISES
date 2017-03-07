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

	// 鼠标经过事件
	oImg.onmouseover = function () {
		oImgCover.style.display = 'block';
		oImgZoom.style.display = 'block';

		oImgCover.style.width = oImg.offsetWidth * oImgZoom.offsetWidth / oImgBig.offsetWidth + 'px';
		oImgCover.style.height = oImg.offsetWidth * oImgZoom.offsetWidth / oImgBig.offsetWidth + 'px';
	}

	// 鼠标移出事件
	oImg.onmouseout = function () {
		oImgCover.style.display = 'none';
		oImgZoom.style.display = 'none';
	}
};