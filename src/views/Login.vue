<template>
  <div class="father">
    <div class="bg">
      <video controls autoplay="autoplay" loop src="@/assets/bgVedio.mp4"></video>
    </div>

    <div class="title">
      <p class="title1">QQ音乐</p>
      <p class="title2">听我想听</p>
    </div>

    <div class="login-type" v-show="!isPhone">
      <p class="type-phone" @click="toLogin">手机登录</p>
      <p class="type-weixin">微信登录</p>
      <p class="type-youke" @click="goHome">游客登录</p>
    </div>

    <div class="login" v-show="isPhone">
      <p>
        <span>手机号码</span>
        <input type="text" v-model="phone">
      </p>
      <p>
        <span>密码</span>
        <input type="password" v-model="password">
      </p>
      <span class="quxiao" @click="isPhone = false">取消</span>
      <span class="queren" @click="goLogin">立即登录</span>

      <!-- 消息弹出层 -->
      <van-dialog v-if="show" title="请输入账号和密码" theme="round-button" @close="close">
        <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />
      </van-dialog>

    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      isPhone: false,
      phone: '',
      password: '',
      show: false,     // 显示消息弹出层。
    }
  },
  methods: {
    // 回到首页
    goHome () {
      this.$router.push({ name: 'home' });
      this.$store.commit('CHANGEITEM', 1);
    },
    // 手机登录
    toLogin () {
      this.isPhone = true;
    },
    // 开始发送请求，手机号和密码进行登录
    async goLogin () {

      // let result = await this.$API.reqPhoneLogin(this.phone, this.password);

      // 发送账号密码验证请求。
      if (this.phone.trim() != '' && this.password.trim() != '') {
        this.$store.commit('CHANGELOGIN', true);
        this.$router.push('/user');         // 进入 我的
        this.$store.commit('CHANGEITEM', 0);

        // 暂存到本地token
        let token = "nsiadvnsadpvnaspvdnasp";
        localStorage.setItem('LoginToken', token);
      }
      else {
        this.show = true;
      }
    },
    // 点击弹出层的确认框
    close () {
      this.show = false;
    }

  }
}
</script>

<style lang="less" scoped>
.father {
  overflow: hidden;
}

.bg {
  width: 100%;
  height: 16.2rem;
  overflow: hidden;
  filter: blur(7px);
  position: absolute;
  z-index: -1;
  video {
    width: 120%;
  }
}

.title {
  margin-top: 3.6rem;
  text-align: center;
  color: #fff;

  .title1 {
    font-size: 0.88rem;
    margin-bottom: 0.2rem;
  }
  .title2 {
    font-size: 0.6rem;
  }
}

.login-type {
  margin-top: 2.6rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  p {
    text-align: center;
    font-size: 0.4rem;
    line-height: 0.7rem;
    width: 3.6rem;
    height: 0.7rem;
    border-radius: 0.24rem;
    background-color: #fff;
    letter-spacing: 0.04rem;
    margin-bottom: 0.4rem;
  }
}

.login {
  margin-top: 120px;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    span {
      display: inline-block;
      text-align-last: justify; // 分散对齐
      font-size: 0.4rem;
      line-height: 0.7rem;
      width: 2rem;
      height: 0.7rem;
      border-radius: 0.24rem;
      color: #fff;
      padding: 0px 0.1rem;
    }
    input {
      height: 0.7rem;
      width: 3.8rem;
      border-radius: 10px;
      outline: none;
      border: none;
      font-size: 0.4rem;
      padding-left: 0.3rem;
      margin-left: 0.2rem;
    }
  }
  span {
    display: inline-block;
    text-align-last: justify;
    height: 0.6rem;
    width: 1.8rem;
    line-height: 0.6rem;
    padding: 0px 0.2rem;
    color: #fff;
    border-radius: 0.24rem;
  }
  .quxiao {
    padding: 0px 0px;
    background-color: #ccc;
    text-align-last: auto;
    letter-spacing: 0.3rem;
    padding-left: 0.46rem;
    // 定位
    margin-left: 80px;
    margin-right: 50px;
    margin-top: 50px;
  }
  .queren {
    background-color: pink;
    margin-top: 50px;
  }
}
</style>