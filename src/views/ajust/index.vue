<template>
    <div>
        {{form}}
        <br />
        <el-button @click="generatePlan">生成更改建议</el-button>

        <div v-for="item in form" :key="item.id">
            <el-form ref="form" :model="item" label-width="100px">
                <el-form-item label="标的名称">
                    <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="实时单手价格">
                    <el-input v-model="item.curPrice"></el-input>
                </el-form-item>
                <el-form-item label="初始单手价格">
                    <el-input v-model="item.originPrice"></el-input>
                </el-form-item>
                <el-form-item label="已拥有权利数">
                    <el-input v-model="item.curAllRights"></el-input>
                </el-form-item>
                <!-- 价差 -->
                <el-form-item label="原价差">
                    <el-input v-model="item.oldProfit"></el-input>
                </el-form-item>
                <el-form-item label="目标价差">
                    <el-input v-model="item.aimProfit"></el-input>
                </el-form-item>
                <!-- 手数 -->
                <el-form-item label="原每手数">
                    <el-input v-model="item.oldEveryRights"></el-input>
                </el-form-item>
                <el-form-item label="目标每手手数">
                    <el-input v-model="item.aimEveryRights"></el-input>
                </el-form-item>
                <el-form-item label="手续费">
                    <el-input v-model="item.fee"></el-input>
                </el-form-item>
            </el-form>
        </div>

        <el-tag>{{suggest}}</el-tag>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: [],
            suggest: ''
        }
    },
    mounted() {
        this.addTarget();
    },
    methods: {
      // 生成等差数组
        getLeftCost({ singlePrice, profit, rights, fee } = {}) {
            if (!singlePrice || !fee || !profit || !rights) {
                return 0;
            }
            let sum = 0;
            for (let i = singlePrice; i >= profit; i -= profit) {
                // 每次交易成本 + 交易手续费
                sum += (i * rights + fee);
            }
            return sum
        },
        generatePlan() {

            this.form.forEach(item => {
                // eslint-disable-next-line
                debugger
                let name = item.name;
                let fee = item.fee;
                let curPrice = parseInt(item.curPrice);
                let originPrice = parseInt(item.originPrice);
                let oldProfit = parseInt(item.oldProfit);
                let aimProfit = parseInt(item.aimProfit);
                let aimEveryRights = parseInt(item.aimEveryRights);
                let oldEveryRights = parseInt(item.oldEveryRights);
                
                // 原价差下，上涨路径
                let oldCount = Math.ceil((originPrice - curPrice) / oldProfit)
                let newCount = Math.ceil((originPrice - curPrice) / aimProfit)
                // 计算原路径总个数
                let needBuyRights = newCount * aimEveryRights - oldCount * oldEveryRights;
                // 计算左侧价差
                let oldLeftNeedMoney = this.getLeftCost({
                  singlePrice: curPrice,
                  profit : oldProfit, 
                  rights: oldEveryRights, 
                  fee: fee
                });
                let newLeftNeedMoney = this.getLeftCost({
                  singlePrice: curPrice,
                  profit : aimProfit, 
                  rights: aimEveryRights, 
                  fee: fee
                });
                let needLeftMoney = (newLeftNeedMoney - oldLeftNeedMoney) + needBuyRights*curPrice;
                this.suggest = `操作建议：${name}将价差从${oldProfit}调整为${aimProfit}，
                每笔手数从${oldEveryRights}调整为${aimEveryRights},
              需要以当前价格购买${needBuyRights}手，增加保证金${needLeftMoney}`
              
            })
        },
        addTarget() {
            this.form.push({
                id: new Date().valueOf(),
                name: '完美数据',
                originPrice: 100,
                curPrice: 60,
                curAllRights: 6,
                oldProfit: 20,
                aimProfit: 10,
                oldEveryRights: 2,
                aimEveryRights: 2,
                fee: 40
            })
        },
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>