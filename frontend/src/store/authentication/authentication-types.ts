export interface Authentication {
  email: null | string;
}

export interface ProfileState {
  authentication?: Authentication;
  error: boolean;
}
