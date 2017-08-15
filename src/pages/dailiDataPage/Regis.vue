<template>
    <div>
        <Header_all person-title="代理注册" :icon-style="'login'"></Header_all>
        <div class="main">
            <div class="form reg-form">
                <h2 class="use-msg">账号信息</h2>
                <div class="reg-input reg-phone">
                    <span class="prompt">*</span>
                    <span class="tips">11位手机号码，限中国大陆</span>
                    <input type="tel" v-model="telNumber" @input="inpEvent" @blur="checkTel" name="phone" required>
                </div>
                <div class="reg-input reg-check">
                    <span class="prompt">*</span>
                    <span class="tips">4位验证码</span>
                    <input type="text" @input="inpEvent" v-model="telCode" name="check" required>
                    <a href="javascript:;"  v-tap="{ methods:sendCodeFn }" class="btn seng-code" :class="{'unable':telNumber ==='' || addUnable}">{{ countDownStr }}</a>
                </div>
                <div class="reg-input reg-pasw">
                    <span class="prompt">*</span>
                    <span class="tips">设置登录密码</span>
                    <input type="password" v-model="userPassWord" id="passDom" @blur="checkPassWord" @input="inpEvent" name="password" required>
                    <a href="javascript:;" v-tap="{ methods:showCodeFn}" class="btn eye" :class="{ 'eye-on':showCode ,'eye-off':!showCode }"></a>
                </div>
                <h2 class="rebate-msg">返佣信息</h2>
                <div class="reg-input reg-name">
                    <span class="prompt">*</span>
                    <span class="tips">真实姓名</span>
                    <input type="text" @input="inpEvent" v-model="userName" name="name" required>
                </div>
                <div class="reg-input reg-alipay">
                    <span class="prompt">*</span>
                    <span class="tips">支付宝账号，不可修改</span>
                    <input type="text" @input="inpEvent" v-model="alipayName" name="alipay" required>
                </div>
                <div class="reg-input reg-qq">
                    <span class="prompt">*</span>
                    <span class="tips">QQ</span>
                    <input type="text" @input="inpEvent"  v-model="qqNumber" name="qq" required>
                </div>
                <div class="protocol">
                    <input type="checkbox" v-model="confirmbox">
                    <span>18岁以上，且同意</span>
                    <a v-tap="{ methods:goPageFn, target : 'protocol' }">《代理合作协议》</a>
                </div>
                <input type="submit" v-tap="{ methods:sendSubmit}" value="提交" name="submit" key="sub2" v-if="confirmbox">
                <input type="submit" value="提交" name="submit" key="sub1"  class="unsubmit" v-else>
                <p class="check-time">3个工作日内完成审核</p>
                <p class="contact-us">如需帮助请联系客服QQ : 3157085145</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui'
    import Header_all from '~components/header_all.vue'
    export default {
        data(){
            return {
                telNumber:'',
                telCode:'',
                userPassWord:'',
                userName:'',
                alipayName:'',
                qqNumber:'',
                showCode:false,
                codeType:'password',
                confirmbox:false,
                countDownStr:'发送验证码',
                addUnable:false,
            }
        },
        components:{
            Header_all
        },
        methods: {
            sendSubmit(){
                let sendData = null;
                /* 提交 */
                if(this.telNumber===''){
                    this.$store.dispatch('showToast', {
                        duration : 1000,
                        message : '请输入手机号'
                    });
                    return false;
                }else if(this.telCode===''){
                    this.$store.dispatch('showToast', {
                        duration : 1000,
                        message : '请输入4位验证码'
                    });
                    return false;
                }else if(this.userPassWord===''){
                    this.$store.dispatch('showToast', {
                        duration : 1000,
                        message : '请设置6~12位数字、字母组合密码'
                    });
                    return false;
                }else if(this.userName===''){
                    this.$store.dispatch('showToast', {
                        duration : 1000,
                        message : '请输入姓名'
                    });
                    return false;
                }else if(this.alipayName===''){
                    this.$store.dispatch('showToast', {
                        duration : 1000,
                        message : '请输入支付宝账号'
                    });
                    return false;
                }else if(this.qqNumber===''){
                    this.$store.dispatch('showToast', {
                        duration : 1000,
                        message : '请输入qq号'
                    });
                    return false;
                }
                /* 提交数据 */
                sendData =  Object.assign({},{ tel:this.telNumber , code:this.telCode , password:this.userPassWord ,
                    userName:this.userName , alipayName:this.alipayName, qq:this.qqNumber});
                console.log(sendData);
                /* function  */
            },
            goPageFn ({ target }) {
                target = target || '';
                switch (target) {
                    case 'protocol':
                        _hmt.push(['_trackEvent', '代理注册页合作协议点击', 'click', '代理注册页合作协议']);
                        this.$router.push(`/protocol`);
                        break;
                    case 'login':
                        _hmt.push(['_trackEvent', '代理注册页登陆点击', 'click', '代理注册页登陆']);
                        this.$router.push(`/login`);
                        break;
                    case 'backHistory':
                        window.history.back();
                        break
                }
            },
            showCodeFn(){
                if(this.showCode){
                    document.getElementById('passDom').setAttribute('type','password')
                }else{
                    document.getElementById('passDom').setAttribute('type','text')
                }
                this.showCode = !(this.showCode)
            },
            sendCodeFn(){
                if(this.telNumber === ''){ return false; }
                let tel_reg = /^1[34578]\d{9}$/;
                if( tel_reg.test( this.telNumber ) ){
                    let codeTime = 10;
                    let times = null;
                    if( this.countDownStr !=='发送验证码' ){
                        return false;
                    }
                    this.countDownStr = '重发（'+ codeTime +'s）';
                    this.addUnable = true;
                    /* function   请求code  */
                    times = setInterval(()=>{
                        codeTime = codeTime -1;
                        if(codeTime === 0){
                            this.countDownStr = '发送验证码';
                            this.addUnable = false;
                            codeTime = 10;
                            clearInterval(times);
                        }else{
                            this.countDownStr = '重发（'+ codeTime +'s）';
                            this.addUnable = true;
                        }
                    },1000)

                }else{
                    this.$store.dispatch('showToast', {
                        duration : 1000,
                        message : '请输入正确的手机号'
                    })
                }
            },
            inpEvent(e){
                if(e.target.value !=''){
                    e.target.previousElementSibling.style.display = 'none';
                } else{
                    e.target.previousElementSibling.style.display = 'block';
                }
                if(e.target.name === 'check'){
                    if(e.target.value.length >4){
                        e.target.value = e.target.value.slice(0,4)
                    }
                }
            },
            checkPassWord(e){
                let pass_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                if(e.target.value !=''){
                    e.target.previousElementSibling.style.display = 'none';
                    if(! ( pass_reg.test( e.target.value)) ){
                        this.$store.dispatch('showToast', {
                            duration : 1000,
                            message : '请设置6~12位数字、字母组合密码'
                        })
                    }
                } else{
                    e.target.previousElementSibling.style.display = 'block';
                }
            },
            checkTel(e){
                let tel_reg = /^1[34578]\d{9}$/;
                if(e.target.value !=''){
                    e.target.previousElementSibling.style.display = 'none';
                    if( tel_reg.test( e.target.value) ){
                        console.log('手机号输入正确')
                    }else{
                        this.$store.dispatch('showToast', {
                            duration : 1000,
                            message : '请输入正确的手机号'
                        })
                    }
                } else{
                    e.target.previousElementSibling.style.display = 'block';
                }
            },

        },
        computed: {
        },
        mounted(){
            /* 模拟提交 */

/*            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            setTimeout(()=>{
                Indicator.close();
                this.$store.dispatch('showToast', {
                    duration : 1000,
                    message : '提交成功',
                    cb:()=>{
                        this.$router.push(`/registerMsg`);
                    }
                })
            },2000);  */

            console.log(this.telNumber)
        }
    }
</script>
<style>

</style>
