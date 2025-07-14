# Environment Management Guide

This guide explains how to manage multiple environments (staging and production) with different environment variables using GitHub Actions.

## Overview

We have implemented environment-specific deployments using GitHub Environments feature, which allows you to:
- Set different environment variables for each environment
- Control deployment approvals
- Manage environment-specific secrets
- Track deployment history per environment

## Current Setup

### Environments
- **Staging**: Deploys from `develop` or `staging` branches
- **Production**: Deploys from `master` branch

### Workflow Files
- `.github/workflows/staging_fl-07-jobhunt-shared-ui-staging.yml` - Staging deployments
- `.github/workflows/master_fl-07-jobhunt-shared-ui-prod.yml` - Production deployments

## Setting Up GitHub Environments

### Step 1: Create Environments in GitHub

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Click on **Environments** in the left sidebar
4. Click **New environment**
5. Create two environments:
   - `staging`
   - `production`

### Step 2: Configure Environment Variables

For each environment, add the following secrets:

#### Staging Environment Secrets
```
REACT_APP_API_BASE_URL=https://api-staging.yourapp.com
REACT_APP_API_BEARER=staging-bearer-token
REACT_APP_REQUIREMENT_PROMPT_CODE=staging-requirement-code
REACT_APP_BENCH_PROMPT_CODE=staging-bench-code
REACT_APP_API_TOKEN=staging-api-token
REACT_APP_NOTIFICATION_HUB=staging-hub-connection
AZUREAPPSERVICE_PUBLISHPROFILE_STAGING=<staging-publish-profile>
```

#### Production Environment Secrets
```
REACT_APP_API_BASE_URL=https://api.yourapp.com
REACT_APP_API_BEARER=production-bearer-token
REACT_APP_REQUIREMENT_PROMPT_CODE=production-requirement-code
REACT_APP_BENCH_PROMPT_CODE=production-bench-code
REACT_APP_API_TOKEN=production-api-token
REACT_APP_NOTIFICATION_HUB=production-hub-connection
AZUREAPPSERVICE_PUBLISHPROFILE_D22ACD465E3F470590DC9E7936841DD1=<production-publish-profile>
```

### Step 3: Configure Environment Protection Rules (Optional)

For production environment, you can add protection rules:

1. Go to **Settings > Environments > production**
2. Check **Required reviewers** and add team members
3. Set **Wait timer** if needed
4. Configure **Deployment branches** to restrict to specific branches

## Environment Variables Used

| Variable | Purpose | Example |
|----------|---------|---------|
| `REACT_APP_API_BASE_URL` | API endpoint URL | `https://api.yourapp.com` |
| `REACT_APP_API_BEARER` | Bearer token for API | `Bearer abc123...` |
| `REACT_APP_REQUIREMENT_PROMPT_CODE` | AI prompt code for requirements | `REQ_PROMPT_001` |
| `REACT_APP_BENCH_PROMPT_CODE` | AI prompt code for bench | `BENCH_PROMPT_001` |
| `REACT_APP_API_TOKEN` | API authentication token | `api_token_123...` |
| `REACT_APP_NOTIFICATION_HUB` | SignalR hub connection | `Hub=notifications;...` |

## Deployment Flow

### Staging Deployment
1. Push to `develop` or `staging` branch
2. GitHub Actions builds the application
3. Deploys to staging environment using staging secrets
4. Updates runtime configuration with staging values

### Production Deployment
1. Push to `master` branch
2. GitHub Actions builds the application
3. Deploys to production environment using production secrets
4. Updates runtime configuration with production values

## Alternative Approaches

### Approach 2: Single Workflow with Environment Detection

If you prefer a single workflow file, you can use conditional logic:

```yaml
name: Deploy to Multiple Environments

on:
  push:
    branches: [master, develop, staging]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ github.ref == 'refs/heads/master' && 'production' || 'staging' }}
    
    steps:
      - name: Set environment variables
        run: |
          if [ "${{ github.ref }}" == "refs/heads/master" ]; then
            echo "ENVIRONMENT=production" >> $GITHUB_ENV
            echo "APP_NAME=fl-07-JobHunt-Shared-UI-Prod" >> $GITHUB_ENV
          else
            echo "ENVIRONMENT=staging" >> $GITHUB_ENV
            echo "APP_NAME=fl-07-JobHunt-Shared-UI-Staging" >> $GITHUB_ENV
          fi
```

### Approach 3: Matrix Strategy

For multiple environments in a single workflow:

```yaml
strategy:
  matrix:
    environment: [staging, production]
    include:
      - environment: staging
        branch: develop
        app_name: fl-07-JobHunt-Shared-UI-Staging
      - environment: production
        branch: master
        app_name: fl-07-JobHunt-Shared-UI-Prod
```

## Best Practices

1. **Use GitHub Environments** for better organization and security
2. **Separate secrets** for each environment
3. **Different Azure App Service names** for each environment
4. **Branch protection** - only allow specific branches to deploy to production
5. **Approval process** for production deployments
6. **Monitor deployments** using GitHub's deployment tracking
7. **Use descriptive names** for artifacts and logs

## Troubleshooting

### Common Issues

1. **Secret not found**: Ensure secrets are added to the correct environment
2. **Wrong environment deployed**: Check branch triggers and environment mapping
3. **Configuration not updated**: Verify the PowerShell script is finding the config.js file
4. **Azure deployment fails**: Check publish profile and app service name

### Debugging Steps

1. Check GitHub Actions logs for each environment
2. Verify environment secrets are set correctly
3. Confirm Azure App Service names match the workflow
4. Test configuration updates by checking the logs

## Monitoring and Maintenance

- **Monitor deployments** in GitHub Actions tab
- **Review environment variables** regularly
- **Update secrets** when tokens expire
- **Check Azure App Service** health after deployments
- **Review deployment logs** for any issues

This setup provides a robust, scalable solution for managing multiple environments with different configurations while maintaining security and proper separation of concerns. 