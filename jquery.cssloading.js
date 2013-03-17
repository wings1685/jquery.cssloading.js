/**
 * jQuery CSS Loading v1.0.4
 * http://flugel.biz/
 *
 * Licensed under the MIT license.
 * Copyright 2012 Yutaka Imagawa
 */

var cssloading = {
	option: {},
	selector: false,
	styles: '',
	calc: [],
	$this: false,
	init: function($this, option) {
		var defaults = {
			type: 'dot',
			width: 50,
			color: 'rgba(0, 102, 255, .9)',
			size: 3,
			items: 12,
			speed: 1000,
			clockwise: true,
			shape: 'circle'
		};
		this.option = $.extend(defaults, option);
		this.width = this.option.width;
		this.styles = '';
		this.$this = $this;
		this.id = $this.attr('id');
		this.$this
			.show()
			.css({'text-align': 'center'})
			.append("<div id='loading_wrapper_" + cssloading.id + "' class='loading_wrapper'></div>")
			.find('#loading_wrapper_' + cssloading.id)
				.css({
					margin: '0px auto',
					position: 'relative',
					'text-align': 'center'
				})
				.each(function() {
					cssloading.set.wrapper[cssloading.option.type]();
					var max = (cssloading.option.type == 'dot' || cssloading.option.type == 'line') ? cssloading.option.items : (cssloading.option.type == 'square') ? (cssloading.option.items - 1) * 4 : Math.pow(cssloading.option.items, 2);
					for (var i = 0; i < max; i++) {
						$(this)
							.append("<div id='loading_parts_" + cssloading.id + i + "' class='loading_parts_" + cssloading.id + "'><span></span></div>")
							.find('#loading_parts_' + cssloading.id + i)
						;
						cssloading.set.parts[cssloading.option.type](i);
					}
				})
		;
		this.set.animation[this.option.type]();
	},
	set: {
		wrapper: {
			common: function() {
				cssloading.calc = [0, 0, 0, cssloading.option.items - 1, Math.pow(cssloading.option.items, 2)];
				var size = cssloading.option.size * (cssloading.option.items * 2 + 1);
				cssloading.$this.css({height: size});
				$('#loading_wrapper_' + cssloading.id).css({
					width: size,
					height: size
				});
			},
			dot: function() {
				cssloading.$this.css({height: cssloading.option.width});
				$('#loading_wrapper_' + cssloading.id).css({
					width: cssloading.option.width,
					height: cssloading.option.width
				});
			},
			line: function() {
				var size = cssloading.option.size * 3;
				cssloading.$this.css({height: size});
				$('#loading_wrapper_' + cssloading.id).css({
					width: cssloading.option.size * (cssloading.option.items * 2 + 1),
					height: size
				});
			},
			square: function() {
				this.common();
			},
			block: function() {
				this.common();
			},
			eddy: function() {
				this.common();
			}
		},
		parts: {
			common: function(i) {
				var delay = (cssloading.option.type == 'dot' || cssloading.option.type == 'line') ? cssloading.option.items : (cssloading.option.type == 'square') ? (cssloading.option.items - 1) * 4 : Math.pow(cssloading.option.items, 2);
				cssloading.styles += (
					'#loading_parts_' + cssloading.id + i + ' span{' +
						'-webkit-animation-name:loading_' + cssloading.id + ';' + 
						'-webkit-animation-delay:' + (Math.round((cssloading.option.speed / (delay - 1)) * i * 100) / 100) + 'ms;' +
					'}'
				);
			},
			dot: function(i) {
				var deg = (cssloading.option.clockwise) ? i : -i;
				cssloading.styles += (
					'#loading_parts_' + cssloading.id + i + '{' +
						'-webkit-transform:rotate(' + ((360 / cssloading.option.items) * deg) + 'deg);' +
					'}'
				);
				this.common(i);
			},
			line: function(i) {
				var pos = cssloading.option.direction;
				cssloading.styles += (
					'#loading_parts_' + cssloading.id + i + '{' +
						(cssloading.option.direction ? cssloading.option.direction : 'left') + ':' + (i * (cssloading.option.size * 2) + cssloading.option.size) + 'px;' +
					'}'
				);
				this.common(i);
			},
			square: function(i) {
				var n = cssloading.calc[1] * (cssloading.option.size * 2) + cssloading.option.size;
				var max = cssloading.option.size * (cssloading.option.items * 2 - 1);
				if (cssloading.calc[0] == 0) {
					var pos = {h: n, v: cssloading.option.size};
				} else if (cssloading.calc[0] == 1) {
					var pos = {h: max, v: n};
				} else if (cssloading.calc[0] == 2) {
					var pos = {h: max - n + cssloading.option.size, v: max};
				} else if (cssloading.calc[0] == 3) {
					var pos = {h: cssloading.option.size, v: max - n + cssloading.option.size};
				}
				cssloading.styles += (
					'#loading_parts_' + cssloading.id + i + '{' +
						(cssloading.option.clockwise ? 'left' : 'right') + ':' + pos.h + 'px;' +
						'top:' + pos.v + 'px;' +
					'}'
				);
				this.common(i);
				if (cssloading.calc[1] == cssloading.option.items - 2) {
					cssloading.calc[0]++;
					cssloading.calc[1] = 0;
				} else {
					cssloading.calc[1]++;
				}
			},
			block: function(i) {
				var pos = {h: cssloading.calc[1] * (cssloading.option.size * 2) + cssloading.option.size, v: (cssloading.calc[0] * 2 + 1) * cssloading.option.size};
				var dir = (cssloading.option.direction == 'left' || cssloading.option.direction == 'right') ? 'top' : 'left';
				cssloading.styles += (
					'#loading_parts_' + cssloading.id + i + '{' +
						cssloading.option.direction + ':' + pos.h + 'px;' +
						dir + ':' + pos.v + 'px;' +
					'}'
				);
				this.common(i);
				if (cssloading.calc[1] == cssloading.option.items - 1) {
					cssloading.calc[0]++;
					cssloading.calc[1] = 0;
				} else {
					cssloading.calc[1]++;
				}
			},
			eddy: function(i) {
				var x = cssloading.option.size * (cssloading.calc[2] * 2);
				var n = cssloading.calc[1] * (cssloading.option.size * 2) + cssloading.option.size + x;
				var max = cssloading.option.size * (cssloading.option.items * 2 - 1) - x;
				if (cssloading.calc[0] == 0) {
					var pos = {h: n, v: cssloading.option.size + x};
				} else if (cssloading.calc[0] == 1) {
					var pos = {h: max, v: n};
				} else if (cssloading.calc[0] == 2) {
					var pos = {h: max - n + cssloading.option.size + x, v: max};
				} else if (cssloading.calc[0] == 3) {
					var pos = {h: cssloading.option.size + x, v: max - n + cssloading.option.size + x};
				}
				cssloading.styles += (
					'#loading_parts_' + cssloading.id + i + '{' +
						(cssloading.option.clockwise ? 'left' : 'right') + ':' + pos.h + 'px;' +
						'top:' + pos.v + 'px;' +
					'}'
				);
				this.common(i);
				if (cssloading.calc[0] == 3 && cssloading.calc[1] == cssloading.calc[3] - 1) {
					(cssloading.calc[3] - 2 < 1) ? cssloading.calc[3] = 1 : cssloading.calc[3] -= 2;
					cssloading.calc[0] = 0;
					cssloading.calc[1] = 0;
					cssloading.calc[2]++;
				} else if (cssloading.calc[1] == cssloading.calc[3] - 1) {
					cssloading.calc[0]++;
					cssloading.calc[1] = 0;
				} else {
					cssloading.calc[1]++;
				}
			}
		},
		animation: {
			common: {
				remove: function() {
					$('head').find('#loadingCSS_' + cssloading.id).remove().end();
				},
				parts: function() {
					return	"<style id='loadingCSS_" + cssloading.id + "'>" +
								'.loading_parts_' + cssloading.id + '{' +
									'width:' + cssloading.option.size + 'px;position:absolute;'
					;
				},
				span: function() {
					return	'}' +
							'.loading_parts_' + cssloading.id + ' span{' +
								'width:' + cssloading.option.size + 'px;' +
								'height:' + cssloading.option.size + 'px;' +
								'display:block;' +
								'opacity:0;' +
								'background:' + cssloading.option.color + ';' +
								'-webkit-animation-duration:' + cssloading.option.speed + 'ms;' +
								'-webkit-animation-timing-function:linear;' +
								'-webkit-animation-iteration-count:infinite;' +
								'-webkit-transform-origin:center center;'
					;
				},
				squares: function() {
					this.remove();
					$('head')
						.append(
								cssloading.set.animation.common.parts() +
									'height:' + cssloading.option.size + 'px;' +
								cssloading.set.animation.common.span() +
									(cssloading.option.shape == 'circle' ? 'box-shadow:0px 0px ' + (cssloading.option.size / 2) + 'px ' + cssloading.option.color + ', 0px 0px ' + cssloading.option.size + 'px ' + cssloading.option.color + ';' : '') +
									(cssloading.option.shape == 'circle' ? 'border-radius:' + cssloading.option.size + 'px;' : '') +
								cssloading.set.animation.common.keyframes()
						)
					;
				},
				keyframes: function() {
					return	'}' +
							cssloading.styles +
							'@-webkit-keyframes loading_' + cssloading.id + '{0%{opacity:0;}30%{opacity:0;}35%{opacity:1;}100%{opacity:0;}}' +
						'</style>'
					;
				}
			},
			dot: function() {
				this.common.remove();
				$('head')
					.append(
							cssloading.set.animation.common.parts() +
								'height:' + (cssloading.width - cssloading.option.size) + 'px;' +
								'margin:' + (cssloading.option.size / 2) + 'px ' + ((cssloading.width - cssloading.option.size) / 2) + 'px;' +
							cssloading.set.animation.common.span() +
								'box-shadow:0px 0px ' + (cssloading.option.size / 2) + 'px ' + cssloading.option.color + ',0px 0px ' + cssloading.option.size + 'px ' + cssloading.option.color + ';' +
								'border-radius:' + (cssloading.option.size / 2) + 'px;' +
							cssloading.set.animation.common.keyframes()
					)
				;
			},
			line: function() {
				this.common.remove();
				$('head')
					.append(
							cssloading.set.animation.common.parts() +
								'height:' + cssloading.option.size + 'px;' +
								'margin-top:' + cssloading.option.size + 'px;' +
							cssloading.set.animation.common.span() +
								(cssloading.option.shape == 'circle' ? 'box-shadow:0px 0px ' + (cssloading.option.size / 2) + 'px ' + cssloading.option.color + ', 0px 0px ' + cssloading.option.size + 'px ' + cssloading.option.color + ';' : '') +
								(cssloading.option.shape == 'circle' ? 'border-radius:' + cssloading.option.size + 'px;' : '') +
							cssloading.set.animation.common.keyframes()
					)
				;
			},
			square: function() {
				this.common.squares();
			},
			block: function() {
				this.common.squares();
			},
			eddy: function() {
				this.common.squares();
			}
		}
	}
};
$.fn.extend({
	cssloading: function(option) {
		cssloading.init($(this), option);
		return this;
	},
	stopcssloading: function(speed) {
		option = speed || 500;
		$(this).fadeOut(option, function() {
			$('#loading_wrapper_' + $(this).attr('id')).remove();
		});
		return this;
	}
});
