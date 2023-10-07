import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pdfmake/build/vfs_fonts': 'pdfmake/build/vfs_fonts',
    },
  },
})
