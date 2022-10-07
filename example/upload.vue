<!--
 * @Description:添加合同
 * @Date: 2022-05-19 19:15:29
 * @LastEditTime: 2022-10-07 18:07:23
-->
<template>
  <div class="add-contract-dialog">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      v-loading="loading"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <el-form
        class="m-form-inline"
        ref="ruleForm"
        :inline="true"
        :model="formParams"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item class="full" label="合同名称" prop="contractName">
          <el-input v-model="formParams.contractName" placeholder="请输入" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item class="upload-fild" label="合同上传" prop="file">
          <el-upload
            action=""
            ref="upload"
            :auto-upload="false"
            :limit="1"
            :on-change="handleFileChange"
            :on-remove="handleRemove"
            accept=".pdf"
          >
            <el-button size="small" type="primary">
              浏览
            </el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传pdf文件，且不超过10M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
//import { addContract, updateContract } from '@/api/signTask';
export const updateContract = (params) => request({
  url: `/contract/update`,
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: params,
});
const initFormParams = {
  contractName: '',
  contractCode: '',
  file: '',
  fileSize: 0,
};

export default {
  data() {
    const validatorFile = (rule, value, callback) => {
      if (!this.isPdf) {
        callback('只能上传pdf文件');
      }
      if (this.formParams.fileSize / 1024 / 1024 > 10) {
        this.$refs.upload.clearFiles();
        callback('文件大小不能超过10M');
      }
      callback();
    };

    return {
      title: '添加合同',
      formParams: { ...initFormParams },
      rules: {
        file: [
          { required: true, message: '请选择合同文件', trigger: 'blur' },
          { validator: validatorFile, trigger: 'change' },
        ],
        contractName: [{ required: true, message: '请填写合同名称', trigger: 'blur' }],
      },
      isPdf: true,
      visible: false,
      loading: false,
    };
  },
  methods: {
    /**
     * @description: 打开弹出框
     * @return {*}
     */
    open() {
      this.visible = true;

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      this.formParams = { ...initFormParams };
      this.$refs.upload.clearFiles();
    },
    /**
     * @description: 上传文件之后相关处理
     * @param {*} data 上传接口返回数据
     * @return {*}
     */
    handleUploaded(data) {
      const { contractCode = '' } = data.data;
      this.formParams.contractCode = contractCode;

      this.resolve(this.formParams);
      this.init(); // 上传后弹框初始化
      this.visible = false;
    },
    onConfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const formData = new FormData();
          formData.append('contractName', this.formParams.contractName); // 合同名称
          formData.append('file', this.formParams.file); // 合同附件
          if (this.formParams.contractCode) {
            // 更新合同
            formData.append('contractCode', this.formParams.contractCode); // 合同附件code
            updateContract(formData)
              .then((res) => {
                this.handleUploaded(res);
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            // 添加合同
            addContract(formData)
              .then((res) => {
                this.handleUploaded(res);
              })
              .finally(() => {
                this.loading = false;
              });
          }
        }
      });
    },
    onCancel() {
      this.init();
      this.visible = false;
    },

    /**
     * @description: 选择文件
     * @param {*} file 文件流
     */
    handleFileChange(file) {
      console.log(33, file);
      this.formParams.fileSize = file.size;
      this.formParams.file = file.raw;
      const arr = file.name.split('.') || [];
      const type = arr.length ? arr[arr.length - 1] : '';
      this.isPdf = type && type.indexOf('pdf') > -1;
      this.$refs.ruleForm.validateField('file');
    },
    /**
     * @description: 移除文件
     * @return {*}
     */
    handleRemove() {
      this.formParams.file = '';
      this.formParams.fileSize = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.m-table-operation-btn {
  display: flex;
  align-items: center;
  .el-dropdown-link {
    cursor: pointer;
    margin-left: 20px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
.table-container {
  height: 350px;
  overflow-y: scroll;
}
.add-contract-dialog .m-form-inline .upload-fild {
  /deep/ .el-form-item__content {
    max-width: 70%;
  }
}
</style>
