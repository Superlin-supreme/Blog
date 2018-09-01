window.onload = function(){
	var wWidth =  window.innerHeight;
	// alert(wWidth);
	document.getElementById('page1').style.height = wWidth + 'px';


	var mask = document.getElementById("mask");
	var pop_box = document.getElementById("pop_box");
	mask.onclick = function(){
		// mask.style.display="none";
		$('#mask').fadeOut(500);
		pop_box.style.display="none";
		$('#upload_box').css('display', 'none');
		// mask.setAttribute('class','FadeOut');
		// pop_box.setAttribute('class','FadeOut');
		// setTimeout(function(){
		// 	mask.style.display="none";
		// 	pop_box.style.display="none";
		// 	mask.setAttribute('class','');
		// 	pop_box.setAttribute('class','');			
		// }, 2000)		
	}
	document.getElementById("pop_btn").onclick = open_box;
	document.getElementById("pop_btn_2").onclick = open_box;	
	function open_box(){
		mask.style.display="block";
		pop_box.style.display="block";
	}

	// setInterval(addsnake,2500);
	// function addsnake(){
	// var snake_node = document.createElement('div');
	// snake_node.classList.add('snake_bone');
	// document.getElementById("snake").insertBefore(snake_node,document.getElementById("snake").childNodes[0]);	
	// }
	


	var Imgtoal;
	var Imglen;
	var a;

	$.ajax({
		type: "GET",
		url: "count_pic.php",
		dataType: "json",
		success: function(data) {
			if (data.success) { 
				Imgtoal = parseInt(data.msg);
				Imglen = new Array(Imgtoal+1);
				a = new Array(Imgtoal+1);
				// console.log(Imgtoal,Imglen.length);
				for(var i = 0;i < Imglen.length; i++){  
   					Imglen[i] = new Array(2);    //每行有10列  
				}  
				// console.log(Imgtoal,Imglen.length);
				getLen();
				// alert(Imgtoal);
				// alert(data.msg);
			} else {
				alert("出现错误：" + data.msg);
			}  
		},
		error: function(jqXHR){     
			alert("发生错误：" + jqXHR.status);  
		},  
	});
	// var Imgtoal = 17;
	var ct_Width = document.getElementById('photo_container').offsetWidth;
	// console.log(ct_Width);
	var tmpl = '';

	function loadimg(){
		for(i=1; i<=Imgtoal; i++){
			var row = a[i];
			var oldh = Imglen[i][1];
			var oldw = Imglen[i][0];
			var h = b[row];
			var w = parseFloat( oldw * (h/oldh));

			// console.log(i+"宽度："+w);
			// console.log(i+"高度："+h);

			tmpl += '<li><canvas id="cvs_' + i + '" height="200px"></canvas></li>';
			document.getElementById('photo_container').innerHTML= tmpl;
			var imageObj = new Image();
			imageObj.src =  'pic/' + i + '.jpg';
			// alert(i);
			imageObj.index = i;
			imageObj.w = w;
			imageObj.h = h;
			imageObj.onload = function(){
         		var cvs = document.getElementById('cvs_'+this.index);
				var ctx = cvs.getContext('2d');
				cvs.width = this.w;
				cvs.height = this.h;
				ctx.drawImage(this, 0, 0, this.w, this.h);
			}
		}
		// document.getElementById('photo_container').innerHTML= tmpl;
		var divNode = document.createElement('div');
		divNode.style.clear = 'both';
		document.getElementById('photo_container').appendChild(divNode);
	}
	// getLen();

	// var Imglen = new Array(Imgtoal+1);
	// for(var i = 0;i < Imglen.length; i++){  
 //   		Imglen[i] = new Array(2);    //每行有10列  
	// }  
	var leftcout = 0;

	function getLen(){
		for (i=1; i<=Imgtoal; i++){
			var imgsrc = 'pic/' + i + '.jpg';
			var imageObj = new Image();
			imageObj.src = imgsrc;
			imageObj.index = i;
			imageObj.onload = function(){
				// console.log(this.width);
				Imglen[this.index][0]=this.width;
				Imglen[this.index][1]=this.height;
				leftcout++;
				//判断图片是否全部加载完毕并将长度放入数组
				if(leftcout == Imgtoal){
					countLen();
				}		
			}
		}
	}

	// var a = new Array(Imgtoal+1);
	var b = new Array(16);	
	for(var i=0; i<b.length; i++){
		b[i] = 200;//初始化每列的高度
	}

	function countLen(){
		var row = 1;
		var Rowlength = 0;
		var countMargin = 0;
		for (var i=1; i<=Imgtoal; i++) {

			var w = 200*(Imglen[i][0]/Imglen[i][1]) + 10;

			if((Rowlength+w) > ct_Width){
				if(w-(ct_Width-Rowlength) < 100){
					a[i] = row;					
					b[row] = 200*((ct_Width-countMargin) / ((Rowlength+w)-countMargin));
					row++;
					// console.log('放原行');
					Rowlength = 0;
					countMargin = 0;
				}else{
					a[i] = row+1;
					b[row] = 200*((ct_Width-countMargin) / (Rowlength-countMargin));
					row++;					
					// console.log('换行');
					Rowlength = w;
					countMargin = 10;
				}
				// Rowlength = 0;
				// countMargin = 0;
			}else{
				a[i] = row;
				Rowlength = Rowlength + w;
				countMargin += 10;
				// console.log(Rowlength);	
			}		
		}
		// console.log(row);
		// for(var i=1; i<=Imgtoal; i++){
		// 	console.log('a['+i+"] "+a[i]);
		// }
		// for(var i=1; i<=15; i++){
		// 	console.log('b['+i+"] "+b[i]);
		// }
		loadimg();
	}
	// loadimg();

var current_bg = 0;
var banner = document.getElementById('banner');
var ImgArray = banner.getElementsByTagName('div');
var mask_2 = document.getElementById('mask_2');
var banner_box = document.getElementById('banner_box');
var btn = document.getElementById('banner_btn').getElementsByTagName('span');
var banner_hdl = document.getElementById('bnr_hdl').getElementsByTagName('span');
var can_change = true;

var banner_slide =  setInterval(function(){
	if(can_change){
		choseImg(current_bg, current_bg+1)
		can_change = false;
	}
	},5000);

function choseImg(cIndex, nIndex){
	if(nIndex == cIndex +1){
		if (cIndex == 3) {
			nIndex = 0;
		}
	}
	// console.log(cIndex);
	// console.log(nIndex);
	ChangeImg(cIndex, nIndex);
}

function ChangeImg(cIndex, nIndex){
	setTimeout(function(){
		// console.log('hei '+current_bg);
		// console.log('hei '+next_bg);
		ImgArray[nIndex].setAttribute('class', 'img_box active');
		ImgArray[cIndex].setAttribute('class', 'img_box');
 		current_bg = nIndex;
 		can_change = true;
	},1000)
	ImgArray[nIndex].setAttribute('class', 'img_box show');
	ImgArray[cIndex].setAttribute('class', 'img_box active FadeOut');
	btn[cIndex].className = '';
	btn[nIndex].className = 'active';
	banner_hdl[cIndex].setAttribute('class', 'zoomIn');
	banner_hdl[nIndex].setAttribute('class', 'zoomIn active');
}

banner_box.onmouseover = function(){
	clearInterval(banner_slide);
}

banner_box.onmouseout = function(){
	banner_slide =  setInterval(function(){choseImg(current_bg, current_bg+1)},5000);
}

for (var i=0; i<btn.length; i++){
	btn[i].onclick = function(){
		var btn_index = parseInt(this.getAttribute('index'));
		if (can_change) {
			if(current_bg == btn_index){
				return;
			}else{
				ChangeImg(current_bg, btn_index);
				can_change = false;
			}
		}
	}
}




// document.getElementById('photo_container').innerHTML= '<canvas id="myCanvas" height="200px"></canvas></li>';
// var canvas = document.getElementById("myCanvas");
// var wh;
//  //简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
//  if(canvas.getContext){  
//      //获取对应的CanvasRenderingContext2D对象(画笔)
//      var ctx = canvas.getContext("2d");
     
//     //创建新的图片对象
//      var img = new Image();
//      	img.src = "img/1.jpg";
//      	//浏览器加载图片完毕后再绘制图片
//     	img.onload = function(){
//          //以Canvas画布上的坐标(10,10)为起始点，绘制图像
//          // alert(this.width);
//          // alert(this.height);
//          wh = 200*(this.width/this.height);
//          canvas.style.width= wh +'px';
//          canvas.style.height= '200px';
//          ctx.drawImage(img, 0, 0 ,wh, 200);             
//      };
//  }

$('#upload_btn').click(function(){
	$('#mask').fadeIn(500);
	$('#upload_box').slideToggle(500);
})

$('#ubox_close').click(function(){
	$('#mask').fadeOut(500);
	$('#upload_box').slideToggle(500);
})

}