function ready(t){/in/.test(document.readyState)?setTimeout(ready.bind(null,t),9):t()}!function(){"use strict";function t(i){if(!i)throw new Error("No options passed to Waypoint constructor");if(!i.element)throw new Error("No element option passed to Waypoint constructor");if(!i.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,i),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=i.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,e+=1}var e=0,n={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var i in n)e.push(n[i]);for(var o=0,r=e.length;r>o;o++)e[o][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,i[t.waypointContextKey]=this,n+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,i={},o=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete i[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,o.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||o.isTouch)&&(e.didScroll=!0,o.requestAnimationFrame(t))})},e.prototype.handleResize=function(){o.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in e){var i=e[n],o=i.newScroll>i.oldScroll,r=o?i.forward:i.backward;for(var s in this.waypoints[n]){var l=this.waypoints[n][s],a=i.oldScroll<l.triggerPoint,u=i.newScroll>=l.triggerPoint,d=a&&u,c=!a&&!u;(d||c)&&(l.queueTrigger(r),t[l.group.id]=l.group)}}for(var f in t)t[f].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?o.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?o.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var n in this.waypoints[e])t.push(this.waypoints[e][n]);for(var i=0,o=t.length;o>i;i++)t[i].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,n=this.adapter.offset(),i={};this.handleScroll(),t={horizontal:{contextOffset:e?0:n.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:n.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var o in t){var r=t[o];for(var s in this.waypoints[o]){var l,a,u,d,c,f=this.waypoints[o][s],h=f.options.offset,p=f.triggerPoint,y=0,m=null==p;f.element!==f.element.window&&(y=f.adapter.offset()[r.offsetProp]),"function"==typeof h?h=h.apply(f):"string"==typeof h&&(h=parseFloat(h),f.options.offset.indexOf("%")>-1&&(h=Math.ceil(r.contextDimension*h/100))),l=r.contextScroll-r.contextOffset,f.triggerPoint=y+l-h,a=p<r.oldScroll,u=f.triggerPoint>=r.oldScroll,d=a&&u,c=!a&&!u,!m&&d?(f.queueTrigger(r.backward),i[f.group.id]=f.group):!m&&c?(f.queueTrigger(r.forward),i[f.group.id]=f.group):m&&r.oldScroll>=f.triggerPoint&&(f.queueTrigger(r.forward),i[f.group.id]=f.group)}}for(var v in i)i[v].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in i)i[t].refresh()},e.findByElement=function(t){return i[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},o.requestAnimationFrame=function(e){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;n.call(window,e)},o.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function n(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),i[this.axis][this.name]=this}var i={vertical:{},horizontal:{}},o=window.Waypoint;n.prototype.add=function(t){this.waypoints.push(t)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var i=this.triggerQueues[n],o="up"===n||"left"===n;i.sort(o?e:t);for(var r=0,s=i.length;s>r;r+=1){var l=i[r];(l.options.continuous||r===i.length-1)&&l.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(e){this.waypoints.sort(t);var n=o.Adapter.inArray(e,this.waypoints),i=n===this.waypoints.length-1;return i?null:this.waypoints[n+1]},n.prototype.previous=function(e){this.waypoints.sort(t);var n=o.Adapter.inArray(e,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},n.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(t){return i[t.axis][t.name]||new n(t)},o.Group=n}(),function(){"use strict";function t(t){return t===t.window}function e(e){return t(e)?e:e.defaultView}function n(t){this.element=t,this.handlers={}}var i=window.Waypoint;n.prototype.innerHeight=function(){var e=t(this.element);return e?this.element.innerHeight:this.element.clientHeight},n.prototype.innerWidth=function(){var e=t(this.element);return e?this.element.innerWidth:this.element.clientWidth},n.prototype.off=function(t,e){function n(t,e,n){for(var i=0,o=e.length-1;o>i;i++){var r=e[i];n&&n!==r||t.removeEventListener(r)}}var i=t.split("."),o=i[0],r=i[1],s=this.element;if(r&&this.handlers[r]&&o)n(s,this.handlers[r][o],e),this.handlers[r][o]=[];else if(o)for(var l in this.handlers)n(s,this.handlers[l][o]||[],e),this.handlers[l][o]=[];else if(r&&this.handlers[r]){for(var a in this.handlers[r])n(s,this.handlers[r][a],e);this.handlers[r]={}}},n.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,n=e(this.element.ownerDocument),i={top:0,left:0};return this.element.getBoundingClientRect&&(i=this.element.getBoundingClientRect()),{top:i.top+n.pageYOffset-t.clientTop,left:i.left+n.pageXOffset-t.clientLeft}},n.prototype.on=function(t,e){var n=t.split("."),i=n[0],o=n[1]||"__default",r=this.handlers[o]=this.handlers[o]||{},s=r[i]=r[i]||[];s.push(e),this.element.addEventListener(i,e)},n.prototype.outerHeight=function(e){var n,i=this.innerHeight();return e&&!t(this.element)&&(n=window.getComputedStyle(this.element),i+=parseInt(n.marginTop,10),i+=parseInt(n.marginBottom,10)),i},n.prototype.outerWidth=function(e){var n,i=this.innerWidth();return e&&!t(this.element)&&(n=window.getComputedStyle(this.element),i+=parseInt(n.marginLeft,10),i+=parseInt(n.marginRight,10)),i},n.prototype.scrollLeft=function(){var t=e(this.element);return t?t.pageXOffset:this.element.scrollLeft},n.prototype.scrollTop=function(){var t=e(this.element);return t?t.pageYOffset:this.element.scrollTop},n.extend=function(){function t(t,e){if("object"==typeof t&&"object"==typeof e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}for(var e=Array.prototype.slice.call(arguments),n=1,i=e.length;i>n;n++)t(e[0],e[n]);return e[0]},n.inArray=function(t,e,n){return null==e?-1:e.indexOf(t,n)},n.isEmptyObject=function(t){for(var e in t)return!1;return!0},i.adapters.push({name:"noframework",Adapter:n}),i.Adapter=n}(),!function(t,e){"function"==typeof define&&define.amd?define([],function(){return t.lory=e()}):"object"==typeof exports?module.exports=e():t.lory=e()}(this,function(){"use strict";function t(t,e,n){var i=new a(e,{detail:n,bubbles:!0,cancelable:!0});t.dispatchEvent(i)}var e,n,i;!function(){var t,o=document.createElement("_").style;""===o[t="webkitTransition"]&&(i="webkitTransitionEnd",n=t),""===o[t="transition"]&&(i="transitionend",n=t),""===o[t="webkitTransform"]&&(e=t),""===o[t="msTransform"]&&(e=t),""===o[t="transform"]&&(e=t)}();var o=[].slice,r=function(t,e){if("undefined"==typeof e&&(e=t,t=0),t>e){var n=t;t=e,e=n}return function(n){return Math.min(Math.max(n,t),e)}},s=function(t,e){var n={};return Object.keys(e).map(function(i){n[i]=t&&t.hasOwnProperty(i)?t[i]:e[i]}),n};try{new a("test")}catch(l){var a=function(t,e){var n;return e=e||{bubbles:!1,cancelable:!1,detail:void 0},n=document.createEvent("CustomEvent"),n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n};a.prototype=window.Event.prototype,window.CustomEvent=a}var u=function(l,a){var u,d,c,f,h,p=0,y={};"undefined"!=typeof jQuery&&l instanceof jQuery&&(l=l[0]);var m,v,g,w=l.querySelector(".js_frame"),b=w.querySelector(".js_slides"),x=l.querySelector(".js_prev"),S=l.querySelector(".js_next"),E={slidesToScroll:1,slideSpeed:300,rewindSpeed:600,snapBackSpeed:200,ease:"ease",rewind:!1,infinite:!1},T=function(t){var e=t.slice(0,y.infinite),n=t.slice(t.length-y.infinite,t.length);return e.forEach(function(t){var e=t.cloneNode(!0);b.appendChild(e)}),n.reverse().forEach(function(t){var e=t.cloneNode(!0);b.insertBefore(e,b.firstChild)}),b.addEventListener(i,C),o.call(b.children)},A=function(){t(l,"before.lory.init"),y=s(a,E),u={x:b.offsetLeft,y:b.offsetTop},f=y.infinite?T(o.call(b.children)):o.call(b.children),L(),x&&S&&(x.addEventListener("click",k),S.addEventListener("click",z)),b.addEventListener("touchstart",I),window.addEventListener("resize",P),t(l,"after.lory.init")},L=function(){d=b.getBoundingClientRect().width||b.offsetWidth,c=w.getBoundingClientRect().width||w.offsetWidth,p=0,y.infinite?(W(-1*f[p+y.infinite].offsetLeft,0,null),p+=y.infinite,u.x=-1*f[p].offsetLeft):W(0,y.rewindSpeed,y.ease)},k=function(){B(!1,!1)},z=function(){B(!1,!0)},W=function(t,i,o){var r=b&&b.style;r&&(r[n+"TimingFunction"]=o,r[n+"Duration"]=i+"ms",r[e]="translateX("+t+"px)")},B=function(e,n){t(l,"before.lory.slide",{currentSlide:p,nextSlide:n?p+1:p-1});var i=f.length-1,o=Math.round(d-c),s=r(0,f.length-1),a=y.slideSpeed;o=Math.round(o?o:d*i);var m=r(-1*o,0);"number"!=typeof e&&(e=n?p+y.slidesToScroll:p-y.slidesToScroll),e=s(e),y.infinite&&void 0===n&&(e+=y.infinite);var v=m(-1*f[e].offsetLeft);y.rewind&&Math.abs(u.x)===o&&n&&(v=0,e=0,a=y.rewindSpeed),W(v,a,y.ease),u.x=v,f[e].offsetLeft<=o&&(p=e),y.infinite&&Math.abs(v)===o&&n&&(p=y.infinite,u.x=-1*f[p].offsetLeft,h=function(){W(-1*f[p].offsetLeft,0,null)}),y.infinite&&0===Math.abs(v)&&!n&&(p=f.length-2*y.infinite,u.x=-1*f[p].offsetLeft,h=function(){W(-1*f[p].offsetLeft,0,null)}),t(l,"after.lory.slide",{currentSlide:p})},C=function(){h&&(h(),h=void 0)},I=function(t){var e=t.touches[0];m={x:e.pageX,y:e.pageY,time:Date.now()},g=void 0,v={},b.addEventListener("touchmove",q),b.addEventListener("touchend",O)},q=function(e){var n=e.touches[0];v={x:n.pageX-m.x,y:n.pageY-m.y},"undefined"==typeof g&&(g=!!(g||Math.abs(v.x)<Math.abs(v.y))),g||(t(l,"before.lory.slide"),W(u.x+v.x,0,null))},O=function(){var t=Date.now()-m.time,e=Number(t)<300&&Math.abs(v.x)>25||Math.abs(v.x)>c/3,n=!p&&v.x>0||p===f.length-1&&v.x<0,i=v.x<0;g||(e&&!n?B(!1,i):W(u.x,y.snapBackSpeed)),w.removeEventListener("touchmove"),w.removeEventListener("touchend")},P=function(){t(l,"on.lory.resize"),L()},H=function(){return t(l,"on.lory.destroy"),b.removeEventListener(i,C),b.removeEventListener("touchstart",I),window.removeEventListener("resize",P),x&&x.removeEventListener("click",k),S&&S.removeEventListener("click",z),u=null,d=null,c=null,p=null,y=null,f=null,h=null,l=null,w=null,b=null,x=null,S=null,null};return A(),{slideTo:function(t){B(t)},returnIndex:function(){return p},setup:A,reset:L,prev:k,next:z,destroy:H}};return u}),function(){for(var t,e=function(){},n=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],i=n.length,o=window.console=window.console||{};i--;)t=n[i],o[t]||(o[t]=e)}(),ready(function(){var t=(new Waypoint({element:document.querySelector(".waypoint"),handler:function(){var t=document.getElementById("animation1"),e=document.getElementById("animation2");t.classList.add("bounceInLeft"),e.classList.add("bounceInRight"),t.style.visibility="visible",e.style.visibility="visible"},offset:"70%"}),new Waypoint({element:document.querySelector(".waypoint2"),handler:function(){var t=document.getElementById("animation3"),e=document.getElementById("portfolio"),n=document.getElementById("animation4");t.classList.add("zoomIn"),e.classList.add("rubberBand"),n.classList.add("tada"),t.style.visibility="visible",e.style.visibility="visible",n.style.visibility="visible"},offset:"70%"}),new Waypoint({element:document.querySelector(".waypoint3"),handler:function(){var t=document.getElementById("contact"),e=document.getElementById("animation5"),n=document.getElementById("animation6"),i=document.getElementById("animation7");t.classList.add("lightSpeedIn"),e.classList.add("rollIn"),n.classList.add("flipInY"),i.classList.add("fadeInUp"),t.style.visibility="visible",e.style.visibility="visible",n.style.visibility="visible",i.style.visibility="visible"},offset:"100%"}),document.querySelector(".js_simple"));lory(t,{infinite:1})}),function(){for(var t,e=500,n=15,i=document.getElementsByTagName("a"),o=0;o<i.length;o++)t=void 0===i[o].getAttributeNode("href")?null:i[o].getAttribute("href"),null!==t&&t.length>1&&"#"==t.substr(0,1)&&(i[o].onclick=function(){var t,i=this.getAttribute("href");if(t=document.getElementById(i.substr(1)))for(var o=e/n,l=s(),a=(r(t)-l)/o,u=1;o>=u;u++)!function(){var t=a*u;setTimeout(function(){window.scrollTo(0,t+l)},n*u)}();return!1});var r=function(t){for(var e=0;void 0!=t.offsetParent&&null!=t.offsetParent;)e+=t.offsetTop+(null!=t.clientTop?t.clientTop:0),t=t.offsetParent;return e},s=function(){return document.documentElement.scrollTop+document.body.scrollTop}}();
//# sourceMappingURL=../maps/app.js.map