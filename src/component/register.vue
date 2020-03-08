<template>
  <div class="register-con">
    <div class="register-in">
      <mt-field label="用户名" placeholder="请输入用户名(中文哦~)" :state="this.nameFlag" v-model="userName"></mt-field>
      <mt-field
        @blur.native.capture="mtBlur()"
        label="邮箱"
        :state="this.emailFlag"
        placeholder="请输入邮箱"
        type="email"
        v-model="email"
      ></mt-field>
      <mt-field
        :state="this.pasFlag"
        label="密码"
        placeholder="请输入密码"
        type="password"
        v-model="password"
      ></mt-field>
      <mt-field
        @blur.native.capture="checkBlur()"
        :state="this.newPasFlag"
        label="确认密码"
        placeholder="请确认密码"
        type="password"
        v-model="newPassword"
      ></mt-field>
    </div>

    <mt-button @click="registe" class="reg-button" type="primary" size="large" plain>确认注册</mt-button>
    <mt-button @click="toLogin" class="reg-button" type="danger" size="large" plain>已有账号?点击登录</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import '../tools'
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      newPassword: '',
      nameFlag: '',
      emailFlag: '',
      pasFlag: '',
      newPasFlag: ''
    }
  },
  methods: {
    //输入框失去焦点
    mtBlur() {
      this.validate_email(this.email)
    },
    checkBlur() {
      if (this.password === this.newPassword) {
        this.pasFlag = 'success'
        this.newPasFlag = 'success'
      } else {
        this.newPasFlag = 'error'
        this.pasFlag = ''
      }
    },
    registe() {
      let isNull =
        this.userName !== '' && this.email !== '' && this.password !== ''
      let isChected =
        this.nameFlag === 'success' &&
        this.emailFlag === 'success' &&
        this.newPasFlag === 'success'
      if (isNull && isChected) {
        this.$http
          .post(
            'registe',
            {
              userName: this.userName,
              email: this.email,
              password: this.password
            },
            { emulateJSON: true }
          )
          .then(function(result) {
            if (result.body.code === 1) {
              Toast('用户名或邮箱已存在')
            } else if (result.body.code === 200) {
              Toast('注册成功, 请登录')
            } else {
              Toast('请重新注册')
            }
          })
      } else {
        Toast('注册失败, 请检查')
      }
    },
    toLogin() {
      this.$router.push('/login')
    },
    //对电子邮件的验证
    validate_email(obj) {
      let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
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
    },
    newPassword: function(newVal, oldVal) {
      if (newVal === '') {
        this.newPasFlag = ''
      }
    }
  }
}
</script>
<style lang="less" >
.register-con {
  position: relative;
  top: 5rem;
  left: 0;
  .register-in {
    .mint-field .mint-cell-title {
      width: 7.5rem;
    }
    .mint-cell-value {
      position: relative;
      top: 0.75rem;
    }
  }
  .reg-button {
    margin: 3rem 0;
  }
}
</style>