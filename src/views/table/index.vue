<template>
  <section>
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="服务标识" prop="serviceId">
            <el-input v-model="formInline.user.serviceId" placeholder="服务标识" style="width: 140px;"></el-input>
          </el-form-item>
          <el-form-item label="组件用途" prop="note">
            <el-input v-model="formInline.user.note" placeholder="组件用途"></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <!--<a href="javascript:;" id="download"-->
          <!--style="background-color:#409EFF;color: #fff;padding: 12px 10px!important;margin-left: 10px!important;border-radius:4px "-->
          <!--@click="download()" download="download.csv">导出数据</a>-->
        </el-form>
        <!--表格-->
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          style="width: 100%">
          <!--<el-table-column type="selection">-->
          <!--</el-table-column>-->
          <el-table-column label="序号" width="100">
            <template slot-scope="scope">
              {{tableIndex(scope.$index)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="业务场景"
            width="180">
          </el-table-column>
          <el-table-column
            prop="servicerId"
            label="服务标识"
            width="300">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="组件用途">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageObj.currentPage"
            :page-size="pageObj.pageSize"
            layout="prev, pager, next, jumper"
            :total="pageObj.count">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </section>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        formInline: {
          user: {
            serviceId: '',
            note: ''
          }
        },
        tableData: [],
        pageObj: {
          count: 0,
          currentPage: 1,
          pageSize: 20
        },
        loading: false
      };
    },
    created() {
      this.getTslist();
      // this.$http.get('/api/getOptions').then((response) => {
      //   response = response.data;
      //   if (response.code === ERR_OK) {
      //     this.options = response.datas;
      //     this.places = response.places;
      //   }
      // });
    },
    methods: {
      getTslist() {
        this.loading = true;
        this.$http({
          url: this.$http.adornUrl('/paas/manager/tslist'),
          method: 'post',
          data: this.$http.adornData(this.getRepParams())
        }).then(({data}) => {
          if (data && data.code === '10000') {
            this.tableData = [].concat(data.data.list);
            this.pageObj.currentPage = data.data.curPage;
            this.pageObj.count = data.data.totalEl;
          } else {
            this.$message.error(data.msg)
          }
          this.loading = false;
        })
      },
      onSubmit() {
        // this.$message('模拟数据，这个方法并不管用哦~');
        this.pageObj.currentPage = 1;
        this.getTslist();
        console.log("点击了查询方法")
      },
      handleDelete(index, row) {
        this.tableData.splice(index, 1);
        this.$message({
          message: "操作成功！",
          type: 'success'
        });
      },
      handleEdit(index, row) {
        // this.dialogFormVisible = true;
        // this.form = Object.assign({}, row);
        // this.table_index = index;
        // console.log(row);
        let sid = row.servicerId || ''
        // console.log(sid);
        this.$router.replace({name: 'edit', query: {sid: sid}});
      },
      handleSave() {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.editLoading = true;
          let date = this.form.date;
          if (typeof date === "object") {
            date = [date.getFullYear(), (date.getMonth() + 1), (date.getDate())].join('-');
            this.form.date = date
          }
//          this.tableData[this.table_index] = this.form;
          this.tableData.splice(this.table_index, 1, this.form);
          this.$message({
            message: "操作成功！",
            type: 'success'
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        }).catch(() => {

        });
      },
      download: function () {
        console.log("xiazai")
        var obj = document.getElementById('download');
        var str = "姓名,出生日期,地址\n";
        for (var i = 0; i < this.tableData.length; i++) {
          var item = this.tableData[i];
          str += item.name + ',' + item.date + ',' + item.address;
          str += "\n";
        }
        console.log(obj)
        str = encodeURIComponent(str);
        console.log(str)
        obj.href = "data:text/csv;charset=utf-8,\ufeff" + str;
        obj.download = "download.csv";
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageObj.pageSize = val;
        this.getTslist();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getTslist();
        console.log(`当前页: ${val}`);
      },
      // table 序号
      tableIndex(val = 0) {
        const that = this
        if (that.pageObj.currentPage < 2) {
          return (val + 1)
        } else {
          return ((that.pageObj.currentPage - 1) * that.pageObj.pageSize + val + 1)
        }
      },
      getRepParams() {
        let obj = {}
        obj.serviceId = this.formInline.user.serviceId || ''
        obj.note = this.formInline.user.note || ''
        obj.start = this.pageObj.currentPage || ''
        obj.pagesize = this.pageObj.pageSize || ''
        console.info('请求参数' + JSON.stringify(obj))
        return obj
      }
    }
  }
  ;
</script>
<style>
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }

  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
</style>
