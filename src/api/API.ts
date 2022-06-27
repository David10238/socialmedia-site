import { HttpCodes } from "typed-rest-client/HttpClient";
import { KeyStorage } from "./KeyStorage";
import type {
  MessageRequest,
  MessageResponse,
  UserCredentials,
  UserKeys,
} from "./Models";

const DOMAIN = "http://localhost:5000";

async function request(
  method: HTTPMethods,
  endpoint: string,
  needsKeys: boolean,
  extraHeaders: Headers,
  body?: any
) {
  const headers: Headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (needsKeys) {
    const keys = KeyStorage.get();
    headers.append("User-Id", JSON.stringify(keys.user_id));
    headers.append("User-Key", keys.user_key);
  }

  extraHeaders.forEach((k, v) => headers.append(k, v));

  const info: RequestInit = {
    mode: "cors",
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  };

  return fetch(DOMAIN + endpoint, info);
}

const HTTPStatus = {
  Forbidden: 403,
};

enum HTTPMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

export class API {
  static async login(credentials: UserCredentials) {
    const res = await request(
      HTTPMethods.PUT,
      "/user/login",
      false,
      new Headers(),
      credentials
    );

    if (res.status == HttpCodes.Forbidden) {
      KeyStorage.logout();
      return;
    }

    const keys: UserKeys = await res.json();
    KeyStorage.set(keys);
    location.href = "/";
  }

  static async requestMessages(
    messageRequest: MessageRequest
  ): Promise<MessageResponse> {
    const res = await request(
      HTTPMethods.PUT,
      "/messages/request",
      true,
      new Headers(),
      messageRequest
    );

    if (res.status == HttpCodes.Forbidden) {
      KeyStorage.logout();
      return { messages: [], lowest_id: 0 };
    }

    return res.json();
  }
}
