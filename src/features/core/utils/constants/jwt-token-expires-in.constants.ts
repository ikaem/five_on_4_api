export enum JWTTokenExpiresInConstants {
  // first number is seconds, subsequent numbers mulitpliers
  DEFAULT_MINS_20 = 60 * 20, // should be used for default access token expiration
  MINS_1 = 60 * 1,
  // TODO to test expiration
  SECONDS_5 = 5,
}
