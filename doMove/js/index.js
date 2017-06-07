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
			speed: 500,
			stepSize: 91
		};

	rightBtn.onclick = function () {

		json.startPos = 0;
		json.endPos = -800;
		// doNext();
		doMove(json);
		// doNext();
		// bannerView.style.left = 0 + 'px';

	};

	leftBtn.onclick = function () {
		json.startPos = -800;
		json.endPos = 0;

		doMove(json);
	};

	// to show the next banner
	function doNext() {
		imgIndex++;
		imgIndex %= imgAmount;
		nextIndex = imgIndex + 1;
		nextIndex %= imgAmount;

		leftBanner.src = 'img/龙虾' + imgIndex + '.jpg';
		rightBanner.src = 'img/龙虾' + nextIndex + '.jpg';
	}


	// to move the banner 
	function doMove(obj) {
		var speed = obj.speed || 500;
		var startPos = obj.startPos;
		var endPos = obj.endPos;
		var stepSize = obj.stepSize;
		if (endPos - startPos > 0) {
			bannerView.style.left = '-800px';
		}

		var timer = setInterval(function () {
			var pos = parseInt(window.getComputedStyle(bannerView, null).left);
			// stepSize = (endPos - startPos > 0) ? Math.abs(stepSize) : -Math.abs(stepSize);
			// pos += stepSize;

			if (endPos - startPos > 0) {
				bannerView.style.left = '-800px';
				// pos = parseInt(window.getComputedStyle(bannerView, null).left);
				
				pos += stepSize;
				if (pos > endPos) {
					pos = endPos;
					clearInterval(timer);
					bannerView.style.left = pos + 'px';
					doNext();
					// bannerView.style.left =  '0px';
					return;
				}

				bannerView.style.left = pos + 'px';
				console.log(pos);
			} else {
				pos -= stepSize;

				if (pos < endPos) {
					pos = endPos;
					clearInterval(timer);
					bannerView.style.left = pos + 'px';
					doNext();
					bannerView.style.left =  '0px';
					return;
				}

				bannerView.style.left = pos + 'px';
				console.log(pos);
			}
			
		},50);

		


	}


	// console.log(parseInt(window.getComputedStyle(bannerView, null).left));

};