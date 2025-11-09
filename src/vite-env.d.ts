// FIX: The triple-slash directive for "vite/client" was removed as it could not be resolved, and the application does not use Vite-specific client APIs.

// The original `declare var process` caused a "Cannot redeclare block-scoped variable 'process'" error.
// This is likely due to a conflict with global types from a dependency like @types/node.
// We now augment the existing `NodeJS.ProcessEnv` interface to add the `API_KEY` type.
// This is the standard way to add types to `process.env` without causing declaration conflicts.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
