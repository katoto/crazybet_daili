<template>
    <section class="listWrap respon2-itm">
        <div class="full-scroll">
            <router-view></router-view>
            <!-- 底部banner -->
            <common-footer></common-footer>
        </div>
    </section>
</template>
<script>
    import {mutationTypes} from '~store/home'
    import {stopHtml} from '~common/util'
    import CommonFooter from '~components/common-footer.vue'

    export default {
        data () {
            return {
                currentNav: 'noEnd'
            }
        },
        components: {
            CommonFooter
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            },
            hasLogin () {
                return !!this.$store.state.ck
            }
        },
        mounted () {
            if (this.$route.fullPath && ~this.$route.fullPath.indexOf('end')) {
                this.nav({params: 'end'})
            }

//            setTimeout(()=>{
//                window.qqsdApp.datachanged = function () {
//                alert(444)
//            }
//            },0)

//            setTimeout(()=>{
//                window.qqsdApp.datachanged = function () {
//                    alert(444)
//                }
//            },380)
//
//            setTimeout(()=>{
//                alert(window.qqsdApp)
//                alert(window.qqsdApp.datachanged)
//            },5000)




        },
        methods: {
            nav ({params}) {
                this.currentNav = params
                this.$store.commit(mutationTypes.currentBetSelect, null)  // 切换隐藏投注框
                switch (params) {
                case 'noEnd':
                case 'end':
                    if (params === 'noEnd') {
                        _hmt.push(['_trackEvent', '500qqsd_首页未结束点击', 'click', '500qqsd_首页未结束'])
                    } else {
                        _hmt.push(['_trackEvent', '500qqsd_首页已结束点击', 'click', '500qqsd_首页已结束'])
                    }
                    this.$router.replace(`/h5/matchList/${params}/`)
                    break
                }
            },
            goLogin () {
                if (window.qqsdApp) {
                    qqsdApp.invoke('login')
                    return false
                }
            },
            openBetListbox () {
                if (this.hasLogin) {
                    stopHtml()
                    console.log('show betlist')
                    this.$store.dispatch('getGoldList', 0)
                    setTimeout(() => {
                        this.$store.commit('showBetListbox', true)
                    }, 10)
                } else {
                    console.log('登陆')
                    if (window.qqsdApp) {
                        qqsdApp.invoke('login')
                        return false
                    }
                }
                _hmt.push(['_trackEvent', '500qqsd_猜球记录点击', 'click', '500qqsd_猜球记录'])
            }
        }
    }
</script>

<style>
</style>
