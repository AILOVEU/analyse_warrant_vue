<template>
    <div class="app">
        <el-card class="choice-box">
            <div class="content" @click="jumpTo('/selector')">
                窝轮筛选器
            </div>
        </el-card>
        <el-card class="choice-box">
            <div class="content" @click="jumpTo('/decisionor')">
                做T成本决策器
            </div>
        </el-card>
        <el-card class="choice-box">
            <div class="content" @click="jumpTo('/salary')">
                工资计算器
            </div>
        </el-card>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    methods: {
        jumpTo(url) {
            this.$router.push({ path: url });
        }
    }
}
</script>

<style scoped lang="scss">
.app {
    font-size: 26px;
    text-align: center;
    color: #2c3e50;
    margin: 100px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 600px;
}
.choice-box {
    width: 200px;
    height: 200px;
    line-height: 200px;
}
.choice-box .content {
    padding: 0 auto;
}
@media screen and (max-width: 750px) {
    .app {
        display: block;
    }
}
</style>
