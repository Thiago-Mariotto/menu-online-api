export type TLoginDTO = {
  email: string;
  password: string;
};

export type TCreationPayloadDTO = {
  id: string;
  role: string;
  name: string;
}

export type TToken = {
  token: string;
}