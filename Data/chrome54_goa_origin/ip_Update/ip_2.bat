@Echo Off
Title 从OSC云端更新 Agent 最新可用 IP
cd /d %~dp0
set BackDir=..\..
wget --ca-certificate=ca-bundle.crt -c https://git.oschina.net//kebi2014/goagent-ip/raw/master/proxy.user.ini
del "..\Agent\proxy.user.ini_backup"
ren "..\Agent\proxy.user.ini"  proxy.user.ini_backup
copy /y "%~dp0proxy.user.ini" ..\Agent\proxy.user.ini
del "%~dp0proxy.user.ini"
ECHO.&ECHO.已更新完成最新可用IP,请按任意键退出,并重启Chrome+.exe程序. &PAUSE >NUL 2>NUL