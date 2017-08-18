<template>
    <div class="payApply">
        <Header_all person-title="提现申请" :icon-style="'myHomeApplyList'"></Header_all>
        <div class="main-payApply">
            <div class="apply-user">
                <span>姓名：</span>
                <div>伍佰万伍佰万伍佰万伍佰万伍佰万伍佰万伍佰万伍佰万伍佰万</div>
            </div>
            <div class="apply-ali">
                <span>支付宝：</span>
                <div>18*****92@qq.com</div>
            </div>
            <p class="apply-can">提现金额</p>
            <div class="apply-now">
                <span>￥</span>
                <input type="text" v-model="applyCash" name="apply" placeholder="请输入10的倍数">
            </div>
            <div class="apply-tips red">
                本次最多可提现<i>{{ money | moneyFormate }}</i>元，<a href="javascript:;" v-tap="{ methods:allIn}">全部提现</a>
            </div>
            <a href="javascript:;" class="btn btn-apply btn-sure" v-tap="{ methods:confirmApply }" >确认提现</a>
            <p class="apply-time">确认无误后一个工作日内到帐</p>
        </div>
        <div class="bottom-payApply">
            <p>1.每月最后一天可提现，提现扣除相应猜球币。</p>
            <p>2.提现不限次数且不受任何手续费。</p>
            <p>如需帮助请联系客服QQ : 3157085145</p>
        </div>
    </div>
</template>

<script>
    import Header_all from '~components/header_all.vue'
    export default {
        data () {
            return {
                title: '',
                money: '76732139',
                applyCash: ''
            }
        },
        watch: {},
        methods: {
            allIn () {
                this.applyCash = this.moneyFormate(this.money)
            },
            moneyFormate (num) {
                num = Number(num)
                num = parseInt(num / 10) * 10
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
            }
        },
        computed: {

        },
        components: {
            Header_all
        },
        mounted () {
        },
        filters: {
            moneyFormate: (num) => {
                num = Number(num)
                num = parseInt(num / 10) * 10
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
