<template>
    <div>
        <br />
        <input type="file" name="csvfile" @change="fillTable" ref="csvData" />
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
import csv2json from '../../utils/csv2json'
import Bus from '../../utils/bus'
export default {

    data() {
        return {
            showTableData: []
        }
    },
    created() {
        // 接受过滤后的数据，并显示
        Bus.$on('filterTableData', val => {
            this.showTableData = val;
        })
    },
    methods: {
        // 排序
        changeSort({ prop, order }) {
            let table = this.showTableData.sort((x1, x2) => {
                if (order === 'ascending') {
                    return x1[prop] - x2[prop]
                } else {
                    return x2[prop] - x1[prop]
                }
            })
            this.showTableData = table;
        },
        // 更新表格数据
        fillTable() {
            let  originTableData = [];
            csv2json.csv(this.$refs.csvData.files[0]).then((res) => {
                for (let i = 1; i < res.length; i++) {
                    let line = res[i];
                    if (line.length && !line[0]) {
                        continue
                    }
                    originTableData.push({
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
                this.showTableData = originTableData;
                // 应用过滤
                Bus.$emit('initOriginTableData', originTableData)
            })
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