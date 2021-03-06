これはローディングアニメーションを CSS3 で生成する jQuery プラグインです。  
_cssloading()_ でアニメーション生成、 _stopcssloading()_ で破棄します。  
CSS3 で描かれるので、Canvas 対応ブラウザ（非対応の場合は対応処理を施した上）でお使いください。


## アニメーションの形とそれぞれのプロパティ

### dot
* type: アニメーションの形 / 'dot'  
* width: アニメーション全体の大きさ / 数値  
* color: アニメーションの色 / CSS での値  
* size: アニメーションする物体の大きさ / 数値  
* items: number of items / 数値  
* speed: アニメーションの速さ / ミリ秒  
* clockwise: 時計回りかどうか / true もしくは false  

### line
* type: アニメーションの形 / 'line'  
* color: アニメーションの色 / CSS での値  
* size: アニメーションする物体の大きさ / 数値  
* items: アニメーションする物体の数 / 数値  
* speed: アニメーションの速さ / ミリ秒  
* direction: アニメーションする方向 / 'left' もしくは 'right'  
* shape: アニメーションする物体の形 / 'square' もしくは 'circle'  

### square
* type: アニメーションの形 / 'square'  
* color: アニメーションの色 / CSS での値  
* size: アニメーションする物体の大きさ / 数値  
* items: アニメーションする物体の数 / 数値  
* speed: アニメーションの速さ / ミリ秒  
* clockwise: 時計回りかどうか / true もしくは false  
* shape: アニメーションする物体の形 / 'square' もしくは 'circle'  

### block
* type: アニメーションの形 / 'block'  
* color: アニメーションの色 / CSS での値  
* size: アニメーションする物体の大きさ / 数値  
* items: アニメーションする物体の数 / 数値  
* speed: アニメーションの速さ / ミリ秒  
* direction: アニメーションする方向 / 'left', 'right', 'top', もしくは 'bottom'  
* shape: アニメーションする物体の形 / 'square' or 'circle'  

### eddy
* type: アニメーションの形 / 'eddy'  
* color: アニメーションの色 / CSS での値  
* size: アニメーションする物体の大きさ / 数値  
* items: アニメーションする物体の数 / 数値  
* speed: アニメーションの速さ / ミリ秒  
* clockwise: 時計回りかどうか / true もしくは false  
* shape: アニメーションする物体の形 / 'square' もしくは 'circle'  


## 使用例
### html
	<button id='line'>Play/Stop</button>
	<div id='loading'></div>

### jQuery
	$('button').click(function() {
		if ($('#loading').find('.loading_wrapper')[0]) {
			$('#loading').stopcssloading();
		} else {
			var option = {
				type: 'dot',
				width: 100,
				color: 'rgba(0, 102, 255, .9)',
				size: 3,
				items: 30,
				speed: 1000,
				clockwise: false
			};
			$('#loading').cssloading(option);
		}
	});


このプラグインがお役に立てば幸いです。