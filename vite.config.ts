import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
 plugins: [react()],
 server: {
  proxy: {
   '/api': {
    target: process.env.PORT ? `http://localhost:${process.env.PORT}/graphql` : "http://localhost:7772/graphql",
    headers: {"perms": "{\"root_group\": \"/\",\"account_id\": \"3\",\"scope\": \"read write\"}"}
   }
  }
 }
})
