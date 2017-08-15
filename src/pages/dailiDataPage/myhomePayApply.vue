<template>
    <div class="payApply">
        <div class="top">
            <a href="javascript:;" class="btn font0 back">返回</a>
            <a href="#" class="btn payList">提现记录</a>
            <h1>提现申请</h1>
        </div>
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
                <input type="text" name="apply" placeholder="请输入10的倍数">
            </div>
            <div class="apply-tips red">
                本次最多可提现<i>120</i>元，<a href="javascript:;">全部提现</a>
            </div>
            <a href="javascript:;" class="btn btn-apply btn-sure">确认提现</a>
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
    export default {
        data(){
            return {
                title: ''
            }
        },
        watch: {},
        methods: {},
        computed: {},
        mounted(){

        }
    }
</script>
<style>
</style>
