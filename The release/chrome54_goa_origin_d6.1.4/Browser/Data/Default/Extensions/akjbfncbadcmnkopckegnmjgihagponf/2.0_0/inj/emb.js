var ythd_player = null;
var ythd_initPassed = false;
var ythd_stateListenerSet = false;

originReadyHandler = window.onYouTubePlayerReady || function(){};

function ytpStateChangedHandler(state)
{
  if(ythd_player==null)
  {
    ythd_player = ythd_getPlayer();
  }
  if (ythd_player!=null) {
    // tiny
    // small
    // medium
    // large
    // hd720
    // hd1080
    // hd1440
    // highres
    ythd_player.setPlaybackQuality(window.localStorage["ythd_quality"]);
    
    if(state === 1)
    {
      if (ythd_initPassed)
      {
        if(ythd_stateListenerSet) {
          ythd_player.removeEventListener('onStateChange', 'ytpStateChangedHandler');
          ythd_stateListenerSet = false;
        }
      }
      else
      {
        ythd_initPassed=true;
        ythd_player.pauseVideo();
      }
    }
    else if(state === 2 || state === 5)
    {
      ythd_player.playVideo();
    }
  }
}

function ythd_getPlayer(playerId)
{
  var p = null;
  for(i in window.document.getElementsByTagName('embed'))
  {
    var el = window.document.getElementsByTagName('embed')[i];
    //if(el.src.match('^((http|https):\/\/)*(www.)*youtube\.com(.*)\&playerapiid\='+playerId+'(.*)$'))
    if(el.getAttribute("flashvars").match('^(.*)playerapiid\='+playerId+'(.*)$'))
    {
      p = el;
      break;
    }
  }
  if(p==null)
  {
    for(i in window.document.getElementsByTagName('iframe'))
    {
      var el = window.document.getElementsByTagName('embed')[i];
      //if(el.src.match('^((http|https):\/\/)*(www.)*youtube\.com(.*)\&playerapiid\='+playerId+'(.*)$'))
      if(el.getAttribute("flashvars").match('^(.*)playerapiid\='+playerId+'(.*)$'))
      {
        p = el;
        break;
      }
    }
  }
  
  return p;
}

function ytpReadyHandler(playerId)
{
  if(playerId)
  {
    ythd_player = ythd_getPlayer(playerId);
    if(!ythd_stateListenerSet)
    {
      ythd_initPassed = false;
      ythd_stateListenerSet = true;
      ythd_player.addEventListener('onStateChange','ytpStateChangedHandler');
    }
    
    if(ythd_player.getPlayerState()!==-1)
    {
      //ythd_initPassed = true;
      ythd_player.pauseVideo();
    }
  }
  originReadyHandler(playerId);
}

window.onYouTubePlayerReady = window.ytpReadyHandler;
