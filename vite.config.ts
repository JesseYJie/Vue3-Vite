import { resolve } from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
import pxtovw from 'postcss-px-to-viewport'

const loder_pxtovw = pxtovw({
  //这里是设计稿宽度 自己修改
  viewportWidth: 2100,
  viewportUnit: 'vw',
  selectorBlackList: [""]
})

export default defineConfig(() => {
  return {
    css: {
      postcss: {
        plugins: [loder_pxtovw]
      }
    },
    server: {
      port: 8080,
      host: '0.0.0.0'
    },
    resolve: {
      alias: [{
        find: '@',
        replacement: resolve(__dirname, "src"),
      }]
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          })
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'],
          })
        ],
      }),
      Icons({
        autoInstall: true,
      }),
      Inspect()
    ],
  }
})
