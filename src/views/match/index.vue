<template>
  <div>
    <h2>
      语法匹配
    </h2>
    <div>
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column prop="name" label="对象名" width="200">
        </el-table-column>
        <el-table-column prop="match" label="兼容性" width="200">
        </el-table-column>
        <el-table-column prop="choose" label="是否需要适配" width="200">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetails(scope.row)">查看</el-button>
            <el-button type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <h2>适配进度</h2>
      <div style="width: 100%; height: 120px; background-color: beige;">
        <h5>已经适配的数据条数：{{ hasNum }}</h5>
        <el-progress :text-inside="true" :stroke-width="26" :percentage=prec></el-progress>
        <h5>所有需要适配的数据条数：{{ allNum }}</h5>
      </div>
    </div>


  </div>
</template>
  
<script>
export default {
  data() {
    return {
      hasNum: 70,
      allNum: 100,
      prec: 70,
      tableData: [{
        name: 'default',
        match: '完全兼容',
        choose: '否',
      },
      {
        name: 'default',
        match: '完全兼容',
        choose: '否',
      },
      {
        name: 'default',
        match: '完全兼容',
        choose: '否',
      },
      {
        name: 'default',
        match: '完全兼容',
        choose: '否',
      },
      ]
    }
  },
  methods: {
      showDetails(e) {
        this.$alert('兼容性: '+e.match, '对象详情:'+e.name, {
          confirmButtonText: '确定',
        });
      }
    }
}
</script>

