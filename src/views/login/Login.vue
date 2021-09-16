<template>
  <div class="login">
    <nav-bar class="shop-nav">
      <template v-slot:center >登录</template>
    </nav-bar>

<!--    vant 登录页面页面-->

    <van-form @submit="onSubmit">
      <van-cell-group inset >
        <van-field
          name="username"
          label="用户名"
          v-model="username"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          type="password"
          name="password"
          label="密码"
          v-model="password"
          placeholder="6~18位的密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
<!--      style="margin:15px;text-align: center;background-color: #dd5145;height:40px;line-height:40px;color:white;border-radius: 5px"-->
      <div style="margin-top: 15px">
        <van-button round block type="primary" native-type="submit" style="background-color: #dd5145;border: none">
          登录
        </van-button>
      </div>
    </van-form>


  </div>

</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {ref} from 'vue';
  import {Toast} from 'vant'

  export default {
    name: "Login",
    components: {
      NavBar,

    },


    setup() {
      const username = ref('');
      const password = ref('');

      const onSubmit = (values) => {
        //localStorage.setItem('userSubMes',values)
        //.(点)表示匹配除了换行符之外的任意字符，{0,10}表示字符个数在0-10个
        values.username = values.username.replace(/\s+/g, '');
        values.password = values.password.replace(/\s+/g, '');

        if (values.username === null || values.username === "") {
          Toast.fail('用户名不能为空')
        } else if (values.password === null || values.password === "") {
          Toast.fail('密码不能为空')
        } else {
        let reg = /^.{6,18}$/;
        if (reg.test(values.password)){
          localStorage.setItem("userSubMes",JSON.stringify(values))
          Toast.success('登录成功')
            history.go(-1)
        } else {
          Toast.fail('密码位数不正确')
        }
      }
      };
      return {
        username,
        password,
        onSubmit,
      };
    },



  }
</script>

<style scoped>
.shop-nav {
  color:var(--color-tint);
  background-color: white;
  font-size: 15px;
  margin-bottom: 30px;
}

</style>
