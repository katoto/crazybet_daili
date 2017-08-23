<template>
    <div>
        <div class="bg-coop">
            <a href="javascript:;" class="to-reg btn font0" v-tap="{ methods:jumpToPage,go:'regis'}">立即加盟</a>
            <div class="coop-tips">
                <p>已经是合伙人</p>
                <a href="javascript:;" class="btn to-login" v-tap="{ methods:jumpToPage,go:'login'}">登录</a>
                <p>&gt</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Header_all from '~components/header_all.vue'
    export default {
        data () {
            return {
            }
        },
        computed: {
        },
        methods: {
            jumpToPage({ go }){
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                scrollTop = 0;
                go = go || '';
                switch (go) {
                    case 'regis':
                        _hmt.push(['_trackEvent', '代理落地页立即加盟点击', 'click', '代理落地页立即加盟点击']);
                        this.$router.push(`/register`);
                        break;
                    case 'login':
                        _hmt.push(['_trackEvent', '代理落地页登陆点击', 'click', '代理注册页登陆']);
                        this.$router.push(`/login`);
                        break;
                    case 'backHistory':
                        window.history.back();
                        break
                }
            }
        },
        components: {
            Header_all
        },

    }
</script>
<style scoped>
    html{
        height:auto;
        background: #0e0028;
    }
</style>
