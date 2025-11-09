// Este archivo proporciona las definiciones de tipo para las variables de entorno de Vite.
// Más información: https://vitejs.dev/guide/features.html#intellisense-for-typescript

// FIX: Resolved the "Cannot redeclare block-scoped variable 'process'" error.
// Instead of redeclaring the global `process` object, this now augments the
// existing `NodeJS.ProcessEnv` interface. This is the standard and safe way to
// add type definitions for environment variables in a project that includes
// Node.js types, preventing global scope conflicts.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * The API key for the Gemini service.
       */
      readonly API_KEY: string;
    }
  }
}

export {};
