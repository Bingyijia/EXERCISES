function DrawRect(option) {
	this._init(option);
}

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

function DrawCircle(option) {
	this._init(option);
}
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