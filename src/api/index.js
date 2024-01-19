import { request } from '../network/axios'

export const getApiTest = (params) => {
  return request('/api/test', {
    method: 'GET',
    params
  })
}
