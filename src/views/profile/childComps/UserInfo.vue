<template>
  <div id="user-info" >

      <slot name="user-icon">
        <img src="~assets/img/profile/avatar.svg" alt="" class="privateImage-svg left">
      </slot>
      <div class="login-info" @click="toLogin">
          <div>
            <slot name="user-nickname">
              登录/注册
            </slot>
          </div>
        <div class="phone">
          <span>
            <img src="~assets/img/profile/phone.svg" alt="" class="icon-mobile">
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>

  </div>
</template>

<script>
	export default {
		name: "UserInfo",
    methods:{
      toLogin(){
        if(!JSON.parse(localStorage.getItem("userSubMes"))){
          this.$router.push('/login')
        }
      }
    }
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;


  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;

  }

  .left {
    float: left;

  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 30px 0 10px;
    padding: 0 60px ;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0px;
  }
</style>
