export type ValidatedGoogleAuthResponse = {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  // TODO we might need some other fields like when google auth expires and so on - when token expirse
};

export interface GoogleAuth {
  verifyIdToken: (idToken: string) => Promise<ValidatedGoogleAuthResponse>;
}
