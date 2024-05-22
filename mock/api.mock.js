import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
  url: '/api/test',
  body: {
    code: 200,
    data: 'test'
  }
})