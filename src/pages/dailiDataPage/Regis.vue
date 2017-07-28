<template>
    <div>
        <p>啦啦啦阿拉fsdfdsfsdf拉阿里</p>
        <input type="tel" placeholder="11位手机号，限中国大陆" maxlength="11" @blur="checkTel">
        <input type="password" placeholder="设置登录密码，6~12位" id="passDom">
        <button  @click="changeType" >点击显示密码</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                title: '',
                showPassword:false,
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
        computed: {
            
        },
        mounted(){

        }
    }
</script>
<style>
    input{
        border: 1px solid #000;
    }
    p{
        font-size: 0.42rem;
    }
</style>
