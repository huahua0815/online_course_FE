<script setup>
    import { reative } from 'vue'
    const props = defineProps({
        dialogVisible: Boolean
    })

    const formData = reative({
        name: '',
        teacher_id: '',
        introduction: '',
        cover: '',
        exam_date: '',
        free_type: 0,
        file: '',
        exam_frame: '',
        start_time: '',
        end_time: ''
    })

    const payTypes = [
        { label: '免费', value: 0, },
        { label: '收费', value: 1, },
    ]
</script>

<template>
    <el-dialog v-model="dialogVisible" fullscreen>
        <el-form>
            <el-form-item prop="name" label="课程名称">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="课程简介">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="课程考试大纲">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="课程封面">
                <el-upload class="upload-demo" drag multiple>
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽文件到这或<em>点击上传</em>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item prop="name" label="课程文件">
                <el-upload class="upload-demo" drag multiple>
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽文件到这或<em>点击上传</em>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item prop="name" label="课程收费类型">
                <el-select v-model="formData.free_type">
                    <el-option v-for="item in payTypes" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="name" label="课程考试时间">
                <el-date-picker v-model="value1" type="datetime" placeholder="请选择课程考试时间" />
            </el-form-item>
            <el-form-item prop="name" label="课程开始时间">
                <el-time-select v-model="formData.start_time" style="width: 240px" :max-time="formData.end_time"
                    class="mr-4" placeholder="开始时间" start="08:30" step="00:15" end="18:30" />
            </el-form-item>
            </el-form-item>
            <el-form-item prop="name" label="课程结束时间">
                <el-time-select v-model="formData.end_time" style="width: 240px" :min-time="formData.start_time"
                    class="mr-4" placeholder="结束时间" start="08:30" step="00:15" end="18:30" />
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style scoped lang="scss">

</style>