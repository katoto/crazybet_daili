<template>
    <div class="respon2-itm" v-if="!myFootballPropsShow">
        <div class="main">
            <div class="main-top clear">
                <div class="fl">虚拟道具只用于展示，购买道具赠送猜球币</div>
                <span class="btn-myprop"
                      v-tap="{methods: footballPropsShow, item: this.myFootballPropsShow }">我的道具&gt;</span>
            </div>
            <section class="full-scroll">
                <div class="main-list clear" style="padding-top: .273067rem;">
                    <div class="item" v-for="item in chargeList">
                        <img :src="item.imgurl">
                        <p class="item-txt">送<i class="icon-jinbi"></i><strong>{{ item.goldnum|golds }}</strong></p>
                        <span class="item-btn" data-type="支付宝充值" :data-tab="item.money" v-tap="{methods: buy, item: item}">￥{{ item.rmb }}</span>
                    </div>
                </div>
                <!-- 底部banner -->
                <common-footer></common-footer>
            </section>
        </div>
    </div>
    <div class="respon2-itm bg2" v-else>
        <div class="main">
            <section class="full-scroll">
                <div class="myprop-list clear" v-if="footballPropsList">
                    <div class="item" v-for="propsList in footballPropsList" :class="{'item-no':propsList.num === '0'}">
                        <p class="item-in">
                            <img :src="propsList.img_url">
                            <span class="item-info item-info-no" v-if="propsList.num === '0'">未点亮</span>
                            <span class="item-info" v-if="" v-else>x{{ propsList.num }}</span>
                        </p>
                    </div>
                </div>

            </section>
            <div class="back-wrap"><span class="btn-back"
                                         v-tap="{methods: footballPropsShow, item: this.myFootballPropsShow }">返回充值列表</span>
            </div>
        </div>
    </div>

</template>
<script>
    import {aTypes} from '~store/my'
    import {platform} from '~common/util'
    import CommonFooter from '~components/common-footer.vue'

    export default {
        data () {
            return {
                current: null,
                myFootballPropsShow: false,
                wechatCode: null
            }
        },
        watch: {},
        components: {
            CommonFooter
        },
        methods: {
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
                this.$store.dispatch(aTypes.do500_qqsdPay, params)
            },
            footballPropsShow ({item}) {
                if (!item) {
                    this.$store.dispatch(aTypes.getFootballPropsList)
                }
                this.myFootballPropsShow = !item
            }
        },
        computed: {
            chargeList () {
                return this.$store.state.my.chargeList
            },
            footballPropsList () {
                return this.$store.state.my.footballPropsList
            }
        },
        mounted () {
            if (!this.chargeList) {
                this.$store.dispatch(aTypes.getChargeList)
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
                        nativeApi && nativeApi.download()
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
