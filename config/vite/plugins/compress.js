import compressPlugin from 'vite-plugin-compression'
import { COMPRESSION } from '../../constant'

// gz代码压缩
export const configCompressPlugin = () => {
  if (COMPRESSION) {
    return compressPlugin({
      ext: '.gz',
      deleteOriginFile: false
    })
  }
  return []
}
