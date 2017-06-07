window.onload = function () {
	var leftBtn = document.getElementById('leftBtn');
	var rightBtn = document.getElementById('rightBtn');
	var leftBanner = document.getElementById('leftBanner');
	var centerBanner = document.getElementById('centerBanner');
	var rightBanner = document.getElementById('rightBanner');
	var bannerView = document.getElementById('bannerView');
	var imgIndex = 0;
	var preIndex;
	var nextIndex;
	var imgAmount = 3;
	var json = {
			speed: 50,
			stepSize: 91
		};

	rightBtn.onclick = function () {
		json.startPos = 0;
		json.endPos = -800;
		doMove(json, doNext);
	};

	leftBtn.onclick = function () {
		json.startPos = -800;
		json.endPos = 0;
		bannerView.style.left = '-800px';
		doPre();
		doMove(json);
	};

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


	// to move the banner 
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

	function getStyle(obj, attr) {
		return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj,false)[attr];
	}


};