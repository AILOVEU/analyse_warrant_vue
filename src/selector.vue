<template>
    <div class="choice-panel-wrapper">
        <div class="choice-panel">
            <span>选择价格区间{{priceRange}}</span>
            <el-slider range v-model="priceRange" :min="20" :max='2500' :step="10">
            </el-slider>
            <span>选择距今月份{{timeRange}}</span>
            <el-slider range v-model="timeRange" :min="1" :max='36' :step="1">
            </el-slider>
            <span>选择最小成交量{{minVolumn}}</span>
            <el-slider v-model="minVolumn" :min="100" :max="20000" :step="100">
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
            priceRange: [0, 100],
            timeRange: [0, 100],
            minVolumn: 100,
            premiumRange: [0, 100],
            DSRange: [0,100],
            BSRange: [0,100]
        }
    },
    computed: {
        selectorRangeData() {
            return {
                priceRange:this.priceRange,
                timeRange:this.timeRange,
                minVolumn:this.minVolumn,
                DSRange: this.DSRange,
                BSRange: this.BSRange
            }
        }
    },
    watch: {
        selectorRangeData() {
            this.$emit('update:selectorRangeData',this.selectorRangeData)
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