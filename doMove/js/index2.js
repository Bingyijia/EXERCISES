window.onload = function () {
	var bannerWrapper = document.getElementById('bannerWrapper');
	var leftBtn = document.getElementById('leftBtn');
	var rightBtn = document.getElementById('rightBtn');
	var leftBanner = document.getElementById('leftBanner');
	var centerBanner = document.getElementById('centerBanner');
	var rightBanner = document.getElementById('rightBanner');
	var bannerView = document.getElementById('bannerView');
	var timer;
	var imgIndex = 0;
	var preIndex;
	var nextIndex;
	var imgAmount = 3;
	var json = {
			speed: 50,
			stepSize: 150
		};

	// to show the next banner
	rightBtn.onclick = function () {
		json.startPos = 0;
		json.endPos = -800;
		doMove(json, doNext);
	};

	// to show the previous banner
	leftBtn.onclick = function () {
		json.startPos = -800;
		json.endPos = 0;
		bannerView.style.left = '-800px';
		doPre();
		doMove(json);
	};

	// to set the interval
	timer = setInterval(function () {
		json.startPos = 0;
		json.endPos = -800;
		doMove(json, doNext);
	},5000);

	// to stop the interval
	bannerWrapper.onmouseover = function () {
		clearInterval(timer);
	};

	// to set the interval
	bannerWrapper.onmouseleave = function () {
		timer = setInterval(function () {
			json.startPos = 0;
			json.endPos = -800;
			doMove(json, doNext);
		},5000); 
	}

	// to show the previous banner
	function doPre() {
		rightBanner.src = 'img/龙虾' + imgIndex + '.jpg';
		imgIndex--;
		if (imgIndex < 0) {
			imgIndex = imgAmount -1;
		}

		preIndex = imgIndex;
		leftBanner.src = 'img/龙虾' + preIndex + '.jpg';
		
	}

	// to show the next banner
	function doNext() {
		imgIndex++;
		imgIndex %= imgAmount;
		nextIndex = imgIndex + 1;
		nextIndex %= imgAmount;

		leftBanner.src = 'img/龙虾' + imgIndex + '.jpg';
		rightBanner.src = 'img/龙虾' + nextIndex + '.jpg';
		bannerView.style.left = '0px';
	}

	// to translate the banner
	function doMove(obj,endFn) {
		var startPos = obj.startPos;
		var endPos = obj.endPos;
		var stepSize = obj.stepSize;
		var speed = obj.speed;

		stepSize = (endPos - startPos > 0) ? Math.abs(stepSize) : -Math.abs(stepSize); 

		clearInterval(obj.timer);
		obj.timer = setInterval(function () {
			var pos = parseInt(getStyle(bannerView, 'left')) + stepSize;
			if (pos > endPos && stepSize > 0 || pos < endPos && stepSize < 0) {
				pos = endPos;
			}

			bannerView.style.left = pos + 'px';

			if (pos == endPos) {
				clearInterval(obj.timer);
				endFn && endFn();
			}

		},speed);

	}

	// to get the obj's attr
	function getStyle(obj, attr) {
		return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj,false)[attr];
	}

};