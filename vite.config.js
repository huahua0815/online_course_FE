import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias:{
      "@": resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: '3000',
    proxy: {
      '^/api': {
        // target: 'http://192.168.111.130:8085', 
        target: 'http://192.168.2.44:8085', 
        changeOrigin: true, //开启代理
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
})
