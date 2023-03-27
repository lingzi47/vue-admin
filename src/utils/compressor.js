
/**
 * 压缩和旋转图片
 * @param {blob} file
 * @param {number} quality  压缩比例
 * @param {number} maxWidth
 * @returns {Promise}
 */
export function compressor(file, quality = 0.6, maxWidth = 750) {
  return new Promise(resolve => {
    new Compressor(file, {
      maxWidth,
      quality,
      success: resolve,
      error(err) {
        console.log(err.message)
      }
    })
  })
}



