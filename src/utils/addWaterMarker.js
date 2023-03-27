/**
 * 添加水印
 * @param {blob} file
 * @param {string} el
 * @returns {Promise}
 */
export async function addWaterMarker(file, el = '#markImg') {
  return new Promise(async (resolve, reject) => {
    try {
      // 先压缩和旋转图片
      file = await compressor(file)
      // 将文件blob转换成图片
      let img = await blobToImg(file)

      // 创建canvas画布
      let canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      let ctx = canvas.getContext('2d')

      // 填充上传的图片
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // 生成水印图片
      const markEle = document.querySelector(el)
      const markWidth = markEle.clientWidth
      const scale = canvas.width * 0.25 / markWidth
      // 先缩放水印再转成图片
      markEle.style.transform = `scale(${scale})`
      const markImg = await htmlToCanvas(markEle)

      // 填充水印
      ctx.drawImage(markImg, canvas.width - markImg.width - 15 * scale, canvas.height - markImg.height - 15 * scale, markImg.width, markImg.height)

      // 将canvas转换成blob
      canvas.toBlob(blob => resolve(blob))
    } catch (error) {
      reject(error)
    }

  })
}

function blobToImg(blob) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      let img = new Image()
      img.src = reader.result
      img.addEventListener('load', () => resolve(img))
    })
    reader.readAsDataURL(blob)
  })
}


export function htmlToCanvas(el, backgroundColor = 'rgba(0,0,0,.1)') {
  return new Promise(async (resolve, reject) => {
    try {
      const markImg = await html2canvas(el, {
        scale: 2,   //此处不使用默认值window.devicePixelRatio，需跟移动端保持一致
        allowTaint: false,   //允许污染
        useCORS: true,
        backgroundColor //'transparent'  //背景色
      })
      resolve(markImg)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 压缩和旋转图片
 * @param {blob} file
 * @param {number} quality  压缩比例
 * @param {number} maxWidth
 * @returns {Promise}
 */
export function compressor(file, quality = 0.6, maxWidth = 750) {
  return new Promise(resolve => {
    new compressor(file, {
      maxWidth,
      quality,
      success: resolve,
      error(err) {
        console.log(err.message)
      }
    })
  })
}



