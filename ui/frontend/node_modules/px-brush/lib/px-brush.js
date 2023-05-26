(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("px-brush", [], factory);
	else if(typeof exports === 'object')
		exports["px-brush"] = factory();
	else
		root["px-brush"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/PxBrush.js":
/*!************************!*\
  !*** ./src/PxBrush.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PxBrush; });
/* harmony import */ var _StampMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StampMaker */ "./src/StampMaker.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var PxBrush =
/*#__PURE__*/
function () {
  function PxBrush(canvas) {
    _classCallCheck(this, PxBrush);

    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.stampMaker = new _StampMaker__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.configPixelRatio();
  }

  _createClass(PxBrush, [{
    key: "configPixelRatio",
    value: function configPixelRatio() {
      var _this$canvas = this.canvas,
          width = _this$canvas.width,
          height = _this$canvas.height;
      this.canvas.width = width * this.dpr;
      this.canvas.height = height * this.dpr;
      this.canvas.style.width = "".concat(width, "px");
      this.canvas.style.height = "".concat(height, "px");
      this.context.scale(this.dpr, this.dpr);
      this.context.imageSmoothingEnabled = false;
    }
  }, {
    key: "exportAsPNG",
    value: function exportAsPNG(fileName) {
      var _this = this;

      return new Promise(function (resolve) {
        var resultCanvas = document.createElement('canvas');
        var resultContext = resultCanvas.getContext('2d');
        var _this$canvas2 = _this.canvas,
            width = _this$canvas2.width,
            height = _this$canvas2.height;
        var reducedWidth = width / _this.dpr;
        var reducedHeight = height / _this.dpr;
        resultCanvas.width = reducedWidth;
        resultCanvas.height = reducedHeight;
        resultContext.imageSmoothingEnabled = false;
        resultContext.drawImage(_this.canvas, 0, 0, width, height, 0, 0, reducedWidth, reducedHeight);
        resultCanvas.toBlob(function (blob) {
          blob.lastModifedDate = new Date();
          blob.name = fileName;
          resolve(blob);
        });
      });
    }
  }, {
    key: "distanceBetween",
    value: function distanceBetween(point1, point2) {
      return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
  }, {
    key: "angleBetween",
    value: function angleBetween(point1, point2) {
      return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }
  }, {
    key: "draw",
    value: function draw(_ref) {
      var from = _ref.from,
          to = _ref.to,
          size = _ref.size,
          color = _ref.color;
      this.context.globalCompositeOperation = 'source-over';
      this.brush({
        from: from,
        to: to,
        size: size,
        color: color
      });
    }
  }, {
    key: "erase",
    value: function erase(_ref2) {
      var from = _ref2.from,
          to = _ref2.to,
          size = _ref2.size;
      this.context.globalCompositeOperation = 'destination-out';
      this.brush({
        from: from,
        to: to,
        size: size,
        color: '#000000'
      });
    }
  }, {
    key: "brush",
    value: function brush(_ref3) {
      var _this2 = this;

      var from = _ref3.from,
          to = _ref3.to,
          size = _ref3.size,
          color = _ref3.color;
      var halfSize = (size - size % 2) / 2;
      var stamp = this.stampMaker.make({
        size: size,
        color: color
      });

      if (from.x === to.x && from.y === to.y) {
        var x = from.x - halfSize;
        var y = from.y - halfSize;
        this.context.drawImage(stamp, Math.round(x), Math.round(y), size, size);
        return;
      }

      var dist = this.distanceBetween(from, to);
      var angle = this.angleBetween(from, to);

      var _loop = function _loop(i) {
        var x = from.x + Math.sin(angle) * i - halfSize;
        var y = from.y + Math.cos(angle) * i - halfSize;
        window.requestAnimationFrame(function () {
          _this2.context.drawImage(stamp, Math.round(x), Math.round(y), size, size);
        });
      };

      for (var i = 0; i < dist; i += 1) {
        _loop(i);
      }
    }
  }, {
    key: "dpr",
    get: function get() {
      return window.devicePixelRatio || 1;
    }
  }]);

  return PxBrush;
}();



/***/ }),

/***/ "./src/StampMaker.js":
/*!***************************!*\
  !*** ./src/StampMaker.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StampMaker; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HexPattern = /^#?[0-9A-Fa-f]{1,2}[0-9A-Fa-f]{1,2}[0-9A-Fa-f]{1,2}$/;
var RGBPattern = /^rgb\((\s+)?[0-9]{1,3},(\s+)?[0-9]{1,3},(\s+)?[0-9]{1,3}(\s+)?\)$/;

var StampMaker =
/*#__PURE__*/
function () {
  function StampMaker() {
    _classCallCheck(this, StampMaker);

    this.canvases = {};
  }

  _createClass(StampMaker, [{
    key: "parseColor",
    value: function parseColor(color) {
      var isHex = HexPattern.test(color);
      var isRGB = RGBPattern.test(color);

      if (!isHex && !isRGB) {
        throw new Error('Color is not correct format. #123123 or rgb(123, 123, 123) format required.');
      }

      if (isHex) {
        var c = color[0] === '#' ? color.slice(1) : color;
        c = c.length === 3 ? c.split('').reduce(function (acc, it) {
          return [].concat(_toConsumableArray(acc), [it, it]);
        }, []).join('') : c;
        var r = parseInt(c.slice(0, 2), 16);
        var g = parseInt(c.slice(2, 4), 16);
        var b = parseInt(c.slice(4, 6), 16);
        return {
          r: r,
          g: g,
          b: b
        };
      }

      if (isRGB) {
        var _color$replace$split$ = color.replace(/rgb|\s+|\(|\)/g, '').split(',').map(function (it) {
          return parseInt(it);
        }),
            _color$replace$split$2 = _slicedToArray(_color$replace$split$, 3),
            _r = _color$replace$split$2[0],
            _g = _color$replace$split$2[1],
            _b = _color$replace$split$2[2];

        _r = _r > 255 ? 255 : _r;
        _g = _g > 255 ? 255 : _g;
        _b = _b > 255 ? 255 : _b;
        return {
          r: _r,
          g: _g,
          b: _b
        };
      }
    }
  }, {
    key: "make",
    value: function make(_ref) {
      var size = _ref.size,
          color = _ref.color;

      try {
        size = size * window.devicePixelRatio;

        var _color = this.parseColor(color);

        var _strColor = JSON.stringify(_color);

        this.canvases[_strColor] = this.canvases[_strColor] || {};

        if (this.canvases[_strColor][size] != null) {
          return this.canvases[_strColor][size];
        }

        var canvas = document.createElement('canvas');
        size = size + size % 2;
        canvas.width = size;
        canvas.height = size;
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(size, size);

        for (var i = 0; i < imageData.data.length; i += 4) {
          imageData.data[i] = 255;
          imageData.data[i + 1] = 255;
          imageData.data[i + 2] = 255;
          imageData.data[i + 3] = 0;
        }

        this.plotCircle(size * 2, size * 4 * (size / 2), size / 2, imageData, size, _color);
        this.fillCircle(imageData, _color);
        context.putImageData(imageData, 0, 0);
        this.canvases[_strColor][size] = canvas;
        return canvas;
      } catch (err) {
        console.error(err);
      }
    }
  }, {
    key: "plotCircle",
    value: function plotCircle(xm, ym, r, imageData, size, color) {
      var x = -r;
      var y = 0;
      var err = 2 - 2 * r;
      /* bottom left to top right */

      do {
        /*   I. Quadrant +x +y */
        var i = xm - (x + 1) * 4 + (ym + (y - 1) * (size * 4));
        imageData.data[i + 0] = color.r;
        imageData.data[i + 1] = color.g;
        imageData.data[i + 2] = color.b;
        imageData.data[i + 3] = 255;
        /*  II. Quadrant -x +y */

        var ii = xm - y * (size * 4) + (ym - (x + 1) * 4);
        imageData.data[ii + 0] = color.r;
        imageData.data[ii + 1] = color.g;
        imageData.data[ii + 2] = color.b;
        imageData.data[ii + 3] = 255;
        /* III. Quadrant -x -y */

        var iii = xm + x * 4 + (ym - y * (size * 4));
        imageData.data[iii + 0] = color.r;
        imageData.data[iii + 1] = color.g;
        imageData.data[iii + 2] = color.b;
        imageData.data[iii + 3] = 255;
        /*  IV. Quadrant +x -y */

        var iv = xm + (y - 1) * (size * 4) + (ym + x * 4);
        imageData.data[iv + 0] = color.r;
        imageData.data[iv + 1] = color.g;
        imageData.data[iv + 2] = color.b;
        imageData.data[iv + 3] = 255;
        r = err;

        if (r <= y) {
          err += ++y * 2 + 1;
          /* y step */
        }

        if (r > x || err > y) {
          err += ++x * 2 + 1;
          /* x step */
        }
      } while (x < 0);
    }
  }, {
    key: "fillCircle",
    value: function fillCircle(imageData, color) {
      var cols = imageData.width * 4;

      for (var row = 1; row < imageData.height - 1; row += 1) {
        var isHitColor = false;
        var isHitClear = false;
        var isEnded = false;

        for (var col = 0; col < cols; col += 4) {
          var index = cols * row + col;
          var alpha = imageData.data[index + 3];
          var isColor = alpha === 255;
          var isClear = alpha === 0;

          if (isColor && !isHitColor) {
            isHitColor = true;
          } else if (isClear && isHitColor) {
            isHitClear = true;
          } else if (isColor && isHitColor && isHitClear) {
            isEnded = true;
          }

          if (isHitColor && isHitClear && !isEnded) {
            imageData.data[index] = color.r;
            imageData.data[index + 1] = color.g;
            imageData.data[index + 2] = color.b;
            imageData.data[index + 3] = 255;
          }
        }
      }
    }
  }]);

  return StampMaker;
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PxBrush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PxBrush */ "./src/PxBrush.js");

/* harmony default export */ __webpack_exports__["default"] = (_PxBrush__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9weC1icnVzaC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vcHgtYnJ1c2gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHgtYnJ1c2gvLi9zcmMvUHhCcnVzaC5qcyIsIndlYnBhY2s6Ly9weC1icnVzaC8uL3NyYy9TdGFtcE1ha2VyLmpzIiwid2VicGFjazovL3B4LWJydXNoLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlB4QnJ1c2giLCJjYW52YXMiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInN0YW1wTWFrZXIiLCJTdGFtcE1ha2VyIiwiY29uZmlnUGl4ZWxSYXRpbyIsIndpZHRoIiwiaGVpZ2h0IiwiZHByIiwic3R5bGUiLCJzY2FsZSIsImltYWdlU21vb3RoaW5nRW5hYmxlZCIsImZpbGVOYW1lIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZXN1bHRDYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJyZXN1bHRDb250ZXh0IiwicmVkdWNlZFdpZHRoIiwicmVkdWNlZEhlaWdodCIsImRyYXdJbWFnZSIsInRvQmxvYiIsImJsb2IiLCJsYXN0TW9kaWZlZERhdGUiLCJEYXRlIiwibmFtZSIsInBvaW50MSIsInBvaW50MiIsIk1hdGgiLCJzcXJ0IiwicG93IiwieCIsInkiLCJhdGFuMiIsImZyb20iLCJ0byIsInNpemUiLCJjb2xvciIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImJydXNoIiwiaGFsZlNpemUiLCJzdGFtcCIsIm1ha2UiLCJyb3VuZCIsImRpc3QiLCJkaXN0YW5jZUJldHdlZW4iLCJhbmdsZSIsImFuZ2xlQmV0d2VlbiIsImkiLCJzaW4iLCJjb3MiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJkZXZpY2VQaXhlbFJhdGlvIiwiSGV4UGF0dGVybiIsIlJHQlBhdHRlcm4iLCJjYW52YXNlcyIsImlzSGV4IiwidGVzdCIsImlzUkdCIiwiRXJyb3IiLCJjIiwic2xpY2UiLCJsZW5ndGgiLCJzcGxpdCIsInJlZHVjZSIsImFjYyIsIml0Iiwiam9pbiIsInIiLCJwYXJzZUludCIsImciLCJiIiwicmVwbGFjZSIsIm1hcCIsIl9jb2xvciIsInBhcnNlQ29sb3IiLCJfc3RyQ29sb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiaW1hZ2VEYXRhIiwiY3JlYXRlSW1hZ2VEYXRhIiwiZGF0YSIsInBsb3RDaXJjbGUiLCJmaWxsQ2lyY2xlIiwicHV0SW1hZ2VEYXRhIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwieG0iLCJ5bSIsImlpIiwiaWlpIiwiaXYiLCJjb2xzIiwicm93IiwiaXNIaXRDb2xvciIsImlzSGl0Q2xlYXIiLCJpc0VuZGVkIiwiY29sIiwiaW5kZXgiLCJhbHBoYSIsImlzQ29sb3IiLCJpc0NsZWFyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUEr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QyxDQUFsQztBQUNBUSxxQkFBUyxDQUFDRSxJQUFWLENBQWVrQixLQUFLLEdBQUcsQ0FBdkIsSUFBNEIsR0FBNUI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdklIO0FBQUE7QUFBQTtBQUNldEcsK0dBQWYsRSIsImZpbGUiOiJweC1icnVzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwicHgtYnJ1c2hcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicHgtYnJ1c2hcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wicHgtYnJ1c2hcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgU3RhbXBNYWtlciBmcm9tICcuL1N0YW1wTWFrZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB4QnJ1c2gge1xuICBjb25zdHJ1Y3RvciAoY2FudmFzKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHRoaXMuc3RhbXBNYWtlciA9IG5ldyBTdGFtcE1ha2VyKClcbiAgICB0aGlzLmNvbmZpZ1BpeGVsUmF0aW8oKVxuICB9XG5cbiAgZ2V0IGRwciAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDFcbiAgfVxuXG4gIGNvbmZpZ1BpeGVsUmF0aW8gKCkge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5jYW52YXNcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoICogdGhpcy5kcHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiB0aGlzLmRwclxuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgXG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YFxuICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLmRwciwgdGhpcy5kcHIpXG4gICAgdGhpcy5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICBleHBvcnRBc1BORyAoZmlsZU5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCByZXN1bHRDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgY29uc3QgcmVzdWx0Q29udGV4dCA9IHJlc3VsdENhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuY2FudmFzXG4gICAgICBjb25zdCByZWR1Y2VkV2lkdGggPSB3aWR0aCAvIHRoaXMuZHByXG4gICAgICBjb25zdCByZWR1Y2VkSGVpZ2h0ID0gaGVpZ2h0IC8gdGhpcy5kcHJcbiAgICAgIHJlc3VsdENhbnZhcy53aWR0aCA9IHJlZHVjZWRXaWR0aFxuICAgICAgcmVzdWx0Q2FudmFzLmhlaWdodCA9IHJlZHVjZWRIZWlnaHRcbiAgICAgIHJlc3VsdENvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2VcbiAgICAgIHJlc3VsdENvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmNhbnZhcyxcbiAgICAgICAgMCwgMCwgd2lkdGgsIGhlaWdodCxcbiAgICAgICAgMCwgMCwgcmVkdWNlZFdpZHRoLCByZWR1Y2VkSGVpZ2h0XG4gICAgICApXG4gICAgICByZXN1bHRDYW52YXMudG9CbG9iKGJsb2IgPT4ge1xuICAgICAgICBibG9iLmxhc3RNb2RpZmVkRGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgICAgYmxvYi5uYW1lID0gZmlsZU5hbWVcbiAgICAgICAgcmVzb2x2ZShibG9iKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZGlzdGFuY2VCZXR3ZWVuIChwb2ludDEsIHBvaW50Mikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyLnggLSBwb2ludDEueCwgMikgKyBNYXRoLnBvdyhwb2ludDIueSAtIHBvaW50MS55LCAyKSlcbiAgfVxuXG4gIGFuZ2xlQmV0d2VlbiAocG9pbnQxLCBwb2ludDIpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMihwb2ludDIueCAtIHBvaW50MS54LCBwb2ludDIueSAtIHBvaW50MS55KVxuICB9XG5cbiAgZHJhdyAoeyBmcm9tLCB0bywgc2l6ZSwgY29sb3IgfSkge1xuICAgIHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInXG4gICAgdGhpcy5icnVzaCh7IGZyb20sIHRvLCBzaXplLCBjb2xvciB9KVxuICB9XG5cbiAgZXJhc2UgKHsgZnJvbSwgdG8sIHNpemUgfSkge1xuICAgIHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0J1xuICAgIHRoaXMuYnJ1c2goeyBmcm9tLCB0bywgc2l6ZSwgY29sb3I6ICcjMDAwMDAwJyB9KVxuICB9XG5cbiAgYnJ1c2ggKHsgZnJvbSwgdG8sIHNpemUsIGNvbG9yIH0pIHtcbiAgICBjb25zdCBoYWxmU2l6ZSA9IChzaXplIC0gKHNpemUgJSAyKSkgLyAyXG4gICAgY29uc3Qgc3RhbXAgPSB0aGlzLnN0YW1wTWFrZXIubWFrZSh7IHNpemUsIGNvbG9yIH0pXG4gICAgaWYgKGZyb20ueCA9PT0gdG8ueCAmJiBmcm9tLnkgPT09IHRvLnkpIHtcbiAgICAgIGNvbnN0IHggPSBmcm9tLnggLSBoYWxmU2l6ZVxuICAgICAgY29uc3QgeSA9IGZyb20ueSAtIGhhbGZTaXplXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHN0YW1wLCBNYXRoLnJvdW5kKHgpLCBNYXRoLnJvdW5kKHkpLCBzaXplLCBzaXplKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGRpc3QgPSB0aGlzLmRpc3RhbmNlQmV0d2Vlbihmcm9tLCB0bylcbiAgICBjb25zdCBhbmdsZSA9IHRoaXMuYW5nbGVCZXR3ZWVuKGZyb20sIHRvKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzdDsgaSArPSAxKSB7XG4gICAgICBjb25zdCB4ID0gZnJvbS54ICsgKE1hdGguc2luKGFuZ2xlKSAqIGkpIC0gaGFsZlNpemVcbiAgICAgIGNvbnN0IHkgPSBmcm9tLnkgKyAoTWF0aC5jb3MoYW5nbGUpICogaSkgLSBoYWxmU2l6ZVxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2Uoc3RhbXAsIE1hdGgucm91bmQoeCksIE1hdGgucm91bmQoeSksIHNpemUsIHNpemUpXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIiwiY29uc3QgSGV4UGF0dGVybiA9IC9eIz9bMC05QS1GYS1mXXsxLDJ9WzAtOUEtRmEtZl17MSwyfVswLTlBLUZhLWZdezEsMn0kL1xuY29uc3QgUkdCUGF0dGVybiA9IC9ecmdiXFwoKFxccyspP1swLTldezEsM30sKFxccyspP1swLTldezEsM30sKFxccyspP1swLTldezEsM30oXFxzKyk/XFwpJC9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbXBNYWtlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmNhbnZhc2VzID0ge31cbiAgfVxuXG4gIHBhcnNlQ29sb3IgKGNvbG9yKSB7XG4gICAgY29uc3QgaXNIZXggPSBIZXhQYXR0ZXJuLnRlc3QoY29sb3IpXG4gICAgY29uc3QgaXNSR0IgPSBSR0JQYXR0ZXJuLnRlc3QoY29sb3IpXG4gICAgaWYgKCFpc0hleCAmJiAhaXNSR0IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29sb3IgaXMgbm90IGNvcnJlY3QgZm9ybWF0LiAjMTIzMTIzIG9yIHJnYigxMjMsIDEyMywgMTIzKSBmb3JtYXQgcmVxdWlyZWQuJylcbiAgICB9XG4gICAgaWYgKGlzSGV4KSB7XG4gICAgICBsZXQgYyA9IGNvbG9yWzBdID09PSAnIycgPyBjb2xvci5zbGljZSgxKSA6IGNvbG9yXG4gICAgICBjID0gYy5sZW5ndGggPT09IDNcbiAgICAgICAgPyBjLnNwbGl0KCcnKS5yZWR1Y2UoKGFjYywgaXQpID0+IFsuLi5hY2MsIGl0LCBpdF0sIFtdKS5qb2luKCcnKVxuICAgICAgICA6IGNcbiAgICAgIGNvbnN0IHIgPSBwYXJzZUludChjLnNsaWNlKDAsIDIpLCAxNilcbiAgICAgIGNvbnN0IGcgPSBwYXJzZUludChjLnNsaWNlKDIsIDQpLCAxNilcbiAgICAgIGNvbnN0IGIgPSBwYXJzZUludChjLnNsaWNlKDQsIDYpLCAxNilcbiAgICAgIHJldHVybiB7IHIsIGcsIGIgfVxuICAgIH1cbiAgICBpZiAoaXNSR0IpIHtcbiAgICAgIGxldCBbciwgZywgYl0gPSBjb2xvclxuICAgICAgICAucmVwbGFjZSgvcmdifFxccyt8XFwofFxcKS9nLCAnJylcbiAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcChpdCA9PiBwYXJzZUludChpdCkpXG4gICAgICByID0gciA+IDI1NSA/IDI1NSA6IHJcbiAgICAgIGcgPSBnID4gMjU1ID8gMjU1IDogZ1xuICAgICAgYiA9IGIgPiAyNTUgPyAyNTUgOiBiXG4gICAgICByZXR1cm4geyByLCBnLCBiIH1cbiAgICB9XG4gIH1cblxuICBtYWtlICh7IHNpemUsIGNvbG9yIH0pIHtcbiAgICB0cnkge1xuICAgICAgc2l6ZSA9IHNpemUgKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xuICAgICAgY29uc3QgX2NvbG9yID0gdGhpcy5wYXJzZUNvbG9yKGNvbG9yKVxuICAgICAgY29uc3QgX3N0ckNvbG9yID0gSlNPTi5zdHJpbmdpZnkoX2NvbG9yKVxuICAgICAgdGhpcy5jYW52YXNlc1tfc3RyQ29sb3JdID0gdGhpcy5jYW52YXNlc1tfc3RyQ29sb3JdIHx8IHt9XG5cbiAgICAgIGlmICh0aGlzLmNhbnZhc2VzW19zdHJDb2xvcl1bc2l6ZV0gIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXNlc1tfc3RyQ29sb3JdW3NpemVdXG4gICAgICB9XG4gICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgc2l6ZSA9IHNpemUgKyAoc2l6ZSAlIDIpXG4gICAgICBjYW52YXMud2lkdGggPSBzaXplXG4gICAgICBjYW52YXMuaGVpZ2h0ID0gc2l6ZVxuXG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICAgIGNvbnN0IGltYWdlRGF0YSA9IGNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHNpemUsIHNpemUpXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlRGF0YS5kYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIGltYWdlRGF0YS5kYXRhW2ldID0gMjU1XG4gICAgICAgIGltYWdlRGF0YS5kYXRhW2kgKyAxXSA9IDI1NVxuICAgICAgICBpbWFnZURhdGEuZGF0YVtpICsgMl0gPSAyNTVcbiAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaSArIDNdID0gMFxuICAgICAgfVxuICAgICAgdGhpcy5wbG90Q2lyY2xlKHNpemUgKiAyLCAoc2l6ZSAqIDQpICogKHNpemUgLyAyKSwgc2l6ZSAvIDIsIGltYWdlRGF0YSwgc2l6ZSwgX2NvbG9yKVxuICAgICAgdGhpcy5maWxsQ2lyY2xlKGltYWdlRGF0YSwgX2NvbG9yKVxuICAgICAgY29udGV4dC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKVxuICAgICAgdGhpcy5jYW52YXNlc1tfc3RyQ29sb3JdW3NpemVdID0gY2FudmFzXG4gICAgICByZXR1cm4gY2FudmFzXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICB9XG4gIH1cblxuICBwbG90Q2lyY2xlICh4bSwgeW0sIHIsIGltYWdlRGF0YSwgc2l6ZSwgY29sb3IpIHtcbiAgICBsZXQgeCA9IC1yXG4gICAgbGV0IHkgPSAwXG4gICAgbGV0IGVyciA9IDIgLSAyICogciAvKiBib3R0b20gbGVmdCB0byB0b3AgcmlnaHQgKi9cblxuICAgIGRvIHtcbiAgICAgIC8qICAgSS4gUXVhZHJhbnQgK3ggK3kgKi9cbiAgICAgIGNvbnN0IGkgPSB4bSAtICgoeCArIDEpICogNCkgKyAoeW0gKyAoKHkgLSAxKSAqIChzaXplICogNCkpKVxuICAgICAgaW1hZ2VEYXRhLmRhdGFbaSArIDBdID0gY29sb3IuclxuICAgICAgaW1hZ2VEYXRhLmRhdGFbaSArIDFdID0gY29sb3IuZ1xuICAgICAgaW1hZ2VEYXRhLmRhdGFbaSArIDJdID0gY29sb3IuYlxuICAgICAgaW1hZ2VEYXRhLmRhdGFbaSArIDNdID0gMjU1XG4gICAgICAvKiAgSUkuIFF1YWRyYW50IC14ICt5ICovXG4gICAgICBjb25zdCBpaSA9IHhtIC0gKHkgKiAoc2l6ZSAqIDQpKSArICh5bSAtICgoeCArIDEpICogNCkpXG4gICAgICBpbWFnZURhdGEuZGF0YVtpaSArIDBdID0gY29sb3IuclxuICAgICAgaW1hZ2VEYXRhLmRhdGFbaWkgKyAxXSA9IGNvbG9yLmdcbiAgICAgIGltYWdlRGF0YS5kYXRhW2lpICsgMl0gPSBjb2xvci5iXG4gICAgICBpbWFnZURhdGEuZGF0YVtpaSArIDNdID0gMjU1XG4gICAgICAvKiBJSUkuIFF1YWRyYW50IC14IC15ICovXG4gICAgICBjb25zdCBpaWkgPSAoeG0gKyAoeCAqIDQpKSArICh5bSAtICh5ICogKHNpemUgKiA0KSkpXG4gICAgICBpbWFnZURhdGEuZGF0YVtpaWkgKyAwXSA9IGNvbG9yLnJcbiAgICAgIGltYWdlRGF0YS5kYXRhW2lpaSArIDFdID0gY29sb3IuZ1xuICAgICAgaW1hZ2VEYXRhLmRhdGFbaWlpICsgMl0gPSBjb2xvci5iXG4gICAgICBpbWFnZURhdGEuZGF0YVtpaWkgKyAzXSA9IDI1NVxuICAgICAgLyogIElWLiBRdWFkcmFudCAreCAteSAqL1xuICAgICAgY29uc3QgaXYgPSAoeG0gKyAoKHkgLSAxKSAqIChzaXplICogNCkpKSArICh5bSArICh4ICogNCkpXG4gICAgICBpbWFnZURhdGEuZGF0YVtpdiArIDBdID0gY29sb3IuclxuICAgICAgaW1hZ2VEYXRhLmRhdGFbaXYgKyAxXSA9IGNvbG9yLmdcbiAgICAgIGltYWdlRGF0YS5kYXRhW2l2ICsgMl0gPSBjb2xvci5iXG4gICAgICBpbWFnZURhdGEuZGF0YVtpdiArIDNdID0gMjU1XG4gICAgICByID0gZXJyXG4gICAgICBpZiAociA8PSB5KSB7XG4gICAgICAgIGVyciArPSArK3kgKiAyICsgMSAvKiB5IHN0ZXAgKi9cbiAgICAgIH1cbiAgICAgIGlmIChyID4geCB8fCBlcnIgPiB5KSB7XG4gICAgICAgIGVyciArPSArK3ggKiAyICsgMSAvKiB4IHN0ZXAgKi9cbiAgICAgIH1cbiAgICB9IHdoaWxlICh4IDwgMClcbiAgfVxuXG4gIGZpbGxDaXJjbGUgKGltYWdlRGF0YSwgY29sb3IpIHtcbiAgICBjb25zdCBjb2xzID0gaW1hZ2VEYXRhLndpZHRoICogNFxuICAgIGZvciAobGV0IHJvdyA9IDE7IHJvdyA8IGltYWdlRGF0YS5oZWlnaHQgLSAxOyByb3cgKz0gMSkge1xuICAgICAgbGV0IGlzSGl0Q29sb3IgPSBmYWxzZVxuICAgICAgbGV0IGlzSGl0Q2xlYXIgPSBmYWxzZVxuICAgICAgbGV0IGlzRW5kZWQgPSBmYWxzZVxuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgY29sczsgY29sICs9IDQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBjb2xzICogcm93ICsgY29sXG4gICAgICAgIGNvbnN0IGFscGhhID0gaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXVxuICAgICAgICBjb25zdCBpc0NvbG9yID0gYWxwaGEgPT09IDI1NVxuICAgICAgICBjb25zdCBpc0NsZWFyID0gYWxwaGEgPT09IDBcbiAgICAgICAgaWYgKGlzQ29sb3IgJiYgIWlzSGl0Q29sb3IpIHtcbiAgICAgICAgICBpc0hpdENvbG9yID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGlzQ2xlYXIgJiYgaXNIaXRDb2xvcikge1xuICAgICAgICAgIGlzSGl0Q2xlYXIgPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb2xvciAmJiBpc0hpdENvbG9yICYmIGlzSGl0Q2xlYXIpIHtcbiAgICAgICAgICBpc0VuZGVkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0hpdENvbG9yICYmIGlzSGl0Q2xlYXIgJiYgIWlzRW5kZWQpIHtcbiAgICAgICAgICBpbWFnZURhdGEuZGF0YVtpbmRleF0gPSBjb2xvci5yXG4gICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAxXSA9IGNvbG9yLmdcbiAgICAgICAgICBpbWFnZURhdGEuZGF0YVtpbmRleCArIDJdID0gY29sb3IuYlxuICAgICAgICAgIGltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPSAyNTVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFB4QnJ1c2ggZnJvbSAnLi9QeEJydXNoJ1xuZXhwb3J0IGRlZmF1bHQgUHhCcnVzaCJdLCJzb3VyY2VSb290IjoiIn0=