export type TLoginDTO = {
  email: string;
  password: string;
};

export type TCreationPayloadDTO = {
  id: string;
  role: string;
  name: string;
}

export type TCreatedPayload = {
  id: string;
  role: string;
  name: string;
  iat: number;
}

export type TToken = {
  token: string;
}

export type TLoggedInputDTO = {
  id: string
  loggedUser: TCreatedPayload;
}