import path from 'path'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import UnoCSS from 'unocss/vite'
import UnocssIcons from '@unocss/preset-icons'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetUno } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

import { APP_TITLE } from '../../constant'

export const createVitePlugins = () => {
  const vitePlugins = [
    vue(),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.js',
      inject: {
        data: {
          title: APP_TITLE,
        },
      },
      viteNext: true,
    }),
    UnoCSS({
      presets: [
        UnocssIcons({
          prefix: 'i-',
          extraProperties: {
            display: 'inline-block'
          }
        }),
        presetUno(), // 开启默认样式
        presetRemToPx()
      ],
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      }
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
      symbolId: 'icon-[dir]-[name]',
    }),
    mockDevServerPlugin(),
    // configCompressPlugin(),
  ];

  return vitePlugins
}