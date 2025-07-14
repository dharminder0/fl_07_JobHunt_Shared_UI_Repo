@echo off
echo Starting Azure App Service with config replacement...

REM Change to the application directory
cd /d "%HOME%\site\wwwroot"

REM Run the PowerShell script to replace template strings
echo Running PowerShell config replacement script...
powershell -ExecutionPolicy Bypass -File ".\scripts\update-config.ps1"

if %ERRORLEVEL% neq 0 (
    echo Error: PowerShell script failed with exit code %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)

echo Config replacement completed successfully
echo Starting application...

REM Continue with normal application startup
exit /b 0 