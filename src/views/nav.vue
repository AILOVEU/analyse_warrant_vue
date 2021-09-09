<template>
    <div class="app">
        <el-card class="choice-box" >
            <div class="content" @click="jumpTo('/selector')">
                窝轮筛选器
            </div>
        </el-card>
        <el-card class="choice-box" >
            <div class="content"  @click="jumpTo('/decisionor')">
                做T成本决策器
            </div>
        </el-card>
        <el-card class="choice-box" >
            <div class="content"  @click="jumpTo('/salary')">
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

<style scoped>
.app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 100px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 900px;
}
.choice-box {
    width: 300px;
    height: 300px;
    line-height: 250px;
}
.choice-box .content{
    padding: 0 auto;

}
</style>
