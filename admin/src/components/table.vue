/*
* @Author: 世尘
* @Date: 2019-12-15 15:37:52
* @Last Modified by: 世尘
* @Last Modified time: 2020-01-03 15:38:56
* @参数columns: Array, // 表头数据
       data: Array, // 表格数据
       height: String, // 高度，需带单位
       width: String, // 宽度度，需带单位
       index: Boolean // 第一列是否需要index
*/
<template>
  <div :style="'height:' + height + ';overflow:auto;'">
    <table :style="'width:' + width" class="LTable" border="0" cellspacing="0" cellpadding="0">
    <!-- <div style="height: 100px;">
      <table style="height: 1000px;"> -->
      <tr class="LTable-header" style="width: 100%;">
        <td v-if="index" class="txtCenter">序号</td>
        <td class="txtCenter" :style="'width: ' + cloumn.width + 'rem;'" v-for="cloumn in columns" :key="cloumn.key">{{cloumn.title}}</td>
      </tr>
      <tr v-for="(row, idx) in data" :key="idx" class="LTable-body" style="width: 100%;">
        <td v-if="index" class="txtCenter">{{idx + 1}}</td>
        <td class="txtCenter" :style="'width: ' + cloumn.width + 'rem;'" v-for="cloumn in columns" :key="cloumn.key">
          <span v-if="!cloumn.isReplace">{{row[cloumn.key]}}</span>
          <span v-else v-for="item in cloumn.isReplace" :key="item.key">{{item.key===row[cloumn.key] ? item.value : ''}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'LTable',
    props: {
      columns: Array, // 表头数据
      data: Array, // 表格数据
      height: String, // 高度，需带单位
      width: String, // 宽度度，需带单位
      index: Boolean // 第一列是否需要index
    },
    mounted() {

    },
    data() {
      return {}
    }

  }
</script>

<style lang="scss">
  .ivu-table-header thead tr th {
    padding: 0;
    color: white;
    background: #0082FE;
  }

  // .ivu-table-header {
  //   background: #0082FE;
  // }
  // .ivu-table td {
  // }
</style>
<style lang="scss" scoped>
.LTable {
  width: 100%;
  font-weight: 100;

  .LTable-header {
    background-color: #0082FE;
  }

  .LTable-body {
    background-color: #091C44;
    margin-top: 0.16rem;
  }
}

::-webkit-scrollbar {
  width: 0.3rem;
  height: 0.3rem;
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-thumb {
  border-radius: 0.6rem;
  // -webkit-box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.3);
  background-color: #00FFFF;
}

::-webkit-scrollbar-track {
  box-sizing: content-box;
  border: 0.08rem solid rgba(19, 28, 59, 0.8);
  // -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 1);
  border-radius: 0.6rem;
  background-color: #106277;
}
</style>
