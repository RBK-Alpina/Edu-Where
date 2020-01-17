module.exports.AuthResponse = class AuthResponse {
  constructor(status, details) {
    this.status = status;
    this.details = details;
  }
}