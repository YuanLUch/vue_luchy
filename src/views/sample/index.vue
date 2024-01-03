<template>
  <div class="case-set-management">
    <div>
      <!-- 搜索栏 -->
      <el-card id="search">
        <el-row>
          <el-col :span="20">
            <el-input v-model="searchModel.name" placeholder="任务集名" clearable></el-input>
            <el-button type="primary" round icon="el-icon-search" @click="getCaseSetList">查询</el-button>
          </el-col>

          <el-col :span="4" align="right">
            <el-button type="primary" icon="el-icon-plus" circle @click="handleAdd(null)"></el-button>
          </el-col>
        </el-row>
      </el-card>

      <!-- 任务集合表格 -->
      <el-card>
        <el-table :data="caseSets" stripe style="width: 100%" :row-style="{ cursor: 'pointer' }" @row-click="handleView">
          <el-table-column type="expand" @row-click="handleView">
            <template slot-scope="props">
              <!-- <el-table :data="caseSet" stripe style="width: 80%"> -->
              <el-table :data="caseSet">
                <el-table-column prop="id" label="任务ID"> </el-table-column>
                <el-table-column prop="caseName" label="任务名称"></el-table-column>
                <el-table-column prop="folder" label="任务路径"></el-table-column>
                <el-table-column prop="type" label="任务类型"></el-table-column>
                <el-table-column prop="status" label="任务状态"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间"></el-table-column>
                <el-table-column prop="updatedAt" label="修改时间"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="开始" placement="top">
                      <el-button type="primary" class="start" circle size="mini" icon="el-icon-video-play"></el-button>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="暂停" placement="top">
                      <el-button type="primary" circle size="mini" icon="el-icon-video-pause"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                      <el-button type="primary" circle size="mini" icon="el-icon-edit"
                        @click="openEditUI(scope.row.id)"></el-button>
                      <!-- <el-button type="primary" circle size="mini" icon="el-icon-download"></el-button> -->
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="SQL画像/语法匹配" placement="bottom">
                      <el-button type="primary" circle size="mini" icon="el-icon-s-opportunity" @click="jumphandelMatch">
                      </el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="报告下载" placement="bottom">
                      <el-button type="primary" circle size="mini" icon="el-icon-download" @click="jumphandelSql">
                      </el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除任务" placement="bottom">
                      <el-button type="danger" circle size="mini" icon="el-icon-delete"
                        @click="handleDeleteCase(scope.row)">
                      </el-button>
                    </el-tooltip>

                  </template>
                </el-table-column>
              </el-table>

              <!-- 分页组件 -->
              <!-- <el-pagination :current-page="searchtable.pageNo" :page-sizes="[5, 10, 20, 50]"
                :page-size="searchtable.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total1"
                @size-change="handleSizeChange" @current-change="handleCurrentChange">
              </el-pagination> -->
            </template>
          </el-table-column>
          <el-table-column prop="id" label="任务集ID" width="120"></el-table-column>
          <el-table-column prop="name" label="任务集名称" width="200"></el-table-column>
          <!-- <el-table-column
          prop="folder"
          label="位置"
          width="200"
        ></el-table-column> -->
          <el-table-column prop="createdAt" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="updatedAt" label="修改时间" width="200"></el-table-column>
          <el-table-column label="操作" width="400">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="新建任务" placement="top">
                <el-button type="primary" icon="el-icon-plus" size="small" circle
                  @click="handleAddCase"></el-button></el-tooltip>
              <el-tooltip class="item" effect="dark" content="编辑任务集" placement="top">
                <el-button type="primary" icon="el-icon-edit" size="small" circle
                  @click="handleAdd(null)"></el-button></el-tooltip>
              <!-- <el-button type="primary" circle size="small" icon="el-icon-s-management" @click="jumphandelSql">
              </el-button>
              <el-button type="primary" circle size="small" icon="el-icon-s-opportunity" @click="jumphandelMatch">
              </el-button>
              <el-button type="primary" circle size="small" icon="el-icon-download" @click="jumphandelDl">
              </el-button> -->
              <el-tooltip class="item" effect="dark" content="删除任务集" placement="top">
                <el-button type="danger" circle size="small" icon="el-icon-delete" @click="handleDelete(scope.row)">
                </el-button></el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- 添加/编辑任务集合对话框 -->
        <el-dialog :visible.sync="dialogVisible" :title="title" :before-close="handleCloseDialog" width="60%" center
          :destroy-on-close="true">
          <el-form ref="newSetForm" :model="newSet" label-width="120px">
            <el-form-item label="任务集ID" prop="id">
              <el-input v-model="newSet.id"></el-input></el-form-item>
            <el-form-item label="任务集名称" prop="name">
              <el-input v-model="newSet.name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="位置" prop="folder">
            <el-input placeholder="请选择文件夹" v-model="newSet.folder">
              <el-button
                slot="append"
                icon="el-icon-folder-opened"
                @click="openFile"
              ></el-button>
            </el-input>
            <input
              type="file"
              ref="folderInput"
              style="display: none"
              webkitdirectory
              @change="changeFile($event)"
            />
          </el-form-item> -->
            <el-form-item label="创建时间" prop="createdAt">
              <el-date-picker v-model="newSet.createdAt" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 添加/编辑任务对话框 -->
        <el-dialog :visible.sync="dialogVisiblex" :title="titlex" :before-close="handleCloseDialog" width="60%" center
          :destroy-on-close="true">
          <el-form ref="newCaseFormRef" :model="newCaseForm" label-width="120px">
            <el-form-item label="任务ID" prop="id">
              <el-input v-model="newCaseForm.id"></el-input></el-form-item>
            <el-form-item label="任务名称" prop="caseName">
              <el-input v-model="newCaseForm.caseName"></el-input>
            </el-form-item>
            <el-form-item label="任务类型" prop="caseSetId">
              <!-- <el-input v-model="newCaseForm.caseSetId"></el-input> -->
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="位置" prop="folder">
              <el-input placeholder="请选择文件夹" v-model="newSet.folder">
                <el-button slot="append" icon="el-icon-folder-opened" @click="openFile"></el-button>
              </el-input>
              <input type="file" ref="folderInput" style="display: none" webkitdirectory @change="changeFile($event)" />
            </el-form-item>
            <el-form-item label="创建时间" prop="createdAt">
              <el-date-picker v-model="newCaseForm.createdAt" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisiblex = false">取 消</el-button>
            <el-button type="primary" @click="handleSavex">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>

      <!-- 分页组件 -->
      <el-pagination :current-page="searchModel.pageNo" :page-sizes="[5, 10, 20, 50]" :page-size="searchModel.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <div style="margin-top: 30px;"></div>
    <!-- 任务统计 -->
    <div>
      <h3>任务统计</h3>
      <el-row>
        <el-col :span="6">
          <div>
            <el-statistic :value="allTask" title="全部任务">
              <template slot="formatter">

              </template>
            </el-statistic>
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <el-statistic :value="culing" title="评估中">
              <template slot="formatter">

              </template>
            </el-statistic>
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <el-statistic :value="outed" title="已失效">
              <template slot="formatter">

              </template>
            </el-statistic>
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <el-statistic :value="finished" title="已完成">
              <template slot="formatter">

              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import sampleApi from "@/api/sample";
// import Statistic from 'element-ui';
// Vue.use(Statistic)
export default {
  data() {
    return {
      allTask: 10,
      culing: 5,
      outed: 2,
      finished: 7,
      newCaseForm: {
        id: "",
        caseName: "",
        caseSetId: "",
        casePath: "",
        caseTask: "",
        createdAt: "",
        updatedAt: "",

      },
      row: "",
      dialogVisible: false,
      dialogVisiblex: false,
      newSet: {
        id: "",
        name: "",
        folder: "",
        createdAt: "",
        updatedAt: "",
      },
      dialogTitle: "",
      title: "",
      titlex: "",
      caseSet: {

      },
      total: 0,
      total1: 0,
      searchModel: {
        pageNo: 1,
        pageSize: 10,
      },
      searchtable: {
        pageNo: 1,
        pageSize: 10,
        case_set_id: "",
      },
      // 任务集合列表数据
      caseSets: [{
        id: "1",
        name: "1",
        createdAt: "1",
        updatedAt: "1",
      }],
      caseSet: [{
        id: "1",
        caseName: "1",
        caseSetId: "1",
        // casePath: "1",
        // caseTask: "1",
        folder: "1",
        type: "1",
        status: "成功",
        createdAt: "1",
        updatedAt: "1",
      }],
      //caseSet: [],
      tableCase: {},
      like: true,

    };
  },

  methods: {
    jumphandelSql() {
      this.$router.push('/test/result')
    },
    jumphandelDl() {
      this.$router.push('/test/reportdl')
    },
    jumphandelMatch() {
      this.$router.push('/test/match')
    },
    newTask() {
      this.$router.push("/test/task");
    },
    openFile() {
      this.$refs.folderInput.click();
    },
    changeFile(e) {
      const folderPath = e.target.files[0].path; // 获取选择的文件夹路径
      this.newSet.folder = folderPath; // 将路径绑定到数据对象中的属性
    },
    getCasesById(id) {
      this.getCaseList(id);
    },
    openEditUI(id) {
      if (id == null) {
        this.dialogTitle = "添加任务集";
        this.caseSet = {
          name: "",
          path: "",
          cases: [],
        };
      } else {
        this.title = "修改任务";
        //根据id查询这一行数据
        sampleApi.getCaseById(id).then((response) => {
          this.newCaseForm = response.data;
        });
      }
      this.dialogVisiblex = true;
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getCaseSetList();
      this.getCaseList();
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo;
      this.getCaseSetList();
      this.getCaseList();
    },
    getCaseList(caseSetId) {
      if (caseSetId != null) {
        this.getCaseSetList();
        this.searchtable.case_set_id = caseSetId;
        //this.searchtable.case_set_id = 1;
      } //

      sampleApi.getCaseList(this.searchtable).then((response) => {
        this.caseSet = response.data.rows;
        this.total1 = response.data.total;
      });
    },
    getCaseSetList() {
      sampleApi.getCaseSetList(this.searchModel).then((response) => {
        this.caseSets = response.data.rows;
        this.total = response.data.total;
      });
    },
    // 添加任务集合按钮点击事件处理函数
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getCaseSetList();
      this.getCaseList();
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo;
      this.getCaseSetList();
      this.getCaseList();
    },
    addCase() {
      this.dialogTitle = "添加任务";
    },
    handleAdd() {
      this.dialogTitle = "添加任务集合";
      this.caseSet = {
        id: "",
        name: "",
        path: "",
        cases: [],
      };
      this.dialogVisible = true;
    },
    handleAddCase() {
      this.dialogTitlex = "添加任务";
      this.dialogVisiblex = true;
    },

    // 删除任务按钮点击事件处理函数
    handleDeleteCase(caseSet) {
      this.$confirm(`您确认删除任务${caseSet.id}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("任务id:", caseSet.id);
          sampleApi.deleteCaseById(caseSet.id).then((response) => {
            this.$message({
              type: "success",
              message: response.message,
            });
            this.getCaseSetList();
            this.getCaseList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除任务集合按钮点击事件处理函数
    handleDelete(caseSets) {
      this.$confirm(`您确认删除任务集${caseSets.id}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("任务集id:", caseSets.id);
          sampleApi.deleteCaseSetById(caseSets.id).then((response) => {
            this.$message({
              type: "success",
              message: response.message,
            });
            this.getCaseSetList();
            this.getCaseList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 任务集合表格行点击事件处理函数
    handleView(row) {
      console.log("row::", row);
      this.getCaseList(row.id);
      //this.searchtable.case_set_id = 1;
      //console.log("View cases of case set:", row.name);
    },
    // 选择文件夹按钮点击事件处理函数
    handleSelectFolder() {
      const fu = document.getElementById("open");
      if (fu == null) return;
      this.textarea = fu.files[0].name;
      console.log(fu.files[0].name);
    },
    // 关闭添加/编辑任务集合对话框前的钩子函数
    handleCloseDialog(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => { });
    },
    //为任务集添加任务
    handleSavex() {
      this.$refs.newCaseFormRef.validate((valid) => {
        if (valid) {
          sampleApi.saveCase(this.newCaseForm).then((response) => {
            this.$message({
              message: response.message,
              type: "success",
            });
            this.dialogVisiblex = false;
            this.getCaseSetList();
            this.getCaseList();
          });
        } else {
          this.$message.error("添加任务集失败");
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 确定添加/编辑任务集合对话框按钮点击事件处理函数
    handleSave() {
      this.$refs.newSetForm.validate((valid) => {
        if (valid) {
          sampleApi.uploadFolder(this.newSet).then((response) => {
            this.$message({
              message: response.message,
              type: "success",
            });
            this.dialogVisible = false;
            this.getCaseSetList();
            this.getCaseList();
          });
        } else {
          this.$message.error("添加任务集失败");
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  created() {
    this.getCaseSetList();
    this.getCaseList();
  },
};
</script>

<style lang="scss">
#search .el-input {
  width: 200px;
  margin-right: 10px;
}

.el-dialog__wrapper {
  z-index: 1000;
}

.el-table th:last-child .cell {
  text-align: center;
}

.el-table-column--expand {
  width: 50px !important;
  text-align: center;
}

.el-button--danger {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

.el-table__expand-icon {
  margin-left: 10px;
  margin-right: 10px;
}

.el-form-item__label {
  width: 80px;
  text-align: right;
  padding-right: 10px;
}

.el-button--small {
  padding: 5px 12px;
}

.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>