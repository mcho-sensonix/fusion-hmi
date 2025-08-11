import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const AUTH_TOKEN= process.env.AUTH_TOKEN
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': {
        target:'http://localhost:7772/graphql',
        headers: {"perms":"{\"root_group\": \"/a-trak-ou56/\",\"account_id\": \"3\",\"scope\": \"read write\"}"}
        // changeOrigin: true,
        // secure:false,
        // rewrite: (path)=> path.replace('/api','')
      }
    }
  }
})
