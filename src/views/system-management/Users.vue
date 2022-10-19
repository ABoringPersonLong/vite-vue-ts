<template>
  <div class="user-container h-full">
    <el-card class="h-full" :class="isDarkTheme ? 'dark-scroll-bar' : 'light-scroll-bar'">
      <!-- 搜索和添加区域 -->
      <el-row :gutter="15">
        <el-col :span="7">
          <el-input v-model="search" placeholder="请输入名称" clearable @keyup.enter="getUserList">
            <template #append>
              <el-button :icon="Search" @click="getUserList" />
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表 -->
      <el-table style="width: 100%" border stripe :data="userList" class="mt-3">
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="role_name" label="角色" />
        <el-table-column label="状态">
          <template v-slot="{ row }">
            <el-switch v-model="row.status" @change="userStateChange(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="{ row }">
            <el-button type="primary" :icon="Edit" @click="showUpdateDialog(row.id)">编辑</el-button>
            <el-button type="danger" :icon="Delete" @click="deleteUser(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页导航 -->
      <el-pagination
        v-model:currentPage="pagination.current"
        v-model:page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        class="mt-3"
        :total="pagination.total"
        :page-sizes="[10, 20, 30, 40, 50]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog v-model="addDialogVisible" title="添加用户" width="30%" @close="resetForm(addFormRef)">
      <el-form
        ref="addFormRef"
        label-width="70px"
        status-icon
        :model="user"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="user.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">保存</el-button>
      </template>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog v-model="updateDialogVisible" title="修改用户" width="30%" @close="resetForm(updateFormRef)">
      <el-form
        ref="updateFormRef"
        label-width="70px"
        status-icon
        :model="user"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="user.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="updateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUser">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, reactive, onBeforeMount, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessageBox, FormInstance } from 'element-plus'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/store/layout'
import {
  getUserListApi,
  getUserByIdApi,
  setUserStatusApi,
  addUserApi,
  updateUserApi,
  deleteUserApi
} from '@/api/user'

const message: any = inject('message')
const layoutStore = useLayoutStore()

// 定义类型
interface UserType { // 用户类型
  id: number
  username: string
  email: string
  phone: string
  role_name: string
  status: boolean
}

// 全局状态
const { isDarkTheme } = storeToRefs(layoutStore)

// ref 操作 DOM 元素
const addFormRef = ref<FormInstance>() // 添加表单的 ref
const updateFormRef = ref<FormInstance>() // 修改表单的 ref

// 响应式状态
const search: Ref<string> = ref('') // 搜索框的值
const userList: Ref<UserType[]> = ref([]) // 用户列表
const pagination = reactive({ // 分页数据对象
  current: 1, // 当前页
  size: 10, // 一页显示几条
  total: 100 // 总条数
})
const addDialogVisible = ref(false) // 控制添加用户对话框的显示与隐藏
const updateDialogVisible = ref(false) // 控制添加用户对话框的显示与隐藏
const user = ref({ // 用户数据模型
  id: 0,
  username: '',
  password: '',
  email: '',
  phone: '',
  role_name: ''
})
const validateEmail = (rule: any, value: any, callback: any) => { // 邮箱的校验规则
  if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)) return callback(new Error('请输入合法的邮箱'))
  return callback()
}
const validatePhone = (rule: any, value: any, callback: any) => { // 手机的校验规则
  if (!/^1[35789]\d{9}$/.test(value)) return callback(new Error('请输入合法的手机'))
  return callback()
}
const rules = reactive({ // 表单校验对象
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { max: 10, message: '最多 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' }
  ]
})

// 处理函数
const getUserList = async () => { // 获取用户列表
  const { data } = await getUserListApi({
    current: pagination.current,
    size: pagination.size,
    search: search.value
  }).catch(error => error)
  if (!data) return
  if (data.status !== 200) return message.error(data.message)
  pagination.total = data.total
  userList.value = data.data
}
const userStateChange = async (row: UserType) => { // 用户状态改变
  const { data } = await setUserStatusApi({ id: row.id, status: row.status }).catch(error => error)
  if (!data) {
    row.status = !row.status
    return
  }
  if (data.status !== 200) {
    row.status = !row.status
    message.error(data.message)
  }
}
const handleCurrentChange = (val: number) => { // 处理当前页改变
  pagination.current = val
  getUserList()
}
const handleSizeChange = (val: number) => { // 处理一页显示几条改变
  pagination.size = val
  getUserList()
}
const addUser = () => { // 添加用户
  if (!addFormRef.value) return
  addFormRef.value.validate(async valid => {
    if (!valid) return
    const { data } = await addUserApi(user.value).catch(error => error)
    if (!data) return
    if (data.status !== 200) return message.error(data.message)
    message.success('添加成功')
    addDialogVisible.value = false
    await getUserList()
  })
}
const showUpdateDialog = async (id: number) => { // 显示修改对话框
  const { data } = await getUserByIdApi(id).catch(error => error)
  if (!data) return
  if (data.status !== 200) return message.error(data.message)
  user.value = { ...data.data, password: '' }
  updateDialogVisible.value = true
}
const updateUser = () => { // 修改用户
  if (!updateFormRef.value) return
  updateFormRef.value.validate(async valid => {
    if (!valid) return
    const { data } = await updateUserApi({
      id: user.value.id,
      email: user.value.email,
      phone: user.value.phone
    }).catch(error => error)
    if (!data) return
    if (data.status !== 200) return message.error(data.message)
    message.success('修改成功')
    updateDialogVisible.value = false
    await getUserList()
  })
}
const deleteUser = (id: number) => { // 删除用户
  ElMessageBox.confirm('此操作将永久删除该用户，是否继续？', '提示', { type: 'warning' }).then(async () => {
    const { data } = await deleteUserApi(id).catch(error => error)
    if (!data) return
    if (data.status !== 200) return message.error(data.message)
    message.success('删除成功')
    await getUserList()
  }).catch(error => error)
}
const resetForm = (formEl: FormInstance | undefined) => { // 重置表单
  if (!formEl) return
  formEl.resetFields()
  user.value = {
    id: 0,
    username: '',
    password: '',
    email: '',
    phone: '',
    role_name: ''
  }
}

// 生命周期函数
onBeforeMount(() => getUserList())
</script>
