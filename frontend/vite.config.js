import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Determine o ambiente com base na variável NODE_ENV.
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pdfmake/build/vfs_fonts': isProduction
        ? '/home/ec2-user/app/gerenciadorCcr/frontend/node_modules/pdfmake/build/vfs_fonts'
        : './node_modules/pdfmake/build/vfs_fonts', // Caminho relativo para sua máquina local
    },
  },
})
