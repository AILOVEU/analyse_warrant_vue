<template>
    <div class="rise-wrapper">
        <input name="csvfile" type="file" ref="file" @change="handleCsv" /> <br />
        <p></p>

        <el-form label-width="80px">
            <el-form-item label="选择窝轮">
                <el-cascader v-model="choiced" :options="options" @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="换股比率">
                <el-input  v-model="chsWarr.conversion"></el-input>
            </el-form-item>
            <el-form-item label="单手价格">
                <el-input  v-model="chsWarr.price"></el-input>
            </el-form-item>
            <el-form-item label="打和点">
                <el-input  v-model="chsWarr.breakpoint"></el-input>
            </el-form-item>
            <el-form-item label="当前股价">
                <el-input  v-model="chsWarr.point"></el-input>
            </el-form-item>
             <el-form-item label="看涨价格">
                <el-input v-model="lookPrice"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleCalc">计算结果</el-button>
            <el-form-item label="预计目标价">
                <el-input  v-model="lookPrice"></el-input>
            </el-form-item>
            <el-form-item label="单手盈利-盈利百分比">
                <el-input  v-model="lookPrice"></el-input>
            </el-form-item>
        </el-form>
        
        <!-- {{choicedWarrant}} -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            conversion_ratio: '',
            cur_price: '',
            csvDate: [],
            choiced: [],
            options: [],
            chsWarr: {},
            lookPrice: 0, // 预测价格
            lookRes: {}, // 预测价格对应的结果
        }
    },
    computed: {
    },
    methods: {
        // 计算可能盈利
        handleCalc(){
            // 获取预测价位
            let lookPrice = this.lookPrice;
            // 获取窝轮信息 
            let chsWarr = this.chsWarr;
            // 计算当前价格打和点价格，计算未来价格对应的打和点价格
            // breakpoint            提高的价格 * (1-溢价)
            let {conversion,premium,point,breakpoint,warrantprice} = chsWarr;
            breakpoint = parseFloat(breakpoint);
            // 目标值对应的新的打和点
            let willBreakpoint = breakpoint + (parseFloat(lookPrice) - parseFloat(point)) * (1 - parseFloat(premium)/100);
            // 打和点提升
            let breakPointRise = (willBreakpoint - breakpoint)/parseFloat(conversion);
            console.log(`${breakPointRise + parseFloat(warrantprice)}`);
        },
        initCalc() {
            this.lookPrice = 0;
            this.lookRes = {};
        },
        // 所选窝轮变化
        handleChange(value) {
            console.log(value);
            let choicedCode = value[1];
            this.chsWarr = this.csvDate.find(item => item.code === choicedCode);
            this.initCalc();
        },
        // 解析csv
        async handleCsv() {
            let file = this.$refs['file'].files[0];
            let csvDate = await this.handleAnaylseCsv(file);
            this.csvDate = csvDate;
            let map = new Map();
            let res = [];
            // warrant, // 涡轮名称
            // stock, // 正股名称
            // code, // 代码
            // type, // PUT or CALL
            // amplitude, // 振幅
            // volume, // 成交量/k
            // countdown, // 距今天数
            // price, // 单手价格
            // effectpoint, // 行权价差
            // point, // 当前价格
            // breakpoint, // 打和点
            // changeval,// 涨跌幅
            // premium,// 溢价
            // warrantprice,// 当前价
            // conversion // 换股比率
            for (let date of csvDate) {
                let stock = date.stock;
                let warrant = {
                    value: date.code, // 窝轮
                    label: `${date.warrant}- -${date.premium}%`
                };
                if (map.has(stock)) {
                    map.set(stock, [...map.get(stock), warrant])
                } else {
                    map.set(stock, [warrant]);
                }
            }
            let i = -1;
            for (let key of map.keys()) {
                console.log(key);
                i++;
                res.push({
                    value: key,
                    label: key,
                    children: []
                });
                for (let warrant of map.get(key)) {
                    res[i]['children'].push({
                        value: warrant.value,
                        label: warrant.label
                    })
                }
            }
            this.options = res;
        }
    }
}
</script>

<style>
.rise-wrapper {
    width: 70%;
    padding-top: 200px;
    margin: 0 auto;
}
</style>