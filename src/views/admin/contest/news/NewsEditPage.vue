<template>
  <div>
        <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
  />
  <div class="aside">
      <el-card>
          <div slot="header" class="clearfix">
    <span>操作</span>
    <el-button style="float: right; padding: 3px 0" type="text">立即发布</el-button>
  </div>
      </el-card>
  </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
    name: 'NewsEditPage',
    components: {
        quillEditor
    }
}
</script>

<style scoped>
    .aside{
        position: relative;
        width: 200px;
    }
</style>>
    