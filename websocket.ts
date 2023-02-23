import Stomp from "stompjs";

import index from "./startConnection";

const BASE_URL = "wss://apis-test.marketnews.com/wss";

export default async function connectToWS(access_token: string): Promise<void> {

  try {
    const client = Stomp.overWS(BASE_URL);

    await client.connect(
      { passcode: access_token },
      () => onConnection(client),
      (error) => onError(error)
    );
  } catch (error) {
    console.log(error);
  }
}

function onError(error) {
  console.log("ERROR:", error);
  index();
}

function onConnection(client: Stomp.Client) {
  console.log(new Date(Date.now()), "WebSocket STOMP connection established.");

  const subscription1 = client.subscribe("/topic/news/articles", (message) => {
    console.log(new Date(Date.now()), "Message from WS");
    console.log(message);
  });

  console.log(new Date(Date.now()), "Stomp subscription ID:", subscription1.id);
  console.log("");

  setInterval(() => {
    console.log("");
    console.log(
      new Date(Date.now()),
      "Active Stomp client subscriptions:",
      client.subscriptions
    );
    console.log("");
  }, 1800000);
}
