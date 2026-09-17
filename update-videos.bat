@echo off
setlocal
title BunBunGram - Update Videos
cd /d "%~dp0"

echo.
echo ======================================
echo          BunBunGram Updater
echo ======================================
echo.
echo Scanning the videos folder...
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0update-videos.ps1"

if errorlevel 1 (
    echo.
    echo ERROR: BunBunGram could not update the video list.
    echo Make sure the videos folder exists and try again.
    echo.
    pause
    exit /b 1
)

echo You can now redeploy or push BunBunGram.
echo.
pause
