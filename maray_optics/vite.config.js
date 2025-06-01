import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
         target: 'http://localhost:3000',
        //target: ' http://192.168.100.6:300',
       
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
