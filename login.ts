import axios from "axios";

const BASE_URL = "https://apis.marketnews.com";

const username = "AxiaFutures";
const password = "AGz6nndW3u";

export default async function login() {
  const LOGIN_BODY = {
    username,
    password,
  };

  const { access_token, refresh_token } = await (
    await axios.post(BASE_URL + "/api/auth/client/token", LOGIN_BODY)
  ).data;

  return { access_token, refresh_token };
}
