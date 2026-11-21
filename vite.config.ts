import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// Stamped at build time so the footer's "last updated" date tracks each deploy
const lastUpdated = new Date().toLocaleDateString('en-CA', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'America/Toronto',
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  define: {
    __LAST_UPDATED__: JSON.stringify(lastUpdated),
  },
})
