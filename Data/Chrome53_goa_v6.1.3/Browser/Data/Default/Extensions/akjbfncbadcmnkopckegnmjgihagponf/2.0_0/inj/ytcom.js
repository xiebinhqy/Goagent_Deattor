// notes
//// qualities: 
////// tiny
////// small (240p)
////// medium (360p)
////// large (480p)
////// hd720
////// hd1080
////// hd1440
////// highres
//// states:
////// -1 unstarted
////// 0 ended
////// 1 playing
////// 2 paused
////// 3 buffering
////// 5 cued

var ythd_player = null;
var ythd_initPaused = false;
var ythd_videoId = null;
var ythd_stateListenerSet = false;
var ythd_done = false;

//originReadyHandler = window.onYouTubePlayerReady || function(){};


function initVideo()
{
  ythd_initPaused = false;
  ythd_stateListenerSet = false;
  ythd_done = false;
}

function ytpStateChangedHandler(state)
{
  if(ythd_player)
  {
    if(state!==-1 && !ythd_initPaused && !ythd_done)
    {
      ythd_initPaused=true;
      ythd_player.pauseVideo();
    }
    else if(ythd_initPaused && !ythd_done)
    {
      ythd_player.setPlaybackQuality(window.localStorage["ythd_quality"]);
      ythd_done = true;
      ythd_player.playVideo();
    }
  }
  
  //if(ythd_player==null)
  //{
  //  ythd_player = ythd_getPlayer();
  //}
  //if (ythd_player!=null) {
  //
  //  ythd_player.setPlaybackQuality(window.localStorage["ythd_quality"]);
  //  
  //  if(state === 1)
  //  {
  //    if (ythd_initPaused)
  //    {
  //      if(ythd_stateListenerSet)
  //      {
  //        ythd_player.removeEventListener('onStateChange', 'ytpStateChangedHandler');
  //        ythd_stateListenerSet = false;
  //      }
  //    }
  //    else
  //    {
  //      ythd_initPaused=true;
  //      ythd_player.pauseVideo();
  //    }
  //  }
  //  else if(state === 2 || state === 5)
  //  {
  //    if(ythd_initPaused)
  //    {
  //      ythd_player.removeEventListener('onStateChange', 'ytpStateChangedHandler');
  //      ythd_stateListenerSet = false;
  //      ythd_player.playVideo();
  //    }
  //  }
  //}
}

//function ytpQualityChangedHandler(a,b,c)
//{
//}
//
//function ytpErrorHandler(a,b,c)
//{
//}
//
//function ytpApiChangeHandler(a,b,c)
//{
//}

function ytpReadyHandler(player)
{
  if(player)
  {
    ythd_player = player;
  }
  else
  {
    ythd_player = ythd_getPlayer();
  }
  
  if(ythd_player)
  {
    if(!ythd_stateListenerSet)
    {
      ythd_stateListenerSet = true;
      ythd_player.addEventListener('onStateChange','ytpStateChangedHandler');
    }
    //ythd_player.addEventListener('onPlaybackQualityChange','ytpQualityChangedHandler');
    //ythd_player.addEventListener('onError','ytpErrorHandler');
    //ythd_player.addEventListener('onApiChange','ytpApiChangeHandler');
    
    if(ythd_player.getPlayerState()!==-1 && !ythd_initPaused)
    {
      ythd_initPaused = true;
      ythd_player.pauseVideo();
      ythd_player.setPlaybackQuality(window.localStorage["ythd_quality"]);
    }
  }
  //originReadyHandler(ythd_player);
}

function ythd_getPlayer()
{
  var p = null;
  if(window.videoPlayer)
  {
    for(var i in window.videoPlayer)
    {
      if(window.videoPlayer[i] && window.videoPlayer[i].setPlaybackQuality)
      {
        p = window.videoPlayer[i];
        break;
      }
    }
  }
  else
  {
    p = window.document.getElementById('movie_player') ||
        window.document.getElementById('movie_player-flash') ||
        window.document.getElementById('movie_player-html5') ||
        window.document.getElementById('movie_player-html5-flash');
  }
  return p;
}

var ythd_changeObserver = new MutationObserver(function(mut)
{
  if(window.ytplayer)
  {
    window.onYoutubePlayerReady = window.ytpReadyHandler;
    window.ytplayer.config.args.jsapicallback = 1;
    window.ytplayer.config.args.jsapicallback = 'ytpReadyHandler';
  }
    
  if(top.location.href.match('^((http|https):\/\/)*(www.)*youtube\.com\/watch\?(.*)$') && window.ytplayer && ythd_videoId!=window.ytplayer.config.args.video_id)
  {
    ythd_videoId = window.ytplayer.config.args.video_id;
    initVideo();
  }
  else if(!top.location.href.match('^((http|https):\/\/)*(www.)*youtube\.com\/watch\?(.*)$') && ythd_videoId!=null)
  {
    ythd_videoId = null;
  }
});

ythd_changeObserver.observe(document,{"childList":true,"subtree":true});
