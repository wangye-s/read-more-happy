<template>
  <div class="login-con">
    <div class="login-in">
      <mt-field label="用户名" :state="this.nameFlag" placeholder="请输入用户名" v-model="userName"></mt-field>
      <mt-field
        label="邮箱"
        @blur.native.capture="chectedEmail()"
        :state="this.emailFlag"
        placeholder="请输入邮箱"
        type="email"
        v-model="email"
      ></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    </div>

    <mt-button @click="login" class="log-button" type="primary" size="large" plain>确认登录</mt-button>
    <mt-button @click="toRegister" class="log-button" type="danger" size="large" plain>没有有账号?点击注册</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import '../tools.js'
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      nameFlag: '',
      emailFlag: ''
    }
  },
  methods: {
    chectedEmail() {
      this.validate_email(this.email)
    },
    login() {
      let isNull =
        this.userName !== '' && this.email !== '' && this.password !== ''
      let isChected =
        this.nameFlag === 'success' && this.emailFlag === 'success'
      if ((isNull, isChected)) {
        this.$http
          .post(
            'login',
            {
              userName: this.userName,
              email: this.email,
              password: this.password
            },
            { emulateJSON: true }
          )
          .then(function(result) {
            if (result.status === 0) {
              Toast('请刷新页面')
            }
            if (result.body.code === 200) {
              setStatus(true)
              this.$store.commit('changeStatus', true)
              this.$router.push('/home')
            } else {
              Toast('用户名或密码错误')
            }
          })
      } else {
        Toast('输入错误')
      }
    },
    toRegister() {
      this.$router.push('/register')
    },
    //对电子邮件的验证
    validate_email(obj) {
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!myreg.test(obj)) {
        this.emailFlag = 'error'
        return false
      } else {
        this.emailFlag = 'success'
        return true
      }
    },
    //验证中文输入
    isChinese(obj) {
      let reg = /^[\u0391-\uFFE5]+$/
      if (obj !== '' && !reg.test(obj)) {
        this.nameFlag = 'error'
        return false
      } else {
        this.nameFlag = 'success'
        return true
      }
    }
  },
  watch: {
    userName: function(newVal, oldVal) {
      if (newVal !== '') {
        this.isChinese(newVal)
      } else {
        this.nameFlag = ''
      }
    },
    email: function(newVal, oldVal) {
      if (newVal === '') {
        this.emailFlag = ''
      }
    }
  }
}
</script>
<style lang="less" >
.login-con {
  position: relative;
  top: 5rem;
  left: 0;
  .login-in {
    .mint-field .mint-cell-title {
      width: 7.5rem;
    }
    .mint-cell-value {
      position: relative;
      top: 0.75rem;
    }
  }
  .log-button {
    margin: 3rem 0;
  }
}
</style>