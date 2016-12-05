'use strict';(function(f){function p(a){var c=f[a.codecClass],b=a.sn;if(h[b])throw Error("duplicated sn");h[b]={codec:new c(a.options),crcInput:"input"===a.crcType,crcOutput:"output"===a.crcType,crc:new k};postMessage({type:"newTask",sn:b})}function n(a){var c=a.sn,b=a.type,d=a.data,e=h[c];!e&&a.codecClass&&(p(a),e=h[c]);a="append"===b;var f=m(),g;if(a)try{g=e.codec.append(d,function(a){postMessage({type:"progress",sn:c,loaded:a})})}catch(k){throw delete h[c],k;}else delete h[c],g=e.codec.flush();
var l=m()-f,f=m();d&&e.crcInput&&e.crc.append(d);g&&e.crcOutput&&e.crc.append(g);d=m()-f;b={type:b,sn:c,codecTime:l,crcTime:d};d=[];g&&(b.data=g,d.push(g.buffer));a||!e.crcInput&&!e.crcOutput||(b.crc=e.crc.get());try{postMessage(b,d)}catch(n){postMessage(b)}}function k(){this.crc=-1}function l(){}if(f.zWorkerInitialized)throw Error("z-worker.js should be run only once");f.zWorkerInitialized=!0;addEventListener("message",function(a){a=a.data;var c=a.type,b=a.sn,d=q[c];if(d)try{d(a)}catch(e){postMessage({type:c,
sn:b,error:{message:e.message,stack:e.stack}})}});var q={importScripts:function(a){a.scripts&&0<a.scripts.length&&importScripts.apply(void 0,a.scripts);postMessage({type:"importScripts"})},newTask:p,append:n,flush:n},h={},m=f.performance?f.performance.now.bind(f.performance):Date.now;k.prototype.append=function(a){for(var c=this.crc|0,b=this.table,d=0,e=a.length|0;d<e;d++)c=c>>>8^b[(c^a[d])&255];this.crc=c};k.prototype.get=function(){return~this.crc};k.prototype.table=function(){var a,c,b,d=[];for(a=
0;256>a;a++){b=a;for(c=0;8>c;c++)b=b&1?b>>>1^3988292384:b>>>1;d[a]=b}return d}();f.NOOP=l;l.prototype.append=function(a,c){return a};l.prototype.flush=function(){}})(this);
