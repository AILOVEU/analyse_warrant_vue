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
            <el-slider range v-model="priceRange" :min="20" :max='2500' :step="10">
            </el-slider>
            <span>选择距今月份{{timeRange}}</span>
            <el-slider range v-model="timeRange" :min="1" :max='36' :step="1">
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
            allStockList: [],
            checkedStockList: []
        }
    },
    props: ['analysedData'],
    computed: {
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
        selectorRangeData() {
            this.$emit('update:selectorRangeData', this.selectorRangeData)
        },

        analysedData(val) {
            // 原始table不变化，则不会执行到该watch
            this.allStockList = val.stockList;
            // this.checkedStockList = [];
        }
    },
    methods: {
        handleCheckAllChange(val) {
            this.checkedStockList = val ? this.allStockList : [];
            this.isIndeterminate = false;
        },
        handleCheckedStocksChange(value) {
            let checkedCount = value.length;
            this.isStockCheckAll = checkedCount === this.checkedStockList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.allStockList.length;
        }
    }
}
</script>

<style>
.choice-panel-wrapper {
    margin: 10px auto;
    width: 700px;
    text-align: center;
}
</style>