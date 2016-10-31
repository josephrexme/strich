/**
 * JavaScript File
 * @author Joseph Rex
 * @since 09-30-2016
 *
 */
var url = '/dist/images/svgdefs.svg';
// Make XHR request for SVG definition sprite
var c = new XMLHttpRequest();
c.open('GET', url, true);
c.setRequestHeader('Content-Type', 'text/xml');
c.send();
// Document Ready Function declaration
var ready = function(cb) {
  /in/.test(document.readyState) ? setTimeout(ready.bind(null, cb), 9) : cb();
};
// Document Ready Execution
ready(function(){
  document.body.insertBefore(c.responseXML.firstChild, document.body.firstChild);
  // Dashboard notification drop-down
  var notificationIcon = document.querySelector('#notifications');
  var dropDownMenu = document.querySelector('.dashboard-main__ctrl__dropdown');
  if(notificationIcon && dropDownMenu) {
    notificationIcon.addEventListener('click', function(e){
      var currentState = dropDownMenu.style.display;
      dropDownMenu.style.display = currentState == 'block' ? 'none' : 'block';
    });
  }
  // Off-canvas navigation
  var menuIcon = document.querySelector('.js-toggleMenu');
  if(menuIcon){
    menuIcon.addEventListener('click', function(e){
      document.documentElement.classList.toggle('openNav');
    });
  }
  // AOS for scroll animations
  AOS.init({duration: 1200});
});
