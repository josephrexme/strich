function ready(cb) {
	/in/.test(document.readyState) // in = loadINg
		? setTimeout(ready.bind(null, cb), 9)
		: cb();
}
ready(function(){
	/*======= Waypoints http://imakewebthings.com/waypoints/ ============= */
	var waypointRow1 = new Waypoint({
	  element: document.querySelector('.waypoint'),
	  handler: function() {
	  	var one = document.getElementById('animation1'),
	  	two = document.getElementById('animation2');
	    one.classList.add('bounceInLeft');
	    two.classList.add('bounceInRight');
	    one.style.visibility = 'visible';
	    two.style.visibility = 'visible';
	  },
	  offset: '70%'
	});
	var waypointRow2 = new Waypoint({
		element: document.querySelector('.waypoint2'),
		handler: function(){
			var one = document.getElementById('animation3'),
			two = document.getElementById('portfolio'),
			three = document.getElementById('animation4');
	    one.classList.add('zoomIn');
	    two.classList.add('rubberBand');
	    three.classList.add('tada');
	    one.style.visibility = 'visible';
	    two.style.visibility = 'visible';
	    three.style.visibility = 'visible';
		},
		offset: '70%'
	});
	var waypointRow3 = new Waypoint({
		element: document.querySelector('.waypoint3'),
		handler: function(){
			var one = document.getElementById('contact'),
			two = document.getElementById('animation5'),
			three = document.getElementById('animation6'),
			four = document.getElementById('animation7');
			one.classList.add('lightSpeedIn');
			two.classList.add('rollIn');
			three.classList.add('flipInY');
			four.classList.add('fadeInUp');
			one.style.visibility = 'visible';
	    two.style.visibility = 'visible';
	    three.style.visibility = 'visible';
	    four.style.visibility = 'visible';
		},
		offset: '100%'
	});
	/*====== Lory Slider http://meandmax.github.io/lory/ ======*/
	var simple = document.querySelector('.js_simple');
  lory(simple, {
      infinite: 1
  });
});
/* Scroll to Hashbanged links */
(function(){
var speed = 500;
var moving_frequency = 15; // Affects performance !
var links = document.getElementsByTagName('a');
var href;
for(var i=0; i<links.length; i++){   
	href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
	if(href !== null && href.length > 1 && href.substr(0, 1) == '#'){
	  links[i].onclick = function(){
	    var element;
	    var href = this.attributes.href.nodeValue.toString();
	    if(element = document.getElementById(href.substr(1))){
        var hop_count = speed/moving_frequency
        var getScrollTopDocumentAtBegin = getScrollTopDocument();
        var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;
        for(var i = 1; i <= hop_count; i++){
          (function(){
	          var hop_top_position = gap*i;
	          setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency*i);
          })();
        }
	    }
	    return false;
    };
	}
}

var getScrollTopElement =  function (e){
  var top = 0;
  while (e.offsetParent != undefined && e.offsetParent != null){
    top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
    e = e.offsetParent;
  }
  return top;
};

var getScrollTopDocument = function(){
  return document.documentElement.scrollTop + document.body.scrollTop;
};
})();