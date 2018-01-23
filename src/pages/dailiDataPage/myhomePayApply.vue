<template>
    <div class="payApply l-full">
        <Header_all person-title="提现申请" :icon-style="'myHomeApplyList'"></Header_all>
        <div class="main-payApply" v-if="userInfo">
            <div class="apply-user">
                <span>姓名：</span>
                <div>{{ userInfo.username }}</div>
            </div>
            <div class="apply-ali">
                <span>支付宝：</span>
                <div>{{ userInfo.alipay }}</div>
            </div>
            <p class="apply-can">提现金额</p>
            <div class="apply-now">
                <span>￥</span>
                <input  type="tel" v-if="!isStopApply" id="moneyInp" @input="checkInpCash" v-model="applyCash" name="apply" placeholder="请输入100的倍数">
                <p class="inputCopy" v-else  >{{ applyCashCopy }}</p>
            </div>
            <div class="apply-tips" v-tap="{ methods:inpBlur}">
                <p v-if="showPay">本次最多可提现<i>{{ moneyNumber | moneyFormate }}</i>元，<a href="javascript:;" v-tap="{ methods:allIn}">全部提现</a></p>
                <p v-else style="color:red;">{{ showPayTips }}</p>
            </div>
            <a href="javascript:;" v-if="isShowPaying || isStopApply " class="btn btn-apply" >确认提现中</a>
            <a href="javascript:;" v-else class="btn btn-apply " :class="{'btn-sure': applyCash && showPay}" v-tap="{ methods:confirmApply }" >确认提现</a>
            <p class="apply-time">确认无误后一个工作日内到帐</p>
        </div>
        <div class="bottom-payApply">
            <p>1. 每月仅可提现一次，最低100元。 </p>
            <p>2. 提现扣除相应猜球币，不收任何手续费。</p>
            <p>如需帮助请联系客服QQ : 3157085145</p>
        </div>
    </div>
</template>

<script>
    import Header_all from '~components/header_all.vue'
    export default {
        data () {
            return {
                applyCash: null,
                showPay: true,
                showPayTips: '',
                applyCashCopy: ''
            }
        },
        watch: {},
        methods: {
            inpBlur () {
                if (!this.isStopApply) {
                    document.getElementById('moneyInp').blur()
                }
            },
            checkInpCash () {
                if (this.applyCash === '') {
                    this.showPay = true
                    return false
                }
                console.log(parseInt(this.applyCash))
                if (parseInt(this.applyCash) % 100 !== 0) {
                    console.log(parseInt(123))
                    this.showPayTips = '请输入100的倍数'
                    this.showPay = false
                    return false
                } else {
                    this.showPay = true
                }
                if (parseInt(this.applyCash) > parseInt(this.moneyFormate(this.moneyNumber))) {
                    this.showPayTips = '超出可提现额度'
                    this.showPay = false
                    return false
                } else {
                    this.showPay = true
                }
                if (this.applyCash.length > 8) {
                    this.showPayTips = '提现超出最大可提现金额'
                    this.applyCash = this.applyCash.slice(0, 8)
                    this.showPay = false
                } else {
                    this.showPay = true
                }
            },
            allIn () {
                if (!this.isStopApply) {
                    this.applyCash = this.moneyFormate(this.moneyNumber)
                }
            },
            moneyFormate (num) {
                if (isNaN(num)) {
                    num = 0
                }
                num = Number(num)
                num = num / 1000
                num = parseInt(num / 100) * 100
                console.log(num)
                if (num < 10000) {
                    return num
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 10) / 10 + '万'
                } else {
                    return Math.round(num / 100000000 * 10) / 10 + '亿'
                }
            },
            confirmApply () {
                /* 确认提现 */
                if (!(this.applyCash && this.showPay)) {
                    return false
                }
                if (!this.applyCash || parseInt(this.applyCash) === 0 || this.applyCash === '0') {
                    this.$store.dispatch('showToast', '提现金额有误')
                    this.applyCash = ''
                    return false
                }
                if (parseInt(this.applyCash) < 100) {
                    this.$store.dispatch('showToast', '提现金额最低100元')
                    this.applyCash = ''
                    return false
                }
                this.$store.dispatch('setApplyMoney', this.applyCash)
            }
        },
        computed: {
            isStopApply () {
                let isApply = false
                if (this.setmyHomeDataCopy && this.setmyHomeDataCopy.refound_status && this.setmyHomeDataCopy.refound_status === '0' && this.setmyHomeDataCopy.refounding) {
                    isApply = true
                    this.applyCashCopy = parseInt(this.setmyHomeDataCopy.refounding) / 1000
                } else {
                    this.applyCashCopy = 0
                }
                return isApply
            },
            isShowPaying () {
                return this.$store.state.myHomeObj.isShowPaying
            },
            userInfo () {
                if (this.$store.state.userInfo) {
                    return this.$store.state.userInfo
                } else {
                    this.$store.dispatch('getUserInfo')
                }
            },
            moneyNumber () {
                return this.$store.state.myHomeObj.moneyNumber
            },
            setmyHomeDataCopy () {
                return this.$store.state.myHomeObj.setmyHomeDataCopy
            }
        },
        components: {
            Header_all
        },
        mounted () {
        },
        filters: {
            moneyFormate: (num) => {
                if (isNaN(num)) {
                    num = 0
                }
                num = Number(num)
                num = num / 1000
                num = parseInt(num / 100) * 100
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
    .apply-now .inputCopy {
        margin-left: 0.2rem;
        border: none;
        outline: none;
        height: 0.63rem;
        line-height: 0.63rem;
        font-size: 0.36rem;
        color: #c0bfc4;
    }
</style>
