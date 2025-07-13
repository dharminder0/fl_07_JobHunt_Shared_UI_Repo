# PowerShell script to replace environment variable placeholders in config.js
# This script should be run during Azure App Service deployment

param(
    [string]$ConfigFile = "config.js"
)

Write-Host "Updating configuration file: $ConfigFile"

# Read the config file
$content = Get-Content $ConfigFile -Raw

# Replace environment variable placeholders with actual values
$content = $content -replace '\$\{REACT_APP_API_BASE_URL\}', $env:REACT_APP_API_BASE_URL
$content = $content -replace '\$\{REACT_APP_API_BEARER\}', $env:REACT_APP_API_BEARER
$content = $content -replace '\$\{REACT_APP_REQUIREMENT_PROMPT_CODE\}', $env:REACT_APP_REQUIREMENT_PROMPT_CODE
$content = $content -replace '\$\{REACT_APP_BENCH_PROMPT_CODE\}', $env:REACT_APP_BENCH_PROMPT_CODE
$content = $content -replace '\$\{REACT_APP_API_TOKEN\}', $env:REACT_APP_API_TOKEN
$content = $content -replace '\$\{REACT_APP_NOTIFICATION_HUB\}', $env:REACT_APP_NOTIFICATION_HUB

# Write back to file
Set-Content -Path $ConfigFile -Value $content -NoNewline

Write-Host "Configuration file updated successfully"
Write-Host "API Base URL: $env:REACT_APP_API_BASE_URL"
Write-Host "Notification Hub: $env:REACT_APP_NOTIFICATION_HUB" 