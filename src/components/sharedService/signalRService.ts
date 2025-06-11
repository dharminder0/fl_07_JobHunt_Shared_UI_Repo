// signalRService.ts
import * as signalR from "@microsoft/signalr";
import configData from "./config.json";

let connection: signalR.HubConnection | null = null;
let isStarting = false;
let isStopping = false;

type SignalRCallbacks = {
  onCountUpdate?: () => void;
  onListUpdate?: () => void;
  onReadStatusUpdate?: () => void;
};

export const startNotificationConnection = async (
  orgCode: string,
  callbacks: SignalRCallbacks
) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${configData.Notification_HUB}?orgCode=${orgCode}`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => "",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "*/*",
        Authorization: `Bearer ${configData.API_BEARER}`,
      },
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  if (callbacks.onCountUpdate) {
    connection.on("ReceiveNotificationCountUpdate", callbacks.onCountUpdate);
  }

  if (callbacks.onListUpdate) {
    connection.on("ReceiveNotification", callbacks.onListUpdate);
  }

  if (callbacks.onReadStatusUpdate) {
    connection.on("ReceiveNotificationUpdate", callbacks.onReadStatusUpdate);
  }

  try {
    await connection.start();
    console.log("✅ SignalR Connected");
  } catch (error) {
    console.error("❌ SignalR Connection Error:", error);
  }
};

export const stopNotificationConnection = async () => {
  if (!connection) return;

  if (
    connection.state === signalR.HubConnectionState.Disconnected ||
    isStopping ||
    isStarting
  ) {
    console.log("⛔ SignalR is already disconnected or busy");
    return;
  }

  try {
    isStopping = true;
    console.log("🛑 Stopping SignalR connection...");
    await connection.stop();
    console.log("🚫 SignalR Disconnected");
  } catch (error) {
    console.error("❌ Error stopping SignalR:", error);
  } finally {
    isStopping = false;
    connection = null;
  }
};
