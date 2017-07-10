<template>
    <div class="pop pop_recharge">
        <div class="pop_layer"></div>
        <div class="popIn">
            <div class="popTit">
                <ul class="btn_tab">
                    <li class="cur"><span>充值</span></li>
                    <li v-tap="{methods: footballPropsShow }" v-if="showChargeList"><span>我的</span></li>
                    <li v-tap="{methods: footballPropsShow }" v-else><span>购买</span></li>
                </ul>
                <h2 class="title">充值</h2>
                <span class="close" v-tap="{ methods:closeChargebox }"></span>
            </div>
            <div class="box" :class="{'box2':!showChargeList}">
                <div class="main-list">
                    <p class="info">虚拟道具只用于展示，购买道具赠送猜球币</p>
                    <div class="scroller clear">
                        <div class="item" v-for="item in chargeList">
                            <img :src="item.imgurl">
                            <p class="item-txt">送<i class="icon-jinbi"></i><strong>{{ item.goldnum|golds }}</strong></p>
                            <span class="item-btn" data-type="支付宝充值" :data-tab="item.money" v-tap="{methods: buy, item: item}">￥{{ item.rmb }}</span>
                        </div>
                    </div>
                </div>
                <div class="main-list main-list-mine">
                    <p class="info">我的购买记录</p>
                    <div class="scroller clear" v-if="footballPropsList">
                        <div class="item" v-for="propsList in footballPropsList" :class="{'item-no':propsList.num === '0'}">
                            <p class="item-in">
                                <img :src="propsList.img_url">
                                <span class="item-info item-info-no" v-if="propsList.num === '0'">未点亮</span>
                                <span class="item-info" v-if="" v-else>x{{ propsList.num }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {starHtml, platform} from '~common/util'
    export default {
        data () {
            return {
                title: '',
                showChargeList: true
            }
        },
        watch: {},
        methods: {
            closeChargebox () {
                //  关闭 消息
                starHtml()
                this.$store.commit('showChargebox', false)
            },
            buy ({item}) {
                this.current = item
                if (!this.current) {
                    this.$store.dispatch('showToast', '至少选择一项')
                    return
                }
                let params = {}
                params.goldid = this.current.goldid
                params.money = this.current.rmb
                params.goldnum = this.current.goldnum
                params.payid = 6000  // 球球支付
                this.$store.dispatch('do500_qqsdPay', params)
            },
            footballPropsShow () {
                this.showChargeList = !this.showChargeList
                if (!this.showChargeList) {
                    this.$store.dispatch('getFootballPropsList')
                }
            }
        },
        computed: {
            chargeList () {
                return this.$store.state.chargeAllData.chargeList
            },
            footballPropsList () {
                return this.$store.state.chargeAllData.footballPropsList
            }
        },
        mounted () {
            if (!this.chargeList) {
                this.$store.dispatch('getChargeList')
            }

            setTimeout(() => {
                if (window.qqsdApp) {
                    window.qqsdApp.paychanged = (type, pid, msg) => {
                        let _tip = ''
                        if (type == 1) {
                            _tip = '购买成功'
                            this.$store.dispatch('getUserInfo')
                        } else if (type == -1) { // 取消
                            return false
                        }
                        this.$store.dispatch('showToast', _tip)
                    }
                } else {
                    if (platform === 'ios') {
                        window.location.href = 'messi://download'
                    } else {
                        try {
                            nativeApi && nativeApi.download()
                        } catch (e) {}
                    }
                }
            }, 0)
        },
        filters: {
            golds: (num) => {
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
