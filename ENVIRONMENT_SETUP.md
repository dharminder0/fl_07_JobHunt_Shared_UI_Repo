# Environment Variables Setup Guide

This guide explains how to configure environment variables for the JobHunt React application using Azure App Service.

## 🔧 Configuration Methods

### Method 1: Build-time Variables (Current Setup)
Environment variables are injected during the build process and compiled into the React app.

### Method 2: Runtime Variables (Advanced)
Environment variables are replaced at runtime using the `config.js` file.

## 📋 Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | Backend API base URL | `https://your-api.azurewebsites.net/api/` |
| `REACT_APP_API_BEARER` | API authentication token | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...` |
| `REACT_APP_REQUIREMENT_PROMPT_CODE` | Requirement prompt code | `REQRMNT` |
| `REACT_APP_BENCH_PROMPT_CODE` | Bench prompt code | `RESUME` |
| `REACT_APP_API_TOKEN` | Additional API token | `your-api-token` |
| `REACT_APP_NOTIFICATION_HUB` | SignalR notification hub URL | `https://your-api.azurewebsites.net/notificationHub` |

## 🚀 Setup Instructions

### 1. GitHub Secrets Configuration

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each environment variable:

```
Name: REACT_APP_API_BASE_URL
Value: https://fl-07-jobhunt-shared-api-prod.azurewebsites.net/api/

Name: REACT_APP_API_BEARER
Value: your-bearer-token-here

Name: REACT_APP_REQUIREMENT_PROMPT_CODE
Value: REQRMNT

Name: REACT_APP_BENCH_PROMPT_CODE
Value: RESUME

Name: REACT_APP_API_TOKEN
Value: your-api-token-here

Name: REACT_APP_NOTIFICATION_HUB
Value: https://fl-07-jobhunt-shared-api-prod.azurewebsites.net/notificationHub
```

### 2. Azure App Service Configuration

1. Go to **Azure Portal** → **Your App Service**
2. Navigate to **Configuration** → **Application settings**
3. Click **New application setting**
4. Add the same environment variables as above

### 3. Local Development Setup

Create a `.env` file in your project root:

```bash
# .env file
REACT_APP_API_BASE_URL=https://fl-07-jobhunt-shared-api-test.azurewebsites.net/api/
REACT_APP_API_BEARER=your-development-bearer-token
REACT_APP_REQUIREMENT_PROMPT_CODE=REQRMNT
REACT_APP_BENCH_PROMPT_CODE=RESUME
REACT_APP_API_TOKEN=your-development-api-token
REACT_APP_NOTIFICATION_HUB=https://fl-07-jobhunt-shared-api-test.azurewebsites.net/notificationHub
```

## 🔄 How It Works

### Build-time Process:
1. GitHub Actions reads secrets during build
2. Environment variables are compiled into the React bundle
3. Built app is deployed to Azure App Service

### Runtime Process (Advanced):
1. `config.js` file contains placeholder variables
2. PowerShell script replaces placeholders with actual values
3. React app reads configuration from `window.appConfig`

## 📁 File Structure

```
src/
├── components/
│   └── sharedService/
│       ├── config.ts          # Configuration loader
│       ├── api.ts             # API service using config
│       └── signalRService.ts  # SignalR service using config
public/
├── config.js                  # Runtime configuration template
scripts/
└── update-config.ps1          # PowerShell script for runtime config
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Variables not updating**: Clear browser cache and redeploy
2. **Build fails**: Check if all required secrets are set in GitHub
3. **Runtime config not working**: Verify PowerShell script execution
4. **API calls failing**: Check API_BASE_URL and API_BEARER values

### Debug Commands:

```bash
# Check environment variables during build
npm run build

# Local development
npm start

# Check if variables are loaded
console.log(window.appConfig) // In browser console
```

## 🔒 Security Best Practices

1. **Never commit sensitive values** to version control
2. **Use different tokens** for development and production
3. **Rotate API tokens regularly**
4. **Keep GitHub secrets secure**
5. **Use least privilege principle** for API tokens

## 🌍 Environment-Specific Configurations

### Development
- Use test API endpoints
- Lower security tokens
- Debug logging enabled

### Production
- Use production API endpoints
- Secure tokens with proper permissions
- Minimal logging

## 📞 Support

If you encounter issues:
1. Check Azure App Service logs
2. Verify GitHub Actions workflow logs
3. Test environment variables locally
4. Contact the development team

---

**Last Updated:** $(date)
**Version:** 1.0.0 