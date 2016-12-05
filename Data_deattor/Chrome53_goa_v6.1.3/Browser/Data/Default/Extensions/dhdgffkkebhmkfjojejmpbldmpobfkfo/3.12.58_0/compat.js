Registry.require(["helper"],function(){var l=Registry.get("helper"),k={mkCompat:function(a,c,b,d){if(c){if(c.options.compat_wrappedjsobject||d)a=k.unWrappedJsObjectify(a);if(c.options.compat_metadata||d)a=k.unMetaDataify(a);if(c.options.compat_foreach||d)a=k.unEachify(a);if(c.options.compat_arrayleft||d)a=k.unArrayOnLeftSideify(a);c.options.compat_forvarin&&(a=k.fixForVarXStatements(a))}b||(a=a.replace(/([\'\"]{1,1})use strict([\'\"]{1,1})/g,"$1use\u00a0strict$2"));return a},findPrototypes:function(a){if(-1!=
a.indexOf(".toSource("))return!0;var c="indexOf lastIndexOf filter forEach every map some slice".split(" "),b;for(b in c)if(-1!=a.indexOf("Array."+c[b]+"("))return!0},fixForVarXStatements:function(a){a=a.replace(/for[ \t.]*\([ \t.]*var/gi,"for (var");a=a.split("for (");for(var c=1;c<a.length;c++){var b=a[c],d=b.indexOf(")");if(-1!=d){var f=b.substr(0,d);if(-1!=f.search(/[ \r\n]*in[ \r\n]/)){var e=f.match(/^[ \r\n]*(?:var[ \r\n\t]*)*(.*?)[ \r\n]* in [ \r\n]*(.*?)$/);null==e||3>e.length||(f=e[1],e=
e[2],!f||!e||d>b.length||b.search(/\)[\n\r\t ]*\{/)!=d||(b="",b+="{     if (!"+e+".hasOwnProperty("+f+")) continue;",a[c]=a[c].replace("{",b)))}}}return a.join("for (")},unArrayOnLeftSideify:function(a){a=a.split("\n");for(var c in a){var b=a[c],d=b.replace(/[\t ]/g,""),f=d.search("]="),e=d.search("]=="),h=d.search("\\[");-1!=h&&""!=d.substr(0,h)&&(f=-1);if(-1!=f&&f!=e){var f="",e=b.search("="),e=b.substr(e+1,b.length-e-1),b="__narf"+c.toString(),f=f+("var "+b+" = "+e+";\n"),d=l.getStringBetweenTags(d,
"[","]=").split(","),g;for(g in d)e=d[g],""!=e.trim()&&(f+=e+" = "+b+"["+g+"];\n");a[c]=f}}return a.join("\n")},unEachify:function(a){a=a.replace(/for each[ \t]*\(/gi,"for each(");a=a.split("for each");for(var c=1;c<a.length;c++){var b=a[c];if("("!=b.substr(0,1))a[c]=" each"+a[c];else{var b=l.getStringBetweenTags(b,"(",")"),d=b.split(" "),f=null,e=null,h=null,g;for(g in d)""!=d[g]&&"var"!=d[g]&&(f?e?h||(h=d[g]):e=d[g]:f=d[g]);f&&h?(d="var __kk in "+h,e="",e+="{\n    if (!"+h+".hasOwnProperty(__kk)) continue;",
e+=" \n    var "+f+" = "+h+"[__kk];",a[c]=a[c].replace(b,d).replace("{",e)):a[c]=" each"+a[c]}}return a.join("for")},unMetaDataify:function(a){for(var c=a,b=c.indexOf("<><![CDATA[");-1!=b;){var d=c.substr(0,b),f=d.lastIndexOf("\n"),e="";-1!=f&&(e=d.substr(f,d.length-f));c=c.substr(b,c.length-b);b=e.indexOf("/*");e=e.indexOf("//");-1==b&&-1==e&&(b=e=l.getStringBetweenTags(c,"<><![CDATA[","]]\x3e</>"),b=b.replace(/\\/g,"\\\\"),b=b.replace(/\"/g,'\\"').replace(/\n/g,'\\n" + \n"'),b=b.replace(/^\n/g,
"").replace(/\n$/g,""),b=b.replace(/\r/g,""),a=a.replace("<><![CDATA["+e+"]]\x3e</>",'(new CDATA("'+b+'"))'));c=c.substr(1,c.length-1);b=c.indexOf("<><![CDATA[")}return a},unWrappedJsObjectify:function(a){a=a.split("\n");for(var c in a){var b=a[c].search(".wrappedJSObject");if(-1!=b){var d=a[c].search("\\/\\/");-1!=d&&d<b||(a[c]=a[c].replace(/\.wrappedJSObject/g,""))}}return a.join("\n")}};Registry.register("compat","58",function(){return k})});
