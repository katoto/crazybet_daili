<template>
    <div class="top">
        <a href="javascript:;" class="btn font0 back"  v-tap="{ methods:goBackFn, params : 'back' }">返回</a>
        <a href="#" class="btn login"  v-tap="{ methods:jumpToPage }">{{ rightTitle }}</a>
        <h1>{{ personTitle }}</h1>
    </div>
</template>
<script>
    export default {
        props:['personTitle','iconStyle'],
        data () {
            return {
                rightTitle:'',
            }
        },
        methods: {
            goBackFn ({ params }) {
                switch (params ) {
                case 'login':
                    this.$router.push(`/my/betlist`)
    
                    break
                case 'regis':
                    this.$router.push(`/my/charge`)
    
                    break
                case 'back':
                    window.history.back() ;
                    break;
                }
            },
            jumpToPage () {
                switch (this.iconStyle) {
                    case 'login':
                        this.$router.push(`/login`);

                        break
                    case 'regis':
                        this.$router.push(`/register`);

                        break
                    default:window.history.back() ;
                }
            },
            imgOnError (that) {
                that.target.setAttribute('src', 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png')
            },

        },
        computed: {

        },
        mounted () {
            if( this.iconStyle === 'login' ){
                this.rightTitle = '登录'
            }else if( this.iconStyle === 'regis' ){
                this.rightTitle = '注册'
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
</style>
