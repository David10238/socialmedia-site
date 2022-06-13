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
  additionalHeaders?: Map<string, any>,
  body?: any
) {
  const headers: Headers = new Headers();
  headers.append("Content-Type", "application/json");

  for (const entry in additionalHeaders) {
    headers.append(entry[0], entry[1]);
  }

  const info: RequestInit = {
    mode: "cors",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
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
      new Map<string, any>(),
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
      new Map<string, any>(),
      messageRequest
    );

    if (res.status == HttpCodes.Forbidden) {
      KeyStorage.logout();
      return { messages: [], lowest_id: 0 };
    }

    return res.json();
  }
}
