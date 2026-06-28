@echo off
REM ── Initialize this folder as a git repo and push to GitHub ──
cd /d "%~dp0"

echo Cleaning any partial git state...
if exist ".git" rmdir /s /q ".git"

echo Initializing repository on branch main...
git init -b main

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: Thai Holiday Budget calculator site"

echo Adding remote origin...
git remote add origin https://github.com/baghdadfred-2000/thaiholidaybudget.git

echo Pushing to GitHub...
git push -u origin main

echo.
echo ================= VERIFICATION =================
echo --- git remote -v ---
git remote -v
echo.
echo --- git status ---
git status
echo ===============================================
pause
