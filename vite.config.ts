import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { wrapperEnv } from './src/utils/index'
import path from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { visualizer } from 'rollup-plugin-visualizer'
import { UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd())
    const viteEnv = wrapperEnv(env)
    const isProduction = false
    console.log("env,mode",env,mode);
    const { VITE_PORT, VITE_PROXY, VITE_PUBLIC_PATH } = viteEnv as any
    const config: UserConfig = {
        plugins: [vue(), vueSetupExtend()],
        base: VITE_PUBLIC_PATH || '',
        define: {
            'process.env': {},
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import '@/styles/variables.scss';`,
                },
            },
        },
        server: {
            open: false,
            host: '127.0.0.1',
            port: 3000,
            proxy: {
                '^/api/': {
                    target: 'http://baidu.com/flight-block-api/', // 后台服务器地址
                    changeOrigin: true /* 允许跨域 */,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    }
    if (isProduction) {
        config.plugins.push(
            // 打包优化-可视化视图
            visualizer({
                open: true,
                gzipSize: true, //搜集gzip压缩包的大小到图表
                brotliSize: true, //搜集brotli压缩包的大小到图表
            })
        )
    }
    return config
})
