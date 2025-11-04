export default class InvalidPayloadError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidPayloadError";
  }
}
