<template>
  <!-- <el-menu :default-active="activeIndex" type="flex" justify="end" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1"><p @click="$router.push('/')">处理中心</p></el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>
  </el-menu> -->
  <el-row type="flex" :gutter="20" justify="space-around" style="margin-top: 1%;">
    <el-col :span="4">
      <el-dropdown v-if="signed"  @command="handleCommand" trigger="click">
        <el-button type="primary">
          新建些什么呢<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu  slot="dropdown" >
          <el-dropdown-item :command='createWhat.API' class="el-icon-plus">&nbsp;API &nbsp; </el-dropdown-item>
          <el-dropdown-item :command='createWhat.FOLDER' class="el-icon-document">&nbsp;文件夹 &nbsp; </el-dropdown-item>
          <el-dropdown-item :command='createWhat.PROJECT' class="el-icon-date">&nbsp;项目 &nbsp;</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-else @click="handleCommand(createWhat.API)" type="primary">
        <i class="el-icon-plus"></i>新建个API
      </el-button>
    </el-col>
    <el-col :span="15">
      <folder-info-panel
      v-if="folderDialogVisible"
      v-model="folderDialogVisible" 
      v-bind:focus="null"
      v-on:flash:folders="$emit('flash:projectTree')"
      ></folder-info-panel>
      <modify-project
        v-if="projectDialogVisible"
        v-model="projectDialogVisible"
        v-bind:pid="null"
        v-on:flash:projects="$emit('flash:projectTree')">
      </modify-project>
    </el-col>
    <el-col :span="4"><info-panel v-on:open:accountPanel="openLoginPanel" ></info-panel></el-col>
  </el-row>
</template>
<script>
import InfoPanel from './InfoPanel'
import FolderInfoPanel from '../Aside/FolderInfoPanel'
import ModifyProject from '../Aside/ModifyProject'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'wa-header',
  components: {InfoPanel, FolderInfoPanel, ModifyProject},
  data () {
    return {
      projectDialogVisible: false,
      folderDialogVisible: false,
      createWhat: {API: 'API', FOLDER: 'FOLDER', PROJECT: 'PROJECT'}
    }
  },
  methods: {
    handleCommand (command) {
      var action = {
        'API': () => { this.$emit('create:api', 'ccc') },
        'FOLDER': () => { this.folderDialogVisible = true },
        'PROJECT': () => { this.projectDialogVisible = true }
      }
      return action[command]()
    },
    openLoginPanel (target) {
      this.$emit('open:accountPanel', target)
    }
  },
  computed: {
    ...mapState(['signed'])
  }
}
</script>
<style type="text/css">
/* .el-menu-demo{
  float: right;
  
} */
.el-row {
  margin-left: 0px!important;
  margin-right: 0px!important;
}
</style>
