import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue()
    ],
    define:{
      'process.env':{}
    },
    server: {
        open: false,
        host: "127.0.0.1",
        port: 3000,
        proxy: {
            "^/api/": {
                target: "http://baidu.com/flight-block-api/", // 后台服务器地址
                changeOrigin: true /* 允许跨域 */,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
})
