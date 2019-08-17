import { regionData} from 'element-china-area-data'
import Edu from '@/container/boss/job/filter-section'
    regionData.forEach(v=>{
        if(v.children && (v.children[0].label === '市辖区')){
            v.children = v.children[0].children;
        }
    }); 
//城市  根据选择的value  得出label
export const getCityName = (citys)=>{
    if(!citys) return false
     if(citys.length === 0)  return false
     let cityArr = []
     if(citys.length === 2){
        let provice = citys[0]
        let city = citys[1]
        cityArr = [{
            label:'',
            value:provice
        },{
            label:'',
            value:city
        }]
        regionData.forEach(v=>{
            if(v.value === provice){
                cityArr[0].label = v.label
                v.children.forEach(v1=>{
                    if(v1.value === city){
                        cityArr[1].label = v1.label
                    }
                })
            }
         })
     }
     if(citys.length === 3){
        let provice = citys[0]
        let city = citys[1]
        let xian = citys[2]
        cityArr = [{
            label:'',
            value:provice
        },{
            label:'',
            value:city
        },{
            label:'',
            value:xian
        }]
        regionData.forEach(v=>{
            if(v.value === provice){
                cityArr[0].label = v.label
                v.children.forEach(v1=>{
                    if(v1.value === city){
                        cityArr[1].label = v1.label;
                        v1.children.forEach(v2=>{
                            if(v2.value === xian){
                                cityArr[2].label = v2.label; 
                            }
                        })
                    }
                })
            }
         })
     }
    return cityArr;
}
//根据学历的value得出label
export const getEduName = (value)=>{
    if(Object.prototype.toString.call(value) !== '[object Array]') return false
    if(value.length === 0) return false
    let eduname = {};
    Edu[0].list.forEach(v=>{
        if(v.value === value[0]){
            eduname = {
                value:value[0],
                label:v.label
            }
        }
    })
    return [eduname]
}

//算出工作时间
export const getWorkTime = (time)=>{
    if(!time) return '-';
    let year = '';
    let month = '';
    console.log(typeof time);
    if(typeof time === 'string'){
        year = time.slice(0,7).split('-')[0];
        month = Number(time.slice(0,7).split('-')[1]); 
    }else{
        year = time.getFullYear();
        month = time.getMonth() + 1; 
    }
    let nowYear = new Date().getFullYear();
    let nowMonth = new Date().getMonth() + 1;
    let countYear = 0 //就算出来的工作时长,大于六个月 ==== 一年
    if(nowYear - year === 0 && nowMonth - month < 6){
        countYear  = 0
    }else if(nowMonth - month >= 6){
        countYear = nowYear - year + 1
    }else if(nowMonth - month <= 6){
        countYear =  nowYear - year
    }
    return countYear
}
export const getOld = (time)=>{
    if(!time) return '-';
    let year = '';
    if(typeof time === 'string'){
        year = time.slice(0,7).split('-')[0];
    }else{
        year = time.getFullYear();
    }
    let nowYear = new Date().getFullYear();
    return nowYear - year
}
export const delcityText = (name)=>{
        if(!name) return null;
        if(name.indexOf('市') !== -1){
            return name.split('市')[0]
        }else if(name.indexOf('省') !== -1){
            return name.split('省')[0]
        }else if(name.indexOf('回族') !== -1){
            return name.split('回族')[0]
        }else if(name.indexOf('维吾尔') !== -1){
            return name.split('维吾尔')[0]
        }else if(name.indexOf('壮族') !== -1){
            return name.split('壮族')[0]
        }else if(name.indexOf('特别') !== -1){
            return name.split('特别')[0]
        }else if(name.indexOf('西藏') !== -1 || name.indexOf('内蒙古') !== -1){
            return name.split('自治区')[0]
        }else if(name.indexOf('自治县') !== -1){
            return name.split('自治县')[0]
        }else if(name.indexOf('自治州') !== -1){
            return name.split('自治州')[0]
        }else{
            return name
        }
    }