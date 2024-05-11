<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { DArrowRight, Edit } from '@element-plus/icons-vue'
import _ from 'lodash' 
import { getCourseList,addExam } from '@/api/index'
import { ElMessage } from "element-plus";
import  dayjs  from "dayjs";
import { useRouter } from 'vue-router';

const router = useRouter()
const formData = reactive({
    name: '',
    courseId: '',
    startTime: '',
    endTime: '',
    content: '',
})

const params = {
  "courseName": "",
  "pageParam": {
    "pageNum": 1,
    "pageSize": 100,
  },
  "typeId": ""
}

const courseTypes = ref([])

onMounted(async()=>{
  const { data } = await getCourseList(params)
  courseTypes.value = data.list.map(item=>{
    return{
      label: item.courseName,
      value: item.courseId
    }
  })
  console.log('courseType', courseTypes.value)
})

const active = ref(0)
const finishBasic = () => {
    active.value = 1
}

const tableData = ref([
])

const dialogVisible = ref(false)
const examTypes = ['单选题', '判断题', '问答题']
const optionTypes = ['A', 'B', 'C', 'D']
const checkTypes = ['肯定选项', '否定选项']
const curContent = reactive({
    description: '',
    type: '',
    answer: '',
    score: 0,
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    check1: '',
    check2: ''
})

const questionFormRef = ref(null)
const handleAddQuestion = () => {
    questionFormRef.value.validate((valid) => {
        if (valid) {
            let obj = _.cloneDeep(curContent)
            tableData.value.push(obj)
            Object.assign(curContent, {
                description: '',
                type: '',
                answer: '',
                score: 0,
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
                check1: '',
                check2: ''
            })
            dialogVisible.value = false
        } else {

        }
    })
}

const questionRules = {
    description: [{ required: true, message: '请输入题目描述', trigger: 'blur' }],
    type: [{ required: true, message: '请输入题目类型', trigger: 'blur' }],
    answer: [{ required: true, message: '请输入题目描述', trigger: 'blur' }],
    score: [{ required: true, message: '请输入题目分数', trigger: 'blur' }],
    optionA: [{ required: true, message: '请输入A选项描述', trigger: 'blur' }],
    optionB: [{ required: true, message: '请输入B选项描述', trigger: 'blur' }],
    optionC: [{ required: true, message: '请输入C选项描述', trigger: 'blur' }],
    optionD: [{ required: true, message: '请输入D选项描述', trigger: 'blur' }],
    check1: [{ required: true, message: '请输入肯定选项描述', trigger: 'blur' }],
    check2: [{ required: true, message: '请输入否定选项描述', trigger: 'blur' }],
}

const canPost = computed(() => {
    tableData.value.length > 0
})

const handleUpdate = (item) => {
    console.log(item)
}

const handleSubmit = async() => {
  formData.content = JSON.stringify(tableData.value)
  console.log('content is', formData.content)
  formData.startTime = dayjs(formData.startTime).format('YYYY-MM-DD HH:mm:ss')
  formData.endTime = dayjs(formData.endTime).format('YYYY-MM-DD HH:mm:ss')
  try{
    const {code,data, message} = await addExam(formData)
    if(code == 0){
      ElMessage.success('发布考试成功！')
      router.push('/exam/list')
    }else{
      ElMessage.error(message)
    }
  }catch(e){
    ElMessage.error('发布考试失败！')
  }
}
</script>

<template>
    <div class="create-exam-wrap">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/exam/list' }">考试列表</el-breadcrumb-item>
            <el-breadcrumb-item>发布考试</el-breadcrumb-item>
        </el-breadcrumb>
        <el-steps style="max-width: 600px; margin: 0 auto;" :active="active" finish-status="success">
            <el-step title="填写基本信息" />
            <el-step title="创建题目" />
        </el-steps>
        <div class="content-wrap">
            <div class="form-wrap" v-if="active == 0">
                <el-form :label-width="80">
                    <el-form-item label="考试名称">
                        <el-input v-model="formData.name" />
                    </el-form-item>
                    <el-form-item label="课程">
                      <el-select v-model="formData.courseId"  placeholder="请选择考试课程"
                        style="width: 240px">
                        <el-option v-for="item in  courseTypes" :key="item" :label="item.label" :value="item.value" />
                    </el-select>
                    </el-form-item>
                    <el-form-item label="开始时间">
                      <el-date-picker v-model="formData.startTime" type="datetime" placeholder="请选择考试开始时间" />
                    </el-form-item>
                    <el-form-item label="结束时间">
                      <el-date-picker v-model="formData.endTime" type="datetime" placeholder="请选择考试结束时间" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="finishBasic">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="table-wrap" v-else>
                <div class="operation flex justify-end">
                    <el-button :icon="Edit" type="primary" @click="dialogVisible = true">添加考试题目</el-button>
                </div>
                <el-table :data="tableData">
                    <el-table-column type="index" label="序号" prop="index" min-width="32">
      </el-table-column>
                    <el-table-column prop="description" label="题目描述" />
                    <el-table-column prop="type" label="题目类型" />
                    <el-table-column prop="answer" label="答案" />
                    <el-table-column prop="score" label="分值" />
                    <el-table-column prop="optionA" label="选项A" />
                    <el-table-column prop="optionB" label="选项B" />
                    <el-table-column prop="optionC" label="选项C" />
                    <el-table-column prop="optionD" label="选项D" />
                    <el-table-column prop="check1" label="肯定选项" />
                    <el-table-column prop="check2" label="否定选项" />
                    <el-table-column label="操作" min-width="120">
                        <template #default="scope">
                            <el-button type="warning" size="small" @click="handleUpdate(scope.row)">更新</el-button>
                            <el-button type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="step2-operation mt-4 flex justify-center">
                    <el-button @click="active = 0">上一步</el-button>
                    <el-button type="primary"  @click="handleSubmit">发布试卷</el-button>
                </div>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" width="500px" title="添加题目">
            <el-form :model="curContent" :rules="questionRules" ref="questionFormRef">
                <el-form-item label="题目描述" prop="description">
                    <el-input type="textarea" v-model="curContent.description" />
                </el-form-item>
                <el-form-item label="题目类型" prop="type">
                    <el-select v-model="curContent.type" placeholder="请选择题目类型" style="width: 240px">
                        <el-option v-for="item in examTypes" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="题目分值" prop="score"><el-input v-model="curContent.score" /></el-form-item>
                <template v-if="curContent.type == '判断题'">
                    <el-form-item label="肯定选项描述" prop="check1">
                        <el-input type="text" v-model="curContent.check1" />
                    </el-form-item>
                    <el-form-item label="否定选项描述" prop="check2">
                        <el-input type="text" v-model="curContent.check2" />
                    </el-form-item>
                </template>
                <template v-if="curContent.type == '单选题'">
                    <el-form-item label="选项A描述" prop="optionA">
                        <el-input type="text" v-model="curContent.optionA" />
                    </el-form-item>
                    <el-form-item label="选项B描述" prop="optionB">
                        <el-input type="text" v-model="curContent.optionB" />
                    </el-form-item>
                    <el-form-item label="选项C描述" prop="optionC">
                        <el-input type="text" v-model="curContent.optionC" />
                    </el-form-item>
                    <el-form-item label="选项D描述" prop="optionD">
                        <el-input type="text" v-model="curContent.optionD" />
                    </el-form-item>
                </template>
                <el-form-item label="题目答案" prop="answer">
                    <el-select v-if="curContent.type == '判断题'" v-model="curContent.answer" placeholder="请选择答案"
                        style="width: 240px">
                        <el-option v-for="item in  checkTypes" :key="item" :label="item" :value="item" />
                    </el-select>
                    <el-select v-if="curContent.type == '单选题'" v-model="curContent.answer" placeholder="请选择答案"
                        style="width: 240px">
                        <el-option v-for="item in  optionTypes" :key="item" :label="item" :value="item" />
                    </el-select>
                    <el-input v-if="curContent.type == '问答题'" v-model="curContent.answer" />
                </el-form-item>
            </el-form>
            <div class="question-operation flex justify-center">
                <el-button type="primary" @click="handleAddQuestion">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.content-wrap {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    padding: 16px;
    display: flex;
    justify-content: center;

    .form-wrap {
        width: 500px;
    }

    .table-wrap {
        width: 1200px;
    }
}
</style>
