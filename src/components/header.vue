<template>
    <div class="top">
        <a href="javascript:;" class="btn font0 back">返回</a>
        <a href="#" class="btn login">登录</a>
        <h1>代理注册</h1>
    </div>
</template>

<script>

    export default {
        props:['PersonTitle','IconStyle'],
        data () {
            return {
                title: '',
                noPoint:true,
            }
        },
        methods: {
            showDraw ({item}) {
            },
            enterMy ({params}) {
                switch (params) {
                case 'betlist':
                    this.$router.push(`/my/betlist`)
    
                    break
                case 'charge':
                    this.$router.push(`/my/charge`)
    
                    break
                case 'message':
                    this.$router.push(`/my/msg`)
    
                    break
                case 'gobackHome':
                    this.$router.push(`/h5/home/hot`)
    
                    break
                case 'charge_nopush':
                    this.$router.replace(`/my/charge`)
                    break
                case 'backHistory':
                    window.history.back()
                    break
                }
            },
            imgOnError (that) {
                that.target.setAttribute('src', 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png')
            },
            showTapLi ({item, param}) {

            }
        },
        computed: {

        },
        mounted () {
        },
        filters: {
            format: (num) => {
                num = Number(num)
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
