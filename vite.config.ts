import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import MonacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
  plugins: [
    react(),
    MonacoEditorPlugin.default({
      languageWorkers: ['typescript'], // This is correct — supports both TS and JS
    }),
  ],
});
