@Echo Off
Title ��OSC�ƶ˸��� Agent ���¿��� IP
cd /d %~dp0
set BackDir=..\..
wget --ca-certificate=ca-bundle.crt -c https://git.oschina.net//kebi2014/goagent-ip/raw/master/proxy.user.ini
del "..\Agent\proxy.user.ini_backup"
ren "..\Agent\proxy.user.ini"  proxy.user.ini_backup
copy /y "%~dp0proxy.user.ini" ..\Agent\proxy.user.ini
del "%~dp0proxy.user.ini"
ECHO.&ECHO.�Ѹ���������¿���IP,�밴������˳�,������Chrome+.exe����. &PAUSE >NUL 2>NUL