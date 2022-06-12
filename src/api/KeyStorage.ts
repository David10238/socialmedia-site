import type { UserKeys } from "./Models";

let keys: UserKeys;
let loaded = false;

export class KeyStorage {
  static get() {
    if (!loaded) {
      const key = localStorage.getItem("user-key");
      const id = localStorage.getItem("user-id");

      if (key == null || key.length == 0 || id == null || id.length == 0) {
        location.href = "/login";
        return { user_key: "", user_id: 0 };
      }

      keys = {
        user_key: key,
        user_id: JSON.parse(id),
      };
      loaded = true;
    }
    return keys;
  }

  static set(newKeys: UserKeys) {
    keys = newKeys;
    loaded = true;
    localStorage.setItem("user-id", JSON.stringify(keys.user_id));
    localStorage.setItem("user-key", keys.user_key);
  }

  static logout() {
    loaded = false;
    keys = { user_id: 0, user_key: "" };
    localStorage.removeItem("user-id");
    localStorage.removeItem("user-key");
    location.href = "/login";
  }
}
