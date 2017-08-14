<template>
    <div class="forget-psw">
        <div class="forget-one">
            <div class="forget-input forget-phone">
                <span class="forget-tips"></span>
                <span class="forget-placehold">手机号码</span>
                <input type="text" name="phone">
            </div>
            <div class="forget-input forger-code">
                <span class="forget-tips"></span>
                <span class="forget-placehold">短信验证码</span>
                <a href="javascript:;" class="btn seng-code ">获取验证码</a>
            </div>
        </div>
        <a href="javascript:;" class="btn forget-next">下一步</a>
        <div class="forget-two">
            <div class="forget-input forget-password">
                <span class="forget-tips"></span>
                <span class="forget-placehold">设置登录密码，6～12位</span>
                <input type="text" name="my-psw">
                <a href="javascript:;" class="btn eye eye-off"></a>
            </div>
        </div>
        <a href="javascript:;" class="btn forget-sure">确认</a>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui'
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                value1: '',
                value2: '',
            };
        },
        watch: {},
        methods: {
            showTips(){
                Indicator.open({
                    spinnerType: 'fading-circle'
                });
            },
            showAlert(){
                MessageBox('提示', '操作成功');
            },
        },
        computed: {},
        mounted(){

        }
    }
</script>
<style>
</style>
