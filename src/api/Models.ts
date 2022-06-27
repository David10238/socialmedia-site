export interface UserKeys {
  user_id: number;
  user_key: string;
}

export interface UserCredentials {
  email: string;
  password: string;
  name: string;
}

export interface Message {
  id: number;
  author_id: number;
  message: string;
  is_public: boolean;
}

export interface MessageRequest {
  target_id: number;
  lowest_loaded_message: number;
  search_friends: boolean;
}

export interface MessageResponse {
  messages: Array<Message>;
  lowest_id: number;
}
