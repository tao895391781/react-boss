/*
 * @Descripttion: 对iscroll的简单封装
 * @version: 
 * @Author: tll
 * @Date: 2019-07-31 14:34:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-05 16:25:43
 */
import BScroll from 'better-scroll'

const initIscroll = (dom,option)=>{
    //全局配置
    let initOption = { 
        scrollY: true,
        click: true
    };
    let options = Object.assign(initOption,option)
    const myScroll = new BScroll(dom,options);
    return myScroll
}
export default initIscroll