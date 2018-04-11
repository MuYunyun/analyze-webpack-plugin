let colors = {
  '__file__': '#db7100', // 橘色
  '__default__': '#487ea4' // 蓝色
}


export function getColor(obj) {
  let name = obj.data.name
  let dotIndex = name.indexOf('.')

  if (dotIndex !== -1 && dotIndex !== 0 && dotIndex !== name.length - 1) { // if file not folder
    return colors.__file__
  } else if (obj.parent && obj.parent.data.name === 'node_modules') {
    return '#599e59' // 绿色
  }

  return colors[name] || colors.__default__
}