<template>
    <div>
        <el-button type="success" @click="addTarget">添加标的</el-button>
        <!-- <el-button style="margin-left:300px;" type="info" v-if="target && target.length > 1"
            @click="delAllTarget">清空</el-button> -->
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
                            <el-slider v-model="item.singlePrice" :min="100" :max="10000" lable="测试"
                                show-input :step="10">
                            </el-slider>
                        </div>
                    </div>
                    <div class="block">
                        <div class="lable">每笔收益（{{parseInt(100* item.profit/item.singlePrice)+'%'}}）
                        </div>
                        <div class="input">
                            <el-slider v-model="item.profit" :min="5" :max="1000" :step="5"
                                show-input>
                            </el-slider>
                        </div>
                    </div>
                    <div class="block">
                        <div class="lable">每次手数</div>
                        <div class="input">
                            <el-slider v-model="item.rights" :min="1" :max="20" :step="1"
                                show-input>
                            </el-slider>
                        </div>
                    </div>
                    <div class="block">
                        <div class="lable">右侧手数</div>
                        <div class="input">
                            <el-slider v-model="item.invest" :min="0" :max="20" :step="1"
                                show-input>
                            </el-slider>
                        </div>
                    </div>
                    <div class="block">
                        <div class="lable">手续费</div>
                        <div class="input">
                            <el-slider v-model="item.fee" :min="1" :max="40" :step="1" show-input
                                :marks="marks.fee">
                            </el-slider>
                        </div>
                    </div>
                    <br />
                    <el-tag type="success">每格收益 {{item.profit * item.rights - item.fee}}元 </el-tag>
                    <el-tag type="success">左侧成本
                        {{getLeftCost(item)}}元
                    </el-tag>
                    <el-tag type="success">右侧成本
                        {{item.singlePrice * item.invest}}元</el-tag>
                    <el-tag type="success">回本次数
                        {{parseInt((getLeftCost(item) + item.singlePrice * item.invest)/(item.profit * item.rights - item.fee) )}}次
                    </el-tag>
                </el-card>
            </div>
        </div>
        <el-card class="export-box">
            <el-button type="primary" @click="copy" class="tag-read" :data-clipboard-text="targetStr" plain>快速复制数据
            </el-button>
            <br />
            <el-tag type="info">{{target}}</el-tag>
            <br />

            <el-input v-model="quickJsonStr" style="width: 600px;" type="textarea" :rows="2">
            </el-input>
            <br />
            <el-button @click="coverImport" plain type="danger">覆盖导入</el-button>
            <el-button @click="appendImport" plain type="warning">追加导入</el-button>
        </el-card>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
    data() {
        return {
            target: [],
            marks: {
                fee: {
                    1: '1',
                    40: '40',
                }
            },
            quickJsonStr: '',
            clipboard: null
            
        }
    },
    props: ['targetData'],
    watch: {
        target: {
            handler(val) {
                this.$emit('update:targetData', val)
            },
            immediate: true,
            deep: true
        }
    },
    computed: {
        targetStr() {
            return JSON.stringify(this.target)
        }
    },
    mounted() {
        this.addTarget()
    },
    methods: {
        copy() {
            console.log('copy');
            this.clipboard = new Clipboard('.tag-read')
            // clipboard.on('success', () => {
            //     console.log('复制成功')
            //     //  释放内存
            //     clipboard.destory()
            // })
            // clipboard.on('error', () => {
            //     // 不支持复制
            //     console.log('该浏览器不支持复制')
            //     // 释放内存
            //     clipboard.destory()
            // })
        },
        coverImport() {
            if(!this.quickJsonStr) {
                return;
            }
            this.target = JSON.parse(this.quickJsonStr)
        },
        appendImport() {
            if(!this.quickJsonStr) {
                return;
            }
            let newTarget = JSON.parse(this.quickJsonStr);
            this.target = this.target.concat(newTarget)
        },
        // 生成等差数组
        getLeftCost({ singlePrice, profit, rights, fee } = {}) {
            if (!singlePrice || !fee || !profit || !rights) {
                return 0;
            }
            let sum = 0;
            for (let i = singlePrice; i >= profit; i -= profit) {
                // 每次交易成本 + 交易手续费
                sum += (i * rights + fee);
            }
            return sum
        },
        addTarget() {
            let uuid = new Date().valueOf();
            this.target.push({
                id: uuid,
                stockName: '',  // 标的名称
                singlePrice: 100, // 每手金额
                profit: 0, // 每次盈利
                fee: 40, // 手续费
                invest: 0, // 右侧观察手数
                rights: 2 // 每次手数
            })
        },
        delTarget(id) {
            let idx = this.target.findIndex(item => {
                return item.id === id;
            })
            this.target.splice(idx, 1);
        },
        delAllTarget() {
            this.target = [];
            this.addTarget();
        }
    }
}
// 1124
</script>

<style scoped>
.target-wrapper {
    display: flex;
    width: 1400px;
    min-height: 600px;
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
    width: 600px;
    height: 40px;
    line-height: 40px;
}
.block .lable {
    width: 200px;
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
.export-box {
    min-height: 200px;
    margin-top: 50px;
}
</style>