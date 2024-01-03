<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="queryParam.username" placeholder="输入用户名查找" prefix-icon="el-icon-search"
            @search="searchUser" />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserVisible = true">新增</el-button>
        </el-col>
      </el-row>

      <template>
        <el-table :data="userlist" style="width:100%">
          <el-table-column prop="ID" label="ID" width="180">

          </el-table-column>
          <el-table-column prop="username" label="用户名" width="180">

          </el-table-column>

          <el-table-column prop="role" label="角色" width="180">
          </el-table-column>

          <el-table-column prop="CreatedAt" label="创建时间" width="180">
          </el-table-column>

          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>

          <el-table-column prop="phone_number" label="电话号码" width="180">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="editUser(scope.row.ID)">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteUser(scope.row.ID)">删除</el-button>
              <el-button size="small" type="info" @click="ChangePassword(scope.row.ID)">修改密码</el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </el-card>

    <!-- 新增用户区域 -->
    <!-- <el-dialog closable title="新增用户" :visible="addUserVisible" width="60%" @ok="addUserOk" @cancel="addUserCancel" destroyOnClose>
      <el-form :model="newUser" :rules="addUserRules" ref="addUserRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newUser.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newUser.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input v-model="newUser.checkpass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phoneNumber">
          <el-input v-model="newUser.phoneNumber" type="text"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newUser.email" type="text"></el-input>
        </el-form-item>
      </el-form>
      <div style="justify-content: flex-end;">
        <el-button type="primary">确定</el-button>
        <el-button type="danger">取消</el-button>
      </div>
    </el-dialog> -->

    <!-- 新建用户弹窗 -->
    <el-dialog title="新增用户" :visible.sync="addUserVisible" width="60%" closable destroyOnClose>
      <el-form :model="newUser" :rules="addUserRules" ref="addUserRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newUser.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newUser.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input v-model="newUser.checkpass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phoneNumber">
          <el-input v-model="newUser.phoneNumber" type="text"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newUser.email" type="text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUserOk">确 定</el-button>
        <el-button type="danger" @click="addUserCancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户区域 -->
    <el-dialog title="编辑用户" :visible.sync="editUserVisible" width="60%" closable destroyOnClose>
      <el-form :model="userInfo" :rules="userRules" ref="addUserRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>

        <el-form-item label="电话号码" prop="phoneNumber">
          <el-input v-model="userInfo.phoneNumber"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>

        <el-form-item label="是否为管理员">
          <el-switch :checked="IsAdmin" checked-children="是" un-checked-children="否" @change="adminChange" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editUserOk">确 定</el-button>
        <el-button type="danger" @click="editUserCancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="changePasswordVisible" width="60%" closable destroyOnClose>
      <el-form :model="changePassword" :rules="changePasswordRules" ref="changePasswordRef">
        <el-form-item has-feedback label="密码" prop="password">
          <el-input v-model="changePassword.password" type="password"></el-input>
        </el-form-item>
        <el-form-item has-feedback label="确认密码" prop="checkpass">
          <el-input v-model="changePassword.checkpass" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePasswordOk">确 定</el-button>
        <el-button type="danger" @click="changePasswordCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import day from 'dayjs'

const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    width: '10%',
    key: 'id',
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: '20%',
    key: 'username',
    align: 'center',
  },
  {
    title: '注册时间',
    dataIndex: 'CreatedAt',
    width: '20%',
    key: 'CreatedAt',
    align: 'center',
    customRender: (val) => {
      return val ? day(val).format('YYYY年MM月DD日 HH:mm') : '暂无'
    },
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: '20%',
    key: 'role',
    align: 'center',
    scopedSlots: { customRender: 'role' },
  },
  {
    title: '操作',
    width: '30%',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
  },
]

export default {
  data() {
    return {
      pagination: {
        pageSizeOptions: ['5', '10', '20'],
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showTotal: (total) => `共${total}条`,
      },
      userlist: [],
      userInfo: {
        username: '',
        password: '',
        role: 2,
        checkPass: '',
        phoneNumber: '',
        email: ''
      },
      newUser: {
        username: '',
        password: '',
        // role: 1,
        checkPass: '',
        phoneNumber: '',
        email: ''
      },
      changePassword: {
        id: 0,
        password: '',
        checkPass: '',
      },
      columns,
      queryParam: {
        username: '',
        pagesize: 5,
        pagenum: 1,
      },
      editVisible: false,
      userRules: {
        username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.userInfo.username == '') {
                callback(new Error('请输入用户名'))
              }
              if ([...this.userInfo.username].length < 4 || [...this.userInfo.username].length > 12) {
                callback(new Error('用户名应当在4到12个字符之间'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.userInfo.password == '') {
                callback(new Error('请输入密码'))
              }
              if ([...this.userInfo.password].length < 6 || [...this.userInfo.password].length > 20) {
                callback(new Error('密码应当在6到20位之间'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        checkpass: [
        { required: true, message: '请重复密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.userInfo.checkpass == '') {
                callback(new Error('请输入密码'))
              }
              if (this.userInfo.password !== this.userInfo.checkpass) {
                callback(new Error('密码不一致，请重新输入'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],

        email: [{
          required: true,//是否必填
          message: '请输入邮箱地址',      //错误提示信息
          trigger: 'blur'              //检验方式（blur为鼠标点击其他地方，）
        },
        {
          type: 'email',                       //要检验的类型（number，email，date等）
          message: '请输入正确的邮箱地址',
          // trigger: ['blur', 'change']（change为检验的字符变化的时候）
          trigger: 'blur'
        }
        ],
      },
      addUserRules: {
        username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.newUser.username == '') {
                callback(new Error('请输入用户名'))
              }
              if ([...this.newUser.username].length < 4 || [...this.newUser.username].length > 12) {
                callback(new Error('用户名应当在4到12个字符之间'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.newUser.password == '') {
                callback(new Error('请输入密码'))
              }
              if ([...this.newUser.password].length < 6 || [...this.newUser.password].length > 20) {
                callback(new Error('密码应当在6到20位之间'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        checkpass: [
        { required: true, message: '请重复密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.newUser.checkpass == '') {
                callback(new Error('请输入密码'))
              }
              if (this.newUser.password !== this.newUser.checkpass) {
                callback(new Error('密码不一致，请重新输入'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],

        email: [
          {
            required: true,//是否必填
            message: '请输入邮箱地址',      //错误提示信息
            trigger: 'blur'              //检验方式（blur为鼠标点击其他地方，）
          },
          {
            type: 'email',                       //要检验的类型（number，email，date等）
            message: '请输入正确的邮箱地址',
            // trigger: ['blur', 'change']（change为检验的字符变化的时候）
            trigger: 'blur'
          }
        ],
      },
      changePasswordRules: {
        password: [
          {
            validator: (rule, value, callback) => {
              if (this.changePassword.password == '') {
                callback(new Error('请输入密码'))
              }
              if ([...this.changePassword.password].length < 6 || [...this.changePassword.password].length > 20) {
                callback(new Error('密码应当在6到20位之间'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        checkpass: [
          {
            validator: (rule, value, callback) => {
              if (this.changePassword.checkpass == '') {
                callback(new Error('请输入密码'))
              }
              if (this.changePassword.password !== this.changePassword.checkpass) {
                callback(new Error('密码不一致，请重新输入'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      editUserVisible: false,
      addUserVisible: false,
      changePasswordVisible: false,
    }
  },
  created() {
    // console.log("测试获取用户列表")
    this.getUserList()
    console.log("已经执行created()")
  },
  computed: {
    IsAdmin: function () {
      if (this.userInfo.role === 1) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      console.log("检测是否执行getuserlist")
      const { data: res } = await this.$http.get('users', {
        params: {
          // username: this.queryParam.username,
          page_size: this.queryParam.pagesize,
          page_num: this.queryParam.pagenum,
        },
      })
      console.log(res)
      if (res.status !== 200) {
        if (res.status === 1004 || 1005 || 1006 || 1007) {
          window.sessionStorage.clear()
          this.$router.push('/login')
        }
        this.$message.error(res.message)
      }
      // res.data.role = 

      this.userlist = res.data
      this.pagination.total = res.total
    },

    // 搜索用户
    async searchUser() {
      this.queryParam.pagenum = 1
      this.pagination.current = 1
      const { data: res } = await this.$http.get('user/search', {
        params: {
          username: this.queryParam.username,
          pagesize: this.queryParam.pagesize,
          pagenum: this.queryParam.pagenum,
        },
      })
      if (res.status !== 200) return this.$message.error(res.message)
      // console.log(res.data.role,'$$$$$$$$$')
      this.userlist = res.data
      this.pagination.total = res.total
    },

    // 更改分页
    handleTableChange(pagination, filters, sorter) {
      var pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.queryParam.pagesize = pagination.pageSize
      this.queryParam.pagenum = pagination.current

      if (pagination.pageSize !== this.pagination.pageSize) {
        this.queryParam.pagenum = 1
        pager.current = 1
      }
      this.pagination = pager
      this.getUserList()
    },
    // 删除用户
    // deleteUser(id) {
    //   console.log(id)
    //   this.$confirm({
    //     title: '提示：请再次确认',
    //     content: '确定要删除该用户吗？一旦删除，无法恢复',
    //     onOk: async () => {
    //       const { data: res } = await this.$http.delete(`user/${id}`)
    //       if (res.status != 200) return this.$message.error(res.message)
    //       this.$message.success('删除成功')
    //       this.getUserList()
    //     },
    //     onCancel: () => {
    //       this.$message.info('已取消删除')
    //     },
    //   })
    // },

    deleteUser(id) {
      // console.log(id)
      this.$confirm('提示：请再次确认', '确定要删除该用户吗？一旦删除，无法恢复', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          try {
            const response = await this.$http.delete(`user/${id}`)
            console.log(response)
            if (response.status === 200) {
              this.$message.success('删除成功')
              this.getUserList() // 删除成功后刷新用户列表
            } else {
              this.$message.error(response.data.message || '删除失败，请重试')
            }
          } catch (error) {
            this.$message.error('删除失败，请重试')
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        });
    },


    // 新增用户
    addUserOk() {
      this.$refs.addUserRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const { data: res } = await this.$http.post('user/add', {
          username: this.newUser.username,
          password: this.newUser.password,
          phone_number: this.newUser.phoneNumber,
          email: this.newUser.email
          // role: this.newUser.role,
        })
        if (res.status != 200) return this.$message.error(res.message)
        this.$refs.addUserRef.resetFields()
        this.addUserVisible = false
        this.$message.success('添加用户成功')
        this.getUserList()
      })
    },
    addUserCancel() {
      this.$refs.addUserRef.resetFields()
      this.addUserVisible = false
      this.$message.info('新增用户已取消')
    },
    adminChange(checked) {
      if (checked) {
        this.userInfo.role = 1
      } else {
        this.userInfo.role = 2
      }
    },

    // 编辑用户
    async editUser(id) {
      this.editUserVisible = true
      console.log("==========>", id)
      const { data: res } = await this.$http.get(`user/${id}`)
      this.userInfo = res.data
      this.userInfo.id = id
    },
    editUserOk() {
      this.$refs.addUserRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const { data: res } = await this.$http.put(`user/${this.userInfo.id}`, {
          username: this.userInfo.username,
          password: this.userInfo.password,
          phone_number: this.userInfo.phoneNumber,
          email: this.userInfo.email,
          role: this.userInfo.role,
        })
        if (res.status != 200) return this.$message.error(res.message)
        this.editUserVisible = false
        this.$message.success('更新用户信息成功')
        this.getUserList()
      })
    },
    editUserCancel() {
      this.$refs.addUserRef.resetFields()
      this.editUserVisible = false
      this.$message.info('编辑已取消')
    },

    // 修改密码
    async ChangePassword(id) {
      this.changePasswordVisible = true
      const { data: res } = await this.$http.get(`user/${id}`)
      this.changePassword.id = id
    },
    changePasswordOk() {
      this.$refs.changePasswordRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const { data: res } = await this.$http.put(`admin/changepw/${this.changePassword.id}`, {
          password: this.changePassword.password,
        })
        if (res.status != 200) return this.$message.error(res.message)
        this.changePasswordVisible = false
        this.$message.success('修改密码成功')
        this.getUserList()
      })
    },
    changePasswordCancel() {
      this.$refs.changePasswordRef.resetFields()
      this.changePasswordVisible = false
      this.$message.info('已取消')
    },
  },
}
</script>
  
<style scoped>
.actionSlot {
  display: flex;
  justify-content: center;
}
</style>