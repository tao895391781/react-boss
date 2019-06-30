 const hotCity = [
    {
        label:'北京',
        value:'110000',
        children:[
            {value: "110101", label: "东城区"}, 
            {value: "110102", label: "西城区"}, 
            {value: "110105", label: "朝阳区"}, 
            {value: "110106", label: "丰台区"}, 
            {value: "110107", label: "石景山区"},
            {value: "110108", label: "海淀区"},
            {value: "110109", label: "门头沟区"},
            {value: "110111", label: "房山区"}, 
            {value: "110112", label: "通州区"},
            {value: "110113", label: "顺义区"}, 
            {value: "110114", label: "昌平区"},
            {value: "110115", label: "大兴区"},
            {value: "110116", label: "怀柔区"},
            {value: "110117", label: "平谷区"}, 
            {value: "110118", label: "密云区"}, 
            {value: "110119", label: "延庆区"}
        ]
    },{
        label:'上海',
        value:'310000',
        children:[
            {value: "310101", label: "黄浦区"},
            {value: "310104", label: "徐汇区"},
            {value: "310105", label: "长宁区"}, 
            {value: "310106", label: "静安区"},
            {value: "310107", label: "普陀区"},
            {value: "310109", label: "虹口区"},
            {value: "310110", label: "杨浦区"}, 
            {value: "310112", label: "闵行区"},
            {value: "310113", label: "宝山区"}, 
            {value: "310114", label: "嘉定区"},
            {value: "310115", label: "浦东新区"}, 
            {value: "310116", label: "金山区"}, 
            {value: "310117", label: "松江区"}, 
            {value: "310118", label: "青浦区"},
            {value: "310120", label: "奉贤区"},
            {value: "310151", label: "崇明区"}
        ]
    },{
        label:'杭州',
        value:'330100',
        children:[
            {value: "330102", label: "上城区"},
            {value: "330103", label: "下城区"},
            {value: "330104", label: "江干区"},
            {value: "330105", label: "拱墅区"},
            {value: "330106", label: "西湖区"},
            {value: "330108", label: "滨江区"},
            {value: "330109", label: "萧山区"},
            {value: "330110", label: "余杭区"},
            {value: "330111", label: "富阳区"},
            {value: "330122", label: "桐庐县"},
            {value: "330127", label: "淳安县"},
            {value: "330182", label: "建德市"},
            {value: "330185", label: "临安市"}
        ]
    },{
        label:'深圳',
        value:'440300',
        children:[
            {value: "440303", label: "罗湖区"},
            {value: "440304", label: "福田区"},
            {value: "440305", label: "南山区"},
            {value: "440306", label: "宝安区"},
            {value: "440307", label: "龙岗区"},
            {value: "440308", label: "盐田区"}
        ]
    },{
        label:'广州',
        value:'440100',
        children:[
            {value: "440103", label: "荔湾区"},
            {value: "440104", label: "越秀区"},
            {value: "440105", label: "海珠区"},
            {value: "440106", label: "天河区"},
            {value: "440111", label: "白云区"},
            {value: "440112", label: "黄埔区"},
            {value: "440113", label: "番禺区"},
            {value: "440114", label: "花都区"},
            {value: "440115", label: "南沙区"},
            {value: "440117", label: "从化区"},
            {value: "440118", label: "增城区"}
        ]
    },{
        label:'成都',
        value:'510100',
        children:[
            {value: "510104", label: "锦江区"},
            {value: "510105", label: "青羊区"},
            {value: "510106", label: "金牛区"},
            {value: "510107", label: "武侯区"},
            {value: "510108", label: "成华区"},
            {value: "510112", label: "龙泉驿区"},
            {value: "510113", label: "青白江区"},
            {value: "510114", label: "新都区"},
            {value: "510115", label: "温江区"},
            {value: "510116", label: "双流区"},
            {value: "510121", label: "金堂县"},
            {value: "510124", label: "郫县"},
            {value: "510129", label: "大邑县"},
            {value: "510131", label: "蒲江县"},
            {value: "510132", label: "新津县"},
            {value: "510181", label: "都江堰市"},
            {value: "510182", label: "彭州市"},
            {value: "510183", label: "邛崃市"},
            {value: "510184", label: "崇州市"},
            {value: "510185", label: "简阳市"}
        ]
    },{
        label:'南京',
        value:'320100',
        children:[
            {value: "320102", label: "玄武区"},
            {value: "320104", label: "秦淮区"},
            {value: "320105", label: "建邺区"},
            {value: "320106", label: "鼓楼区"},
            {value: "320111", label: "浦口区"},
            {value: "320113", label: "栖霞区"},
            {value: "320114", label: "雨花台区"},
            {value: "320115", label: "江宁区"},
            {value: "320116", label: "六合区"},
            {value: "320117", label: "溧水区"},
            {value: "320118", label: "高淳区"}
        ]
    },{
        label:'武汉',
        value:'420100',
        children:[
            {value: "420102", label: "江岸区"},
            {value: "420103", label: "江汉区"},
            {value: "420104", label: "硚口区"},
            {value: "420105", label: "汉阳区"},
            {value: "420106", label: "武昌区"},
            {value: "420107", label: "青山区"},
            {value: "420111", label: "洪山区"},
            {value: "420112", label: "东西湖区"},
            {value: "420113", label: "汉南区"},
            {value: "420114", label: "蔡甸区"},
            {value: "420115", label: "江夏区"},
            {value: "420116", label: "黄陂区"},
            {value: "420117", label: "新洲区"}
        ]
    },{
        label:'天津',
        value:'120000',
        children:[
            {value: "120101", label: "和平区"},
            {value: "120102", label: "河东区"},
            {value: "120103", label: "河西区"},
            {value: "120104", label: "南开区"},
            {value: "120105", label: "河北区"},
            {value: "120106", label: "红桥区"},
            {value: "120110", label: "东丽区"},
            {value: "120111", label: "西青区"},
            {value: "120112", label: "津南区"},
            {value: "120113", label: "北辰区"},
            {value: "120114", label: "武清区"},
            {value: "120115", label: "宝坻区"},
            {value: "120116", label: "滨海新区"},
            {value: "120117", label: "宁河区"},
            {value: "120118", label: "静海区"},
            {value: "120119", label: "蓟州区"}
        ]
    },{
        label:'西安',
        value:'610100',
        children:[
            {value: "610102", label: "新城区"},
            {value: "610103", label: "碑林区"},
            {value: "610104", label: "莲湖区"},
            {value: "610111", label: "灞桥区"},
            {value: "610112", label: "未央区"},
            {value: "610113", label: "雁塔区"},
            {value: "610114", label: "阎良区"},
            {value: "610115", label: "临潼区"},
            {value: "610116", label: "长安区"},
            {value: "610117", label: "高陵区"},
            {value: "610122", label: "蓝田县"},
            {value: "610124", label: "周至县"},
            {value: "610125", label: "户县"}
        ]
    },{
        label:'苏州',
        value:'320500',
        children:[
            {value: "320505", label: "虎丘区"},
            {value: "320506", label: "吴中区"},
            {value: "320507", label: "相城区"},
            {value: "320508", label: "姑苏区"},
            {value: "320509", label: "吴江区"},
            {value: "320581", label: "常熟市"},
            {value: "320582", label: "张家港市"},
            {value: "320583", label: "昆山市"},
            {value: "320585", label: "太仓市"}
        ]
    }
] 
export default hotCity