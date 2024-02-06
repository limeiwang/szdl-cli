import { defineConfig } from 'vite'
import { VITE_DROP_CONSOLE, VITE_PORT } from './config/constant'
import { createVitePlugins } from './config/vite/plugins'
import { configManualChunk } from './config/vite/optimizer'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: createVitePlugins(),
    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: '/src' }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      hmr: { overlay: false },
      // 服务配置
      host: false, // host设置为true才可以使用network的形式，以ip访问项目
      open: true, // 自动打开浏览器
      cors: true, // 跨域设置允许
      port: VITE_PORT, // 端口号
      strictPort: true, // 如果端口已占用直接退出
      proxy: {
        '^/api': {
          target: 'https://111.21.2:9090/',
          changeOrigin: true,
        },
      },
    },
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE
        }
      },
      rollupOptions: {
        output: {
          manualChunks: configManualChunk
        }
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  }
})
