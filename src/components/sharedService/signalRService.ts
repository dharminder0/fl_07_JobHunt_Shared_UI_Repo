import * as signalR from "@microsoft/signalr";
import configData from "./config";
import mitt from "mitt";

type Events = {
  countUpdate: void;
  listUpdate: void;
  readStatusUpdate: void;
};

const emitter = mitt<Events>();

let connection: signalR.HubConnection | null = null;
let started = false;
const countListeners: Set<(count: number) => void> = new Set();

export const addCountListener = (fn: (count: number) => void) => {
  countListeners.add(fn);
};

export const removeCountListener = (fn: (count: number) => void) => {
  countListeners.delete(fn);
};
export const startNotificationConnection = async (orgCode: string) => {
  if (started) {
    console.log("⚠️ SignalR already started.");
    return;
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${configData.Notification_HUB}?orgCode=${orgCode}`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => "",
      headers: {
        Authorization: `Bearer ${configData.API_BEARER}`,
      },
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.on("ReceiveNotificationCountUpdate", (count: number) => {
    console.log("📨 Event: countUpdate");
    // emitter.emit("countUpdate");
    // countListeners.forEach((fn) => fn(count)); // fan-out
  });

  connection.on("ReceiveNotification", (count: number) => {
    console.log("📨 Event: listUpdate");
    emitter.emit("listUpdate");
    countListeners.forEach((fn) => fn(count)); // fan-out
  });

  connection.on("ReceiveNotificationUpdate", (count: number) => {
    console.log("📨 Event: readStatusUpdate");
    emitter.emit("readStatusUpdate");
    countListeners.forEach((fn) => fn(count)); // fan-out
  });

  try {
    await connection.start();
    await connection.invoke("JoinGroup", orgCode);
    console.log("✅ SignalR connected and group joined");
    started = true;
  } catch (err) {
    console.error("❌ Error starting SignalR:", err);
  }
};

export const stopNotificationConnection = async () => {
  if (!connection) return;

  try {
    await connection.stop();
    console.log("🛑 SignalR stopped");
  } catch (err) {
    console.error("❌ Error stopping SignalR:", err);
  } finally {
    connection = null;
    started = false;
  }
};

export const signalREmitter = emitter;
