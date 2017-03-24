// 绘制矩形构造函数
function DrawRect(option) {
	this._init(option);
}

// 绘制矩形原型
DrawRect.prototype = {
	_init: function (option) {
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.width = +option.width === 0 ? 0 : option.width || 10;
		this.height = +option.height === 0 ? 0 : option.height || 10;
		this.translateX = option.translateX || 0;
		this.translateY = option.translateY || 0;
		this.scaleX = +option.scaleX === 0 ? 0 : option.scaleX || 1;
		this.scaleY = +option.scaleY === 0 ? 0 : option.scaleY || 1;
		this.rotation = option.rotation || 0;
		this.opacity = +option.opacity === 0 ? 0 : option.opacity || 1;
		this.fillStyle = option.fillStyle || '#f00';
	},

	render: function (ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.translate(this.translateX, this.translateY);
		ctx.rotate(this.rotation * Math.PI / 180);
		ctx.globalAlpha = this.opacity;
		ctx.scale(this.scaleX, this.scaleY);
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
	},

	ss: function () {
		console.log(this);
	}
};

// 绘制原型构造函数
function DrawCircle(option) {
	this._init(option);
}

// 绘制圆形原型
DrawCircle.prototype = {
	_init: function (option) {
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.innerRadius = +option.innerRadius === 0 ? 0 : option.innerRadius || 10;
		this.outerRadius = +option.outerRadius === 0 ? 0 : option.outerRadius || 30;
		this.innerFill = option.innerFill || '#f00';
		this.outerFill = option.outerFill || '#0ff';
		this.innerOpacity = +option.innerOpacity === 0 ? 0 : option.innerOpacity || 1;
		this.outerOpacity = +option.outerOpacity === 0 ? 0 : option.outerOpacity || 1;
		this.text = option.text;
		this.fontSize = +option.fontSize === 0 ? 0 : option.fontSize || 18;
		this.fontFill = option.fontFill || '#000';
		this.align = option.algin || 'center';

		this.group = new Konva.Group({
			x: this.x,
			y: this.y
		});

		var innerCircle  = new Konva.Circle({
			x: 0,
			y: 0,
			radius: this.innerRadius,
			fill: this.innerFill,
			opacity: this.innerOpacity
		});

		this.group.add(innerCircle);

		var outerRing = new Konva.Ring({
			x: 0,
			y: 0,
			innerRadius: this.innerRadius,
			outerRadius: this.outerRadius,
			fill: this.outerFill,
			opacity: this.outerOpacity			
		});

		this.group.add(outerRing);

		var centerText = new Konva.Text({
			x: - this.outerRadius,
			y: - this.fontSize / 2,
			width: this.outerRadius * 2,
			text: this.text,
			fontSize: this.fontSize,
			fill: this.fontFill,
			align: this.align
		});

		this.group.add(centerText);
	},

	addToGroupOrLayer: function (arg) {
		arg.add(this.group);
		// console.log(this.group);
		console.log(arg);
	}

};

// 绘制柱状图构造函数
function DrawHistogram(option) {
	this._init(option);
}

// 绘制柱状图原型
DrawHistogram.prototype = {

	// 初始化
	_init: function (option) {
		this.x = +option.x === 0 ? 0 : option.x || window.innerWidth / 2;
		this.y = +option.y === 0 ? 0 : option.y || window.innerHeight / 2;
		this.width = +option.width === 0 ? 0 : option.width || 10; 
		this.height = +option.height === 0 ? 0 : option.height || 10; 
		this.data = option.data || [];
		this.rotation = option.rotation || 0;
		this.cornerRadius = option.cornerRadius || 0;
		this.baseLineColor = option.baseLineColor || '#f00';
		this.fontSize = +option.fontSize === 0 ? 0 : option.fontSize || 16;
		this.duration = +option.duration === 0 ? 0 : option.duration || .5;

		// 一级组
		this.group = new Konva.Group({
			x: this.x,
			y: this.y
		});

		// 二级组-柱状图
		this.rectGroup = new Konva.Group({
			x: 0,
			y: 0
		});
		this.group.add(this.rectGroup);

		// 二级组-百分比文字
		this.percentTextGroup = new Konva.Group({
			x: 0,
			y: 0
		});
		this.group.add(this.percentTextGroup);
		
		// 矩形柱占位宽（ 前空 + 矩形柱 + 后空 ） = 整体宽度 / 矩形柱的个数
		var rectBoxWidth = this.width / this.data.length;
		var _this = this;

		// 循环绘制图形
		this.data.forEach(function (item, index) {

			// 创建矩形柱
			var rect = new Konva.Rect({
				x: (1 / 4 + index) * rectBoxWidth,
				y: - item.value * _this.height,
				width: rectBoxWidth / 2,
				height: item.value * _this.height,
				fill: item.color,
				cornerRadius: _this.cornerRadius
			});
			_this.rectGroup.add(rect);

			// 创建百分比文字
			var percentText = new Konva.Text({
				x: index * rectBoxWidth,
				y: - item.value * _this.height - 16,
				width: rectBoxWidth,
				text: item.value * 100 + '%',
				fill: item.color,
				fontSize: 16,
				align: 'center'
			});
			_this.percentTextGroup.add(percentText);

			//创建名称文字
			var nameText = new Konva.Text({
				x: index * rectBoxWidth,
				y: 0,
				fill: item.color,
				rotation: _this.rotation
			});
			_this.group.add(nameText);
		});

		// 绘制基线
		var baseLine = new Konva.Line({
			points: [0, 0, this.width, 0],
			stroke: this.baseLineColor,
			strokeWidth: 2
		});
		this.group.add(baseLine);
	},

	// 将创建的图形添加到组或者图形
	addToGroupOrLayer: function (arg) {
		arg.add(this.group);
	},

	// 点击内容区域，高度发生变化
	doAnimate: function () {
		var _this = this

		//  矩形柱动画：先改变矩形柱的 height = 0， y = 0
		this.rectGroup.getChildren().each(function (item, index) {
			item.y(0);
			item.height(0);

			// 再将height与复原
			item.to({
				y: - _this.data[index].value * _this.height,
				height: _this.data[index].value * _this.height,
				duration: _this.duration
			});
		});

		//  百分比文字动画：先改变百分比文字的 y = 字体高度
		this.percentTextGroup.getChildren().each(function (item, index) {
			item.y(- _this.fontSize);

			// 在将 y 复原
			item.to({
				y: - _this.data[index].value * _this.height - 16,
				duration: _this.duration
			});
		});
	}
};

//绘制饼状图构造函数
function DrawPieChart(option) {
	this._init(option);
}

//绘制饼状图原型
DrawPieChart.prototype = {

	// 初始化
	_init: function (option) {
		this.x = +option.x === 0 ? 0 : option.x || window.innerWidth / 2;
		this.y = +option.y === 0 ? 0 : option.y || window.innerHeight / 2;
		this.radius = +option.radius === 0 ? 0 : option.radius || 100;
		this.data = option.data || [];
		this.duration = +option.duration === 0 ? 0 : option.duration || 1;

		this.wedgeGroup = new Konva.Group({
			x: this.x,
			y: this.y
		});

		this.textGroup = new Konva.Group({
			x: this.x,
			y: this.y
		});

		var _this  = this;
		var tempAngle = - 90;
		this.data.forEach(function (item, index) {

			// 创建饼状图
			var wedge = new Konva.Wedge({
				x: 0,
				y: 0,
				radius: _this.radius,
				angle: item.value * 360,
				fill: item.color,
				rotation: tempAngle
			});

			_this.wedgeGroup.add(wedge);

			// 创建说明文字
			var textAngle = tempAngle + item.value * 180;
			var text = new Konva.Text({
				x: (_this.radius + 10) * Math.cos(textAngle * Math.PI / 180),
				y: (_this.radius + 10) * Math.sin(textAngle * Math.PI / 180),
				text: item.value * 100 + '%',
				fill: item.color
			});

			// 修正文字水平方向
			if (textAngle > 90 && textAngle < 270) {
				text.x(text.x() - text.getWidth());
			}

			// 修正文字垂直方向
			if (textAngle > 180 || textAngle < 0) {
				text.y(text.y() - text.getHeight());
			}

			_this.textGroup.add(text);
			tempAngle += item.value * 360;

		});
	},

	// 添加到图层或组
	addToGroupOrLayer: function (arg) {
		arg.add(this.wedgeGroup);
		arg.add(this.textGroup);
	},

	// 动画操作
	doAnimate: function () {
		var _this = this;
		var itemIndex = 0;

		// 清空图形
		this.wedgeGroup.getChildren().each(function (item, index) {
			item.angle(0);
		});

		(function recursion() {
			var item = _this.wedgeGroup.getChildren()[itemIndex];
			item.to({
				angle: _this.data[itemIndex].value * 360,
				duration: _this.data[itemIndex].value * _this.duration,
				onFinish: function () {
					itemIndex++;

					if (itemIndex === _this.data.length) {
						return;
					}

					return recursion();
				}
			});
		})();

	}
};