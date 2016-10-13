
var myScroll,
  pullDownEl, pullDownOffset,
  pullUpEl, pullUpOffset,
  generatedCount = 0;

function pullDownAction () {
  setTimeout(function () {  // <-- Simulate network congestion, remove setTimeout from production!
    var el, li, i;
    el = document.getElementById('thelist');

    for (i=0; i<3; i++) {
      li = document.createElement('li');
      li.innerText = 'Generated row ' + (++generatedCount);
      el.insertBefore(li, el.childNodes[0]);
    }
    
    myScroll.refresh();   // Remember to refresh when contents are loaded (ie: on ajax completion)
  }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
  setTimeout(function () {  // <-- Simulate network congestion, remove setTimeout from production!
    var el, li, i;
    el = document.getElementById('thelist');

    for (i=0; i<3; i++) {
      li = document.createElement('li');
      li.innerText = 'Generated row ' + (++generatedCount);
      el.appendChild(li, el.childNodes[0]);
    }
    
    myScroll.refresh();   // Remember to refresh when contents are loaded (ie: on ajax completion)
  }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
  pullDownEl = document.getElementById('pullDown');
  pullDownOffset = pullDownEl.offsetHeight;
  pullUpEl = document.getElementById('pullUp'); 
  pullUpOffset = pullUpEl.offsetHeight;
  
  myScroll = new iScroll('wrapper', {
    useTransition: true,
    topOffset: pullDownOffset,
    onRefresh: function () {
      if (pullDownEl.className.match('loading')) {
        pullDownEl.className = '';
        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
      } else if (pullUpEl.className.match('loading')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
      }
    },
    onScrollMove: function () {
      if (this.y > 5 && !pullDownEl.className.match('flip')) {
        pullDownEl.className = 'flip';
        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
        this.minScrollY = 0;
      } else if (this.y < 5 && pullDownEl.className.match('flip')) {
        pullDownEl.className = '';
        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
        this.minScrollY = -pullDownOffset;
      } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
        pullUpEl.className = 'flip';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
        this.maxScrollY = this.maxScrollY;
      } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
        this.maxScrollY = pullUpOffset;
      }
    },
    onScrollEnd: function () {
      if (pullDownEl.className.match('flip')) {
        pullDownEl.className = 'loading';
        pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';        
        pullDownAction(); // Execute custom function (ajax call?)
      } else if (pullUpEl.className.match('flip')) {
        pullUpEl.className = 'loading';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';        
        pullUpAction(); // Execute custom function (ajax call?)
      }
    }
  });
  
  setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);



$(function(){

	var footsec=$("footer div")
	var swiper = new Swiper('#main .swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        uniqueNavElements:false,
        onSlideChangeEnd: function(swiper){
     		  moveToX(swiper.activeIndex);
          swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
   		  },
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
  			  //swiperAnimateCache(swiper); //隐藏动画元素 
   			  swiperAnimate(swiper); //初始化完成开始动画
		    },
    });

	function moveToX(x){
      footsec.removeClass("f_active");
     	footsec.eq(x).addClass('f_active');	
      swiper.slideTo(x, 500, true);//切换到第i个slide，速度为1秒
	};

	$.each(footsec,function(i,val){
		footsec.eq(i).on("click",function(){
			moveToX(i);
		})
	});



	var swiper2 = new Swiper('section .swiper-container', {
        direction: 'vertical',
        onTransitionEnd: function(s){
   			if(s.activeIndex==$("section .swiper-slide").length-1){
   				$("section").css("display","none");
           swiper.slideTo(0, 500, false);//切换到第i个slide，速度为1秒
   			}
   		}
    });


  var back = $(".back");
  var friends = $("#friends");
  console.log(friends) 

  back.on("click",function(){
      friends.addClass("moveright");
      setTimeout(function(){
        friends.removeClass("moveright");
        friends.css("display","none")
      },200)
  });

  var pyq=$(".pyq");

  pyq.on("click",function(){
    friends.css("display","block")
  })



});
