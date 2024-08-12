//config.js

const Status = 'WIP'; // Change this to 'development' or 'production'

export const LOCAL_API_URL = "http://localhost:8080/api";
export const LOCAL_WebSocket_URL = "ws://localhost:8080";

export const PROD_API_URL = "https://your-production-server.com/api";
export const PROD_WebSocket_URL = "wss://your-production-server.com";

export const BASE_API_URL = Status === 'production' ? PROD_API_URL : LOCAL_API_URL;
export const BASE_WS_URL = Status === 'production' ? PROD_WebSocket_URL : LOCAL_WebSocket_URL;
