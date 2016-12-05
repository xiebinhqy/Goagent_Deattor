window.requestFileSystem||(window.requestFileSystem=window.webkitRequestFileSystem);window.BlobBuilder||(window.BlobBuilder=window.WebKitBlobBuilder);
Registry.require("promise layout xmlhttprequest convert crcrc curtain layout/default/tabview layout/default/htmlutil helper i18n parser statistics layout/default/layout_helper".split(" "),function(){var F=rea.FEATURES,K=Registry.get("promise"),q=Registry.get("crcrc").cr,c=Registry.get("crcrc").crc,l=Registry.get("i18n"),x=Registry.get("curtain"),v=Registry.get("helper"),L=Registry.get("layout/default/tabview"),t=Registry.get("layout/default/htmlutil"),M=Registry.get("statistics"),C=Registry.get("layout"),
D=Registry.get("layout/default/layout_helper"),y=D.images;C.render(function(){D.addStyle();D.addFont();var m=null,G="???",z=null,H="0.0.0",A=function(){var a=document.getElementById("ask"),d=c("div","content_wrapper","ask","main");if(a){var b=a.parentNode;b.removeChild(a);b.appendChild(d);document.body.setAttribute("class","main")}var a=c("div","head_container","ask","head_container"),b=c("div","tv_container","ask","tv_container"),g=q("a","head_link","ask","head_link");g.href="http://tampermonkey.net";
g.target="_blank";var e=c("div","float","ask","head1"),f=c("img","banner","ask");f.src=rea.extension.getURL("images/icon128.png");var l=c("div","float head","ask","head2"),p=c("div","header_title","heading"),w=c("div","version","version","version");w.textContent=" by Jan Biniok";var k=q("div","search","box","");p.textContent="Tampermonkey";e.appendChild(f);l.appendChild(p);l.appendChild(w);g.appendChild(e);g.appendChild(l);a.appendChild(g);a.appendChild(k);d.appendChild(a);d.appendChild(b);d=L.create("_main",
b);a=q("div","main","main","tab_content_h");a.textContent=G;b=q("div","main","main","tab_content");d.appendTab(v.createUniqueId("main","main"),a,b).select();x.hide();return b},C=function(a){var d=a.script,b=c("div","viewer_bottom","bottom","");a=c("div","editor_400p_outer","editor",d.name);var g=c("div","editor_400p editor_border","editor",d.name);b.appendChild(a);a.appendChild(g);m.nocm?(a=c("textarea","editorta","editor",d.name),a.setAttribute("wrap","off"),g.appendChild(a),a.value=d.textContent):
window.setTimeout(function(){b.editor=new MirrorFrame(g,{value:d.textContent,noButtons:!0,matchBrackets:!0})},1);return b},N=function(){var a={};window.addEventListener("keydown",function(c){var b=!1;if("keydown"==c.type&&(a[c.keyCode]&&(b=a[c.keyCode](c)),b))return c.stopPropagation(),c.preventDefault(),!1},!0);return{registerListener:function(c,b){a[c]=b}}}(),B=function(a,d,b){v.select(b,function(a){return a.label}).forEach(function(b){var e=c("input",d,"tm",b.label);e.type="button";e.value=b.label;
e.addEventListener("click",b.fn);a.appendChild(e);b.focus&&window.setTimeout(function(){$(e).focus()},300);b.keyDown&&N.registerListener(b.keyDown.keyCode?b.keyDown.keyCode:b.keyDown,b.keyDown.cb?b.keyDown.cb:b.fn)})},Q=function(a){var d=a.script,b=c("div","viewer_last","install"),g=c("div","viewer_content","install_content"),e=c("div","ask_action_buttons","install_buttons"),f=[];f.push({label:a.messages.action,fn:O,focus:!0});F.RUNTIME.CHROME&&21>F.RUNTIME.BROWSER_VERSION&&f.push({label:a.messages.flags.install?
l.getMessage("Process_with_Chrome"):null,fn:function(){P(d.fileURL);$(b).hide()}});f.push({label:l.getMessage("Cancel"),fn:u,keyDown:27});B(e,"install",f);g.appendChild(e);b.appendChild(g);return b},R=function(a){var d=c("div","viewer_last","import"),b=c("div","viewer_content","import_content"),g=c("div","ask_action_buttons","import_buttons");B(g,"import",[{label:l.getMessage("Import"),fn:function(){var b=Object.keys(a.scripts);n(m.aid,"import",{data:{import_ids:b,global_settings:a.global_settings}})},
focus:!0},{label:l.getMessage("Cancel"),fn:u,keyDown:27}]);b.appendChild(g);d.appendChild(b);return d},S=function(a){a=c("div","viewer_last","ok");var d=c("div","viewer_content","ok_content"),b=c("div","ask_action_buttons","ok_buttons");B(b,"import",[{label:l.getMessage("Ok"),fn:u,focus:!0}]);d.appendChild(b);a.appendChild(d);return a},T=function(a,d){var b=c("div","viewer_last","ok"),g=c("div","viewer_content","ok_content"),e=c("div","ask_action_buttons","ok_buttons");B(e,"permission",[{label:l.getMessage("Ok"),
fn:function(){rea.permissions.request({permissions:[d.permission]},function(a){rea.runtime.lastError&&console.warn("notify: error on getting permission",d.permission+"!","reason:",rea.runtime.lastError.message);n(m.aid,"permission",{data:{granted:a,permission:d.permission}})})},focus:!0},{label:l.getMessage("Cancel"),fn:u,keyDown:27}]);g.appendChild(e);b.appendChild(g);var g=c("div","viewer_upper","permission"),e=c("div","viewer_info","general","permission"),f=c("div","viewer_content","general_content",
"permission"),r=q("h3","install","heading","permission"),p=c("span","message","heading","permission");r.textContent=d.title;p.textContent=d.message;f.appendChild(p);e.appendChild(r);e.appendChild(f);g.appendChild(e);a.appendChild(g);a.appendChild(b)},E=function(a,d){var b=a.preparat,g=a.content,e=b.script||{},f=e.uuid||e.id||e.name;b.short_info||(b.short_info=[]);var r=c("div","viewer_upper",f),p=c("div","viewer_info","general",f),w=c("div","viewer_content","general_content",f),k=q("h3","install",
"heading",f);if(e.icon||e.icon64){var h=q("img","version","heading",f);h.src=e.icon||e.icon64;k.appendChild(h)}h=q("span","name","heading",f);h.textContent=b.heading||e.name||"";k.appendChild(h);e.version&&(h=c("span","view_version","heading",f),h.textContent="v"==e.version[0]?"":"v",h.textContent+=e.version,k.appendChild(h));p.appendChild(k);d&&b.short_info.unshift({prop:"heading",value:b.messages.heading,label:l.getMessage("Action")});var m=c("table","script_desc",f);b.short_info.forEach(function(a){var b=
e[a.prop]||a.value;if(b||!d){var g=c("tr","script_desc",a.prop,f),k=c("td","script_desc",a.prop,f+"dt"),h=c("td","script_desc",a.prop,f+"dd");k.textContent=a.label?a.label:"";h.textContent=b||l.getMessage("_not_set_");g.appendChild(k);g.appendChild(h);m.appendChild(g)}});w.appendChild(m);var k=c("div","viewer_info","info",f),s;d?s=w:(s=c("div","viewer_content","info_content",f),h=q("h4","action","heading",f),h.textContent=b.messages.heading,s.appendChild(h));var n=0;["errors","warnings","info"].forEach(function(a){var c=
q("table",a,f+n);(b.messages[a]||[]).forEach(function(b){n++;var e=q("tr",a,f+n),d=q("td",a,f+"dt"+n),g=q("td",a,f+"dd"+n);"info"==a?b.label&&b.value?(d.textContent=b.label,g.textContent=b.value):(d.innerHTML='<img src="'+y.get("info")+'"></img>&nbsp;',g.innerHTML=t.safeTagsReplace(b).replace(/\n/,"<br />")):"warnings"==a?(d.innerHTML='<img src="'+y.get("critical")+'"></img>&nbsp;',g.innerHTML=t.safeTagsReplace(b).replace(/\n/,"<br />")):"errors"==a&&(d.innerHTML='<img src="'+y.get("error")+'"></img>&nbsp;',
g.innerHTML=t.safeTagsReplace(b).replace(/\n/,"<br />"));e.appendChild(d);e.appendChild(g);c.appendChild(e)});s.appendChild(c)});h=function(a,b,d,g){var k=q("table",a,f),h=0,r={};b.forEach(function(b){if(!(h>g||r[b])){r[b]=!0;var e=c("tr",a+"desc",b,f+h),l=c("td",a+"desc",b,f+h+"dt"),p=c("td",a+"desc",b,f+h+"dd");l.innerHTML=0==h?t.safeTagsReplace(d.label):"&nbsp;";p.innerHTML=h==g?'<span title="'+t.safeTagsReplace(d.warning)+'">...!</span>':t.safeTagsReplace(b);e.appendChild(l);e.appendChild(p);
k.appendChild(e);h++}});if(e.options&&(b=e.options.override&&e.options.override["use_"+a])&&b.length){b=c("tr",a+"desc","ovverride",f+h);var p=c("td",a+"desc","ovverride",f+h+"dt"),m=c("td",a+"desc","ovverride",f+h+"dd");p.innerHTML=0==h?t.safeTagsReplace(d.label):"&nbsp;";m.innerHTML=t.safeTagsReplace(" ("+l.getMessage("overwritten_by_user")+")");b.appendChild(p);b.appendChild(m);k.appendChild(b)}s.appendChild(k)};h("includes",(e.includes||[]).concat(e.matches||[]),{label:l.getMessage("Include_s__"),
warning:l.getMessage("Attention_Can_not_display_all_includes_")},5);h("excludes",e.excludes||[],{label:l.getMessage("Exclude_s__"),warning:l.getMessage("Attention_Can_not_display_all_excludes_")},3);p.appendChild(w);k.appendChild(s);r.appendChild(p);r.appendChild(k);g.appendChild(r);a.install&&g.appendChild(a.install(b));a.editor&&g.appendChild(a.editor(b))},P=function(a){n(m.aid,"abort");window.setTimeout(function(){window.location=a+"#bypass=true"},10)},u=function(a,c){n(m.aid,"abort");window.setTimeout(function(){window.close()},
100)},I=function(a,c){n(m.aid,"unload");z&&(window.clearInterval(z),z=null);window.removeEventListener("unload",I)};window.addEventListener("unload",I);var J=function(){window.location.search||window.location.hash?(m=v.getUrlArgs(),m.aid?(n(m.aid,"preparat").done(function(a){a.ext&&a.ext.version&&(H=a.ext.version);a.i18n&&l.setLocale(a.i18n);a.options&&a.options.statistics_enabled&&M.init("ask",H);G=l.getMessage("Install");var d=null;a.preparat&&("install"==a.type?d=function(){E({content:A(),preparat:a.preparat,
install:Q,editor:C})}:"install_error"==a.type?d=function(){E({content:A(),preparat:a.preparat,install:S},!0)}:"import"==a.type?d=function(){var b=A(),d=a.preparat;b.appendChild(R(d));if(d.global_settings){var e=c("div","viewer_upper",s),f=c("div","viewer_upper","global_settings"),r=c("div","viewer_info","general","global_settings"),p=c("div","viewer_content","general_content","global_settings"),m=q("h3","install","heading","global_settings"),k=q("img","version","heading","global_settings");k.src=
rea.extension.getURL("images/icon48.png");m.appendChild(k);k=q("span","name","heading","global_settings");k.textContent=l.getMessage("Global_Settings");m.appendChild(k);r.appendChild(m);var m=c("table","script_desc","global_settings"),k=c("tr","settings_desc","action","global_settings"),h=c("td","settings_desc","action","global_settingsdt"),n=c("td","settings_desc","action","global_settingsdd");h.textContent=l.getMessage("Action");n.textContent=l.getMessage("Global_settings_import");k.appendChild(h);
k.appendChild(n);m.appendChild(k);k=c("tr","settings_desc","warning","global_settings");h=c("td","settings_desc","warning","global_settingsdt");n=c("td","settings_desc","warning","global_settingsdd");h.innerHTML='<img src="'+y.get("critical")+'"></img>&nbsp;';n.textContent=l.getMessage("This_will_overwrite_your_global_settings_");k.appendChild(h);k.appendChild(n);m.appendChild(k);p.appendChild(m);r.appendChild(p);f.appendChild(r);e.appendChild(f);b.appendChild(e)}if(d.scripts)for(var s in d.scripts)e=
d.scripts[s],f=c("div","viewer_upper",s),E({content:f,preparat:e},!0),b.appendChild(f)}:"permission"==a.type&&(d=function(){T(A(),a.preparat)}),z=window.setInterval(U,6E4),d&&window.setTimeout(d,1))}).fail(function(){u()}),x.wait(l.getMessage("Please_wait___"))):u()):window.onhashchange=function(){J()}},U=function(){return n(m.aid,"ping",{bg:!0})},O=function(){return n(m.aid,"install")},n=function(a,c,b){b=b||{};var g=K();try{var e={aid:a,method:c};b.data&&v.each(b.data,function(a,c){e[c]=b.data[c]});
sendMessage({method:"askCom",data:e},function(a){b.bg||x.hide();a.error?("close"==a.action&&u(),g.reject(a)):g.resolve(a)});b.bg||x.wait(l.getMessage("Please_wait___"))}catch(f){console.warn("sS: "+f.message),g.reject()}return g.promise()};rea.extension.onMessage.addListener(function(a,c,b){if("confirm"==a.method)v.confirm(a.msg,function(a){b({confirm:a})});else if("showMsg"==a.method)v.alert(a.msg),b({});else return!1;return!0});J()})});
