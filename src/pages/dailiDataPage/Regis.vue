<template>
    <div>
        <div class="main">
            <div class="form reg-form">
                <h2 class="use-msg">账号信息</h2>
                <div class="reg-input reg-phone">
                    <span class="prompt">*</span>
                    <span class="tips">11位手机号码，限中国大陆</span>
                    <input type="text" name="phone" required>
                </div>
                <div class="reg-input reg-check">
                    <span class="prompt">*</span>
                    <span class="tips">4位验证码</span>
                    <input type="text" name="check" required>
                    <a href="javascript:;" class="btn seng-code unable">发送验证码</a>
                </div>
                <div class="reg-input reg-pasw">
                    <span class="prompt">*</span>
                    <span class="tips">设置登录密码</span>
                    <input type="text" name="password" required>
                    <a href="javascript:;" class="btn eye eye-off"></a>
                </div>
                <h2 class="rebate-msg">返佣信息</h2>
                <div class="reg-input reg-name">
                    <span class="prompt">*</span>
                    <span class="tips">真实姓名</span>
                    <input type="text" name="name" required>
                </div>
                <div class="reg-input reg-alipay">
                    <span class="prompt">*</span>
                    <span class="tips">支付宝账号，不可修改</span>
                    <input type="text" name="alipay" required>
                </div>
                <div class="reg-input reg-qq">
                    <span class="prompt">*</span>
                    <span class="tips">QQ</span>
                    <input type="text" name="qq" required>
                </div>
                <div class="protocol">
                    <input type="checkbox">
                    <span>18岁以上，且同意</span>
                    <a href="protocol.html">《代理合作协议》</a>
                </div>
                <input type="submit" value="提交">
                <p class="check-time">3个工作日内完成审核</p>
                <p class="contact-us">如需帮助请联系客服QQ : 3157085145</p>
            </div>
        </div>
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

</style>
