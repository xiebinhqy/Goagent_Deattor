// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("quality");
  var quality = select.children[select.selectedIndex].value;
  chrome.storage.local.set({"quality":quality});
  var darkmode = document.getElementById("darkmode").checked;
  chrome.storage.local.set({"darkmode":darkmode});
  
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  chrome.storage.local.get("quality", function(o)
  {
    if (o.quality==undefined) {
      return;
    }
    var select = document.getElementById("quality");
    for (var i = 0; i < select.children.length; i++) {
      var child = select.children[i];
      if (child.value == o.quality) {
        child.selected = "true";
        break;
      }
    }
  });
  chrome.storage.local.get("darkmode", function(o)
  {
    var darkmode = false;
    if (o.darkmode==undefined) {
      darkmode = false;
    }
    var darkmodeInput = document.getElementById("darkmode").checked = o.darkmode;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

chrome.storage.local.get("quality_list", function(o) {
  var quality_select = document.getElementById("quality");
  quality_select.innerHTML = "";
  
  for(i in o.quality_list) {
    var name = o.quality_list[i].name;
    var value = o.quality_list[i].value;
    var option = document.createElement("option");
    option.text = name;
    option.value = value;
    quality_select.appendChild(option);
  }
  restore_options();
});