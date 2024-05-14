<template>
<div class="take-exam-wrap">
 <div class="exam-control">
  <div style="font-size: 18px; text-align: center; margin-bottom: 40px">{{ info.name }}</div>
  <div class="exam-control-item"> 开始时间： {{ info.startTime }}</div>
  <div class="exam-control-item"> 结束时间： {{ info.endTime }}</div>
  <div class="exam-type-count">
     <div style="font-size: 16px">题型数量</div>
    <el-table :data="examTypeCount">
      <el-table-column prop="总题数" label="总题数"></el-table-column>
      <el-table-column prop="单选题" label="单选题"></el-table-column>
      <el-table-column prop="判断题" label="判断题"></el-table-column>
      <el-table-column prop="问答题" label="问答题"></el-table-column>
    </el-table>
  </div>
  <div>
    总分：{{ examTypeCount[0]["总分"] }}分
  </div>
  <div>
    <el-button class="text-center mt-4" type="primary">提交试卷</el-button>
  </div>
 </div>
<div class="exam-area">
  <div class="exam-item" v-for="item, index in content" :key="index">
    <div class="question-desp">
      <span class="question-type"> {{ item.type }} ({{ item.score }}分)</span>
<pre>
{{ index+1 }}、{{ item.description }}
</pre>
    </div>
    <div class="question-answer">
      <div class="question-options" v-if="item.type == '单选题'">
      <el-radio-group v-model="answer[index]">
        <el-radio value="A">{{ `A、${item.optionA}` }}</el-radio>
        <el-radio value="B">{{`B、${item.optionB}`}}</el-radio>
        <el-radio value="C">{{`C、${item.optionC}`}}</el-radio>
        <el-radio value="D">{{`D、${item.optionD}`}}</el-radio>
      </el-radio-group>
    </div>
    <div class="question-check" v-else-if="item.type == '判断题'">
      <el-radio-group v-model="answer[index]">
        <el-radio value="肯定选项">{{ `${item.check1}` }}</el-radio>
        <el-radio value="否定选项">{{`${item.check2}`}}</el-radio>
      </el-radio-group>
    </div>
    <div class="question-input" v-else>
      <el-input type="textarea" placeholder="请输入你的回答" :rows="5"></el-input>
    </div>
  </div>
</div>
</div>
</div>
</template>

<script setup>
import { reactive, ref,watch } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const info = reactive({})
const content = ref([])

const answer = ref([])

const examTypeCount = [{"总题数":0,"总分":0,"判断题":0,"单选题":0,"问答题":0}]
watch(()=>sessionStorage.getItem('exam'), (newVal)=>{
  let obj = JSON.parse(newVal)
  Object.assign(info, obj)
  console.log('info ',info)
  content.value = JSON.parse(obj.content)
  answer.value = Array.from({length: content.value.length}, () => '')
  content.value.forEach((item, index)=>{
    if(item.type == '判断题'){
      examTypeCount[0]["判断题"] += 1
    }
    if(item.type == '单选题'){
      examTypeCount[0]["单选题"] += 1
    }
    if(item.type == '问答题'){
      examTypeCount[0]["问答题"] += 1
    }
    examTypeCount[0]["总题数"] += 1
    examTypeCount[0]["总分"] += Number(item.score)
  })
  console.log('content ',content.value, answer.value)
},{
  deep:true,immediate: true
})


</script>

<style scoped lang="scss">
@import "@/style/common.scss";

.take-exam-wrap{
  width: 1200px;
  height: 900px;
  margin: 0 auto;
  display: flex;
  background: #fff;
}
.exam-control{
  padding: 24px;
  box-shadow: 6px 0px 8px 2px rgba(0, 0, 0, 0.06);
  width: 380px;
 
  &-item{
    margin: 8px 0;
    color: $text-plain-color;
  }
}
.exam-area{
  padding: 20px;
  overflow-y: auto;
  flex: 1;
  .exam-item{
    margin-bottom: 18px;
  }
}
.question-type{
  display: inline-block;
  margin-bottom: 4px;
  border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    padding: 4px 8px;
    background-color: rgb(227, 243, 255);
    color: rgb(0, 117, 255);
}
.question-desp{
  margin-bottom: 8px;
  font-size: 16px;
  
}
.question-answer{
  padding-left: 10px;
}
.el-radio-group{
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  font-size: 0;
  flex-direction: column;
  align-items: flex-start;
}
</style>