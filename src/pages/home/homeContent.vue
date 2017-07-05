<template>
    <div id="app">
        <!--  头部用户信息公用   listWrap-pb  -->
        <div class="wrap respon2" :class="{ 'allList':isAllListPage }">
            <HeaderTemplateHome></HeaderTemplateHome>
            <router-view></router-view>
        </div>
        <!-- 排行版 hide-->
        <div class="pop pop_phb" :class="{'hide':!showRankbox}">
            <div class="pop_layer"></div>
            <div class="popIn">
                <div class="popTit">
                    <ul class="btn_tab" :class="{'tab2':isrankRule}" v-tap="{ methods:showRankRule,tab:!isrankRule}">
                        <li><span>榜单</span></li>
                        <li><span >规则</span></li>
                    </ul>
                    <h2 class="title">排行榜</h2>
                    <span class="close" v-tap="{ methods:closeRankList}"></span>
                </div>
                <div class="box" :class="{'box2':isrankRule}" v-if="rankList">
                    <div class="phb_box" :class="{'phb_box2':this.showRankType==='lastWeek'}">
                        <ul class="list_menu clear">
                            <li v-tap="{ methods:changeRankTab,tapName:'thisWeek'}" :class="{'cur':this.showRankType==='thisWeek'}">本周盈利</li>
                            <li v-tap="{ methods:changeRankTab,tapName:'lastWeek'}":class="{'cur':this.showRankType==='lastWeek'}">上周奖励</li>
                        </ul>
                        <div class="phb_list phb_list_bz" v-if="rankList.prizerank">
                            <ul class="scroller" v-if="parseInt(rankList.prizerank.list.length)>0">
                                <li v-for="item in rankList.prizerank.list">
                                    <i class="num num_1" v-if="item.rank==='1'">{{ item.rank }}</i>
                                    <i class="num num_2" v-if="item.rank==='2'">{{ item.rank }}</i>
                                    <i class="num num_3" v-if="item.rank==='3'">{{ item.rank }}</i>
                                    <i class="num" v-if="item.rank!='3'&&item.rank!='2'&&item.rank!='1'">{{ item.rank }}</i>
                                    <span class="face">
                                <img :src="item.photo" @error="imgOnError">
                            </span>
                                    <span class="name" >{{ item.username }}</span>
                                    <span class="money">
                                <i class="icon icon_jinbi"></i>{{ item.golds |format }}
                            </span>
                                </li>
                                <li v-if="userinfo">&nbsp;</li>
                            </ul>
                            <div class="scroller" v-if="parseInt(rankList.prizerank.list.length)===0">
                                <img src="~static/images/empty_Mess.png" class="phbNoList_hc">
                                <p class="phbNoList_p_hc">暂无记录~</p>
                            </div>
                            <ul class="phb_list_me"  v-if="userinfo">
                                <li v-if="userinfo && rankList ">
                                    <i class="num num_100" style="visibility: visible !important;" v-if="+rankList.prizerank.rank <= 100">{{  rankList.prizerank.rank }}</i>
                                    <em class="num_me" v-else>100+</em>
                                    <i class="num" v-if="+rankList.prizerank.rank > 100"></i>
                                    <span class="face" v-if="userinfo">
                                        <img :src="userinfo.photo" @error="imgOnError">
                                    </span>
                                    <span class="name" v-if="userinfo">{{ userinfo.username }}</span>
                                    <span class="money">
                                        <i class="icon icon_jinbi"></i>{{ rankList.selfrank.golds |format  }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="phb_list phb_list_sz" v-if="rankList.lastweekprizerank">
                            <ul class="scroller" v-if="parseInt(rankList.lastweekprizerank.list.length)>0">
                                <li v-for="weekrank in rankList.lastweekprizerank.list">
                                    <i class="num num_1" v-if="weekrank.rank==='1'">{{ weekrank.rank }}</i>
                                    <i class="num num_2" v-if="weekrank.rank==='2'">{{ weekrank.rank }}</i>
                                    <i class="num num_3" v-if="weekrank.rank==='3'">{{ weekrank.rank }}</i>
                                    <i class="num" v-if="weekrank.rank!='3'&&weekrank.rank!='2'&&weekrank.rank!='1'">{{ weekrank.rank }}</i>
                                    <span class="face">
                                        <img :src="weekrank.photo" @error="imgOnError">
                                    </span>
                                    <span class="name" >{{ weekrank.username }}
                                        <em>{{ weekrank.golds |format }}</em>
                                    </span>
                                    <span class="money2">
                                        <i class="icon_jinbi2"></i>奖{{weekrank.amount |format }}
                                    </span>
                                </li>
                                <li v-if="userinfo">&nbsp;</li>
                            </ul>
                            <div class="scroller" v-if="parseInt(rankList.lastweekprizerank.list.length)===0">
                                <img src="~static/images/empty_Mess.png" class="phbNoList_hc">
                                <p class="phbNoList_p_hc">暂无记录~</p>
                            </div>
                            <ul class="phb_list_me" v-if="userinfo">
                                <li v-if="rankList.selflastweek">
                                    <em class="num_me" v-if="Object.keys(rankList.selflastweek).length<=0">榜外</em>
                                    <i class="num num_100" style="visibility: visible !important;" v-if="Object.keys(rankList.selflastweek).length>0">{{rankList.selflastweek.rank}}</i>
                                    <i class="num" v-if="Object.keys(rankList.selflastweek).length<=0"></i>
                                    <span class="face" v-if="userinfo">
                                        <img :src="userinfo.photo" @error="imgOnError">
                                    </span>
                                    <span class="name" v-if="userinfo">{{ userinfo.username }}
                                        <em v-if="Object.keys(rankList.selflastweek).length>0">{{rankList.selflastweek.golds |format}}</em>
                                        <em v-else>-</em>
                                    </span>
                                    <span class="money2">
                                        <i class="icon_jinbi2" v-if="Object.keys(rankList.selflastweek).length>0"></i><label
                                            v-if="Object.keys(rankList.selflastweek).length>0" >奖{{rankList.selflastweek.amount |format}}</label>
                                        <em class="empty"v-if="Object.keys(rankList.selflastweek).length<=0">-</em>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="phb_rule">
                        <div class="rule">
                            <dl>
                                <dt>盈利榜：</dt>
                                <dd> 1. 计算每周一08:00至下周一08:00时间内结算的订单，以结算的具体时间为准； </dd>
                                <dd>2. 统计时间内，按照盈利猜球币数排名，前十名可获得奖励； </dd>
                                <dd>3. 每周一08:00之后自动结算派发上周排行榜奖励； </dd>
                                <dd>4. 排名信息每周更新一次； </dd>
                            </dl>
                            <dl>
                                <dt>
                                    兑奖榜： </dt>
                                <dd>1. 按照每月玩家最高价值兑奖奖品排名；</dd>
                                <dd> 2. 排名信息每月更新一次； </dd>
                            </dl>
                            <dl>
                                <dt>注意事项：</dt>
                                <dd> 1. 凡参与竞猜应用，即视为同意本应用规则及免责声明条款； </dd>
                                <dd>2. 使用任何作弊行为获利的用户，将取消上榜奖励，追回违规所得，且平台保留追究法律责任的权利； </dd>
                                <dd>3. 本活动规则解释权归《疯狂猜球》所有。</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 每日签到  每次请求   -->
        <div class="pop pop_mrrw" :class="{'hide':!showSignbox}">
            <div class="pop_layer"></div>
            <div class="popIn">
                <div class="popTit">
                    <div class="sign_bg"></div>
                    <span class="close" v-tap="{ methods:closeSignList}"></span>
                </div>
                <div class="sign">
                    <ul class="sign_day">
                        <li class="item " :class="{'have_sign':item.sign==='1','cur':item.sign==='0'}" v-for="item in signList">
                            <span class="day_num">第{{ item.idx }}天</span>
                            <i class="icon icon_jinbi3" v-if="Number(item.idx)<=2"></i>
                            <i class="icon icon_jinbi2" v-if="Number(item.idx)<=4 && Number(item.idx)>2"></i>
                            <i class="icon icon_jinbi4" v-if="Number(item.idx)<=6 && Number(item.idx)>4"></i>
                            <i class="icon icon_jinbi5" v-if="item.idx==='7'"></i>
                            <div class="day_money" v-if="item.idx==='7'"><em>{{ item.item }}</em></div>
                            <div class="day_money" v-else><em>{{ item.item }}</em>猜球币</div>
                        </li>
                    </ul>

                    <span class="btn_sign" v-if="isSign==='0'" v-tap="{ methods:marketSignFn,idx:currentIdx }" key="1">领取</span>
                    <span class="btn_sign gray_hc" v-if="isSign==='1'" key="0">已领取</span>
                </div>
            </div>
        </div>

        <!-- 签到成功金币展现   -->
        <div class="pop pop_jinbi" :class="{'hide':!showJinbi.isShow}" >
            <div class="pop_layer"></div>
            <div class="popIn">
                <div class="light"></div>
                <div class="info">
                    <p style="padding: 10px 0">{{ showJinbi.coinTitle }}</p>
                    <i class="icon icon_jinbi3"></i>
                    <strong>+{{ showJinbi.coinNumber | format }} 猜球币</strong>
                    <p>猜球币可用于抽奖或竞猜！</p>
                </div>
            </div>
        </div>

        <!-- 消息弹窗  -->
        <MsgAlert v-if="showMessbox"></MsgAlert>

        <!-- 猜球记录 弹窗  -->
        <BetListAlert v-if="showBetListbox"></BetListAlert>

        <!-- 充值 弹窗  -->
        <ChargeAlert v-if="showChargebox"></ChargeAlert>

        <!-- 嘉奖 弹窗  -->
        <AwardAlert v-if="showAwardbox"></AwardAlert>

        <!--  底部选项 -->
        <send-order></send-order>
    </div>
</template>

<script>
    import SendOrder from '~components/send-order.vue'
    import {actionTypes, mutationTypes} from '~store/home'
    import {starHtml} from '~common/util'
    import HeaderTemplateHome from '~components/header_template_home.vue'
    import MsgAlert from '~components/msg-alert.vue'
    import ChargeAlert from '~components/charge-alert.vue'
    import BetListAlert from '~components/betList-alert.vue'
    import AwardAlert from '~components/award-alert.vue'

    export default {
        data () {
            return {
                title: '',
                showRankType: 'thisWeek',
                isrankRule: false  // 显示榜单规则
            }
        },
        methods: {
            closeSignList () {
                starHtml()
                this.$store.commit(mutationTypes.showSignbox, false)
            },
            closeRankList () {
                starHtml()
                this.isrankRule = false
                this.$store.commit(mutationTypes.showRankbox, false)
                this.showRankType = 'thisWeek'
            },
            changeRankTab ({tapName}) {
                this.showRankType = tapName
            },
            marketSignFn ({idx}) {
                if (!this.hasLogin) {
                    console.log(this.hasLogin)
                    if (window.qqsdApp) {
                        qqsdApp.invoke('login')
                        return false
                    }
                    console.error('球球注入失败')
                }
                if (idx === '-1') {
                    return false
                }
                this.$store.dispatch(actionTypes.marketSign, idx)
            },
            imgOnError (that) {
                that.target.setAttribute('src', 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png')
            },
            showRankRule ({tab}) {
                this.isrankRule = tab
            }
        },
        watch: {
            '$store.state.home.rankList.isprize': function (isprize) {
                // 处理上周排行榜奖励
                if (isprize === '1' && this.rankList && this.rankList.selflastweek && this.rankList.selflastweek.amount) {
                    this.showRankType = 'lastWeek'
                    this.$store.commit(mutationTypes.showJinbi, {isShow: true, coinNumber: this.rankList.selflastweek.amount, coinTitle: '上周奖励'})
                    setTimeout(() => {
                        this.$store.commit(mutationTypes.showJinbi, {isShow: false, coinNumber: 0, coinTitle: ''})
                    }, 2000)
                }
            }
        },
        computed: {
            toastVisible () {
                return this.$store.state.toastVisible
            },
            toastMsg () {
                return this.$store.state.toastMsg
            },
            isAllListPage () {
                if (~this.$store.state.route.path.indexOf('h5/matchList')) {
                    return true
                } else {
                    return false
                }
            },
            userinfo () {
                return this.$store.state.userInfo
            },
            signList () {
                return this.$store.state.home.signList
            },
            rankList () {
                return this.$store.state.home.rankList
            },
            showRankbox () {
                return this.$store.state.home.showRankbox
            },
            showAwardbox () {
                return this.$store.state.awardAllData.showAwardbox
            },
            showMessbox () {
                return this.$store.state.msgAllData.showMessbox
            },
            showBetListbox () {
                return this.$store.state.guessAllData.showBetListbox
            },
            showChargebox () {
                return this.$store.state.chargeAllData.showChargebox
            },
            showSignbox () {
                return this.$store.state.home.showSignbox
            },
            currentIdx () {
                if (this.signList) {
                    let idx = '-1'
                    this.signList.forEach((item) => {
                        if (item.sign === '0') {
                            idx = item.idx
                            return false
                        }
                    })
                    return idx
                }
            },
            isSign () {
                if (this.signList) {
                    let isSign = '1'  //  1 代表已签到  0，代表未签到
                    this.signList.forEach((item) => {
                        if (item.sign === '0') {
                            isSign = '0'
                            return false
                        }
                    })
                    return isSign
                }
            },
            showJinbi () {
                return this.$store.state.home.showJinbi
            },
            hasLogin () {
                return !!this.$store.state.ck
            }
        },
        components: {
            SendOrder,
            HeaderTemplateHome,
            MsgAlert,
            BetListAlert,
            ChargeAlert,
            AwardAlert
        },
        filters: {
            format: (num) => {
                num = Number(num)
                if (isNaN(num)) {
                    return 0
                }
                if (num < 10000) {
                    return num
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 10) / 10 + '万'
                } else {
                    return Math.round(num / 100000000 * 10) / 10 + '亿'
                }
            }
        },
        mounted () {
        }
    }
</script>
