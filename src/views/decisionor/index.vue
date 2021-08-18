<template>
    <div class="decisionor-panel-wrapper">
        <el-tabs type="border-card">
            <el-tab-pane label="标的管理">
                <decision-comp :targetData.sync="targetData"></decision-comp>
            </el-tab-pane>
            <el-tab-pane label="图表展示">
                <visualization-comp :targetData="targetData"></visualization-comp>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import decisionComp from './decisionComp';
import visualizationComp from './visualization';
export default {
    data() {
        return {
            targetData: {}
        }
    },
    components: {decisionComp,visualizationComp},
    methods: {

    }
}
</script>

<style scoped>
.decisionor-panel-wrapper {
    margin: 10px auto;
    min-height: 700px;
    width: 1400px;
    text-align: center;
}
</style>