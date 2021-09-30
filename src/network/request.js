import axios from "axios";
export function request(config) {
  const instance = axios.create({
    baseURL :'http://152.136.185.210:7878/api/hy66',
    timeout :5000
  });
  //拦截器

  instance.interceptors.request.use(config => config, err => err);
  instance.interceptors.response.use(res => res.data, err => err)
  //发送请求
  return instance(config)
}
