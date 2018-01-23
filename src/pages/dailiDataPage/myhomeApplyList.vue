<template>
    <div class="fffBody page-infinite">
        <Header_all person-title="提现记录" :icon-style="'myhome'"></Header_all>
        <div class="main-list">
            <ul v-if="homeApplyList && homeApplyList.record_list.length >0">
                <li v-for="item in homeApplyList.record_list">
                    <span class="list-date">{{ item.data }}</span>
                    <span class="list-money">{{ item.money  | moneyFormate }} 元</span>
                    <span class="list-status" v-if="item.status==='0'">提现中</span>
                    <span class="list-status" v-if="item.status==='1'">提现成功</span>
                    <span class="list-status" v-if="item.status==='-1'">提现失败</span>
                </li>
            </ul>
            <div v-else>
                <p style="text-align: center;padding-top: 2.5rem;font-size: 0.33rem">暂无提现记录~</p>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import Header_all from '~components/header_all.vue'

    export default {
        data () {
            return {
                allLoaded: false
            }
        },
        methods: {

        },
        computed: {
            homeApplyList () {
                return this.$store.state.myHomeObj.homeApplyList
            }
        },
        components: {
            Header_all
        },
        mounted () {
            this.$store.dispatch('gethomeApplyList')
        },
        filters: {
            moneyFormate (num) {
                if (isNaN(num)) {
                    num = 0
                }
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
