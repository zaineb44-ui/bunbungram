@echo off
title BunBunGram - Update Videos
cd /d "%~dp0"
echo.
echo ==============================
echo       BunBunGram Updater
echo ==============================
echo.
where py >nul 2>nul
if %errorlevel%==0 (
  py generate_videos.py
) else (
  python generate_videos.py
)
echo.
echo Done. You can now deploy/push the BunBunGram folder.
echo.
pause
