@echo off
cd Browser
start chrome --user-data-dir=Data --allow-running-insecure-content --enable-easy-off-store-extension-install --disable-gpu --disable-software-rasterizer --disable-new-menu-style
cd ..\Agent\
agent
pause