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

// Get runtime config from window object (injected by Azure) or fallback to build-time env vars
const getRuntimeConfig = () => {
  const runtimeConfig = window.appConfig;
  
  return {
    API_BASE_URL: runtimeConfig?.API_BASE_URL || process.env.REACT_APP_API_BASE_URL || 'https://fl-07-jobhunt-shared-api-test.azurewebsites.net/api/',
    API_BEARER: runtimeConfig?.API_BEARER || process.env.REACT_APP_API_BEARER || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ94343f',
    RequirementPromtCode: runtimeConfig?.RequirementPromtCode || process.env.REACT_APP_REQUIREMENT_PROMPT_CODE || 'REQRMNT',
    BenchPromtCode: runtimeConfig?.BenchPromtCode || process.env.REACT_APP_BENCH_PROMPT_CODE || 'RESUME',
    API_Token: runtimeConfig?.API_Token || process.env.REACT_APP_API_TOKEN || '',
    Notification_HUB: runtimeConfig?.Notification_HUB || process.env.REACT_APP_NOTIFICATION_HUB || 'https://fl-07-jobhunt-shared-api-test.azurewebsites.net/notificationHub'
  };
};

const config = getRuntimeConfig();

export default config; 