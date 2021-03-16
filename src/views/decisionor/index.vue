<template>
    <div class="decisionor-panel-wrapper">
        <div class="block">
            <div>标的名称</div>
            <el-input placeholder="请输入一个标识" v-model="stockName" clearable>
            </el-input>
        </div>
        <div class="block">
            <div>单手价格</div>
            <el-slider style="width: 300px;" v-model="singlePrice" :min="100" :max="2500"
                :step="10"></el-slider>
        </div>
        <div class="block">
            <div>每笔收益</div>
            <el-slider v-model="profit" :min="5" :max="1000" :step="5"></el-slider>
        </div>
        <div class="block">
            <div>手续费</div>
            <el-slider v-model="fee" :min="1" :max="100" :step="1"></el-slider>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stockName: '',
            singlePrice: 0,
            profit: 0,
            fee: 0,
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.decisionor-panel-wrapper {
    margin: 10px auto;
    width: 900px;
    text-align: center;
}
.block {
    display: inline-block;
    width: 200px;
    height: 79px;
    line-height: 79px;
}
</style>