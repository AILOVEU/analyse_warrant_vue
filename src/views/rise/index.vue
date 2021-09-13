<template>
    <div class="rise-wrapper">
        <input name="csvfile" type="file" ref="file" @change="handleCsv" /> <br />
        <p></p>

        <el-form label-width="100px">
            <!-- 窝轮相关数据 -->
            <el-form-item label="选择窝轮">
                <el-cascader v-model="choiced" :options="options" @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="换股比率">
                <el-input  v-model="chsWarr.conversion"></el-input>
            </el-form-item>
            <el-form-item label="对冲值">
                <el-input  v-model="chsWarr.delta"></el-input>
            </el-form-item>
            <el-form-item label="窝轮价格">
                <el-input  v-model="chsWarr.warrantprice"></el-input>
            </el-form-item>
            <el-form-item label="单手价格">
                <el-input  v-model="chsWarr.price"></el-input>
            </el-form-item>
            <el-form-item label="当前股价">
                <el-input  v-model="chsWarr.point"></el-input>
            </el-form-item>
            <el-form-item label="打和点">
                <el-input  v-model="chsWarr.breakpoint"></el-input>
            </el-form-item>
            <el-form-item label="距今天数">
                <el-input  v-model="chsWarr.countdown"></el-input>
            </el-form-item>
            <!-- 填写看涨数据 -->
             <el-form-item label="看涨价格">
                <el-input v-model="lookPrice"></el-input>
            </el-form-item>
            <!-- 点击进行计算 -->
            <el-button type="primary" @click="handleCalc">计算结果</el-button>
            <!-- 结果页面 -->

            <el-form-item label="预计目标价">
                <el-input  v-model="lookRes.warrWillPoint"></el-input>
            </el-form-item>
            <el-form-item label="收益比">
                <el-input  v-model="lookRes.upPerc"></el-input>
            </el-form-item>
            <el-form-item label="预计打和点">
                <el-input  v-model="lookRes.stockWillPoint"></el-input>
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
            lookPrice: '', // 预测价格
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
            // delta // 对冲值
            // 价格变化 = （预计价-当前价）/ 换股比率 * 对冲值
            let {conversion,point,delta,warrantprice,effectpoint} = chsWarr;
            let warrChangePoint = (parseFloat(delta) * (parseFloat(lookPrice) - parseFloat(point)) / parseFloat(conversion));
            let curWarrPoint = parseFloat(warrantprice);
            let upPerc = parseFloat(warrChangePoint / curWarrPoint);
            let stockWillPoint = parseFloat(lookPrice) + parseFloat(conversion)*(warrChangePoint+curWarrPoint) + parseFloat(effectpoint);
            this.$set(this.lookRes,"warrWillPoint",(warrChangePoint+curWarrPoint).toFixed(4)); // 预计窝轮point
            this.$set(this.lookRes,'upPerc',(upPerc*100).toFixed(2)+'%'); // 涨幅百分比
            this.$set(this.lookRes,'stockWillPoint',stockWillPoint.toFixed(2)); // 预计打和点
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
    padding-top: 100px;
    margin: 0 auto;
}
</style>