<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">

            <el-form-item label="选择股票">
                <el-select v-model="selectedStock" placeholder="请选择">
                    <el-option v-for="item in form.options" :key="item.value" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

            </el-form-item>
        </el-form>
        <br />
        <el-button @click="searchData">点我查询数据</el-button>
        <br />
        <demo :volList="volList"></demo>
    </div>
</template>

<script>
import Bus from '@/utils/bus'
import axios from 'axios';
import demo from './demo';
export default {
    data() {
        return {
            volList: [],
            selectedStock:  '000333.SZ',
            form: {
                options: [{
                    value: '000333.SZ',
                    label: '美的集团'
                }, {
                    value: '000735.SZ',
                    label: '京东方A'
                }],
            }
        }
    },
    components: { demo },
    async mounted() {

    },
    methods: {
        searchData() {
            this.getDataPromise().then(res => {
                this.volList = res;
                Bus.$emit('volRemind-fillData', res)
            });
        },
        getDataPromise() {
            return new Promise((resolve, reject) => {
                axios.post('/waditu', {
                    "api_name": "daily",
                    "token": "bd2ae863fadaf4f966d3b3c8bba43fac03e88739af3785f08dc559f8",
                    "params": {
                        "ts_code": this.selectedStock,
                        "start_date": "20190101",
                        "end_date": "20210320"
                    },
                    "fields": "ts_code,trade_date,open,vol,amount"
                }).then(res => {
                    resolve(res.data.data.items);
                }).catch(e => {
                    reject(e);
                })
            })
        }
    }

}
</script>

<style>
</style>