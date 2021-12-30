export type Exact<A, B> = (<T>() => T extends A ? 1 : 0) extends (<T>() => T extends B ? 1 : 0)
  ? (A extends B ? (B extends A ? unknown : never) : never)
  : never;

export function assertTypeEqual<Actual, Expected>(
  _true: true & Exact<Actual, Expected>,
) { return _true; }
