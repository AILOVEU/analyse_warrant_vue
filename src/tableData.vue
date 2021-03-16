<template>
    <div>
        <br />
        <input type="file" name="csvfile" @change="csv" ref="csvData" />
        <el-table :data="showTableData" style="width: 100%" @sort-change="changeSort">
            <el-table-column prop="warrantName" label="窝轮名称" width="180">
            </el-table-column>
            <el-table-column prop="stock" label="代码" width="180">
            </el-table-column>
            <el-table-column prop="amplitude" label="波幅" sortable width="180">
            </el-table-column>
            <el-table-column prop="V" sortable label="成交量/万">
            </el-table-column>
            <el-table-column prop="T" sortable label="距今天数">
            </el-table-column>
            <el-table-column prop="P" sortable label="单手价格">
            </el-table-column>
            <el-table-column prop="D" sortable label="行权价差">
            </el-table-column>
            <el-table-column prop="S" sortable label="当前股价">
            </el-table-column>
            <el-table-column prop="B" sortable label="打和价差">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
import csv2json from './utils/csv2json'
export default {

    data() {
        return {
            originTableData: [],
            showTableData: []
        }
    },
    props: ['selectorRangeData'],
    watch: {
        //  监测筛选规则，筛选表格数据
        selectorRangeData() {
            let { priceRange, timeRange, minVolumn, BSRange, DSRange,checkedStockList } = this.selectorRangeData;
            let res = this.originTableData.filter(item => {
                let warrantName = item.warrantName;
                let V = item.V
                let T = item.T/ 30
                let P = item.P
                let D = item.D
                let S = item.S
                let B = item.B
                let DS = parseFloat(D / S) * 100;
                let BS = parseFloat(B / S) * 100;
                if (minVolumn >= V) {
                    return false
                }
                if (timeRange[0] > T || timeRange[1] < T) {
                    return false
                }
                if (priceRange[0] > P || priceRange[1] < P) {
                    return false
                }
                if (DSRange[0] > DS || DSRange[1] < DS) {
                    return false;
                }
                if (BSRange[0] > BS || BSRange[1] < BS) {
                    return false;
                }
                if(!checkedStockList.includes(warrantName.slice(0,2))) {
                    return false;
                }
                return true;
            })
            this.showTableData = res;
        }
    },
    methods: {
        
        // 排序
        changeSort({prop,order}) {
          let table = this.showTableData.sort( (x1,x2)=> {
            if(order === 'ascending') {
              return x1[prop] - x2[prop]
            }else {
              return x2[prop] - x1[prop]
            }
          })
          this.showTableData = table;
        },
        // 更新表格数据
        initTable() {
            this.originTableData = [];
            csv2json.csv(this.$refs.csvData.files[0]).then((res) => {
                for (let i = 1; i < res.length; i++) {
                    let line = res[i];
                    if(line.length && !line[0]) {
                        continue
                    }
                    this.originTableData.push({
                        warrantName: line[0],
                        stock: line[1],
                        amplitude: parseFloat(line[2]),
                        V: parseInt(line[3]),
                        T: parseInt(line[4]),
                        P: parseInt(line[5]),
                        D: parseFloat(line[6]),
                        S: parseFloat(line[7]),
                        B: parseFloat(line[8])
                    })
                }
                this.showTableData = this.originTableData;
                this.analyseData();

            })
        },
        // 分析数据 -> 回传给筛选组件
        analyseData() {
            // 筛选出来
            let stockList = new Set();
            let t = this.originTableData;
            for(let i=1;i < t.length;i++) {
                let line = t[i];
                stockList.add(line['warrantName'].slice(0,2))
            }
            this.$emit('update:analysedData',{
                stockList :Array.from(stockList)
            })
        },
        csv() {
            this.initTable();
        }
    },
}
</script>
<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>