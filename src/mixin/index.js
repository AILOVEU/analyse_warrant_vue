import csv2json from '@/utils/csv2json';
export default {
    methods: {
        // 全局分析csv
        handleAnaylseCsv(file) {
            return new Promise((resolve) => {
                csv2json.csv(file).then((res) => {
                    let originTableData = [];
                    for (let i = 1; i < res.length; i++) {
                        let line = res[i]
                        if (line.length && !line[0]) {
                            continue
                        }
                        let [warrant,stock,code,type,amplitude,
                            volume,countdown,price,effectpoint,point,
                            breakpoint,changeval,premium,warrantprice,
                            conversion,delta] = line;
                        originTableData.push({
                            warrant, // 涡轮名称
                            stock, // 正股名称
                            code, // 代码
                            type, // PUT or CALL
                            amplitude, // 振幅
                            volume, // 成交量/k
                            countdown, // 距今天数
                            price, // 单手价格
                            effectpoint, // 行权价差
                            point, // 当前价格
                            breakpoint, // 打和点
                            changeval,// 涨跌幅
                            premium,// 溢价
                            warrantprice,// 当前价
                            conversion, // 换股比率
                            delta // 对冲值
                        })
                    }
                    console.log(originTableData);
                    resolve(originTableData);
                }).catch((e) => {
                    alert(JSON.stringify(e));
                    resolve([])
                });
            })

        },
    }
}