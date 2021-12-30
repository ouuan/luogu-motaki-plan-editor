export default class MotakiError extends Error {
  constructor(public msg: string) {
    super(msg);
  }
}
