export enum socketResponseType {
  open,
  close,
  ping,
  pong,
  message,
  upgrade,
  noop
}

export enum socketResponseCode {
  connect,
  disconnect,
  event,
  ack,
  error
}
