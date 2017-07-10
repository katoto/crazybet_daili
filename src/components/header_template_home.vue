<template>
    <div>
        <section class="topBar" v-if="!isAllListPage">
            <div class="icon icon_back" key="icon_backapp" v-tap="{methods:enterMy,params:'backApp'}"></div>
            <h1>疯狂猜球</h1>
        </section>
        <header class="header_hc clear" v-if="userInfo && !isAllListPage">
            <div class="user" v-tap="{methods:enterMy,params:'message'}">
                    <span class="face">
                        <img class="face_pic" :src="userInfo.photo" @error="imgOnError">
                        <sup class="dot" v-if="(userInfo.notifies!='0') || ( userInfo.prize_records!='0')"></sup>
                    </span>
                <span class="user_my">{{userInfo.username}}</span>
            </div>
            <div class="fr">
                <a class="link" v-tap="{methods:enterMy,params:'betlist'}">猜球记录<sup class="dot"
                                                                                    v-if="userInfo && userInfo.newprize && userInfo.newprize !='0'"></sup></a>
                <div class="my_moeny" v-tap="{methods:enterMy,params:'charge'}">
                    <span><i class="icon icon_jinbi"></i>{{userInfo.gold_total | format }}</span>
                    <span class="btn_add">充值</span>
                </div>
            </div>
        </header>
        <header class="header_hc clear" v-if="!userInfo && !isAllListPage">
            <div class="before-login clear">
                <p class="top_msg">与<em>{{ scrollNumber }}</em>人一起体验疯狂猜球</p>
                <a class="fr" v-tap="{methods:goLogin,params:''}">请登录<i class="icon icon_raw"></i></a>
            </div>
        </header>
        <section class="topBar" v-if="isAllListPage">
            <div class="icon icon_back" v-tap="{methods:enterMy,params:'backHistory'}"></div>
            <h1>全部比赛</h1>
            <span class="top_money" v-tap="{methods:enterMy,params:'charge'}" v-if="userInfo"><i
                    class="icon icon_jinbi"></i>{{userInfo.gold_total | format }}</span>
            <span v-else class="top_money" style="color: #6f799a;" v-tap="{methods:goLogin,params:''}">未登录</span>
        </section>
        <div class="listWrap_tit clear" v-if="isAllListPage">
            <ul class="list_menu">
                <li :class="{'cur': currentNav==='noEnd'}" v-tap="{ methods:nav ,params:'noEnd'}">未结束</li>
                <li :class="{'cur': currentNav==='end'}" v-tap="{ methods:nav ,params:'end'}">已结束</li>
            </ul>
            <span class="btn_record" v-tap="{ methods:openBetListbox }">猜球记录
                <sup class="dot" v-if="userInfo && userInfo.newprize && userInfo.newprize !='0'">
                </sup>
            </span>
        </div>
    </div>
</template>

<script>
    import {stopHtml} from '~common/util'
    import { mutationTypes} from '~store/home'

    export default {
        data () {
            return {
                title: '',
                currentNav: 'noEnd'
            }
        },
        watch: {},
        methods: {
            enterMy ({params}) {
                switch (params) {
                    case 'betlist':
                        stopHtml()
                        console.log('show betlist')
                        this.$store.dispatch('getGoldList', 0)
                        setTimeout(() => {
                            this.$store.commit('showBetListbox', true);
                            this.$store.dispatch('getUserInfo');

                        }, 10)
                        _hmt.push(['_trackEvent', '500qqsd_猜球记录点击', 'click', '500qqsd_猜球记录'])

                        break
                    case 'charge':
                        stopHtml()
                        console.log('show charge')
                        setTimeout(() => {
                            this.$store.commit('showChargebox', true)
                        }, 10)
                        _hmt.push(['_trackEvent', '500qqsd_充值点击', 'click', '500qqsd_充值'])

                        break
                    case 'message':
                        this.$store.dispatch('getMessageList')
                        stopHtml()
                        this.$store.state.msgAllData.messPageNum = 1
                        setTimeout(() => {
                            this.$store.commit('showMessbox', true)
                            setTimeout(() => {
                                document.querySelector('.message').scrollTop = 0
                            }, 11)
                        }, 10)
                        _hmt.push(['_trackEvent', '500qqsd_我的头像点击', 'click', '500qqsd_我的头像'])

                        break
                    case 'backHistory':
                        window.history.back()

                        break
                    case 'backApp':
                        if (window.qqsdApp) {
                            //  关闭view
                            qqsdApp.invoke('close')
                        } else {
                            window.history.back()
                        }
                        ;
                        break
                }
            },
            imgOnError (that) {
                that.target.setAttribute('src', 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png')
            },
            goLogin () {
                if (window.qqsdApp) {
                    qqsdApp.invoke('login')
                    return false
                }
            },
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
            openBetListbox () {
                if(this.hasLogin){
                    stopHtml()
                    this.$store.dispatch('getGoldList', 0)
                    setTimeout(() => {
                        this.$store.commit('showBetListbox', true)
                    }, 10)
                }else{
                    console.log('登陆');
                    if (window.qqsdApp) {
                        qqsdApp.invoke('login')
                        return false
                    }
                }
                _hmt.push(['_trackEvent', '500qqsd_猜球记录点击', 'click', '500qqsd_猜球记录'])
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            },
            scrollNumber () {
                return this.$store.state.home.scrollNumber
            },
            hasLogin () {
                return !!this.$store.state.ck
            },
            isAllListPage () {
                if (~this.$store.state.route.path.indexOf('h5/matchList')) {
                    return true
                } else {
                    return false
                }
            }
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
