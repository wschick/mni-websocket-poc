import login from "./login";
import connectToWS from "./websocket";
import dotenv from "dotenv";

dotenv.config();

export default async function index() {
  let { access_token } = await login();

  connectToWS(access_token);
}

index();
