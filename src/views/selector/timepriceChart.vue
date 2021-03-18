<template>
    <canvas width="1200" height="700" id="main"></canvas>
</template>

<script>
import * as echarts from 'echarts';
import Bus from '../../utils/bus'
export default {
    data() {
        return {
            showTableData: []
        }
    },
    mounted() {
        Bus.$on('filterTableData', data => {
            this.showTableData = data;
            this.fillChart();
        })

    },
    methods: {
        generateChartData() {
            let data = {};
            let stockList = new Set();
            for (let i = 0; i < this.showTableData.length; i++) {
                let line = this.showTableData[i];
                stockList.add(line['warrantName'].slice(0, 2));
            }
            for (let key of stockList.keys()) {
                data[key] = []
            }
            // data = { '小米'： [] }
            this.showTableData.forEach(item => {
                let stockName = item['warrantName'].slice(0, 2)
                let T = item['T']
                let P = item['P']
                let V = item['V']
                let warrantName = item['warrantName']
                data[stockName].push([T, P,  V , warrantName, stockName])
            })
            let chartData = []
            Object.keys(data).forEach(key => {
                chartData.push([data[key]])
            })
            let legendData = stockList.keys();

            return {
                dataDict: data,
                data: chartData,
                legendData: legendData,
            };
        },
        randomHexColor() { //随机生成十六进制颜色
            return 'rgb(' +  Math.round(Math.random() * 200 +50) + ', ' +  Math.round(Math.random() * 200 +50) +  ', ' +   Math.round(Math.random() * 200 +50) + ', ' + '0.7' + ')'
        },
        fillChart() {
            var { dataDict, legendData } = this.generateChartData();
            console.log(dataDict)
            let seriesData = []
            Object.keys(dataDict).forEach(key => {

                seriesData.push({
                    name: key,
                    data: dataDict[key],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return 3*Math.sqrt(Math.sqrt(data[2]));
                    },
                    emphasis: {
                        focus: 'series',
                        label: {
                            show: true,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(25, 100, 150, 0.9)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: this.randomHexColor()
                        },
                            // {
                            //     offset: 1,
                            //     color: this.randomHexColor()
                            // }
                        ])
                    }
                });
            })
            // 横坐标 纵坐标 xxx 名称 类别
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            myChart.clear();
            let option = {
                backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                    offset: 0,
                    color: '#f7f8fa'
                }, {
                    offset: 1,
                    color: '#cdd0d5'
                }]),
                title: {
                    text: '距今日期与单手价格之间的关系',
                    left: '5%',
                    top: '2%'
                },
                legend: {
                    right: '10%',
                    bottom: '10%',
                    data: Array.from(legendData)
                },
                grid: {
                    left: '8%',
                    top: '10%',
                    bottom: '20%'
                },
                xAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                dataZoom: [{
                    type: 'inside'
                }, {
                    type: 'slider'
                }],
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    scale: true
                },
                series: seriesData
            };

            // console.log(option);
            option && myChart.setOption(option);
        }

    }
}
</script>

<style>
</style>