<template>
  <div>
    <div>
      <h2>sql画像</h2>
    </div>

    <div class="container">
      <div class="r1">
        <el-radio-group v-model="radio2">
          <el-radio-button label="DDL文件"></el-radio-button>
          <el-radio-button label="SQL文件"></el-radio-button>
        </el-radio-group>
      </div>

      <div class="r2">
        <el-radio-group v-model="radio1">
          <el-radio-button label="图形展示"></el-radio-button>
          <el-radio-button label="表格展示"></el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div style="margin-bottom: 40px;"></div>
    <div v-if="radio1 === '表格展示' && radio2 === 'SQL文件'">
      <el-table :data="sqlTableData" border style="width: 100%">
        <el-table-column prop="name" label="名称" width="250">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="250">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
          <el-button type="text" @click="showDetails(scope.row)">查看详情</el-button>
        </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </div>

    <div v-else-if="radio1 === '表格展示' && radio2 === 'DDL文件'">
      <el-table :data="ddlTableData" border style="width: 100%">
        <el-table-column prop="name" label="名称" width="250">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="250">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
          <el-button type="text" @click="showDetails(scope.row)">查看详情</el-button>
        </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </div>

    <div v-else-if="radio1 === '图形展示' && radio2 === 'SQL文件'">
      <sqlTable></sqlTable>
    </div>

    <div v-else>
      <ddlDraw></ddlDraw>
    </div>

  </div>
</template>
  
<script>
// import { Form } from 'element-ui';
import sqlTable from '@/views/sqltable/index.vue'
import ddlDraw from '@/views/ddldraw/index.vue'

export default {
  data() {
    return {
      radio1: '图形展示',
      radio2: 'DDL文件',
      sqlTableData: [{
        name: 'table',
        num: 10,
        // operate: '查看'
      }, {
        name: 'view',
        num: 20,
        // operate: '查看'
      }, {
        name: 'trigger',
        num: 30,
        // operate: '查看'
      }],
      ddlTableData: [{
        name: '数据类型',
        num: 10,
        // operate: '查看'
      }, {
        name: '约束',
        num: 20,
        // operate: '查看'
      }, {
        name: '索引',
        num: 30,
        // operate: '查看'
      }]
    }
  },

  components: { sqlTable, ddlDraw },

  methods: {
      showDetails(e) {
        // console.log(e.name)
        // console.log(e.num)
        this.$alert('具体数量为'+e.num, e.name+'的详情', {
          confirmButtonText: '确定',
          // callback: action => {
          //   this.$message({
          //     type: 'info',
          //     message: `action: ${ action }`
          //   });
          // }
        });
      }
    }
  }
  
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
}

/* .r1 .r2{
  background-color: aliceblue;
} */
</style>
