export function debounce(func,delay=100){
  //闭包，避免变量销毁
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
//时间戳的封装

export function getDate(timestamp){
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
 /* var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());*/
  let strDate = Y+M+D;
  return strDate;
}


