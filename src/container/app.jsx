import React from 'react'
import appcss from '@/container/app.scss'
import axios from 'axios'
import {Toast} from 'antd-mobile'
import {saveUserInfo,asyncGetPersonSet} from '@/redux/action'
import Login from '@/components/login'
import {register,login} from '@/api'
import {connect} from 'react-redux'
axios.defaults.withCredentials = true;
@connect(state=>({state}),{saveUserInfo,asyncGetPersonSet})
class App extends React.Component{
    constructor(){
        super();
        this.state = {
            hasError:false,
            username:'',
            pwd:'',
            fourcode:[],//四位验证码
            showfourcode:false,//显示验证码
            ifcheckcode:false,//是否验证成功
            showRegister:false,//控制注册div渲染
            roles:{
                role:[{
                    label:'老板',
                    value:'boss'
                },{
                    label:'牛人',
                    value:'worker'
                }],
                },
            selectRole:'worker'//选择的角色
            }
        this.birthcode = this.birthcode.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangePwd =  this.onChangePwd.bind(this)
        this.showbirthcode = this.showbirthcode.bind(this)
        this.checkcode = this.checkcode.bind(this)
    }
    // 手机号验证
    onChange(value){
             if (value.replace(/\s/g, '').length < 11) {
                    this.setState({
                        hasError: true,
                    });
                    } else {
                    this.setState({
                        hasError: false,
                    });
                    }
                    this.setState({
                    username:value,
                });  
                
      }
      onChangePwd(value){
        this.setState({
            pwd:value,
        });
      }
    //随机生成四位验证码
    birthcode(){
            let code = [1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h',
            'i','j','k','l','m','n','o','p','q','r','s','t','x','y','z'];
            let codes = 4;
            let fourcode  = [];
            for(let i = 0;i<codes;i++){
                fourcode.push(code[Math.floor(Math.random() * (code.length-1))]);
                this.setState({
                    fourcode
                })
            }
            this.setState({
                ifcheckcode:true
            })
    }
    // 显示验证码
    showbirthcode(){
        this.setState({
            showfourcode:true
        })
    }
    //校验验证码
    checkcode(value){
        console.log(value);
        console.log(this.state.fourcode);
        if(value.length === 4){
            this.state.fourcode.join('') === value ? (
                this.setState({
                    ifcheckcode:false
                })
            ): (
                this.setState({
                    ifcheckcode:true
                })
            )
        }else{
            this.setState({
                ifcheckcode:true
            }) 
        }
    }
    // 点击注册，显示注册视图
    onRegister(type){
        this.setState({
            showRegister:type
        });
        if(type){
            this.setState({
                showfourcode:false,
                ifcheckcode:true
            })
        }else{
            this.setState({
                ifcheckcode:false
            }) 
        }
    }
    //角色改变触发
    roleChange(value){
        this.setState({
            selectRole:value
        })
    }
    // 注册新用户。登录
    registerUser(){
        // 注册
            const {username,pwd,selectRole} = this.state;
            if(username === '' || pwd === ''){
                Toast.fail('请输入用户名或密码', 1);
            }else{
                const user = {
                    username,
                    pwd,
                    type:selectRole
                    }
                console.log(user);
                if(this.state.showRegister){
                    axios.post(register,user).then(res=>{
                        console.log(res.data);
                        if(res.data.code === 1){
                            Toast.success('注册成功,去登录...', 2,()=>{
                                this.setState({
                                    showRegister:false,
                                    pwd:''
                                });
                            }); 
                        }else{
                            Toast.fail('该用户已存在', 1);
                        }
                    })
                    .catch(err=>{
                        Toast.fail('网络错误', 1);
                    })
                }else{
                    // 登录
                    axios.post(login,user).then(res=>{
                        console.log(res.data);
                        if(res.data.code === 1){
                            Toast.loading('登录成功',0);
                            //localStorage保存用户名和密码
                            localStorage.setItem('loginInfo',JSON.stringify({username,pwd}))
                            this.timer = setTimeout(()=>{
                                Toast.hide();
                                const saveUserInfo_= this.props.saveUserInfo;
                                // 保存登录信息
                                saveUserInfo_(res.data.info);
                                if(!res.data.info.name){
                                    //未填写用户信息的去信息页
                                    this.props.history.replace({pathname:'/info',state:{from:'login'}});
                                }else{
                                    this.props.history.replace('/boss');
                                }    
                            },1000)
                        }else{
                            switch(res.data.status){
                                case 'id_err':
                                    Toast.fail('身份错误',1.5);
                                        break;
                                case 'pwd_err':
                                    Toast.fail('密码错误',1.5);
                                        break;
                                case 'user_notfound':
                                    Toast.fail('用户不存在',1.5);
                                        break;
                                    default:
                                    Toast.fail('未知错误',1.5);
                                        return;   
                            }
                        }
                    })
                } 
        }
    }
    componentDidMount(){
        console.log(this.props)
        ;if(localStorage.getItem('loginInfo')){
            let {username,pwd} = JSON.parse(localStorage.getItem('loginInfo'));
            this.setState({
                username,
                pwd
            })
        }
    }
    componentWillUnmount(){
        clearTimeout(this.timer);
        Toast.hide();
    }
    render(){
        // console.log(this.props)
        return (
            <div className = {appcss.app+' pagebox'}>
                <h3>Boss招聘平台</h3>
                <div className={appcss.form}>
                  <Login {...this.state}  
                  roleChange = {(value)=>this.roleChange(value)}
                  registerUser  = {()=> this.registerUser()}
                  onChangePwd = {(value)=> this.onChangePwd(value)}
                  onChange = {(value)=> this.onChange(value)}
                  birthcode = {this.birthcode}
                  checkcode = {(value)=> this.checkcode(value)}
                  showbirthcode = {this.showbirthcode}
                  />
                </div>
                {
                    this.state.showRegister ? (
                        <p className={appcss.register} onClick  ={()=>this.onRegister(false)}>已有账号，去登录</p>
                    ):(<p className={appcss.register} onClick  ={()=>this.onRegister(true)}>还没有账号？去注册</p>)
                }
                
            </div>
        )
    }
}
export default App;