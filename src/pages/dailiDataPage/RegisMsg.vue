<template>
    <div>
        <Header_all person-title="注册信息" :icon-style="'goLand'"></Header_all>
        <div class="form regMsg-form">
            <div class="reg-msg user-phone">
                <span>帐号：</span>
                <p>188****5186</p>
            </div>
            <p class="com-msg">返佣信息</p>
            <div class="reg-msg user-name">
                <span>姓名：</span>
                <p>testtesttesttesttesttesttesttesttesttesttesttesttesttesttest</p>
            </div>
            <div class="reg-msg user-id">
                <span>身份证：</span>
                <p>444456444456444456444456444456444456444456444456444456444456</p>
            </div>
            <div class="user-line"></div>
            <div class="reg-msg user-alipay">
                <span>支付宝：</span>
                <p>68*****90@qq.com68*****90@qq.com68*****90@qq.com</p>
            </div>
            <div class="reg-msg user-qq">
                <span>QQ：</span>
                <p>699699699699699699699699699699699</p>
            </div>
            <a href="#" class="btn protocol2" v-tap="{ methods:goPageFn, target : 'protocol' }">《代理合作协议》</a>
            <a href="javascript:;" class="btn check-refuse">审核不通过</a>
            <!--<a href="javascript:;" class="btn check-ing">审核中</a>-->
            <!--<a href="javascript:;" class="btn check-agree">审核通过</a>-->
            <p class="notice"></p>
            <p class="notice">*3个工作日内完成，审核成功将短信通知您</p>
            <p class="notice">*可使用帐号登录查看审核进程</p>
            <p class="contact-us">如需帮助请联系客服QQ : 3157085145</p>
        </div>
    </div>
</template>

<script>
    import Header_all from '~components/header_all.vue'
    export default {
        data(){
            return {
                title: ''
            }
        },
        watch: {},
        methods: {
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
        },
        computed: {},
        components:{
            Header_all
        },
        mounted(){
            /* function  请求用户信息 */
        }
    }
</script>
<style>
</style>
