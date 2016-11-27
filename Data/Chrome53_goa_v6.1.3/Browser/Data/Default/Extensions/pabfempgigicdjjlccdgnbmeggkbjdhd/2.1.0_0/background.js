const NONE = 0;
const ALL = 1;
const PART = 2;
this.Stylists = [
  {
    "name": "demo",
    "src": "chrome.stylist.0",
    "match": {
      "pattern": "^http://ss-o\\.net/$"
    },
    "css": "h1:before{content:'Hello! ';}"
  },
  {
    "name": "LDR simple",
    "src": "chrome.stylist.1",
    "match": {
      "pattern": "^http://reader\\.livedoor\\.com/reader/"
    },
    "css": "* {\n  font-family: \"Lucida Grande\", \"Trebuchet MS\", sans-serif !important;\n}\n\npre, code, kbd, samp, var {\n  font-family: \"Monaco\", \"Andale Mono\", monospace !important;\n} \n\n.body img {\n  max-width: 100% !important;\n}\n\n.channel {\n  background-color: #ffffff !important;\n}\n\n.channel a {\n  color: #000000 !important;\n}\n\n.title {\n  font-size: 30px !important;\n}\n\n.channel_toolbar {\n  padding-bottom: 1em !important;\n  border-bottom: 1px solid #000000 !important;\n  background-color: #ffffff !important;\n}\n\n.item {\n  border-bottom: 1px solid #000000 !important;\n}\n\n.even {\n  background-color: #ffffff !important;\n}\n\n.hilight {\n  background-color: #ffffff !important;\n}\n\n.item_title {\n  font-size: 18px !important;\n}\n\n.adsWrapper {\n  margin: 0 !important;\n}\n"
  }
];
this.Config = {
  status_icon: PART
}
this.cache = {};

if (localStorage.Stylists) {
  Stylists = JSON.parse(localStorage.Stylists);
  var uniq = {};
  Stylists.forEach(function (styl, index) {
    styl.id = index;
    if (styl.src.indexOf('chrome.stylist.') === 0) {
      if (uniq[styl.src] === undefined) {
        uniq[styl.src] = index;
      }
      styl.src = 'chrome.stylist.' + uniq[styl.src];
    }
  });
} else {
  localStorage.Stylists = JSON.stringify(Stylists);
}
if (localStorage.Config) {
  Config = JSON.parse(localStorage.Config);
} else {
  localStorage.Config = JSON.stringify(Config);
}
this.indexStylist = Stylists.length;
var meta_def = {
  "name": 1,
  "namespace": 1,
  "match-type": 1,
  "match-pattern": 1,
  "src": 1
};
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.href) {
    if (Config.status_icon === ALL) {
      chrome.pageAction.show(sender.tab.id);
    }
    var css = getStyle(request.href);
    if (css) {
      sendResponse({css: css});
      if (Config.status_icon === PART) {
        chrome.pageAction.show(sender.tab.id);
      }
    }
  } else if (request.src) {
    var xhr = new XMLHttpRequest();
    var src = request.src;
    xhr.open('GET', src, true);
    xhr.onload = function () {
      var css = xhr.responseText;
      var res = false;
      if (request.type === '.user.css') {
        res = usercss_parser(css, src);
      } else if (request.type === 'userstyles.org') {
        res = userstyles_parser(css, src, request);
      }
      if (res) {
        sendResponse(res);
      } else {
        sendResponse('Sorry, install was failed.');
      }
    };
    xhr.onerror = function () {
      console.error(xhr);
    };
    xhr.send(null);
    return true;
  }
});
function userstyles_parser(css, src, info) {
  var __i = Stylists.length;
  var isUpdate = false;
  while (__i--) {
    if (Stylists[__i].src === info.src) {
      Stylists.splice(__i, 1);
      isUpdate = true;
    }
  }
  var comments = [];
  var _css = css.replace(/\/\*[\s\S]*?\*\//g, function (_, _c) {
    comments.push(_);
    return '/*####COMMENT' + (comments.length - 1) + '####*/';
  });
  var parts = _css.split('@-moz-document');
  var isInstall = false;
  var global_styles = [];
  parts.forEach(function (part, index) {
    if (index === 0) {
      if (/{[^}]*}/.test(part)) {
        global_styles.push(part.replace(/@namespace\s+(\w*\s+)?url\(['"]?([^'")]*)['"]?\);/, ''));
      }
      return;
    }
    var start = part.indexOf('{');
    var end = part.lastIndexOf('}');
    var meta_text = part.substring(0, start);
    var css_text = part.substring(start + 1, end);
    var _global = part.substring(end + 1).trim();
    if (_global && /{[^}]*}/.test(_global)) {
      global_styles.push(_global);
    }
    if (!meta_text || !css_text) return;
    var prefixs = [], tmp;
    var e_prefix = /url-prefix\(['"]?([^'")]*)['"]?\)/g;
    while ((tmp = e_prefix.exec(meta_text))) {
      prefixs.push(tmp[1].trim());
    }
    var domains = [];
    var e_domain = /domain\(['"]?([^'")]*)['"]?\)/g;
    while ((tmp = e_domain.exec(meta_text))) {
      domains.push(tmp[1].trim());
    }
    var urls = [];
    var e_url = /url\(['"]?([^'")]*)['"]?\)/g;
    while ((tmp = e_url.exec(meta_text))) {
      urls.push(tmp[1].trim());
    }
    var regs = [];
    var e_reg = /regexp\(['"]?([^'")]*)['"]?\)/g;
    while ((tmp = e_reg.exec(meta_text))) {
      regs.push(tmp[1].trim());
    }
    var patterns = [], plains = [];//, match_type = 'prefix';
    if (prefixs.length) {
      patterns.push('^(' + prefixs.map(function (s) {
        return s.replace(/\W/g, '\\$&')
      }).join('|') + ')');
      prefixs.forEach(function (v) {
        plains.push({type: 'prefix', value: v});
      });
    }
    if (domains.length) {
      patterns.push('^https?://[^/]*(' + domains.map(function (s) {
        return s.replace(/\W/g, '\\$&')
      }).join('|') + ')/');
      domains.forEach(function (v) {
        plains.push({type: 'domain', value: v});
      });
      //match_type = 'domain';
    }
    if (urls.length) {
      patterns.push('^' + urls.map(function (s) {
        return s.replace(/\W/g, '\\$&')
      }).join('$|^') + '$');
      urls.forEach(function (v) {
        plains.push({type: 'url', value: v});
      });
      //match_type = 'url';
    }
    if (regs.length) {
      patterns.push.apply(patterns, regs);
      regs.forEach(function (v) {
        plains.push({type: 'regexp', value: v});
      });
    }
    if (!plains.length) {
      return;
    }
    var _info = clone(info);
    _info.match = {
      pattern: '(' + patterns.join('|') + ')', plains: plains
      //,type:match_type
    };
    _info.css = css_text.replace(/\/\*####COMMENT(\d*)####\*\//g, function (_, _s) {
      return comments[_s] || '';
    });
    _info.id = indexStylist++;
    Stylists.push(_info);
    isInstall = true;
  });
  if (global_styles.length) {
    var _info = clone(info);
    _info.match = {
      pattern: '.', plains: [], global: true
    };
    _info.css = global_styles.join('\n').replace(/\/\*####COMMENT(\d*)####\*\//g, function (_, _s) {
      return comments[_s] || '';
    });
    _info.id = indexStylist++;
    Stylists.push(_info);
    isInstall = true;
  }
  if (isInstall) {
    localStorage.Stylists = JSON.stringify(Stylists);
    //localStorage.indexStylist = String(indexStylist);
    return isUpdate ? info.name + ' is updated.' : info.name + ' is now installed.';
  }
}
function usercss_parser(css, src) {
  var rows = css.split(/[\n\r]+/g);
  var metainf = {}, _begin = false;
  rows.some(function (txt) {
    if (/==UserStyle==/.test(txt)) {
      _begin = true;
    } else if (_begin) {
      if (/==\/UserStyle==/.test(txt)) {
        return true;
      } else {
        var meta = txt.match(/^\/\/\s*@([-\w]+)\s+(.*)/);
        if (meta && meta_def[meta[1]]) {
          metainf[meta[1]] = meta[2];
        }
      }
    }
  });
  if (metainf.name) {
    var check, index = -1;
    check = Stylists.some(function (sty, i) {
      index = i;
      return sty.name === metainf.name;
    });
    var type = 'prefix';
    var pattern = '^https?://';
    if (metainf['match-type']) {
      type = metainf['match-type'];
      delete metainf['match-type'];
    }
    if (metainf['match-pattern']) {
      pattern = metainf['match-pattern'];
      delete metainf['match-pattern'];
    }
    if (!metainf['src'] || metainf['src'].indexOf('http') !== 0) {
      metainf.src = request.src;
    }
    if (type === 'prefix') {
      pattern = '^' + pattern.replace(/\W/, '\\$&');
    }
    metainf.match = {
      pattern: pattern,
      plains: [pattern],
      type: type
    };
    metainf.css = css;
    metainf.id = indexStylist++;
    if (check) {
      Stylists[index] = metainf;
    } else {
      Stylists.push(metainf);
    }
    localStorage.Stylists = JSON.stringify(Stylists);
    return 'installed';
  }
}
function getStyle(url) {
  var css = [];
  Stylists.forEach(function (style) {
    if (!style.disabled && new RegExp(style.match.pattern).test(url)) {
      css.push(style.css);
    }
  });
  return css.join('\n');
}
function clone(o) {
  return JSON.parse(JSON.stringify(o));
}
get_manifest(function (manifest) {
  window.Manifest = manifest;
});
function get_manifest(callback) {
  var url = './manifest.json';
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(JSON.parse(xhr.responseText));
  };
  xhr.open('GET', url, true);
  xhr.send(null);
}
