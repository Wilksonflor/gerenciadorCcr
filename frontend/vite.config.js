import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pdfmake/build/vfs_fonts': '/home/ec2-user/app/gerenciadorCcr/frontend/node_modules/pdfmake/build/vfs_fonts',
    },
  },
})

