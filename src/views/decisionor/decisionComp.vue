<template>
    <div>
        <el-button type="success" @click="addTarget">添加标的</el-button>
        <div class="target-wrapper">
            <div v-for="item in target" :key="item.id">
                <el-card class="card-box">
                    <div class="del-icon" @click="delTarget(item.id)">X</div>
                    <div class="block">
                        <div class="lable">标的名称</div>
                        <div class="input">
                            <el-input placeholder="请输入一个标识" v-model="item.stockName" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="block">
                        <div class="lable">单手价格</div>
                        <div class="input">
                            <el-slider v-model="item.singlePrice" :min="100" :max="2500" lable="测试" show-input
                                :step="10">
                            </el-slider>
                        </div>
                    </div>
                    <div class="block">
                        <div class="lable">每笔收益</div>
                        <div class="input">
                            <el-slider v-model="item.profit" :min="5" :max="1000" :step="5" show-input>
                            </el-slider>
                        </div>
                    </div>
                    <div class="block">
                        <div class="lable">每笔手数</div>
                        <div class="input">
                            <el-slider v-model="item.rights" :min="1" :max="100" :step="1" show-input>
                            </el-slider>
                        </div>
                    </div>
                    <div class="block">
                        <div class="lable">手续费</div>
                        <div class="input">
                            <el-slider v-model="item.fee" :min="1" :max="100" :step="1" show-input>
                            </el-slider>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            target: []
        }
    },
    props: ['targetData'],
    watch: {
      target: {
        handler(val) {
          this.$emit('update:targetData',val)
        },
        immediate: true,
        deep: true
      }
    },
    mounted() {
      this.addTarget()
    },
    methods: {
        addTarget() {
            let uuid = new Date().valueOf();
            this.target.push({
                id: uuid,
                stockName: '',  // 标的名称
                singlePrice: 0, // 每手金额
                profit: 0, // 每次盈利
                fee: 40, // 手续费
                rights: 2 // 每次手数
            })
        },
        delTarget(id) {
            let idx = this.target.findIndex(item => {
                return item.id === id;
            })
            this.target.splice(idx, 1);
        }
    }
}
</script>

<style scoped>
.target-wrapper {
    display: flex;
    width: 1200px;
    flex-wrap: wrap;
    justify-content: space-around;
}
.target-wrapper .card-box {
    position: relative;
}
.target-wrapper .card-box .del-icon {
    position: absolute;
    right: 10px;
    top: 5px;
    color: slategray;
    user-select: none;
    -webkit-user-select: none; /* for Chrome */
}
.block {
    display: flex;
    flex-direction: row;
    width: 520px;
    height: 40px;
    line-height: 40px;
}
.block .lable {
    width: 120px;
    height: 40px;
    line-height: 40px;
    user-select: none;
    -webkit-user-select: none; /* for Chrome */
}
.block .input {
    width: 400px;
    height: 40px;
    line-height: 40px;
}
</style>