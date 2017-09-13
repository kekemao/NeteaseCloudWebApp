import moment from 'moment'
// 格式化日期

let formatDate = value => {
  return moment(value, 'YYYYMMDDhhmmss').format('YYYY-MM-DD HH: mm: ss')
}
let formatDate2 = value => {
  return moment(value, 'YYYYMMDDhhmmss').format('YYYY/MM/DD HH: mm: ss')
}
let state = value => {
  return {
    'A': '最新歌曲',
    'B': '古典年代',
    'C': '经典老歌'
  }[value]
}

let formatCount = v => {
  if (v < 9999) {
    return v
  } else {
    return (v / 10000).toFixed(0) + '万'
  }
}
export { formatDate, formatDate2, state, formatCount }
