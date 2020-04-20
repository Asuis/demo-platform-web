<template>
  <div>
    <div>
        <el-card>
            <div v-for="item in list" :key="item.ID">
                <div class="repo-item">
                    <div class="repo-ava">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                        </el-avatar>
                    </div>
                    <div class="repo-detail">
                        <div>
                            <router-link :to="'/news/'+item.Name">{{item.Name}}</router-link>
                        </div>
                        <div>{{item.Description}}</div>
                        <div>
                        </div>
                    </div>
                </div>

            </div>
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
        </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsList',
  data () {
    return {}
  }
}
</script>

<style>

</style>