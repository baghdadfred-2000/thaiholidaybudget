@echo off
REM Preview — start a local Netlify-style server for this site and open the browser.
cd /d "%~dp0"

where py >nul 2>nul && ( py "%~dp0Preview.py" & goto :eof )
where python >nul 2>nul && ( python "%~dp0Preview.py" & goto :eof )
where python3 >nul 2>nul && ( python3 "%~dp0Preview.py" & goto :eof )

echo Python was not found on your PATH.
echo Install it from https://www.python.org/downloads/ and tick "Add python.exe to PATH".
pause
