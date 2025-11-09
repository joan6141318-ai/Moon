// Este archivo proporciona las definiciones de tipo para las variables de entorno de Vite.
// Más información: https://vitejs.dev/guide/features.html#intellisense-for-typescript

/// <reference types="vite/client" />

// FIX: The original type augmentation for `process.env` relied on the `NodeJS`
// namespace, which requires the `@types/node` package. To remove this dependency
// and resolve potential type resolution errors, `process.env` is typed more
// directly. This approach ensures that `process.env.API_KEY` is correctly typed
// for the application's client-side code, where Vite replaces it at build time.
declare var process: {
  env: {
    /**
     * The API key for the Gemini service.
     */
    readonly API_KEY: string;
  };
};
