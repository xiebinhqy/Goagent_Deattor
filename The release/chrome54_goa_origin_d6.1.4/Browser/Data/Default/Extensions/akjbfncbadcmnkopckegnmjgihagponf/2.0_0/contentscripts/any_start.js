// youtube.com observer
var ytcomObserver = new MutationObserver(function(mut)
{
  for(km in mut)
  {
    for(kn in mut[km].addedNodes)
    {
      var i = mut[km].addedNodes[kn].id;
      var c = mut[km].addedNodes[kn].className;
      //if (i=="movie_player")
      if(mut[km].addedNodes[kn].nodeName=='BODY')
      {
        chrome.storage.local.get("quality", function(o)
        {
          if (o.quality!=undefined)
          {
            window.localStorage["ythd_quality"] = o.quality;
          }
          else
          {
            window.localStorage["ythd_quality"] = "hd1080";
          }
        });
        var yts = window.document.createElement("script");
        yts.type = "text/javascript";
        yts.src = chrome.extension.getURL("inj/ytcom.js");
        window.document.getElementsByTagName('body')[0].appendChild(yts);
        ytcomObserver.disconnect();
        
        chrome.storage.local.get("darkmode", function(o)
        {
          if (o.darkmode) {
            window.document.getElementsByTagName('body')[0].style.background = "#000000";
          }
        });
        
        break;
      }
    }
  }
});

// embedded video observer (experimental)
var embObserver = new MutationObserver(function(mut)
{
  for(km in mut)
  {
    for(kn in mut[km].addedNodes)
    {
      var i = mut[km].addedNodes[kn].id;
      //var c = mut[km].addedNodes[kn].className;
      //if (i=="movie_player")
      if(mut[km].addedNodes[kn].nodeName=='EMBED' || mut[km].addedNodes[kn].nodeName=='IFRAME')
      {
        if(mut[km].addedNodes[kn].src.match('^((http|https):\/\/)*(www.)*youtube\.com(.*)$'))
        {
          chrome.storage.local.get("quality", function(o)
          {
            if (o.quality!=undefined)
            {
              window.localStorage["ythd_quality"] = o.quality;
            }
            else
            {
              window.localStorage["ythd_quality"] = "hd1080";
            }
          });
          var yts = window.document.createElement("script");
          yts.type = "text/javascript";
          yts.src = chrome.extension.getURL("inj/emb.js");
          window.document.getElementsByTagName('body')[0].appendChild(yts);
          embObserver.disconnect();
          break;
        }
      }
    }
  }
});

//if(top.location.host.indexOf("youtube.com")!=-1)
if(top.location.href.match('^((http|https):\/\/)*(www.)*youtube\.com(.*)$'))
{
  ytcomObserver.observe(document,{"childList":true,"subtree":true,"characterData":true});
}
else
{
	//embedded?!
  //embObserver.observe(document,{"childList":true,"subtree":true,"characterData":true});
}
