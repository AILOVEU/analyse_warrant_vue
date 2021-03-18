<template>
    <div>
        <selector-comp></selector-comp>
        <el-tabs type="border-card">
            <el-tab-pane label="表格展示">
                <table-data></table-data>
            </el-tab-pane>
            <el-tab-pane label="时间与单手价格的关系">
               <timeprice-chart></timeprice-chart>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
import selectorComp from './selectorComp'
import tableData from './tableData'
import timepriceChart from './timepriceChart';

export default {
    name: 'selector',
    data() {
        return {
            showTableData: []
        }
    },
    components: {
        selectorComp,
        tableData,
        timepriceChart
    },
}
</script>

<style scoped>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
}
</style>
