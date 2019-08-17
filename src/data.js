/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-08-14 17:54:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-15 10:24:19
 */
export const eduList = [
    {
            label:'初中及以下',
            value:'初中及以下'
        },{
            label:'中专/中技',
            value:'中专/中技'
        },{
            label:'高中',
            value:'高中'
        },{
            label:'大专',
            value:'大专'
        },{
            label:'本科',
            value:'本科'
        },{
            label:'硕士',
            value:'硕士'
        },{
            label:'博士',
            value:'博士'
        }
        
]
//教育经历时间段
let nowYear = new Date().getFullYear();
let times = [];
for(let i = 1989;i<nowYear+1;i++){
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
            label:pre,
            value:pre,
            children:[]
        }
        for(let j = pre1; j< i + 9;j++){
            item.children.push({
                label: j,
                value: j,
            })
        }
        times.push(item); 
}
console.log(times);
export  const time  = times