
//暂时没有封装成功
import Toast from './Toast.vue'
import { createApp } from 'vue'
const obj = {}
obj.install = function(app) {

  const toast =createApp(Toast)
  toast.mount('#toast');
  // if(toast.$el) {
  //   document.body.appendChild(toast.$el)
  // }
  // console.log(toast.$el)
  // //toast.$el此时对应就是div
  app.config.globalProperties.$toast = toast
};


export default obj
