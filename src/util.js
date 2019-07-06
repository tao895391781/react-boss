import { regionData} from 'element-china-area-data'
import Edu from '@/container/boss/job/filter-section'
    regionData.forEach(v=>{
        if(v.children && (v.children[0].label === '市辖区')){
            v.children = v.children[0].children;
        }
    }); 
//城市  根据选择的value  得出label
export const getCityName = (citys)=>{
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
