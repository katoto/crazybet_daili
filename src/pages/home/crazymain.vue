<template>
    <div class="respon2-itm">
        <div class="full-scroll">
            <!-- 滚动  components-->
            <banner-scroll v-if="crazymainScrollData" class="notice">
                <div class="text-scroller">
                    <ul class="scroller-in">
                        <li v-for="ban in crazymainScrollData" v-html="ban"></li>
                    </ul>
                </div>
            </banner-scroll>

            <!-- 直播头部 components -->
            <matchHot-play :matchData="matchHotData"></matchHot-play>
            <!-- tab 选项入口 -->
            <section class="quickLink respon">
                <div class="js_btn_phb resone-itm" v-tap="{ methods:crazyMianNav,params:'rank'}">
                    <strong>排行榜</strong>
                    <span>冲榜有礼</span>
                    <i class="icon icon_phb"></i>
                </div>
                <div class="js_btn_mrrw resone-itm" v-tap="{ methods:crazyMianNav,params:'sign'}">
                    <strong>每日任务</strong>
                    <span>免费领金币</span>
                    <i class="icon icon_mrrw"></i>
                </div>
                <div class="js_btn_jpc resone-itm" v-tap="{ methods:crazyMianNav,params:'prize'}">
                    <strong>奖品场</strong>
                    <span>新货上架</span>
                    <i class="icon icon_jpb"></i>
                </div>
            </section>
            <!-- 比赛列表 -->
            <section class="listWrap">
                <header class="listWrap_tit clear">
                    <ul class="list_menu fl">
                        <li :class="{'cur': currentTap==='hot'}" v-tap="{ methods:matchNav ,params:'hot'}">热门赛事</li>
                        <li :class="{'cur': currentTap==='play'}" v-tap="{ methods:matchNav ,params:'play'}"
                            v-if="runListNumber && runListNumber!=='0'">直播中(<label class="count"
                                                                                   v-if="runListNumber">{{ runListNumber
                            }}</label>)

                        </li>
                        <li class="dis" v-if="!runListNumber || runListNumber==='0'" key="runListnumber"
                            v-tap="{ methods:matchNav ,params:'tips'}">直播中(<label class="count">0</label>)

                        </li>

                    </ul>
                    <a class="list_all" v-tap="{ methods:matchNav ,params:'goMatchList'}">全部</a>
                </header>
                <router-view></router-view>
            </section>
            <!-- 底部banner -->
            <common-footer></common-footer>
        </div>
    </div>
</template>
<script>
    import {actionTypes, mutationTypes} from '~store/home'
    import {stopHtml} from '~common/util'
    import BannerScroll from '~components/banner-scroll.vue'
    import MatchHotPlay from '~components/matchHot-play.vue'
    import CommonFooter from '~components/common-footer.vue'

    export default {
        data () {
            return {
                current: null,
                inFlash: false, // 右下角闪动提示
                flashMsg: '', // 右下角闪动提示
                allPage: 0,  // 按钮状态
                currentTap: 'hot'  //  tap 选中样式
            }
        },
        components: {
            BannerScroll,
            MatchHotPlay,
            CommonFooter
        },
        watch: {
            socketData (data) {
                Object.assign(data, {'matchStyle': 'hot'})
                this.$store.dispatch(actionTypes.sockDataFn, data)
            },
            matchIDStr (matchIDStr, oldMatchIdStr) {
                oldMatchIdStr && this.$store.dispatch('unsubscribe', {
                    ptype: 'list',
                    body: oldMatchIdStr
                })
                this.$store.dispatch('subscribe', {
                    ptype: 'list',
                    body: matchIDStr
                })
            },
            ck (ck) {
                console.log(ck) // 验证不弹出的情况
                if (!this.signList && this.userInfo) {
                    this.$store.dispatch(actionTypes.getSignList)
                }
                //  未登录不弹
                if (this.isSign && this.userInfo) {
                    if (!this.signList) {
                        this.$store.dispatch(actionTypes.getSignList)
                        this.$store.commit(mutationTypes.showSignbox, true)
                    } else {
                        this.$store.commit(mutationTypes.showSignbox, true)
                    }
                }
            }
        },
        methods: {
            matchNav ({params}) {
                // 热门赛事  直播中 全部赛事
                this.$store.commit(mutationTypes.currentBetSelect, null)  // 切换隐藏投注框
                switch (params) {
                case 'hot':
                case 'play':
                    if (params === 'hot') {
                        _hmt.push(['_trackEvent', '500qqsd_首页热门赛事点击', 'click', '500qqsd_首页热门赛事'])
                    } else {
                        _hmt.push(['_trackEvent', '500qqsd_首页直播中点击', 'click', '500qqsd_首页直播中'])
                    }
                    this.currentTap = params
                    this.$router.replace(`/h5/home/${params}/`)
                    break
                case 'goMatchList':
                    _hmt.push(['_trackEvent', '500qqsd_首页全部点击', 'click', '500qqsd_首页全部'])
                    this.$router.push(`/h5/matchList/noEnd`)
                    break
                case 'tips':
                    this.$store.dispatch('showToast', '暂无直播赛事~')
    
                    break
                }
            },
            crazyMianNav ({params}) {
                // 排行榜  每日任务 奖品场  我的消息  弹窗
                params = params || 'rank'
                switch (params) {
                case 'rank':
                    if (!this.rankList) {
                        this.$store.dispatch(actionTypes.getrankList)
                        setTimeout(() => {
                            this.$store.commit(mutationTypes.showRankbox, true)
                        }, 10)
                    } else {
                        this.$store.commit(mutationTypes.showRankbox, true)
                    }
                    stopHtml()
                    _hmt.push(['_trackEvent', '500qqsd_排行榜点击', 'click', '500qqsd_排行榜'])
    
                    break
                case 'sign':
                    if (!this.signList) {
                        this.$store.dispatch(actionTypes.getSignList)
                        setTimeout(() => {
                            this.$store.commit(mutationTypes.showSignbox, true)
                        }, 10)
                    } else {
                        this.$store.commit(mutationTypes.showSignbox, true)
                    }
                    stopHtml()
                    _hmt.push(['_trackEvent', '500qqsd_每日任务点击', 'click', '500qqsd_每日任务'])
    
                    break
                case 'prize':
                    this.$router.push(`/my/luckdraw`)
                    _hmt.push(['_trackEvent', '500qqsd_奖品场点击', 'click', '500qqsd_奖品场'])
    
                    break
                }
            }
        },
        computed: {
            socketData () {
                return this.$store.state.socket.data
            },
            runListNumber () {
                return this.$store.state.home.runListNumber
            },
            userInfo () {
                return this.$store.state.userInfo
            },
            ck () {
                return this.$store.state.ck
            },
            crazymainScrollData () {
                return this.$store.state.home.crazymainScrollData
            },
            matchHotData () {
                return this.$store.state.home.matchHotData
            },
            rankList () {
                return this.$store.state.home.rankList
            },
            signList () {
                return this.$store.state.home.signList
            },
            isSign () {
                let isSign = false  // false 是否有未签到的
                this.signList && this.signList.forEach((item) => {
                    if (item.sign === '0') {
                        isSign = true
                    }
                })
                return isSign
            },
            matchlist_hot () {
                return this.$store.state.home.matchList_hot
            },
            matchIDStr () {
                let matchIDStr = ''
                if (this.matchlist_hot) {
                    for (let i = 0, len = this.matchlist_hot.length; i < len; i++) {
                        matchIDStr += this.matchlist_hot[i].MatchID + '|'
                    }
                }
                return matchIDStr
            }
        },
        async mounted () {
            if (this.matchIDStr) {
                this.$store.dispatch('subscribe', {
                    ptype: 'list',
                    body: this.matchIDStr
                })
            }
            this.$store.dispatch(actionTypes.getFootballMatchList, 'hot')
            if (this.$route.fullPath && ~this.$route.fullPath.indexOf('play')) {
                this.matchNav({params: 'play'})
            }
            if (!this.signList && this.userInfo) {
                await this.$store.dispatch(actionTypes.getSignList)
            }
            // 弹窗 888 金币  到时候验证一下
            if (this.userInfo && this.userInfo.first_login && this.userInfo.first_login === '1') {
                await this.$store.dispatch(actionTypes.showJinbiBox, {isShow: true, golds: 888, coinTitle: '首次登录奖励'})
                setTimeout(() => {
                    this.$store.dispatch('getUserInfo')
                }, 10)
            }
            //  未登录不弹
            if (this.isSign && this.userInfo) {
                if (!this.signList) {
                    await this.$store.dispatch(actionTypes.getSignList)
                    this.$store.commit(mutationTypes.showSignbox, true)
                } else {
                    this.$store.commit(mutationTypes.showSignbox, true)
                }
            }
            //  滚动数据  滚动参数
            this.$store.dispatch(actionTypes.getcrazyMainInfo)
            setTimeout(() => {
                this.$store.dispatch(actionTypes.setIntervalFn, {type: 'hot', time: 20000})
                // 无热门有直播时跳直播tab
                if (this.matchlist_hot && this.matchlist_hot.length > 2 && this.runListNumber && parseInt(this.runListNumber) > 0) {
                    this.matchNav({params: 'play'})
                }
            }, 0)
        },
        beforeRouteLeave (to, from, next) {
//            取消订阅
            this.$store.dispatch('unsubscribe', {
                ptype: 'list',
                body: this.matchIDStr
            })
            next()
        },
        filters: {}
    }
</script>
<style>
</style>
