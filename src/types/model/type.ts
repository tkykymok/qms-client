export type Status =
  | typeof IN_PROGRESS
  | typeof WAITING
  | typeof PENDING
  | typeof DONE
  | typeof CANCELED;

export const WAITING = 0;
export const IN_PROGRESS = 1;
export const DONE = 2;
export const PENDING = 5;
export const CANCELED = 9;
