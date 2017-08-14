<template>
    <div class="form loginon">
        <h1>使用账号密码登录</h1>
        <div class="login-input login-phone">
            <span class="login-tips">账号</span>
            <span class="plaholder">手机号</span>
            <input type="text" name="phone">
        </div>
        <div class="login-input login-psw">
            <span class="login-tips">密码</span>
            <span class="plaholder">请输入登录密码</span>
            <input type="password" name="password">
            <a href="javascript:;" class="btn eye eye-off"></a>
        </div>
        <input type="submit" name="submit" value="提交">
        <a href="#" class="btn">忘记密码</a>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                title: '',
                pickerValue:false
            }
        },
        watch: {},
        methods: {
            checkTel(e){
                let tel_reg = /^1[34578]\d{9}$/;
                if( tel_reg.test( e.target.value) ){
                    console.log('手机号输入正确')
                }else{
                }
            },
            changeType(e){
                if(!this.showPassword){
                    document.getElementById('passDom').setAttribute('type','text')
                    this.showPassword = true
                }else{
                    document.getElementById('passDom').setAttribute('type','password')
                    this.showPassword = false
                }
            },
        },
        computed: {},
        mounted(){

        }
    }
</script>
<style>

</style>
