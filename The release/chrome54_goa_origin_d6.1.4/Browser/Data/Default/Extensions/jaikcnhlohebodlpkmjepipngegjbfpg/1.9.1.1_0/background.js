function tabAction(tab, drag_data) {
  var new_idx = tab.index;
  if (drag_data.x_dir > 0) {
    ++new_idx;
  }
  var fg = (drag_data.y_dir == 1);
  var link;
  if (drag_data.selection.type == "text") {
    var engine = localStorage["search_engine"];
    link = engine + drag_data.selection.data;
  } else {
    link = drag_data.selection.data;
  }
  chrome.tabs.create({url: link, selected: fg, index: new_idx});
}

function dragAndGoListner(data) {
  if (data.message == 'drag_and_go') {
    chrome.tabs.getSelected(null, function(tab) {
      tabAction(tab, data)});
  }
}

function connectionHandler(port) {
  port.onMessage.addListener(dragAndGoListner);
}

function initSettings() {
  if (localStorage["search_engine"] == undefined) {
    var engine = "http://www.google.com/search?&q=";
    localStorage["search_engine"] = engine;
  }

  if (localStorage["alt_key"] == undefined) {
    localStorage["alt_key"] = "true";
  }

  if (localStorage["ctrl_key"] == undefined) {
    localStorage["ctrl_key"] = "true";
  }

  if (localStorage["restricted_distance"] == undefined) {
    localStorage["restricted_distance"] = 16;
  }

  // Disables gesture by default.
  if (localStorage["enable_gesture"] == undefined) {
    localStorage["enable_gesture"] = "false";
  }
}

initSettings();
chrome.extension.onConnect.addListener(connectionHandler);
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "get_options") {
      sendResponse({
          alt_key: localStorage["alt_key"],
          ctrl_key: localStorage["ctrl_key"],
          search_engine: localStorage["search_engine"],
          restricted_distance: localStorage["restricted_distance"],
          enable_gesture: localStorage["enable_gesture"],
          use_right_button: localStorage["use_right_button"]});
    }
  });
