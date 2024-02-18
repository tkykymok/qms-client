export const SUCCESS = "Success";
export const INFO = "Info";
export const WARNING = "Warning";
export const ERROR = "Error";

export type MessageType =
  | typeof SUCCESS
  | typeof INFO
  | typeof WARNING
  | typeof ERROR;
