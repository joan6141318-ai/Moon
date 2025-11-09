// FIX: Removed the reference to "node" types that was causing an error.
// `process` is accessed via `globalThis` to avoid a follow-up TypeScript error,
// as this config file is executed in a Node.js environment where `process` is a global.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Expose server-side environment variables to the client.
    // This is the recommended way for deployment platforms like Vercel,
    // which inject environment variables directly into the build process.
    'process.env.API_KEY': JSON.stringify((globalThis as any).process.env.API_KEY)
  }
});
