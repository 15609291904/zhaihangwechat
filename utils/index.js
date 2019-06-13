// import get from 'lodash.get'
// import lrz from 'lrz-lcy'

// import api from '@/api'
// import apiConfig from '@/api/config'
const api = "https://app.zhaihang.com/api/"

export const inBrowser = typeof window !== 'undefined'

export const getSumDay = (dateTemp, days) => {
  const arr_dateTemp = dateTemp.split(' ')[0].split('-')
  var nDate = new Date(arr_dateTemp[1] + '/' + arr_dateTemp[2] + '/' + arr_dateTemp[0] + ' 00:00:00')
  var millSeconds = nDate.getTime() + days * 24 * 60 * 60 * 1000
  var rDate = new Date(millSeconds)
  var year = rDate.getFullYear()
  var month = rDate.getMonth() + 1
  if (month < 10) month = '0' + month
  var date = rDate.getDate()
  if (date < 10) date = '0' + date
  return year + '-' + month + '-' + date
}

export const UTC2Date = (utc, format, add) => {
  if (!format) format = 'y-m-d'
  if (utc && typeof utc === 'string') utc = utc.replace(/-/g, '/').replace('.000000', '')
  let newDate = utc ? new Date(utc) : new Date()
  if (add) newDate = new Date(newDate.setDate(newDate.getDate() + add))
  const year = newDate.getFullYear()
  let month = newDate.getMonth() + 1
  let date = newDate.getDate()
  let hours = newDate.getHours()
  let minutes = newDate.getMinutes()
  let seconds = newDate.getSeconds()
  let mseconds = newDate.getMilliseconds()
  month = month < 10 ? '0' + month : month
  date = date < 10 ? '0' + date : date
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  if (mseconds < 100 && mseconds > 9) {
    mseconds = '0' + mseconds
  } else if (mseconds < 10) {
    mseconds = '00' + mseconds
  }
  return format
    .replace(/y/gi, year)
    .replace(/m/gi, month)
    .replace(/d/gi, date)
    .replace(/h/gi, hours)
    .replace(/i/gi, minutes)
    .replace(/s/gi, seconds)
    .replace(/v/gi, mseconds)
}

export const diff = (date, day) => {
  if (date) {
    date = date.replace(/-/g, '/').replace('.000000', '')
    const now = new Date().getTime()
    const dateTime = new Date(date).getTime()
    return now - dateTime > day * 86400000
  }
  return false
}

export const formatSeconds = value => {
  var theTime = parseInt(value, 10)
  var theTime1 = 0
  var theTime2 = 0
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60, 10)
    theTime = parseInt(theTime % 60, 10)
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60, 10)
      theTime1 = parseInt(theTime1 % 60, 10)
    }
  }
  var s = parseInt(theTime, 10)
  s = s > 9 ? s : '0' + s
  var m = parseInt(theTime1, 10)
  m = m > 9 ? m : '0' + m
  var h = parseInt(theTime2, 10)
  h = h > 9 ? h : '0' + h
  var result = s
  result = m + ':' + result
  result = h + ':' + result
  return result
}

function _randomChar(length) {
  var x = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  var tmp = ''
  var timestamp = new Date().getTime()
  for (var i = 0; i < length; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
  }
  return timestamp + tmp
}

export const randomChar = _randomChar

const upload_base = async (files, progress, fileObj) => {
  var oMyForm = new FormData()
  try {
    oMyForm.append('file', files)
    if (fileObj && fileObj.fileName) oMyForm.append('filename', fileObj.fileName)
    if (fileObj && fileObj.fileSize) oMyForm.append('filesize', fileObj.fileSize)
    if (fileObj && fileObj.fileOriginalSize) oMyForm.append('fileoriginalsize', fileObj.fileOriginalSize)
    const apiUrl = 'common/upload?noLoading'
    const { code, data, msg } = await api.fetch(apiUrl, oMyForm, progress)
    if (code === 1) return Promise.resolve(data.url)
    return Promise.reject(msg || '上传失败')
  } catch (error) {
    return Promise.reject(error.toString())
  }
}

// 上传图片
const upload_img = async files => {
  const isJPG = files.type.indexOf('image') > -1
  const isLt2M = files.size / 1024 / 1024 < 5
  if (!isJPG) {
    return Promise.reject('选择的文件只能是图片格式!')
  }
  if (!isLt2M) {
    return Promise.reject('上传的图片大小不能超过 5MB!')
  }
  const fileName = files.name
  const fileOriginalSize = files.size
  let upFile = null
  let fileSize = 0
  if (files.size > 512000) {
    try {
      const rst = await lrz(files, { width: 1200, height: 1200, quality: 0.8 })
      upFile = rst.file
      fileSize = rst.fileLen
    } catch (error) {
      upFile = files
      fileSize = files.size
    }
  } else {
    upFile = files
    fileSize = files.size
  }
  try {
    const url = await upload_base(upFile, null, { fileName, fileSize, fileOriginalSize })
    return Promise.resolve(url)
  } catch (error) {
    return Promise.reject(error.toString())
  }
}
// 上传压缩文件
const upload_rar = async (files, progress) => {
  const fileName = files.name
  const arr_name = fileName.split('.')
  const ext = arr_name[arr_name.length - 1]
  const isRAR = ['zip', 'rar'].includes(ext.toLowerCase())
  if (!isRAR) {
    return Promise.reject('选择的文件只能是 RAR 或者 ZIP 格式!')
  }
  try {
    const url = await upload_base(files, progress, { fileName })
    return Promise.resolve(url)
  } catch (error) {
    return Promise.reject(error.toString())
  }
}
// 上传视频文件
const upload_video = async (files, progress) => {
  const name = files.name
  const arr_name = name.split('.')
  const ext = arr_name[arr_name.length - 1]
  const isRAR = ['mp4', 'mov'].includes(ext.toLowerCase())
  if (!isRAR) {
    return Promise.reject('选择的文件只能是 MP4 或者 MOV 格式!')
  }
  try {
    const url = await upload_base(files, progress, { t: 'video' })
    return Promise.resolve(url)
  } catch (error) {
    return Promise.reject(error.toString())
  }
}

function uploadimgInit(editor) {
  const containerId = editor.customUploadContainerId
  document.body.addEventListener('click', e => {
    let target = e.target
    while (target && target.nodeName !== 'BODY') {
      if (target.id === containerId) {
        this.$refs.file.click()
        break
      }
      target = target.parentNode
    }
  })
  document.body.addEventListener('change', async e => {
    if (e.target.className === 'file') {
      const files = e.target.files[0]
      if (!files) return
      try {
        const url = await upload_img(files)
        editor.command(null, 'insertHtml', '<img src="' + url + '" style="max-width:100%;"/>')
      } catch (error) {
        this.$message.error(error)
      }
      e.target.value = ''
    }
  })
}

export const uploadBase = upload_base
export const uploadimg = upload_img
export const uploadrar = upload_rar
export const uploadvideo = upload_video
export const uploadInit = uploadimgInit

export const getQueryStringByName = (search, name) => {
  var result = search.match(new RegExp('[?&]' + name + '=([^&|#]+)', 'i'))
  if (result == null || result.length < 1) {
    return ''
  }
  return result[1]
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const oc = (props, property, def) => {
  return get(props, property, def)
}

export const getScrollWidth = () => {
  //creates a DOM element
  const testDiv = document.createElement('div')
  //stores the CSS atributes
  const cssAttributes = {
    width: '100px',
    height: '100px',
    overflow: 'scroll',
    position: 'absolute',
    top: '-999px'
  }
  //sets all the styles on testDiv
  for (const attr in cssAttributes) {
    testDiv.style[attr] = cssAttributes[attr]
  }
  //adds the testDiv to the DOM
  document.body.appendChild(testDiv)
  //measures the the scrollWidth
  const width = testDiv.offsetWidth - testDiv.clientWidth
  //removes the testDiv from the DOM
  document.body.removeChild(testDiv)
  //returns the width
  return width
}

export const tranformStr = str => {
  const strArr = str.split('-')
  for (let i = 1; i < strArr.length; i++) {
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
  }
  return strArr.join('')
}

export const paramsToObject = str => {
  const obj = {}
  if (!str) return null
  const strArr = str.split('&')
  strArr.forEach(item => {
    const arr_item = item.split(':')
    obj[arr_item[0]] = arr_item[1]
  })
  return obj
}

// 深度合并对象
const deepObjectMerge = (FirstOBJ, SecondOBJ) => {
  for (const key in SecondOBJ) {
    FirstOBJ[key] =
      FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]'
        ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key])
        : (FirstOBJ[key] = SecondOBJ[key])
  }
  return FirstOBJ
}
export const deepMerge = deepObjectMerge

// 深克隆
const _deepClone = obj => {
  let copy

  // Handle the 3 simple types, and null or undefined
  if (null == obj || 'object' != typeof obj) return obj

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = _deepClone(obj[i])
    }
    return copy
  }

  // Handle Function
  if (obj instanceof Function) {
    copy = function () {
      return obj.apply(this, arguments)
    }
    return copy
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {}
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = _deepClone(obj[attr])
    }
    return copy
  }

  throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name)
}
export const deepClone = _deepClone

export const strlen = str => {
  var len = 0
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i)
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len
}

export const isMoney = str => {
  if (typeof str !== 'number' && typeof str !== 'string') {
    return false
  }
  str = str.toString()
  const preg = /[0-9.]+/
  if (!preg.test(str)) {
    return false
  }
  const arr_str = str.split('.')
  if (arr_str.length === 1) return true
  else if (arr_str.length === 2) {
    if (!arr_str[0]) return false
    else if (!arr_str[1] || arr_str[1].length > 2) return false
    return true
  }
}
export const isInt = str => {
  if (typeof str !== 'number' && typeof str !== 'string') {
    return false
  }
  const preg = /[0-9]+/
  return preg.test(str)
}
