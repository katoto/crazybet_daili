<template>
    <div>
        <p>注册页面</p>

        <mt-field label="手机号" placeholder="请输入手机号" :maxlength="11" @blur="checkTel" state="success" type="tel"></mt-field>
        <mt-field label="密码" placeholder="设置登录密码，6~12位"  id="passDom" v-bind:disableClear=pickerValue type="password"></mt-field>

        <mt-field label="验证码" >
            <img src="" height="45px" width="100px">
        </mt-field>

        <button  @click="changeType" >点击显示密码</button>


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
