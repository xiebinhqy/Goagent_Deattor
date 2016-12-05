BG = chrome.extension.getBackgroundPage();
Stylists = BG.Stylists;
Config = BG.Config;
indexStylist = BG.indexStylist;
_cache = BG.cache, cache = {};
log = function (a) {
  BG.console.log(a);
}
chrome.tabs.getSelected(null, function (tab) {
  try {
    var url = tab.url.replace(/[?#].*/, '');
    var add = document.getElementById('add_style');
    var add_style = function () {
      var id = ++indexStylist;
      BG.indexStylist = indexStylist;
      var _url = (tab.url.indexOf('?') > 0) ? tab.url.slice(0, tab.url.indexOf('?')) : tab.url;
      var styl = {
        name: cache.name || '',
        match: {
          //type:'prefix',
          pattern: '',
          plains: [
            {type: 'prefix', value: _url}
          ]
        },
        css: cache.css || '',
        src: 'chrome.stylist.' + id,
        id: id
      };
      var button = create_style_list(styl, id);
      while (right_box.firstChild) right_box.removeChild(right_box.firstChild);
      create_style_form(styl, undefined, button);
    };
    add.addEventListener('click', add_style, false);
    var right_box = document.getElementById('right_box');
    var style_list = document.getElementById('style_list');
    var Dup = {};
    Stylists.filter(function (style) {
      if (new RegExp(style.match.pattern).test(tab.url)) {
        return true;
      }
    }).forEach(create_style_list);
    function create_style_list(styl, index) {
      var button;
      if (styl.src && Dup[styl.src]) {
        button = Dup[styl.src];
        button.addEventListener('click', function () {
          create_style_form(styl, index, button, true);
        }, false);
        return;
      }
      var li = document.createElement('li');
      button = document.createElement('button');
      button.textContent = styl.name;
      button.id = 'button_' + styl.name.replace(/\W/g, '-');
      if (styl.src) {
        Dup[styl.src] = button;
      }
      button.addEventListener('click', function () {
        while (right_box.firstChild) right_box.removeChild(right_box.firstChild);
        create_style_form(styl, index, button);
      }, false);
      li.appendChild(button);
      style_list.appendChild(li);
      return button;
    }

    if (tab.url.indexOf('chrome') === 0 || tab.url.indexOf('https://chrome.google.com/extensions') === 0) {
      right_box.innerHTML = '<h5 style="text-align:center;"></h5>';
      right_box.firstChild.textContent = 'Sorry, ' + tab.url + ' is not supported';
      return;
    }
    if (_cache[url]) {
      cache = _cache[url];
    } else {
      _cache[url] = cache;
    }
//create_style_form({name:'',match:{type:'prefix', pattern:tab.url.replace(/[?#].*/,'')},css:''});
    add_style();
    function create_style_form(styl, index, button, notitle) {
      if (!notitle) {
        var h3 = document.createElement('h3');
        var name = document.createElement('input');
        name.type = 'text';
        name.value = styl.name;
        name.id = 'current_name';
        name.placeholder = 'input here name';
        name.addEventListener('input', function (e) {
          button.textContent = name.value;
          cache.name = name.value;
        }, false)
        h3.appendChild(name);
        var addset = document.createElement('button');
        addset.textContent = 'new style set';
        addset.addEventListener('click', function () {
          var new_style = clone(styl);
          new_style.match = {type: 'prefix', pattern: '', plains: ['']};
          new_style.css = '';
          delete new_style.id;
          create_style_form(new_style, undefined, button, true);
        }, false);
        var deleteAll = document.createElement('button');
        deleteAll.textContent = 'delete ALL';
        deleteAll.addEventListener('click', function () {
          if (confirm('Are sure you want to delete this style? There is NO undo!')) {
            var src = styl.src;
            BG.Stylists = Stylists = Stylists.filter(function (_sty, i) {
              if (_sty.src === src) {
                styl.deleted = true;
                return false;
              } else {
                return true;
              }
            });
            localStorage.Stylists = JSON.stringify(Stylists);
            var li = $X('parent::li[parent::ul]', button)[0];
            if (li && li.parentNode) {
              li.parentNode.removeChild(li);
            }
            while (right_box.firstChild) right_box.removeChild(right_box.firstChild);
          }
        }, false);
        right_box.appendChild(h3);
        //right_box.appendChild(addset);
        //right_box.appendChild(deleteAll);
        if (styl.original) {
          var a = document.createElement('a');
          a.href = styl.original;
          a.target = '_blank';
          a.textContent = 'original';
          right_box.appendChild(a);
        }
      }
      if (!styl.match.plains) {
        styl.match.plains = [
          {type: 'regexp', value: styl.match.pattern}
        ];
      }
      var field = document.createElement('fieldset');
      var h4 = document.createElement('h4');
      h4.textContent = 'style set';
      field.appendChild(h4);
      var div1 = document.createElement('div');
      field.appendChild(div1);
      var _select = document.createElement('select');
      _select.className = 'match';
      var opt_pre = document.createElement('option');
      opt_pre.value = 'prefix';
      opt_pre.label = 'prefix';
      var opt_reg = document.createElement('option');
      opt_reg.value = 'regexp';
      opt_reg.label = 'regexp';
      var opt_dom = document.createElement('option');
      opt_dom.value = 'domain';
      opt_dom.label = 'domain';
      _select.appendChild(opt_pre);
      _select.appendChild(opt_dom);
      _select.appendChild(opt_reg);
      var _plains = styl.match.plains.slice();
      var rule_add = document.createElement('button');
      rule_add.textContent = 'add Rule';
      rule_add.className = 'patterns addrule';
      rule_add.addEventListener('click', function (evt) {
        var rule = {type: 'prefix', value: ''};
        _plains.push(rule);
        create_rule(rule, _plains.length - 1);
      }, false);
      var rule_box = document.createElement('div');
      //rule_box.appendChild(rule_add);
      field.appendChild(rule_box);
      var rules = [];
      var LABEL = {prefix: 'URL Prefix', domain: 'Site Domain', regexp: 'URL RegExp', global: ''};
      field.className = styl.match.type;
      var global = document.createElement('input');
      global.type = 'checkbox';
      global.id = 'global_checkbox' + index;
      if (!styl.match.global && styl.match.type === 'global') {
        styl.match.global = true;
        delete styl.match.type;
      }
      global.checked = !!styl.match.global;
      global.addEventListener('click', function () {
        if (global.checked) {
          rule_box.style.display = 'none';
        } else {
          rule_box.style.display = 'block';
        }
      }, false);
      if (global.checked) {
        rule_box.style.display = 'none';
      } else {
        rule_box.style.display = 'block';
      }
      var global_label = document.createElement('label');
      global_label.textContent = 'All site';
      global_label.htmlFor = 'global_checkbox' + index;
      //div1.appendChild(global);
      //div1.appendChild(global_label);
      var rule_ul = document.createElement('ul');
      rule_box.appendChild(rule_ul);
      var create_rule = function (plain, _i, plains) {
        if (plain.del) return;
        if (!plain.type) {
          var _plain = plain;
          plain = {type: 'prefix', value: _plain};
          plains[_i] = plain;
        }
        var rule_list = document.createElement('li');
        var select = _select.cloneNode(true);
        select.addEventListener('change', function () {
          pattern.placeholder = LABEL[select.value];
          plain.type = select.value;
        }, false);
        select.value = plain.type;
        select.disabled = true;
        var pattern = document.createElement('input');
        if (plain.type === 'global') {
          pattern.type = 'hidden';
        } else {
          pattern.type = 'text';
        }
        pattern.placeholder = LABEL[plain.type];
        pattern.className = 'patterns input';
        pattern.value = plain.value;
        rule_list.appendChild(select);
        rule_list.appendChild(pattern);
        pattern.addEventListener('change', function () {
          plain.value = pattern.value;
        }, false);
        rules.push({pattern: pattern, type: select, plain: plain});
        var del = document.createElement('button');
        del.textContent = 'del';
        del.className = 'patterns del';
        var isDel = false;
        //rule_list.appendChild(del);
        del.addEventListener('click', function () {
          isDel = !isDel;
          if (isDel) {
            pattern.disabled = true;
            del.textContent = 'Undo';
          } else {
            pattern.disabled = false;
            del.textContent = 'del';
          }
        });
        rule_ul.appendChild(rule_list);
      };
      _plains.forEach(create_rule);
      var css = document.createElement('textarea');
      css.value = styl.css;
      css.placeholder = 'Stylesheet Text';
      css.addEventListener('input', function () {
        cache.css = css.value;
      });
      field.appendChild(css);
      var apply = document.createElement('button');
      apply.textContent = 'Apply';
      apply.addEventListener('click', function () {
        var _css = css.value;
        var js = function (css) {
          var style;
          if (!(style = document.querySelector('#chrome_stylist_preview_style'))) {
            style = document.createElement('style');
            style.id = 'chrome_stylist_preview_style';
            document.head.appendChild(style);
          }
          style.textContent = css;
        };
        chrome.tabs.executeScript(tab.id, {code: '(' + String(js) + ')(' + JSON.stringify(_css) + ');'});
      }, false);
      field.appendChild(apply);
      var save = document.createElement('button');
      save.textContent = 'Save';
      save.addEventListener('click', function () {
        var regs = [], errors = [];
        if (global.checked) {
          regs = ['.'];
          _plains = [];
          styl.match.global = true;
        } else {
          styl.match.global = false;
          rules.forEach(function (rule, i) {
            console.log(rule.pattern, rule.plain);
            if (rule.pattern.disabled) {
              //_plains.splice(i,1);
              rule.plain.del = true;
              return;
            }
            rule.plain.del = false;
            var plain = rule.plain;
            if (!plain.value) {
              errors.push({message: 'cannot blank pattern', element: rule.pattern});
            }
            if (plain.type === 'regexp') {
              regs.push(plain.value);
            } else if (plain.type === 'prefix') {
              regs.push('^(' + plain.value.replace(/\W/g, '\\$&') + ')');
            } else if (plain.type === 'domain') {
              regs.push('^https?://[^/]*' + plain.value.replace(/\W/g, '\\$&') + '/');
            } else if (plain.type === 'url') {
              regs.push('^' + plain.value.replace(/\W/g, '\\$&') + '$');
            } else if (plain.type === 'global') {
              regs.push('.');
            }
          });
        }
        if (errors.length) {
          errors[0].element.focus();
          return;
        }
        if (!regs.length) {
          message.textContent = 'Rule cannot be blank!';
          setTimeout(function () {
            message.textContent = '';
          }, 3000);
          field.querySelector('button.del,button.addrule').focus();
          return;
        }
        styl.match.plains = _plains;
        var _name = name || document.getElementById('current_name');
        if (!_name.value) {
          message.textContent = 'Name cannot be blank!';
          setTimeout(function () {
            message.textContent = '';
          }, 3000);
          _name.focus();
          return;
        }
        styl.css = css.value;
        styl.name = _name.value;
        //styl.match.type = select.value;
        styl.match.pattern = regs.join('|');
        if (index === undefined || styl.deleted) {
          index = Stylists.length;
          styl.id = indexStylist++;
          BG.indexStylist = indexStylist;
          styl.deleted = false;
          Stylists.push(styl);
        }
        localStorage.Stylists = JSON.stringify(Stylists);
        message.textContent = 'Saved!';
        setTimeout(function () {
          message.textContent = '';
        }, 3000);
      }, false);
      field.appendChild(save);
      var del = document.createElement('button');
      del.textContent = 'Delete';
      del.addEventListener('click', function (evt) {
        //if (index >= 0) {
        right_box.removeChild(field);
        if (!document.querySelector('#right_box > fieldset')) {
          var li = $X('parent::li[parent::ul]', button)[0];
          if (li && li.parentNode) {
            li.parentNode.removeChild(li);
          }
          while (right_box.firstChild) right_box.removeChild(right_box.firstChild);
        }
        Stylists.some(function (_sty, i) {
          if (_sty.id === styl.id) {
            Stylists.splice(i, 1);
            styl.deleted = true;
            return true;
          }
        });
        localStorage.Stylists = JSON.stringify(Stylists);
      });
      //field.appendChild(del);
      var message = document.createElement('span');
      field.appendChild(message);
      var search = document.createElement('button');
      search.textContent = 'search from userstyles.org';
      search.addEventListener('click', function () {
        //chrome.tabs.create({url:'http://userstyles.org/styles/browse/all/'+ encodeURIComponent(url)});
        log('http://userstyles.org/styles/browse/all/' + encodeURIComponent(url));
        window.open('http://userstyles.org/styles/browse/all/' + encodeURIComponent(url));
      }, false);
      field.appendChild(search);
      right_box.appendChild(field);
    }

    function clone(o) {
      return JSON.parse(JSON.stringify(o));
    }
  } catch (e) {
    log(e);
  }
});
