<template>
    <div>
        <Header_all></Header_all>
        <div class="main">
            <div class="form reg-form">
                <h2 class="use-msg">账号信息</h2>
                <div class="reg-input reg-phone">
                    <span class="prompt">*</span>
                    <span class="tips">11位手机号码，限中国大陆</span>
                    <input type="text" v-model="telNumber" @input="inpEvent" @blur="checkTel" name="phone" required>
                </div>
                <div class="reg-input reg-check">
                    <span class="prompt">*</span>
                    <span class="tips">4位验证码</span>
                    <input type="text" @input="inpEvent" name="check" required>
                    <a href="javascript:;" v-tap="{ methods:sendCodeFn }" class="btn seng-code" :class="{'unable':telNumber ===''}">发送验证码</a>
                </div>
                <div class="reg-input reg-pasw">
                    <span class="prompt">*</span>
                    <span class="tips">设置登录密码</span>
                    <input type="password" id="passDom" @input="inpEvent" name="password" required>
                    <a href="javascript:;" v-tap="{ methods:showCodeFn}" class="btn eye" :class="{ 'eye-on':showCode ,'eye-off':!showCode }"></a>
                </div>
                <h2 class="rebate-msg">返佣信息</h2>
                <div class="reg-input reg-name">
                    <span class="prompt">*</span>
                    <span class="tips">真实姓名</span>
                    <input type="text" @input="inpEvent"  name="name" required>
                </div>
                <div class="reg-input reg-alipay">
                    <span class="prompt">*</span>
                    <span class="tips">支付宝账号，不可修改</span>
                    <input type="text" @input="inpEvent" name="alipay" required>
                </div>
                <div class="reg-input reg-qq">
                    <span class="prompt">*</span>
                    <span class="tips">QQ</span>
                    <input type="text" @input="inpEvent" name="qq" required>

                </div>
                <div class="protocol">
                    <input type="checkbox" v-model="confirmbox">
                    <span>18岁以上，且同意</span>
                    <a v-tap="{ methods:goPageFn, target : 'protocol' }">《代理合作协议》</a>
                </div>
                <input type="submit" value="提交" name="submit" :class="{ 'unsubmit':confirmbox }">
                <p class="check-time">3个工作日内完成审核</p>
                <p class="contact-us">如需帮助请联系客服QQ : 3157085145</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Header_all from '~components/header.vue'
    export default {
        data(){
            return {
                title: '',
                telNumber:'',
                showCode:false,
                codeType:'password',
                showPassword:false,
                confirmbox:false,
            }
        },
        components:{
            Header_all
        },
        methods: {
            goPageFn ({ target }) {
                target = target || '';
                switch (target) {
                    case 'protocol':
                        _hmt.push(['_trackEvent', '代理注册页合作协议点击', 'click', '代理注册页合作协议']);
                        this.$router.push(`/protocol`);
                        break
                    case 'login':
                        _hmt.push(['_trackEvent', '代理注册页登陆点击', 'click', '代理注册页登陆'])
                        this.$router.push(`/login`)
                        break
                    case 'backHistory':
                        window.history.back()
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
                    /* 请求code */
                    console.log('手机号输入正确')
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
            changeType(e){
                if(!this.showPassword){
                    document.getElementById('passDom').setAttribute('type','text');
                    this.showPassword = true
                }else{
                    document.getElementById('passDom').setAttribute('type','password');
                    this.showPassword = false
                }
            },

        },
        computed: {
            
        },
        mounted(){
            console.log(this.telNumber)
        }
    }
</script>
<style>

</style>
