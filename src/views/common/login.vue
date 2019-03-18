<template>
  <div class="login-box">
    <div class="logo-box">
      <h1 class="logo" title="paas">paas</h1>
    </div>
    <div class="title-box">
      <h2>paas管理平台</h2>
      <p></p>
    </div>
    <div class="login-main-box">
      <div class="login-main clearfix">
        <!--<div class="login-main-img fl"></div>-->
        <div class="login-main-form-box fr">
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                   status-icon>
            <el-form-item prop="userName">
              <el-input v-model="dataForm.userName" placeholder="用户名" prefix-icon="user-name-icon"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="密码"
                        prefix-icon="password-icon"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import {getUUID} from '@/utils'

  export default {
    data() {
      return {
        dataForm: {
          userName: '',
          password: ''
        },
        dataRule: {
          userName: [
            {required: true, message: '帐号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    methods: {
      // 提交表单
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/paas/manager/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.userName,
                'password': this.dataForm.password
              })
            }).then(({data}) => {
              if (data && data.code === '10000') {
                this.$store.commit("user/updateUserInfo", data.data);
                this.$router.replace({name: 'index'});
              } else {
                this.$message.error(data.msg);
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $NormalColor: #2F54EB;
  $hoverColor: #597EF7;
  $clickColor: #1D39C4;
  .login-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #F2F6FC;
    overflow: hidden;
    .logo-box {
      text-align: center;
      margin: 56px 0 16px 0;
      h1 {
        margin: 0;
      }
      .logo {
        text-indent: -9999px;
        display: inline-block;
        width: 110px;
        height: 44px;
        /*background: url("../../assets/img/logo.png") no-repeat center 100%;*/
      }
    }
    .title-box {
      text-align: center;
      h2 {
        font-size: 32px;
        color: rgba(48, 49, 51, 0.85);
        margin: 0;
      }
      p {
        font-size: 16px;
        color: #909399;
        margin: 0;
        padding: 8px 0 16px 0;
      }
    }
    .login-main-box {
      text-align: center;
      .login-main {
        display: inline-block;
        width: 660px;
        height: 350px;
        background: #FFFFFF;
        box-shadow: 0 4px 20px 0 #D3DAE8;
        border-radius: 16px;
        @media screen and (max-width: 576px) {
          height: 100%;
          width: 500px;
        }

        .login-main-img {
          display: inline-block;
          height: 350px;
          width: 312px;
          /*background: url("../../assets/img/login_icon.png") no-repeat center 100%;*/
          @media screen and (max-width: 576px) {
            display: block;
            float: none;
            width: 100%;
          }
        }
        .login-main-form-box {
          margin: 80px 0 0 0;
          display: inline-block;
          @media screen and (max-width: 576px) {
            display: block;
            float: none;
            width: 268px;
            margin: 0 auto;
          }
          .no-password-box {
            padding-top: 8px;
            text-align: right;
            & .link-span {
              cursor: pointer;
              color: $NormalColor;
              &:hover {
                color: $hoverColor;
              }
            }
          }
          .login-btn-submit {
            width: 100%;
          }
          .code-input-box {
            width: 172px;
          }
          .code-img-box {
            display: inline-block;
            width: 88px;
            height: 40px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            img {
              width: 100%;
              height: inherit;
            }
          }
        }
      }
    }
  }
</style>
