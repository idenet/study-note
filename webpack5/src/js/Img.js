
import oimgSrc from '../img/01.wb.png'

import '../css/image.css'

function packImg() {
  const oEle = document.createElement('div')

  const oImg = document.createElement('img')
  oImg.width = 400
  oImg.src = require('../img/01.wb.png')
  oImg.src = oimgSrc // 使用esModule
  oEle.appendChild(oImg)


  const oBgimge = document.createElement('div')
  oBgimge.className = 'bgBox'
  oEle.appendChild(oBgimge)

  return oEle
}

document.body.append(packImg())