<template>
    <div class="choice-panel-wrapper">
        <div class="choice-panel">
            <span>筛选股票</span>
            <el-checkbox :indeterminate="isIndeterminate" v-model="isStockCheckAll"
                @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedStockList" @change="handleCheckedStocksChange">
                <div v-if="allStockList && allStockList.length">
                    <el-checkbox border size="small" v-for="stock in allStockList" :label="stock"
                        :key="stock">{{stock}}
                    </el-checkbox>
                </div>
                <div v-else>
                    <el-checkbox disabled>请导入数据</el-checkbox>
                </div>
            </el-checkbox-group>
            <br />
            <span>选择价格区间{{priceRange}}</span>
            <el-slider range v-model="priceRange" :min="selectorOption.price.min"
                :max='selectorOption.price.max' :step="10">
            </el-slider>
            <span>选择距今月份{{timeRange}}</span>
            <el-slider range v-model="timeRange" :min="selectorOption.time.min"
                :max='selectorOption.time.max' :step="1">
            </el-slider>
            <span>选择最小成交量{{minVolumn}}万</span>
            <el-slider show-input v-model="minVolumn" :min="100" :max="20000" :step="100">
            </el-slider>
            <span>选择行权溢价区间{{DSRange}}</span>
            <el-slider range v-model="DSRange" :min="-25" :max='50' :step="1">
            </el-slider>
            <span>选择打和溢价区间{{BSRange}}</span>
            <el-slider range v-model="BSRange" :min="0" :max='50' :step="1">
            </el-slider>
        </div>
    </div>
</template>

<script>
import Bus from '../../utils/bus'
export default {
    data() {
        return {
            isIndeterminate: true,
            isStockCheckAll: true,
            priceRange: [20, 2500],
            timeRange: [1, 36],
            minVolumn: 100,
            DSRange: [-25, 50],
            BSRange: [0, 50],
            checkedStockList: [],
            originTableData: [],
            allStockList: [],
            selectorOption: {
                price: {
                    min: 20,
                    max: 2500
                },
                time: {
                    min: 1,
                    max: 36
                },
                volumn: {
                    min: 100,
                    max: 20000
                },
                DS: {
                    min: -25,
                    max: 50
                },
                BS: {
                    min: 0,
                    max: 50
                }
            }
        }
    },
    created() {
        // 更新表格原始数据
        Bus.$on('initOriginTableData', val => {
            this.originTableData = val
        })
    },
    computed: {
        // 筛选组合数据
        selectorRangeData() {
            return {
                priceRange: this.priceRange,
                timeRange: this.timeRange,
                minVolumn: this.minVolumn,
                DSRange: this.DSRange,
                BSRange: this.BSRange,
                checkedStockList: this.checkedStockList
            }
        }
    },
    watch: {
        // 监测筛选规则，筛选表格数据
        selectorRangeData(val) {
            let { priceRange, timeRange, minVolumn, BSRange, DSRange, checkedStockList } = val;
            let res = this.originTableData.filter(item => {
                let warrantName = item.warrantName;
                let V = item.V
                let T = item.T / 30
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
                if (!checkedStockList.includes(warrantName.slice(0, 2))) {
                    return false;
                }
                return true;
            })
            // 广播筛选后的数据
            Bus.$emit('filterTableData', res)

        },
        // 监测原始数据，一点变化更新筛选范围
        originTableData(val) {
            // 分析数据范围
            if (val && val.length <= 1) return;
            let stockList = new Set();
            let t = val.slice(1);
            let line0 = t[0];
            let price = { min: line0['P'], max: line0['P'] };
            let time = { min: parseInt(line0['T']/30), max: parseInt(line0['T']/30) };
            // let volumn = { min: line0['V'], max: line0['V'] };
            // let DS = { min: line0['DS'], max: line0['DS'] };
            // let BS = { min: line0['BS'], max: line0['BS'] };
            for (let i = 0; i < t.length; i++) {
                let line = t[i];
                stockList.add(line['warrantName'].slice(0, 2));
                let linePrice = line['P'];
                if (linePrice < price.min) {
                    price.min = linePrice
                }
                if (linePrice > price.max) {
                    price.max = linePrice
                }
                let lineTime = parseInt(line['T'] / 30)
                if (lineTime < time.min) {
                    time.min = lineTime
                }
                if (lineTime > time.max) {
                    time.max = lineTime
                }
            }
            this.selectorOption = {
                price,
                time
            }
            this.allStockList = Array.from(stockList)
            this.checkedStockList = this.allStockList;
        }
    },
    methods: {
        handleCheckAllChange(val) {
            this.checkedStockList = val ? this.allStockList : [];
            this.isIndeterminate = false;
        },
        handleCheckedStocksChange(value) {
            let checkedCount = value.length;
            this.isStockCheckAll = checkedCount === this.allStockList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.allStockList.length;
        },

    }
}
</script>

<style scoped>
.choice-panel-wrapper {
    margin: 10px auto;
    width: 700px;
    text-align: center;
}
</style>