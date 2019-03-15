<template>
  <section class="form-section">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="业务场景:" prop="buizCode">
        <el-radio-group v-model="ruleForm.buizCode">
          <el-radio label="biz_t1">场景1</el-radio>
          <el-radio label="biz_t2">场景2</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="技术服务类型:" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1">cache</el-radio>
          <el-radio label="2">rabbitmq</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="技术服务用途:" prop="remark">
        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        redStar: false,
        ruleForm: {
          buizCode: '',
          type: '',
          remark: '',
        },
        rules: {
          buizCode: [
            {required: true, message: '请选择业务场景', trigger: 'change'}
          ],
          type: [
            {required: true, message: '请选择技术服务类型', trigger: 'change'}
          ],
          remark: [
            {required: true, message: '请填写技术服务用途', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = Object.assign({}, this.ruleForm);
            console.log(para);
            this.$http({
              url: this.$http.adornUrl('/paas/manager/open'),
              method: 'post',
              data: this.$http.adornData(para)
            }).then(({data}) => {
              if (data && data.code === '10000') {
                this.$message({
                  message: "提交成功！",
                  type: 'success'
                });
                this.$router.replace({name: 'index'})
              } else {
                this.$message.error(data.msg)
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  .form-section {
    padding: 10px;
    width: 500px;
  }
</style>
