<template>
    <div class="top">
        <a href="javascript:;" class="btn font0 back"  v-tap="{ methods:goBackFn, params : 'back' }">返回</a>
        <a href="javascript:;" class="btn login" :class="{'user':showUserIcon ,'home':showHomeIcon ,'payList':showPayListIcon ,'date-rebate':showRebate}" v-tap="{ methods:jumpToPage }">{{ rightTitle }}</a>
        <span class="data-tips" v-if="showRebate">{{ timeTitle }}</span>
        <h1>{{ personTitle }}</h1>
    </div>
</template>
<script>
    export default {
        props:['personTitle','iconStyle','timeTitle'],
        data () {
            return {
                rightTitle:'',
                showUserIcon:false,
                showHomeIcon:false,
                showPayListIcon:false,
                showRebate:false
            }
        },
        methods: {
            goBackFn ({ params }) {
                switch (params ) {
                case 'login':
                    this.$router.push(`/my/betlist`);
                    break;
                case 'regis':
                    this.$router.push(`/my/charge`);
                    break;
                case 'goLand':
                    /*  */
                    alert('跳转落地页');
                    break;
                case 'back':
                    window.history.back() ;
                    break;
                }
            },
            jumpToPage () {
                switch (this.iconStyle) {
                    case 'login':
                        this.$router.push(`/login`);
                        break;
                    case 'regis':
                        this.$router.push(`/register`);
                        break;
                    case 'userMsg':
                        this.$router.push(`/mymsg`);
                        break;
                    case 'myhome':
                        this.$router.push(`/myhome`);
                        break;
                    case 'myHomeApplyList':
                        this.$router.push(`/myHomeApplyList`);
                        break;
                    case 'dateRebate':
                        /* 显示日历 */
                        this.$store.commit('setCalendar',new Date().getTime());
                        break;
                    default:window.history.back() ;
                }
            },
            imgOnError (that) {
                that.target.setAttribute('src', 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png')
            },

        },
        computed: {
            showCalendar(){
                return this.$store.state.myHomeObj.showCalendar
            }
        },
        mounted () {
            if( this.iconStyle === 'login' ){
                this.rightTitle = '登录'
            }else if( this.iconStyle === 'regis' ){
                this.rightTitle = '注册'
            } else if( this.iconStyle === 'userMsg' ){
                this.showUserIcon = true;
            }else if( this.iconStyle === 'myhome' ){
                this.showHomeIcon = true;
            }else if( this.iconStyle === 'myHomeApplyList' ){
                this.showPayListIcon = true;
            } else if( this.iconStyle === 'dateRebate'){
                this.showRebate = true;
            }
        },
        filters: {
            format: (num) => {
                num = Number(num);
                if (num < 10000) {
                    return num
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 10) / 10 + '万'
                } else {
                    return Math.round(num / 100000000 * 10) / 10 + '亿'
                }
            }
        }
    }
</script>
<style>
    .home,.payList{
        padding: 0 !important;
    }

</style>
