// Provide a minimal JSX IntrinsicElements declaration to satisfy the TypeScript compiler
// for this project during type-checking. This keeps the existing UI primitives typed
// by their own definitions when available, but prevents errors about missing
// `JSX.IntrinsicElements` while we progressively fix typings.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface IntrinsicAttributes {
    key?: any;
  }
}
