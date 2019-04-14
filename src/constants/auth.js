export const CLIENT_ID = 'dd411a7a70a849ddb7abeadac79a5552';
export const REDIRECT_URI = `${window.location.protocol}//${window.location.host}/callback`;

export const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'playlist-read-private',
  'user-read-recently-played',
  'user-read-currently-playing'];
export const STATE = 'state-attempt-musyc-auth';
