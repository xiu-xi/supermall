import { createApp } from 'vue';

import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
//import toast from 'components/common/toast/index'
import Fastclick from 'fastclick'
import lazyPlugin from 'vue3-lazy';

import { Form, Field, CellGroup,Button   } from 'vant';


const app =createApp(App)

app.use(store)
  .use(router)
  .use(lazyPlugin, {
  loading: 'loading.png',
  error: 'error.png'
  })
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(Button)


  .mount('#app')

app.config.globalProperties.$bus = mitt();

//解决延迟问题
Fastclick.attach(document.body)
//安装toast插件
//安装好后,就会调用toast里install方法
//app.use(toast);
