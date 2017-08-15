<template>
    <div>
        <Header_all person-title="代理登陆" :icon-style="'regis'"></Header_all>
        <div class="form loginon">
            <h1>使用账号密码登录</h1>
            <div class="login-input login-phone">
                <span class="login-tips">账号</span>
                <span class="plaholder">手机号</span>
                <input type="tel"  name="phone" @blur="checkTel" @input="inpEvent">
            </div>
            <div class="login-input login-psw">
                <span class="login-tips">密码</span>
                <span class="plaholder">请输入登录密码</span>
                <input id="passDomLogin" type="password" @blur="checkPassWord" @input="inpEvent" name="password">
                <a href="javascript:;" v-tap="{ methods:showCodeFn}" class="btn eye" :class="{ 'eye-on':showCode ,'eye-off':!showCode }"></a>
            </div>
            <input type="submit" name="submit" value="提交"  v-tap="{ methods:Login}" >
            <a href="#" class="btn" v-tap="{ methods:getPassFn}" >忘记密码</a>
        </div>
    </div>
</template>

<script>
    import Header_all from '~components/header_all.vue'
    export default {
        data(){
            return {
                showCode:false,
            }
        },
        watch: {},
        methods: {
            getPassFn(){
                this.$router.push(`/forgetPass`);
            },
            Login(){
                /* function  登陆拿ck */

            },
            showCodeFn(e){
                /* 显示隐藏密码 */
                if(this.showCode){
                    document.getElementById('passDomLogin').setAttribute('type','password')
                }else{
                    document.getElementById('passDomLogin').setAttribute('type','text')
                }
                this.showCode = !(this.showCode)
            },
            inpEvent(e){
                if(e.target.value !=''){
                    e.target.previousElementSibling.style.display = 'none';
                } else{
                    e.target.previousElementSibling.style.display = 'block';
                }
                if(e.target.name === 'phone'){
                    if(e.target.value.length >11){
                        e.target.value = e.target.value.slice(0,11)
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
                            message : '密码有误，请重新输入'
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
                    if(! ( tel_reg.test( e.target.value) ) ){
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
        components:{
            Header_all
        },
        mounted(){

        }
    }
</script>
<style>

</style>
