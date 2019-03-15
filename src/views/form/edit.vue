<template>
  <section>
    <el-row>
      <el-col :span="24">
        <el-form ref="ruleForm" :model="formInline" :rules="rules" label-width="150px" class="demo-ruleForm">
          <el-form-item label="服务标识" prop="serviceId">
            <el-input v-model="formInline.serviceId" placeholder="服务标识" style="width: 300px;"></el-input>
            <el-button type="primary" style="margin-left: 10px;" @click="submitForm('ruleForm')">查询</el-button>
          </el-form-item>
          <el-form-item label="编辑配置信息" style="height: auto;">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="编辑配置信息"
              :disabled="true"
              rows="6"
              v-model="formInline.oldContent" style="width: 500px;">
            </el-input>
          </el-form-item>
          <el-form-item label="编辑新配置信息" style="height: auto;">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="编辑新配置信息"
              rows="6"
              v-model="formInline.content" style="width: 500px;">
            </el-input>
          </el-form-item>
          <el-form-item style="padding-left: 300px;">
            <el-button type="primary" @click="saveConf">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          serviceId: '',
          content: '',
          oldContent: ''
        },
        rules: {
          serviceId: [
            {required: true, message: '请输入服务标识', trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      let sid = this.$route.query.sid || '';
      if (sid !== '') {
        this.formInline.serviceId = sid;
        this.getMsg();
      }
    },
    methods: {
      getMsg() {
        this.$http.get(this.$http.adornUrl('/paas/manager/detail'), {
          params: this.$http.adornParams(this.getRepParams())
        }).then(({data}) => {
          if (data && data.code === '10000') {
            this.formInline.content = JSON.stringify(data.data.serverInfo);
            this.formInline.oldContent = this.formInline.content;
          } else {
            this.$message.error(data.msg);
          }
          this.loading = false;
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getMsg();
          } else {
            return false;
          }
        })
      },
      getRepParams() {
        let obj = {}
        obj.serviceId = this.formInline.serviceId || ''
        return obj
      },
      saveConf() {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/paas/manager/update'),
            method: 'post',
            data: this.$http.adornData(this.getSaveParams())
          }).then(({data}) => {
            if (data && data.code === '10000') {
              this.formInline.oldContent = this.formInline.content;
              this.$message({
                message: "操作成功！",
                type: 'success'
              });
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {
        });
      },
      getSaveParams() {
        let obj = {}
        obj.serviceId = this.formInline.serviceId || '';
        obj.configInfo = this.formInline.content || '';
        return obj
      }
    }
  }
</script>

<style scoped>
  .fg_line {
    border-top: 1px solid black;
    height: 1px;
  }
</style>
