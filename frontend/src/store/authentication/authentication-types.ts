export interface Authentication {
  email: null | string;
}

export interface AuthenticationCredentials {
  email: string;
  password: string;
}

export interface ProfileState {
  authentication?: Authentication;
  error: boolean;
}
