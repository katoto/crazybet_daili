<template>
        <section class="brand">
            <div class="link">
                <a  v-tap="{methods:goDownLandPage,params:'helpPage'}">帮助中心</a>
                <a  v-tap="{methods:goDownLandPage,params:'crazyPage'}">下载疯狂猜球</a>
            </div>
        </section>
</template>

<script>
    export default {
        data () {
            return {
                title: ''
            }
        },
        watch: {},
        methods: {
            goDownLandPage ({params}) {
                switch (params) {
                case 'crazyPage':
                    var u = window.navigator.userAgent.toLowerCase(),
                        isAndroid = u.indexOf('android') > -1 || u.indexOf('linux') > -1
                    if (isAndroid) {
                        if (window.qqsdApp) {
                            qqsdApp.invoke('link', {url: 'http://download.choopaoo.com/download/cbet_for_Android_500cpH5.apk', type: '1'})
                        }
                    } else {
                        if (window.qqsdApp) {
                            qqsdApp.invoke('link', {url: 'https://at.umeng.com/uKrSPn?cid=481', type: '1'})
                        }
                    }

                    break
                case 'helpPage':
                    this.$router.push('/help')
                    break
                }
            }
        },
        computed: {},
        mounted () {

        }
    }
</script>
<style>
</style>
