<template>
    <div id="app">
        <selector :selectorRangeData.sync="selectorRangeData" :analysedData="analysedData"></selector>
        <table-data :selectorRangeData="selectorRangeData" :analysedData.sync="analysedData"></table-data>
    </div>
</template>

<script>
import selector from './selector'
import tableData from './tableData'

export default {
    name: 'app',
    data() {
      return {
        selectorRangeData: {},
        analysedData: {}
      } 
    },
    components: {
        selector, tableData
    },
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
