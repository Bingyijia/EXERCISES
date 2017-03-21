 // 构造函数Draw
  function Draw(option) {
    this._init(option);
  }

  Draw.prototype = {
    // 初始化
    _init: function (option) {
      this.imgSrc = option.imgSrc;
      this.fps = ~~option.fps === 0 ? 0 : option.fps || 10;
      this.frameIndex = option.frameIndex || 0;
      this.dirIndex = option.dirIndex || 0;
      this.sx = option.sx || 0;
      this.sy = option.sy || 0;
      this.sWidth = ~~option.sWidth === 0 ? 0 : option.sWidth || 40;
      this.sHeight = ~~option.sHeight === 0 ? 0 : option.sWidth || 65;
      this.dx = option.dx || 0;
      this.dy = option.dy || 0;
      this.dWidth = ~~option.dWidth === 0 ? 0 : option.dWidth || 40;
      this.dHeight = ~~option.dHeight === 0 ? 0 : option.dHeight || 65;
    },

    // 渲染方法
    render: function (ctx) {
      var _this = this;
      var frameIndex = 0;
      var img = new Image();
      img.src = _this.imgSrc;
      img.onload = function () {
        setInterval(function () {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.drawImage(
            img,
            _this.sx * frameIndex, _this.sy * _this.dirIndex,
            _this.sWidth, _this.sHeight,
            _this.dx, _this.dy,
            _this.sWidth, _this.dHeight
          );

          frameIndex++;
          frameIndex %= 4;
        }, 1000 / _this.fps);
      }
    }

  };