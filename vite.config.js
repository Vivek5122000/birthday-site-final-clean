import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/birthday-site-final-clean/'  // <-- set this to your exact repo name
})
