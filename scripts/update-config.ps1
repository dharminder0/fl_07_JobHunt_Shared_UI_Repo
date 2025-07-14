# PowerShell script to replace template strings in config.js with Azure App Service environment variables
# This script runs on Azure App Service startup to inject runtime configuration

Write-Host "Starting config.js template replacement..."

# Define the path to config.js
$configPath = "D:\home\site\wwwroot\config.js"

# Check if config.js exists
if (-not (Test-Path $configPath)) {
    Write-Host "config.js not found at: $configPath"
    Write-Host "Looking for config.js in current directory..."
    
    # Try current directory
    $configPath = ".\config.js"
    if (-not (Test-Path $configPath)) {
        Write-Host "config.js not found in current directory either"
        exit 1
    }
}

Write-Host "Found config.js at: $configPath"

# Read the config.js file
$configContent = Get-Content $configPath -Raw

# Replace template strings with actual environment variable values
$replacements = @{
    '${REACT_APP_API_BASE_URL}' = $env:REACT_APP_API_BASE_URL
    '${REACT_APP_API_BEARER}' = $env:REACT_APP_API_BEARER
    '${REACT_APP_REQUIREMENT_PROMPT_CODE}' = $env:REACT_APP_REQUIREMENT_PROMPT_CODE
    '${REACT_APP_BENCH_PROMPT_CODE}' = $env:REACT_APP_BENCH_PROMPT_CODE
    '${REACT_APP_API_TOKEN}' = $env:REACT_APP_API_TOKEN
    '${REACT_APP_NOTIFICATION_HUB}' = $env:REACT_APP_NOTIFICATION_HUB
}

# Perform replacements
foreach ($key in $replacements.Keys) {
    $value = $replacements[$key]
    if ($value) {
        Write-Host "Replacing $key with $value"
        $configContent = $configContent.Replace($key, $value)
    } else {
        Write-Host "Warning: Environment variable for $key is not set"
    }
}

# Write the updated content back to config.js
Set-Content $configPath -Value $configContent

Write-Host "Config.js template replacement completed successfully!"
Write-Host "Updated config.js content:"
Get-Content $configPath 