
export const proxy = {
  test: {
    '^/api': {
      target: 'https://city189.cn:1252/',
      changeOrigin: true,
    },
  },
  development: {},
  production: {}
}
