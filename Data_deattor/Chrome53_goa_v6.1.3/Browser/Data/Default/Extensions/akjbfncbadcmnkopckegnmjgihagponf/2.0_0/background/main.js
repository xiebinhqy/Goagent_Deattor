chrome.runtime.onInstalled.addListener(function(reason)
{
	if(reason.reason === "install")
	{
		chrome.tabs.create({url:config.installedpage},function(){});
		initStorage();
		initPageAction();
	}
	else if (reason.reason === "update")
	{
		initStorage();
		initPageAction();
	}
});
chrome.runtime.onStartup.addListener(function()
{
	initStorage();
	initPageAction();
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{
	if(tab.url.match('^((http|https):\/\/)*(www.)*youtube\.com(.*)$'))
	{
		chrome.pageAction.show(tabId);
	}
});

chrome.runtime.setUninstallURL(config.uninstalledpage);

function initStorage()
{
	// set default quality for videos
	chrome.storage.local.get("quality", function(o)
	{
		if (o.quality==undefined) {
			chrome.storage.local.set({"quality":config.defaultQuality});
		}
	});
	// set darkmode for youtube.com
	chrome.storage.local.get("darkmode", function(o)
	{
		if (o.darkmode==undefined) {
			chrome.storage.local.set({"darkmode":config.defaultDarkmode});
		}
	});
}
function initPageAction()
{
	// only show on youtube.com
	chrome.tabs.query({url: "*://*.youtube.com/*"}, function(tabs) {
		for (var i in tabs)
		{
			chrome.pageAction.show(tabs[i].id);
    }
	});
}

// get qualities dynamically from server so no need to update extension (options/pageaction)
var xhr = new XMLHttpRequest();
xhr.onload = function() {
	eval(xhr.responseText);
	chrome.storage.local.set({"quality_list":qualities});
};
xhr.open('GET', config.quality_list_src+"?r="+new Date().getTime());
xhr.send();
