/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-08-14 17:54:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-24 15:36:13
 */
export const eduList = [
    {
            label:'初中及以下',
            value:'初中及以下',
            weight:1
        },{
            label:'中专/中技',
            value:'中专/中技',
            weight:2
        },{
            label:'高中',
            value:'高中',
            weight:3
        },{
            label:'大专',
            value:'大专',
            weight:4
        },{
            label:'本科',
            value:'本科',
            weight:5
        },{
            label:'硕士',
            value:'硕士',
            weight:6
        },{
            label:'博士',
            value:'博士',
            weight:7
        }
        
]
//教育经历时间段
let nowYear = new Date().getFullYear();
let times = [];
for(let i = nowYear;i>1988;i--){
    let pre = '';
    let pre1 =  '';
    if(i === 1989){
        pre = 1990 + '以前';
        pre1 = 1990;
    }else{
        pre = i;
        pre1  = i; 
    }
    let item = {
            label:pre.toString(),
            value:pre.toString(),
            children:[]
        }
        for(let j = pre1; j< i + 9 && j < nowYear+1;j++){
            item.children.push({
                label: j.toString(),
                value: j.toString(),
            })
        }
        times.push(item); 
}
console.log(times);
export  const time  = times