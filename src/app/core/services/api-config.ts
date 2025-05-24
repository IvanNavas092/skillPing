// choose web and android api url
export function getApiUrl(): string {
  return window.location.protocol === 'file:'
    ? 'https://skillping-server.onrender.com/api'
    : '/api';
}
