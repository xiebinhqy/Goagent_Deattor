Registry.require(["promise","icon","helper"],function(){var r=Registry.get("promise"),t=Registry.get("icon"),u=Registry.get("helper"),h=!1,s=function(){var a={},c=null,f=0;return{init:function(){var e=function(a){c=a||"unknown";h&&console.log("notify: chronos level",a)};rea.notifications.supported?(rea.notifications.getPermissionLevel(e),rea.notifications.onPermissionLevelChanged.addListener(e),rea.notifications.onClicked.addListener(function(b){h&&console.log("notify: chronos click",b);a[b]&&(a[b].cb.click&&
a[b].cb.click(),a[b].cancel(),delete a[b])}),rea.notifications.onClosed.addListener(function(b){h&&console.log("notify: chronos close",b);a[b]&&a[b].cb.close&&a[b].cb.close();delete a[b]})):e("unsupported")},create:function(e,b,q){var d=r(),m=10,n=function(){if(c)if("granted"==c){var g={nid:null,cb:{},on:function(a,b){g.cb[a]=b},cancel:function(){},show:function(){var c={type:"basic",title:b||"",message:q||""};c.iconUrl=0==f?e:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
var k=u.createUUID();rea.notifications.create(k,c,function(){rea.runtime.lastError?1>f?(h&&console.log("notify: chronos creating failed, retry...",rea.runtime.lastError),f++,g.show()):(h&&console.log("notify: chronos creating finally failed",rea.runtime.lastError),d.reject()):(h&&console.log("notify: chronos created",k),g.cancel=function(){a[k]&&rea.notifications.clear(k,function(){})},a[k]=g)})}};d.resolve(g)}else d.resolve();else{var l=function(){c?n():m--?window.setTimeout(l,200):d.resolve()};
l()}};n();return d.promise()}}}(),p={notify:function(a,c,f,e,b){var q=!1;b||(q=!0,b=function(){});var d=null,m=!1,n=!1,g=null,l,p=function(){g&&window.clearTimeout(g);m||b({});n=!0},k=function(){m=!0;var a={clicked:m};b&&b(a);d&&d.cancel()};f=f||rea.extension.getURL("images/icon128.png");t.getDataUriFromUrl(f).then(function(a){l=a;return r.Pledge()}).then(function(){return s.create(l,a,c)}).then(function(b){var d=r();if(!b)try{var e=rea.other.webkitNotifications.createNotification(l,a||"",c||"");
b={on:function(a,b){e["on"+a]=b},cancel:function(){n||e.cancel()},show:function(){e.show()}}}catch(f){console.warn("notify: Notification creation failed with: "+f.message),b={cb:{},on:function(a,c){b.cb[a]=c},cancel:function(){},show:function(){q||window.setTimeout(function(){confirm((a?a+"\n\n":"")+c)?b.cb.click&&b.cb.click():b.cb.close&&b.cb.close()},1)}}}d.resolve(b);return d.promise()}).then(function(b){d=b;d.on("close",p);d.on("click",k);g=window.setTimeout(function(){g=null;d.cancel()},e?e:
6E5);h&&console.debug("notify:",a,c,f,e);d.show()});return{cancel:function(){d&&d.cancel()}}},showUpdate:function(a,c,f,e){return p.notify(a,c,f,3E5,e)},show:function(a,c,f,e,b){return p.notify(a,c,f,e,b)},highlight:function(a,c){rea.tabs.highlight({tabs:a},c)},debug:function(a){h=a}};Registry.register("notify","58",function(){s.init();return p})});
