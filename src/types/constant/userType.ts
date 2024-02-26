export const ADMIN = 0;
export const CUSTOMER = 1;
export const STAFF = 2;

export type UserType = typeof ADMIN | typeof CUSTOMER | typeof STAFF;
