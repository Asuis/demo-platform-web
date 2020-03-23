<template>
    <div class="container">
        <quill-editor class="editor" ref="myQuillEditor" v-model="content" :options="editorOption"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
        <div class="aside">
            <el-card style="margin-bottom:20px;">
                <div slot="header" class="clearfix">
                    <el-switch class="float:left;display:inline;margin-top:2px;" v-model="top" width="40"
                        active-text="置顶">
                    </el-switch>
                    <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
                </div>
                <el-row :type="flex">
                    <el-col :span="24">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>



                </el-row>
            </el-card>
            <el-card style="margin-bottom:20px;">
                <div slot="header" class="clearfix">
                    <span style="float:left;">标签</span>
                </div>
                <div>
                    <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                        size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </div>
            </el-card>
            <el-card style="margin-bottom:20px;">
                <div slot="header" class="clearfix">
                    <span style="float:left;">分类</span>
                    <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                </div>
                <div>
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                    </el-input>
                    <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange">
                    </el-tree>
                </div>
            </el-card>
            <el-card style="margin-bottom:20px;">
                <div slot="header" class="clearfix">
                    <span style="float:left;">配置主图</span>
                </div>
                <div>

                    <el-upload action="#" list-type="picture-card" :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete"
                                    @click="handleDownload(file)">
                                    <i class="el-icon-download"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import {
        quillEditor
    } from 'vue-quill-editor'
    export default {
        name: 'NewsEditPage',
        components: {
            quillEditor
        },
        data() {
            return {
                top: false,
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }],
                props: {
                    label: 'name',
                    children: 'zones'
                },
                count: 1,
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',
                editorOptions: {
                    modules: {
                        history: {
                            delay: 2000,
                            maxStack: 500,
                            userOnly: true
                        }
                    },
                    theme: 'snow'
                },
                options: [{
                    value: '1',
                    label: '草稿'
                }, {
                    value: '2',
                    label: '审核'
                }, {
                    value: '3',
                    label: '发布'
                }],
                value: '1',
                filterText: '',
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false
            }
        },
        methods: {
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleNodeClick(data) {
                console.log(data);
            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{
                        name: 'region1'
                    }, {
                        name: 'region2'
                    }]);
                }
                if (node.level > 3) return resolve([]);

                var hasChild;
                if (node.data.name === 'region1') {
                    hasChild = true;
                } else if (node.data.name === 'region2') {
                    hasChild = false;
                } else {
                    hasChild = Math.random() > 0.5;
                }

                setTimeout(() => {
                    var data;
                    if (hasChild) {
                        data = [{
                            name: 'zone' + this.count++
                        }, {
                            name: 'zone' + this.count++
                        }];
                    } else {
                        data = [];
                    }

                    resolve(data);
                }, 500);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
    }
</script>

<style scope>
    .aside {
        width: 300px;
        margin-left: 20px;
    }

    .container {
        display: flex;
        justify-content: center;
        height: 100%;
    }

    .el-tag+.el-tag {
        margin-left: 10px;
        margin-bottom: 4px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .editor {
        max-width: 1024px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>>