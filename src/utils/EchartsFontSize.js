function nowSize (val, initWidth = 1920) { // 现在很多浏览器都是1920*1080，initWidth值可根据自己需求进行修改
  const nowClientWidth = document.documentElement.clientWidth
  return val * (nowClientWidth / initWidth)
}

export default nowSize
