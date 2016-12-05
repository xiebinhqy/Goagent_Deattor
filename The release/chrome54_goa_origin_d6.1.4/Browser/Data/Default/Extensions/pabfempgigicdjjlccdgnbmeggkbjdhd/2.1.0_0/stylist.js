var style = document.createElement('style');
style.id = 'ChromeStylist-pabfempgigicdjjlccdgnbmeggkbjdhd';
var inited = false;
chrome.extension.sendMessage({href: location.href}, function (res) {
  style.appendChild(document.createTextNode(res.css));
  if (!inited) {
    (document.head || document.documentElement).appendChild(style);
    inited = true;
  }
});
const USER_STYLE_ORG = 'userstyles.org';
if (location.host === USER_STYLE_ORG) {
  document.addEventListener('DOMContentLoaded', function () {
    var point = document.querySelector('#style-install-chrome > p:last-child');
    if (!point) return;
    var p = point.cloneNode(false);
    point.parentNode.appendChild(p);
    var button = document.createElement('button');
    button.textContent = 'Install with Stylist';
    p.appendChild(button);
    button.addEventListener('click', function (evt) {
      var id = document.querySelector('#style-id').textContent.trim();
      chrome.extension.sendMessage({
        type: USER_STYLE_ORG,
        src: 'http://' + USER_STYLE_ORG + '/styles/' + id + '.css',
        name: document.querySelector('#stylish-description').textContent.trim(),
        original: location.href
      }, install_response);
    });
  }, false);
} else {
  document.addEventListener('DOMContentLoaded', function () {
    var css = document.querySelectorAll('a[href$=".user.css"]');
    for (var i = 0, len = css.length; i < len; i++) {
      var cs = css[i];
      cs.addEventListener('click', function (evt) {
        if (confirm('Install?')) {
          evt.preventDefault();
          chrome.extension.sendMessage({
            type: '.user.css',
            src: this.href
          }, install_response);
        }
      }, false);
    }
  }, false);
}
function install_response(res) {
  setTimeout(function(){
    alert(res);
  }, 10);
}
