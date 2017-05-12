function CarouselBanner(obj) {
	// the url
	var aUrl = obj.url;
	// the src
	var aImg = obj.src;
	// the link element
	var bannerLink = document.getElementById(obj.bannerLink);
	// the img element    
	var bannerImg = document.getElementById(obj.bannerImg);
	// the left arrrow element 
	var leftArrow = document.getElementById(obj.leftArrow);
	// the right arrow element
	var rightArrow = document.getElementById(obj.rightArrow);
	// the preview circles
	var aLi = document.getElementById(obj.previewCircle).getElementsByTagName('li');
	// var aLi = obj.aLi;
	// the module element
	var wrapper = document.getElementById(obj.wrapper);
	// the speed of the CarouselBanner
	var speed = obj.speed;
	// the index of the CarouselBanner
	var index;
	// the timer;
	var timer;
	// var i;

	// init the module
	index = 0;
	doInit();
	setTimer();

	// to stop the CarouselBanner when the mouse hovers the module
	wrapper.onmouseover = function () {
		clearInterval(timer);
	};

	// to run the CarouselBanner whwn the mouse leaves the module
	wrapper.onmouseout = function () {
		setTimer();
	};

	// click the left arrow to get the preview banner
	leftArrow.onclick = function () {
		if (index === 0) {
			index = 3;
		} else {
			index--;
		}

		doInit();
	};

	// click the right arrow to get  the next banner 
	rightArrow.onclick = function () {
		doNext();
	};

	// click the preview circles to change the banner
	(function doChange() {
		var i;
		for (i = 0; i < aLi.length; i++) {
			aLi[i].index = i;
			aLi[i].onclick = function () {
				index = this.index;
				doInit();
			};
		}
	})();

	//  change the banner
	function doInit() {
		var i;
		bannerLink.href = aUrl[index];
		bannerImg.src = aImg[index];

		for (i = 0; i < aLi.length; i++) {
			aLi[i].className = '';
		}

		aLi[index].className = 'active'; 
	}

	// to show the next banner
	function doNext() {
		if (index < 3) {
			index++;
		} else {
			index %= 3;
		}

		doInit();
	}

	// set the timer
	function setTimer() {
		timer = setInterval(doNext, speed);
	}




};
