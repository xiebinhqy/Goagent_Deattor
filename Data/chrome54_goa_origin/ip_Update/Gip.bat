@Echo Off
Title ��GitHub�ƶ˸���GoGoʹ�õ�ip���ļ�
cd /d %~dp0
set BackDir=..\..
wget --ca-certificate=ca-bundle.crt -c https://raw.githubusercontent.com/w365/gip/master/G.ip.txt
del "..\Agent\G.ip.txt_backup"
ren "..\Agent\G.ip.txt"  G.ip.txt_backup
copy /y "%~dp0G.ip.txt" ..\Agent\G.ip.txt
del "%~dp0G.ip.txt"
ECHO.&ECHO.�Ѹ������,�밴������˳� &PAUSE >NUL 2>NUL