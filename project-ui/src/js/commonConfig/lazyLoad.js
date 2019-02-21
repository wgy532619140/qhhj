define(function() {
  function Lazyload(ops) {
      this.el = Array.from(document.querySelectorAll(ops.el));
      this.ops = ops;
      this.load();
  };
  (function() {
      this.load = function() {
          //实现图片加载
          //图片距可视区域顶部的距离小于可视区域的高度
          var clientHeight = window.innerHeight;
          var that = this;
          this.el.forEach(function(el) {
              var offset = el.getBoundingClientRect();
              if (offset.top < clientHeight) {
                  var src = el.getAttribute(that.ops.attr); // data-src
                  el.src = src;
              }
          })
      }
  }).call(Lazyload.prototype);
  return Lazyload;
});