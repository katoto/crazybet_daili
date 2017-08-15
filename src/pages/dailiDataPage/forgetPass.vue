<template>
    <div>
        <Header_all :person-title="headerTitle" :icon-style="''"></Header_all>
        <div class="forget-psw">
            <div class="forget-one" v-if="!setPassWord">
                <div class="forget-input forget-phone">
                    <span class="forget-tips"></span>
                    <span class="forget-placehold">手机号码</span>
                    <input type="tel" v-model="telNumber" name="phone" @input="inpEvent" @blur="checkTel">
                </div>
                <div class="forget-input forger-code">
                    <span class="forget-tips"></span>
                    <span class="forget-placehold">短信验证码</span>
                    <input type="text"  @input="inpEvent" name="check" required>
                    <a href="javascript:;" class="btn seng-code " :class="{'unable':telNumber ===''}">获取验证码</a>
                </div>
            </div>
            <div class="forget-two" v-else>
                <div class="forget-input forget-password">
                    <span class="forget-tips"></span>
                    <span class="forget-placehold">设置登录密码，6～12位</span>
                    <input type="text" id="againSetPassDom" @input="inpEvent" name="my-psw" @blur="checkPassWord">
                    <a href="javascript:;" v-tap="{ methods:showCodeFn}" class="btn eye" :class="{ 'eye-on':showCode ,'eye-off':!showCode }"></a>
                </div>
            </div>
            <a href="javascript:;" class="btn forget-next" v-tap="{ methods:forgetNext}"  v-if="!setPassWord">下一步</a>
            <a href="javascript:;" class="btn forget-sure" v-tap="{ methods:againConfirm}"  v-else>确认</a>
        </div>
    </div>
</template>

<script>
    /* 切看返回是否合适 */
    import {Indicator} from 'mint-ui'
    import Header_all from '~components/header_all.vue'

    export default {
        data() {
            return {
                telNumber:'',
                setPassWord:true,
                showCode:false,
            };
        },
        methods: {
            forgetNext(){
                /* 下一步  function */

            },
            againConfirm(){
                /* 确认  function */
            },
            showCodeFn(){
                if(this.showCode){
                    document.getElementById('againSetPassDom').setAttribute('type','password')
                }else{
                    document.getElementById('againSetPassDom').setAttribute('type','text')
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

            /*  是否有个小圆点 */
            showTips(){
                Indicator.open({
                    spinnerType: 'fading-circle'
                });
            },

        },
        computed: {
            headerTitle(){
                if(this.setPassWord){
                    return '重置密码';
                }else{
                    return '找回密码';
                }
            }
        },
        components:{
            Header_all
        },
        mounted(){
            this.setPassWord = false;
//            setTimeout(()=>{
//                this.setPassWord = true
//            },1000)
        }
    }
</script>
<style>
</style>
