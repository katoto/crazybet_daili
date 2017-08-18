<template>
    <div class="inquire regMsg-form">
        <Header_all person-title="个人信息" :icon-style="''"></Header_all>
        <div class="main-mymsg" v-if="userInfo">
           <div class="reg-msg user-phone">
               <span>帐号：</span>
               <p>{{ userInfo.mobile }}</p>
           </div>
           <div class="reg-msg user-proxy">
               <span>代理号：</span>
               <p>{{ userInfo.share_code }}</p>
           </div>
           <p class="com-msg">返佣信息</p>
           <div class="reg-msg user-name">
               <span>姓名：</span>
               <p>{{ userInfo.username }}</p>
           </div>
           <div class="reg-msg user-id">
               <span>身份证：</span>
               <p>{{ userInfo.idcard }}</p>
           </div>
           <div class="user-line"></div>
           <div class="reg-msg user-alipay">
               <span>支付宝：</span>
               <p>{{ userInfo.alipay }}</p>
           </div>
           <div class="reg-msg user-qq">
               <span>QQ：</span>
               <p>{{ userInfo.qq }}</p>
           </div>
        </div>
        <a href="#" class="btn protocol2" v-tap="{ methods: jumpToPage,go: 'protocol' }">《代理合作协议》</a>
        <p class="contact-us">如需帮助请联系客服QQ : 3157085145</p>
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
            jumpToPage({ go }){
                switch ( go ) {
                    case 'protocol':
                        this.$router.push(`/protocol`);
                        break;
                    case 'myHomePayApply':
                        this.$router.push(`/myHomePayApply`);
                        break;
                    case 'back':
                        window.history.back() ;
                        break;
                }
            },
        },
        components:{
            Header_all
        },
        computed: {
            userInfo(){
                return this.$store.state.userInfo;
            }
        },
        mounted(){
            this.$store.dispatch('getUserInfo')
        }
    }
</script>
<style>
</style>
