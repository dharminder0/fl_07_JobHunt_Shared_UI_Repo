// Extend Window interface to include appConfig
declare global {
  interface Window {
    appConfig?: {
      API_BASE_URL: string;
      API_BEARER: string;
      RequirementPromtCode: string;
      BenchPromtCode: string;
      API_Token: string;
      Notification_HUB: string;
    };
  }
}

// Get runtime config from Azure App Service configuration (primary) or fallback to build-time env vars
const getRuntimeConfig = () => {
  const runtimeConfig = window.appConfig;
  
  // Helper function to check if value is a template string (not replaced by Azure)
  const isTemplateString = (value: string | undefined): boolean => {
    return value ? value.startsWith('${') && value.endsWith('}') : false;
  };
  
  // Helper function to get valid config value
  // Priority: 1. Azure App Service runtime config (if not template string)
  //          2. Local development environment variables
  //          3. Fallback defaults
  const getConfigValue = (runtimeValue: string | undefined, envValue: string | undefined, fallback: string): string => {
    // Use Azure App Service runtime config if it's properly replaced (not a template string)
    if (runtimeValue && !isTemplateString(runtimeValue)) {
      return runtimeValue;
    }
    
    // Fallback to local development environment variables
    if (envValue) {
      return envValue;
    }
    
    // Final fallback to defaults
    return fallback;
  };
  
  return {
    API_BASE_URL: getConfigValue(runtimeConfig?.API_BASE_URL, process.env.REACT_APP_API_BASE_URL, 'https://yoursite.azurewebsites.net/api/'),
    API_BEARER: getConfigValue(runtimeConfig?.API_BEARER, process.env.REACT_APP_API_BEARER, 'exxx'),
    RequirementPromtCode: getConfigValue(runtimeConfig?.RequirementPromtCode, process.env.REACT_APP_REQUIREMENT_PROMPT_CODE, 'REQRMNT'),
    BenchPromtCode: getConfigValue(runtimeConfig?.BenchPromtCode, process.env.REACT_APP_BENCH_PROMPT_CODE, 'RESUME'),
    API_Token: getConfigValue(runtimeConfig?.API_Token, process.env.REACT_APP_API_TOKEN, ''),
    Notification_HUB: getConfigValue(runtimeConfig?.Notification_HUB, process.env.REACT_APP_NOTIFICATION_HUB, 'https://yourapp.azurewebsites.net/notificationHub')
  };
};

const config = getRuntimeConfig();

export default config; 