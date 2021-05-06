<template>
    <canvas width="1200" height="600" id="main"></canvas>

</template>

<script>
import * as echarts from 'echarts';
import Bus from '@/utils/bus';
export default {
    data() {
        return {
            volList: []
        }
    },
    mounted() {
        Bus.$on('volRemind-fillData', (res) => {
            this.volList = res.sort((x, y) => {
                return parseInt(x[1]) - parseInt(y[1])
            });

            this.fillChart();
        })
    },

    methods: {
        getAvg120Vol(volData, priceData) {
            let buyArray = [];
            let sellArray = [];
            let isSellList = [];
            // 获取前x天的平均值
            let DAYS = 200;
            let MIN_DAYS = 10;
            let data = [];
            volData.forEach((item, index) => {
                // 0 、1、、、119 都不处理
                if (index < DAYS) {
                    let s = volData.slice(0, index).reduce(function (a, b) {
                        return a + b;
                    }, 0);
                    isSellList.push(0)
                    data.push(s / (index + 1));
                    return;
                }
                let sum = this.getSum(volData.slice(index - DAYS, index))
                data.push(sum / DAYS);
                // 获取XX日内交易平均值
                let sum5avg = this.getSum(volData.slice(index - MIN_DAYS, index));
                sum5avg = sum5avg / MIN_DAYS;
                // 如果大于x天平均值的70%大，则不卖出；如果小于x天平均值的50%，则买入
                if (sum * 1.3 < sum5avg * DAYS && priceData[index] * 2 > (priceData[index - 1] + priceData[index - 2])) {
                    isSellList.push(1)
                    sellArray.push(priceData[index]);
                } else if (sum * 0.6 > sum5avg * DAYS) {
                    isSellList.push(-1);
                    buyArray.push(priceData[index])
                } else {
                    isSellList.push(0);
                }

            })
            console.log("卖出数组");
            console.log(this.getSum(sellArray)/sellArray.length);
            console.log("买入数组");
            console.log(this.getSum(buyArray)/buyArray.length);
            return isSellList;
        },
        getSum(arr) {
            let sum  =  arr.reduce(function (a, b) {
                return a + b;
            }, 0);
            return sum;
        },
        analyseVolData() {
            // "ts_code,trade_date,close,vol,amount"
            // 时间
            let xAxisData = this.volList.map(item => {
                return item[1]
            });
            // 交易量
            let volData = this.volList.map(item => {
                return item[3]
            });
            // 交易额
            let amountData = this.volList.map(item => {
                return item[4]
            });
            // 指数价格
            let priceData = this.volList.map(item => {
                return item[2]
            });
            return {
                xAxisData,
                volData,
                amountData,
                priceData
            }
        },
        fillChart() {
            let {
                xAxisData,
                volData,
                amountData,
                priceData
            } = this.analyseVolData();
            amountData = this.getAvg120Vol(volData, priceData);
            volData = volData.slice(120)
            xAxisData = xAxisData.slice(120)
            amountData = amountData.slice(120)
            console.log("amountData");
            console.log(amountData);
            priceData = priceData.slice(120)

            if (!xAxisData || xAxisData && xAxisData.length <= 0) {
                return
            }
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            myChart.clear();
            var colors = ['#5470C6', '#91CC75', '#EE6666'];

            let option = {
                color: colors,

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                dataZoom: [{
                    type: 'inside'
                }, {
                    type: 'slider'
                }],
                legend: {
                    data: ['蒸发量', '降水量', '平均温度']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: xAxisData
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '成交量',
                        // min: 0,
                        // max: 250,
                        position: 'right',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        },
                    },
                    {
                        type: 'value',
                        name: '成交额',
                        min: -2,
                        max: 2,
                        position: 'right',
                        offset: 80,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '股价',
                        // min: 0,
                        // max: 25,
                        position: 'left',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '蒸发量',
                        type: 'bar',
                        data: volData,
                        // markLine: {
                        //     data: [
                        //         { type: 'average', name: '平均值' }
                        //     ]
                        // }
                    },
                    {
                        name: '降水量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: amountData,
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        }
                    },
                    {
                        name: '平均温度',
                        type: 'line',
                        yAxisIndex: 2,
                        data: priceData
                    }
                ]
            };
            console.log(option);
            option && myChart.setOption(option);
        }
    }
}
</script>

<style>
</style>