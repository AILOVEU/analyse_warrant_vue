<template>
    <div class="visual-wrapper">
        <!-- tab右半部分，生成图标 -->
        <el-button type="warning" @click="generateChart">生成图表</el-button>
        <br />
        <canvas width="1200" height="600" id="main"></canvas>
    </div>
</template>

<script>
import echarts from '@/utils/echarts_simpler.js';
import { v4 as uuidv4 } from 'uuid';
export default {
    data() {
        return {
            legendData: [], // 类标
            xAxisData: [], // X坐标
            seriesData: [], // 数组综合体
            GradeList: [] // 等差数组列表
        }
    },
    props: ['targetData'],
    mounted() {
    },
    methods: {
        // 清楚之前的数据
        clearData() {
            this.legendData = [] // 类标
            this.xAxisData = [] // X坐标
            this.seriesData = [] // 数组综合体
            this.GradeList = []
        },
        // 分析标的
        analyseTarget() {
            this.clearData();
            let t = this.targetData;
            // 生成标的名称
            for (let i = 0; i < t.length; i++) {
                let w = t[i];
                this.legendData.push(w.stockName || uuidv4().slice(0, 5));
                this.GradeList.push(this.getGradeList(w.singlePrice, w.profit, w.rights, w.fee))
            }
            // 按最大长度数据，进行数据格式化
            let maxGradeLength = 0;
            for (let i = 0; i < this.GradeList.length; i++) {
                let t = this.GradeList[i];
                if (t.length > maxGradeLength) {
                    maxGradeLength = t.length;
                }
            }
            for (let i = 0; i < maxGradeLength; i++) {
                this.xAxisData.push(`下跌${i}格`)
            }
            for (let i = 0; i < this.GradeList.length; i++) {

                while (this.GradeList[i].length < maxGradeLength) {
                    this.GradeList[i].push(this.GradeList[i][this.GradeList[i].length - 1])
                }
            }
            // 生成标的等差数组
            for (let i = 0; i < t.length; i++) {
                this.seriesData.push({
                    name: this.legendData[i],
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.GradeList[i]
                });
            }
        },
        // 生成等差数组
        getGradeList(cur, grade, num, fee) {
            let arr = [];
            let sum = 0;
            for (let i = cur; i >= grade; i -= grade) {
                // 每次交易成本 + 交易手续费
                sum += (i * num + fee);
                arr.push(sum)
            }
            return arr
        },
        // 生成图表
        generateChart() {
            this.analyseTarget();
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            myChart.clear();
            var option;
            option = {
                // toolbox: {
                //     left: 'center',
                //     feature: {
                //         dataZoom: {}
                //     }
                // },
                dataZoom: [{
                    type: 'inside'
                }, {
                    type: 'slider'
                }],
                tooltip: {
                    show: true,
                    trigger: 'item',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: this.legendData
                },
                label: {
                    show: true
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value'
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        rotate: 45
                    },
                    data: this.xAxisData
                },
                series: this.seriesData
            };
            console.log(option);
            option && myChart.setOption(option);
        }
    }
}
</script>

<style scoped>
.visual-wrapper {
    width: 1400px;
}
</style>