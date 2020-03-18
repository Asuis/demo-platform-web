<template>
    <div class="wapper">
        <el-form>
            <el-form :label-position="labelPosition" label-width="80px" :model="RepositoryInit">
                <el-form-item label="容器名">
                    <el-input v-model="CreateForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="CreateForm.Desc"></el-input>
                </el-form-item>
                <el-form-item label="镜像">
                    <el-select v-model="CreateForm.ImageName" @change="onChange" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="onSubmit">创建</el-button>
                </el-form-item>
            </el-form>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "DockerForm",
        data() {
            return {
                CreateForm: {
                    Name: "",
                    Desc: "",
                    ImageID: 1,
                    ImageName: "centos",
                    ImageSha1: "xxxx"
                },
                options: [{
                    label: "centos",
                    value: "centos"
                }]
            };
        },
        methods: {
            onSubmit() {
                this.$store.dispatch("container/create", this.CreateForm).then(data => {
                    console.log(data);
                })
            },
            onChange(value) {
                console.log('loadImageDetail', value)
            },
            loadImages() {},
            loadImageDeatils() {},
        },
        mounted() {

        },
        computed: {
            user() {
                return this.$store.getters["user/getUser"];
            }
        }
    };
</script>

<style scope>
    .wapper {
        padding: 12px;
    }
</style>